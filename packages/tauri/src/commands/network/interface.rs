use netdev::interface::state::OperState;
use netdev::{get_default_interface, get_interfaces};
use tauri::command;

use crate::network::NetworkInterface;

/// Whether an interface should appear in the UI list.
fn is_listable_interface(iface: &netdev::Interface, default_iface_name: Option<&str>) -> bool {
    if iface.is_loopback() {
        return false;
    }

    // Always surface the default-route interface when it is administratively up
    // (e.g. USB tethering may lack operstate/IPv4 briefly while still being the active path).
    if default_iface_name == Some(iface.name.as_str()) && iface.is_up() {
        return true;
    }

    if !iface.is_up() {
        return false;
    }

    if iface.is_oper_up() || iface.is_running() {
        return true;
    }

    // USB/RNDIS tethering drivers often leave operstate as "unknown" while the link works.
    match iface.oper_state() {
        OperState::Unknown | OperState::Dormant => {
            !iface.ipv4.is_empty() || !iface.ipv6.is_empty()
        }
        OperState::Testing => true,
        _ => false,
    }
}

#[command]
pub fn list_network_interfaces() -> Result<Vec<NetworkInterface>, String> {
    tracing::debug!("Listing network interfaces...");

    let interfaces = get_interfaces();
    let default_iface_name = get_default_interface()
        .ok()
        .map(|iface| iface.name);

    #[cfg(debug_assertions)]
    tracing::info!("Found {} interfaces", interfaces.len());

    let mut result = Vec::new();

    for iface in interfaces {
        if !is_listable_interface(&iface, default_iface_name.as_deref()) {
            tracing::debug!(
                "Skipping interface {} (up={}, oper={:?}, ips_v4={})",
                iface.name,
                iface.is_up(),
                iface.oper_state(),
                iface.ipv4.len()
            );
            continue;
        }

        let ips: Vec<String> = iface.ipv4.iter().map(|ip| ip.addr().to_string()).collect();
        let is_default = iface.default
            || default_iface_name.as_deref() == Some(iface.name.as_str());

        tracing::debug!(
            "Interface: {}, IPs: {:?}, default: {}",
            iface.name,
            ips,
            is_default
        );

        result.push(NetworkInterface {
            ips,
            is_default,
            code_name: iface.name.clone(),
            name: iface.friendly_name.unwrap_or(iface.name),
        });
    }

    Ok(result)
}
