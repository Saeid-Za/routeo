use tauri::Manager;
use tracing_subscriber::prelude::*;

#[path = "commands/network/mod.rs"]
mod network;

#[path = "commands/log-stream.rs"]
mod logstream;

#[path = "logging.rs"]
pub mod logging;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // #[cfg(target_os = "linux")]
    // unsafe {
    //     std::env::set_var("GDK_BACKEND", "wayland");
    //     std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    // }

    tracing_subscriber::registry()
        .with(logging::FrontendLogLayer)
        .with(tracing_subscriber::fmt::layer()) // optional terminal logs
        .init();

    let mut builder = tauri::Builder::default();

    #[cfg(desktop)]
    {
        builder =
            builder.plugin(tauri_plugin_window_state::Builder::default().build());
    }

    builder
        .invoke_handler(tauri::generate_handler![
            network::list_network_interfaces,
            network::test_dns_latency,
            network::set_and_apply_dns,
            network::reset_dns_to_default,
            network::get_active_dns,
            network::flush_dns,
            network::start_network_stream,
            network::stop_network_stream,
            logstream::start_log_stream,
            logstream::stop_log_stream,
        ])
        .setup(|app| {
            tracing::info!("Routeo application starting");

            let window = app.get_webview_window("main").unwrap();
            if cfg!(debug_assertions) {
                window.open_devtools();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
