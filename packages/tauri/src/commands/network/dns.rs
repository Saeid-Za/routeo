use std::net::Ipv4Addr;
use std::net::SocketAddr;
use std::time::Duration;
use tauri::command;
use tokio::net::UdpSocket;
use tokio::process::Command;
use tokio::time::timeout;

#[cfg(target_os = "windows")]
const CREATE_NO_WINDOW: u32 = 0x08000000;

use crate::network::DnsRecord;

/// Apply DNS on Linux for a given interface and list of DNS servers.
/// - `iface`: interface name (like "eth0" or "wlan0")
/// - `dns_servers`: list of DNS IPs as strings
/// Returns `Ok(())` if successful, `Err(String)` if anything fails
#[tauri::command]
pub async fn set_and_apply_dns(iface: String, dns_servers: Vec<String>) -> Result<(), String> {
    // validate_iface(&iface)?;
    validate_dns_servers(&dns_servers)?;

    #[cfg(target_os = "windows")]
    {
        // Join DNS servers with comma for PowerShell
        let dns_list = dns_servers.join(",");

        // PowerShell command:
        // - Start-Process: runs elevated
        // - -Wait: waits until the command completes
        let ps_command = format!(
            "Start-Process powershell -ArgumentList \"Set-DnsClientServerAddress -InterfaceAlias '{}' -ServerAddresses {}\" -Verb RunAs -WindowStyle Hidden -Wait",
            iface, dns_list
        );

        let output = Command::new("powershell")
            .args(&["-Command", &ps_command])
            .creation_flags(CREATE_NO_WINDOW)
            .output()
            .await
            .map_err(|e| e.to_string())?;

        if output.status.success() {
            Ok(())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }

    #[cfg(target_os = "linux")]
    {
        let iface_ref = iface.as_str();
        let dns_slices: Vec<&str> = dns_servers.iter().map(|s| s.as_str()).collect();

        #[cfg(debug_assertions)]
        tracing::debug!(
            "🔹 Starting DNS set for interface '{}' with servers {:?}",
            iface_ref,
            dns_slices
        );

        // Detect /etc/resolv.conf target
        let link_output = tokio::process::Command::new("readlink")
            .arg("-f")
            .arg("/etc/resolv.conf")
            .output()
            .await
            .map_err(|e| format!("Failed to check /etc/resolv.conf: {}", e))?;

        let link_path = String::from_utf8_lossy(&link_output.stdout).to_string();

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 /etc/resolv.conf points to '{}'", link_path.trim());

        // ---------------- NetworkManager ----------------
        if link_path.contains("NetworkManager") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected NetworkManager, ignoring DHCP DNS");

            let dns_arg = dns_slices.join(" ");
            let cmds = vec![
                vec!["device", "modify", iface_ref, "ipv4.ignore-auto-dns", "yes"],
                vec!["device", "modify", iface_ref, "ipv4.dns", &dns_arg],
                vec!["connection", "reload"],
                vec!["device", "reapply", iface_ref],
            ];

            for args in cmds {
                #[cfg(debug_assertions)]
                tracing::debug!("🔹 Running: nmcli {:?}", args);

                let status = tokio::process::Command::new("nmcli")
                    .args(&args)
                    .status()
                    .await
                    .map_err(|e| format!("Failed to run nmcli: {}", e))?;

                if !status.success() {
                    return Err(format!("nmcli command failed: {:?}", args));
                }
            }

            #[cfg(debug_assertions)]
            tracing::info!("✅ DNS applied successfully via NetworkManager");

            return Ok(());
        }

        // ---------------- systemd-resolved ----------------
        if link_path.contains("systemd/resolve") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected systemd-resolved");

            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Flushing systemd-resolved caches");

            let _ = tokio::process::Command::new("resolvectl")
                .arg("flush-caches")
                .status()
                .await;

            // Apply DNS
            let mut args = vec!["dns", iface_ref];
            args.extend(dns_slices);

            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Running: resolvectl {:?}", args);

            let status = tokio::process::Command::new("resolvectl")
                .args(&args)
                .status()
                .await
                .map_err(|e| format!("Failed to run resolvectl: {}", e))?;

            if !status.success() {
                return Err("resolvectl dns failed".into());
            }

            #[cfg(debug_assertions)]
            tracing::info!("✅ DNS applied successfully via systemd-resolved");

            return Ok(());
        }

        // ---------------- Fallback: plain resolv.conf ----------------
        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Falling back to plain /etc/resolv.conf");

        let content = dns_slices
            .iter()
            .map(|s| format!("nameserver {}", s))
            .collect::<Vec<_>>()
            .join("\n");

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Writing /etc/resolv.conf:\n{}", content);

        tokio::fs::write("/etc/resolv.conf", content)
            .await
            .map_err(|e| format!("Failed to write /etc/resolv.conf: {}", e))?;

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Restarting networking services");

        let _ = tokio::process::Command::new("systemctl")
            .args(["restart", "networking"])
            .status()
            .await;
        let _ = tokio::process::Command::new("systemctl")
            .args(["restart", "NetworkManager"])
            .status()
            .await;

        #[cfg(debug_assertions)]
        tracing::info!("✅ DNS applied successfully via plain resolv.conf");

        Ok(())
    }
}

