use crate::logging::{FrontendLog, LOG_CHANNEL, set_log_delivery_active, take_pending_logs};
use once_cell::sync::Lazy;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};
use tauri::{Emitter, Window, async_runtime::spawn};
use tokio::{
    sync::broadcast,
    time::{Duration, sleep},
};

static LOG_STREAM_ACTIVE: Lazy<Arc<AtomicBool>> = Lazy::new(|| Arc::new(AtomicBool::new(false)));

pub fn ensure_log_stream(window: Window) {
    if LOG_STREAM_ACTIVE.load(Ordering::Relaxed) {
        return;
    }
    LOG_STREAM_ACTIVE.store(true, Ordering::Relaxed);

    let flag = LOG_STREAM_ACTIVE.clone();
    let mut rx = LOG_CHANNEL.subscribe();

    spawn(async move {
        while flag.load(Ordering::Relaxed) {
            match rx.recv().await {
                Ok(line) => {
                    let _ = window.emit("app-log", line);
                }
                Err(broadcast::error::RecvError::Lagged(missed)) => {
                    let _ = window.emit(
                        "app-log",
                        FrontendLog {
                            level: "WARN".to_string(),
                            message: format!(
                                "Missed {missed} log messages due to backlog."
                            ),
                        },
                    );
                }
                Err(_) => {
                    sleep(Duration::from_millis(50)).await;
                }
            }
        }
    });
}

#[tauri::command]
pub async fn start_log_stream(window: Window) -> Result<(), String> {
    let buffered = take_pending_logs();
    ensure_log_stream(window.clone());

    for line in buffered {
        let _ = window.emit("app-log", line);
    }

    // Logs emitted while replaying above were buffered only; flush them once.
    for line in take_pending_logs() {
        let _ = window.emit("app-log", line);
    }

    set_log_delivery_active(true);

    Ok(())
}

#[tauri::command]
pub async fn stop_log_stream() -> Result<(), String> {
    set_log_delivery_active(false);
    LOG_STREAM_ACTIVE.store(false, Ordering::Relaxed);
    Ok(())
}
