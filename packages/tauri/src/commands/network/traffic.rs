use netdev::get_default_interface;
use once_cell::sync::Lazy;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};
use std::time::Duration;
use sysinfo::Networks;
use tauri::{Emitter, Window, async_runtime::spawn};
use tokio::time::sleep;

static STREAM_ACTIVE: Lazy<Arc<AtomicBool>> = Lazy::new(|| Arc::new(AtomicBool::new(false)));

#[tauri::command]
pub async fn start_network_stream(window: Window) -> Result<(), String> {
    if STREAM_ACTIVE.load(Ordering::Relaxed) {
        tracing::debug!("Network stream already running — skipping start.");
        return Ok(());
    }
    tracing::info!("Starting network stream...");
    STREAM_ACTIVE.store(true, Ordering::Relaxed);

    let flag = STREAM_ACTIVE.clone();

    spawn(async move {
        let mut networks = Networks::new_with_refreshed_list();
        tracing::debug!("Network interfaces loaded: {}", networks.len());

        let mut prev_rx = 0u64;
        let mut prev_tx = 0u64;
        let mut avg_rx = 0.0f64;
        let mut avg_tx = 0.0f64;
        let smoothing_factor = 0.75;

        while flag.load(Ordering::Relaxed) {
            match get_default_interface() {
                Ok(iface) => {
                    networks.refresh(true);
                    let iface_mac = iface.mac_addr.unwrap_or_default().octets();
                    let (total_rx, total_tx) = get_network_data(&networks, &iface_mac);

                    let rx_per_sec = total_rx.saturating_sub(prev_rx) as f64;
                    let tx_per_sec = total_tx.saturating_sub(prev_tx) as f64;

                    prev_rx = total_rx;
                    prev_tx = total_tx;

                    avg_rx = exponential_smoothing(avg_rx, rx_per_sec, smoothing_factor);
                    avg_tx = exponential_smoothing(avg_tx, tx_per_sec, smoothing_factor);

                    if let Err(e) = window.emit(
                        "network-stats",
                        serde_json::json!({ "download": avg_rx, "upload": avg_tx }),
                    ) {
                        tracing::warn!("Failed to emit network stats: {}", e);
                    }

                    sleep(Duration::from_secs(1)).await;
                }
                Err(_) => {
                    tracing::debug!("No default interface found, retrying in 1s...");
                    sleep(Duration::from_secs(1)).await;
                }
            }
        }

        tracing::info!("Network stream stopped.");
    });

    Ok(())
}

#[tauri::command]
pub async fn stop_network_stream() -> Result<(), String> {
    STREAM_ACTIVE.store(false, Ordering::Relaxed);
    tracing::info!("Stop signal sent to network stream.");
    Ok(())
}

fn exponential_smoothing(prev_avg: f64, current_value: f64, smoothing_factor: f64) -> f64 {
    smoothing_factor * current_value + (1.0 - smoothing_factor) * prev_avg
}

fn get_network_data(networks: &Networks, iface_mac: &[u8]) -> (u64, u64) {
    let mut total_rx = 0u64;
    let mut total_tx = 0u64;

    for (_, data) in networks.list() {
        if data.mac_address().0 == iface_mac {
            total_rx += data.received();
            total_tx += data.transmitted();
            break;
        }
    }

    (total_rx, total_tx)
}