#[tauri::command]
pub async fn flush_dns() -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Flushing DNS cache on Windows...");

        let output = tokio::process::Command::new("cmd")
            .args(&["/C", "ipconfig /flushdns"])
            .creation_flags(CREATE_NO_WINDOW)
            .output()
            .await
            .map_err(|e| {
                #[cfg(debug_assertions)]
                tracing::error!("❌ Failed to execute ipconfig: {}", e);
                e.to_string()
            })?;

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            #[cfg(debug_assertions)]
            tracing::info!("✅ DNS cache flushed successfully:\n{}", stdout.trim());
            Ok(stdout.trim().to_string())
        } else {
            let stderr = String::from_utf8_lossy(&output.stderr);
            #[cfg(debug_assertions)]
            tracing::error!("❌ ipconfig /flushdns failed:\n{}", stderr.trim());
            Err(stderr.trim().to_string())
        }
    }

    #[cfg(target_os = "linux")]
    {
        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Detecting DNS management method...");

        let link_output = Command::new("readlink")
            .arg("-f")
            .arg("/etc/resolv.conf")
            .output()
            .await
            .map_err(|e| {
                #[cfg(debug_assertions)]
                tracing::error!("❌ Failed to resolve /etc/resolv.conf: {}", e);
                format!("Failed to check /etc/resolv.conf: {}", e)
            })?;

        let link_path = String::from_utf8_lossy(&link_output.stdout).to_string();

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 /etc/resolv.conf points to '{}'", link_path.trim());

        if link_path.contains("NetworkManager") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected NetworkManager → reloading connection");

            let status = Command::new("nmcli")
                .args(["connection", "reload"])
                .status()
                .await
                .map_err(|e| {
                    #[cfg(debug_assertions)]
                    tracing::error!("❌ Failed to reload NetworkManager: {}", e);
                    format!("Failed to reload NetworkManager: {}", e)
                })?;

            if !status.success() {
                #[cfg(debug_assertions)]
                tracing::error!("❌ nmcli connection reload failed");
                return Err("NetworkManager reload failed".into());
            }

            #[cfg(debug_assertions)]
            tracing::info!("✅ NetworkManager DNS cache reloaded");
            Ok("NetworkManager DNS cache reloaded".into())
        } else if link_path.contains("systemd/resolve") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected systemd-resolved → flushing caches");

            let status = Command::new("resolvectl")
                .arg("flush-caches")
                .status()
                .await
                .map_err(|e| {
                    #[cfg(debug_assertions)]
                    tracing::error!("❌ Failed to flush systemd-resolved caches: {}", e);
                    format!("Failed to flush systemd-resolved caches: {}", e)
                })?;

            if !status.success() {
                #[cfg(debug_assertions)]
                tracing::error!("❌ resolvectl flush-caches failed");
                return Err("resolvectl flush-caches failed".into());
            }

            #[cfg(debug_assertions)]
            tracing::info!("✅ systemd-resolved caches flushed successfully");
            Ok("systemd-resolved caches flushed".into())
        } else {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Plain /etc/resolv.conf detected (no DNS cache present)");
            Ok("No DNS cache to flush on plain /etc/resolv.conf".into())
        }
    }
}

/// Revert DNS on the given interface to system/DHCP defaults.
#[tauri::command]
pub async fn reset_dns_to_default(iface: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        let ps_command = format!(
            "Start-Process powershell -ArgumentList \"Set-DnsClientServerAddress -InterfaceAlias '{}' -ResetServerAddresses\" -Verb RunAs -WindowStyle Hidden -Wait",
            iface
        );

        let output = Command::new("powershell")
            .args(&["-Command", &ps_command])
            .creation_flags(CREATE_NO_WINDOW)
            .output()
            .await
            .map_err(|e| e.to_string())?;

        if output.status.success() {
            Ok(())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }

    #[cfg(target_os = "linux")]
    {
        let iface_ref = iface.as_str();

        #[cfg(debug_assertions)]
        tracing::debug!(
            "🔹 Resetting DNS to system default for interface '{}'",
            iface_ref
        );

        let link_output = Command::new("readlink")
            .arg("-f")
            .arg("/etc/resolv.conf")
            .output()
            .await
            .map_err(|e| format!("Failed to check /etc/resolv.conf: {}", e))?;

        let link_path = String::from_utf8_lossy(&link_output.stdout).to_string();

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 /etc/resolv.conf points to '{}'", link_path.trim());

        if link_path.contains("NetworkManager") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected NetworkManager, restoring DHCP DNS");

            restore_networkmanager_dhcp_dns(iface_ref).await?;

            #[cfg(debug_assertions)]
            tracing::info!("✅ DNS reset successfully via NetworkManager");

            return Ok(());
        }

        if link_path.contains("systemd/resolve") {
            #[cfg(debug_assertions)]
            tracing::debug!("🔹 Detected systemd-resolved, reverting link DNS");

            let status = Command::new("resolvectl")
                .args(["revert", iface_ref])
                .status()
                .await
                .map_err(|e| format!("Failed to run resolvectl: {}", e))?;

            if !status.success() {
                return Err("resolvectl revert failed".into());
            }

            // Re-apply the NetworkManager connection so DHCP DNS is pushed back into resolved.
            try_networkmanager_reapply(iface_ref).await;

            let _ = Command::new("resolvectl")
                .arg("flush-caches")
                .status()
                .await;

            #[cfg(debug_assertions)]
            tracing::info!("✅ DNS reset successfully via systemd-resolved");

            return Ok(());
        }

        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Falling back to NetworkManager-style DNS reset");

        restore_networkmanager_dhcp_dns(iface_ref).await?;

        let _ = Command::new("systemctl")
            .args(["restart", "NetworkManager"])
            .status()
            .await;

        #[cfg(debug_assertions)]
        tracing::info!("✅ DNS reset via fallback path");

        Ok(())
    }

    #[cfg(not(any(target_os = "windows", target_os = "linux")))]
    {
        let _ = iface;
        Err("Reset DNS is not supported on this platform".into())
    }
}

#[command]
pub async fn get_active_dns() -> Result<Vec<DnsRecord>, String> {
    #[cfg(target_os = "windows")]
    {
        use std::process::Stdio;

        let output = Command::new("powershell")
            .args(&[
                "-Command",
                "Get-DnsClientServerAddress | Where-Object { $_.ServerAddresses -and $_.InterfaceAlias -ne $null } | Select-Object InterfaceAlias, ServerAddresses | ConvertTo-Json -Compress",
            ])
            .creation_flags(CREATE_NO_WINDOW)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output()
            .await
            .map_err(|e| e.to_string())?;

        if !output.status.success() {
            return Err(String::from_utf8_lossy(&output.stderr).to_string());
        }

        let stdout = String::from_utf8_lossy(&output.stdout);

        let mut records: Vec<DnsRecord> = serde_json::from_str(&stdout)
            .map_err(|e| format!("Failed to parse PowerShell JSON: {e}\nRaw output: {stdout}"))?;

        // Filter only IPv4 addresses
        for rec in &mut records {
            use std::net::Ipv4Addr;

            rec.server_addresses
                .retain(|ip| ip.parse::<Ipv4Addr>().is_ok());
        }

        Ok(records)
    }

    #[cfg(target_os = "linux")]
    {
        let output = Command::new("resolvectl")
            .arg("status")
            .output()
            .await
            .map_err(|e| e.to_string())?;

        if !output.status.success() {
            return Err(String::from_utf8_lossy(&output.stderr).to_string());
        }

        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(parse_resolvectl_status_dns(&stdout))
    }
}

#[command]
pub async fn test_dns_latency(dns_ip: String, timeout_in_ms: Option<u64>) -> Option<u128> {
    let addr: SocketAddr = match format!("{}:53", dns_ip).parse() {
        Ok(addr) => addr,
        Err(e) => {
            #[cfg(debug_assertions)]
            println!("[DEBUG] Failed to parse address {dns_ip}: {e}");
            return None;
        }
    };

    let timeout_duration = Duration::from_millis(timeout_in_ms.unwrap_or(1000));

    #[cfg(debug_assertions)]
    println!(
        "[DEBUG] Starting DNS latency test for {dns_ip} with timeout {:?}ms",
        timeout_duration.as_millis()
    );

    // Build a minimal valid DNS query for "example.com"
    let mut query = vec![
        0x12, 0x34, // ID
        0x01, 0x00, // Flags: standard query
        0x00, 0x01, // QDCOUNT: 1 question
        0x00, 0x00, // ANCOUNT
        0x00, 0x00, // NSCOUNT
        0x00, 0x00, // ARCOUNT
    ];

    // Encode "example.com"
    for part in ["example", "com"] {
        query.push(part.len() as u8);
        query.extend_from_slice(part.as_bytes());
    }
    query.push(0x00); // terminator for QNAME

    query.extend_from_slice(&[
        0x00, 0x01, // QTYPE: A
        0x00, 0x01, // QCLASS: IN
    ]);

    let socket = match UdpSocket::bind("0.0.0.0:0").await {
        Ok(s) => s,
        Err(e) => {
            #[cfg(debug_assertions)]
            println!("[DEBUG] Failed to bind UDP socket: {e}");
            return None;
        }
    };

    if let Err(e) = socket.connect(addr).await {
        #[cfg(debug_assertions)]
        println!("[DEBUG] Failed to connect to {addr}: {e}");
        return None;
    }

    #[cfg(debug_assertions)]
    println!("[DEBUG] Sending DNS query to {addr}");

    let start = std::time::Instant::now();

    if let Err(e) = socket.send(&query).await {
        #[cfg(debug_assertions)]
        println!("[DEBUG] Failed to send DNS query: {e}");
        return None;
    }

    let mut buf = [0u8; 512];
    match timeout(timeout_duration, socket.recv(&mut buf)).await {
        Ok(Ok(_)) => {
            let elapsed = start.elapsed().as_millis();
            #[cfg(debug_assertions)]
            println!("[DEBUG] DNS {dns_ip} responded in {elapsed} ms");
            Some(elapsed)
        }
        Ok(Err(e)) => {
            #[cfg(debug_assertions)]
            println!("[DEBUG] Error receiving from DNS {dns_ip}: {e}");
            None
        }
        Err(_) => {
            #[cfg(debug_assertions)]
            println!(
                "[DEBUG] DNS {dns_ip} timed out after {:?}ms",
                timeout_duration.as_millis()
            );
            None
        }
    }
}

#[cfg(target_os = "linux")]
async fn restore_networkmanager_dhcp_dns(iface_ref: &str) -> Result<(), String> {
    let cmds = vec![
        vec!["device", "modify", iface_ref, "ipv4.ignore-auto-dns", "no"],
        vec!["device", "modify", iface_ref, "-ipv4.dns"],
        vec!["connection", "reload"],
        vec!["device", "reapply", iface_ref],
    ];

    for args in &cmds {
        #[cfg(debug_assertions)]
        tracing::debug!("🔹 Running: nmcli {:?}", args);

        let status = Command::new("nmcli")
            .args(args)
            .status()
            .await
            .map_err(|e| format!("Failed to run nmcli: {}", e))?;

        if !status.success() {
            return Err(format!("nmcli command failed: {:?}", args));
        }
    }

    Ok(())
}

/// Ask NetworkManager to re-push DHCP DNS into systemd-resolved after reverting overrides.
#[cfg(target_os = "linux")]
async fn try_networkmanager_reapply(iface_ref: &str) {
    let _ = Command::new("nmcli")
        .args(["device", "reapply", iface_ref])
        .status()
        .await;
}

#[cfg(target_os = "linux")]
fn parse_resolvectl_status_dns(stdout: &str) -> Vec<DnsRecord> {
    let mut records = Vec::new();
    let mut current_iface: Option<String> = None;

    for line in stdout.lines() {
        let line = line.trim();
        if line.starts_with("Link ") {
            current_iface = None;
            if let Some(start) = line.find('(') {
                if let Some(end) = line.find(')') {
                    current_iface = Some(line[start + 1..end].to_string());
                }
            }
        } else if let Some(rest) = line.strip_prefix("DNS Servers:") {
            if let Some(iface) = &current_iface {
                let servers = rest
                    .split_whitespace()
                    .filter(|s| s.parse::<Ipv4Addr>().is_ok())
                    .map(|s| s.to_string())
                    .collect::<Vec<_>>();

                if !servers.is_empty() {
                    records.push(DnsRecord {
                        interface_alias: iface.clone(),
                        server_addresses: servers,
                    });
                }
            }
        }
    }

    records
}

fn validate_dns_servers(dns_servers: &[String]) -> Result<(), String> {
    if dns_servers.is_empty() {
        return Err("DNS server list cannot be empty".into());
    }
    for dns in dns_servers {
        if dns.parse::<std::net::IpAddr>().is_err() {
            return Err(format!("Invalid DNS server IP: {}", dns));
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::validate_dns_servers;

    #[test]
    fn rejects_empty_dns_list() {
        let err = validate_dns_servers(&[]).unwrap_err();
        assert!(err.contains("empty"));
    }

    #[test]
    fn accepts_valid_ipv4_servers() {
        validate_dns_servers(&["1.1.1.1".into(), "8.8.8.8".into()]).unwrap();
    }

    #[test]
    fn accepts_valid_ipv6_servers() {
        validate_dns_servers(&["2001:4860:4860::8888".into()]).unwrap();
    }

    #[test]
    fn rejects_invalid_ip() {
        let err = validate_dns_servers(&["not-an-ip".into()]).unwrap_err();
        assert!(err.contains("Invalid DNS server IP"));
    }
}
