use std::{
    collections::VecDeque,
    sync::{
        Mutex,
        atomic::{AtomicBool, Ordering},
    },
};

use once_cell::sync::Lazy;
use serde::Serialize;
use tokio::sync::broadcast;
use tracing::{Event, Subscriber};
use tracing_subscriber::Layer;

const LOG_BUFFER_CAPACITY: usize = 10_000;

// Global broadcast channel for logs (fan-out)
pub static LOG_CHANNEL: Lazy<broadcast::Sender<FrontendLog>> = Lazy::new(|| {
    // buffer size: how many logs to store if frontend lags
    let (tx, _rx) = broadcast::channel::<FrontendLog>(10_000);
    tx
});

static LOG_BUFFER: Lazy<Mutex<VecDeque<FrontendLog>>> =
    Lazy::new(|| Mutex::new(VecDeque::with_capacity(LOG_BUFFER_CAPACITY)));

static LOG_DELIVERY_ACTIVE: AtomicBool = AtomicBool::new(false);

pub fn set_log_delivery_active(active: bool) {
    LOG_DELIVERY_ACTIVE.store(active, Ordering::Relaxed);
}

/// Drains pending logs for one-time replay; buffer stays empty after this until delivery stops.
pub fn take_pending_logs() -> Vec<FrontendLog> {
    LOG_BUFFER
        .lock()
        .map(|mut buffer| buffer.drain(..).collect())
        .unwrap_or_default()
}

fn push_log(log: FrontendLog) {
    if LOG_DELIVERY_ACTIVE.load(Ordering::Relaxed) {
        let _ = LOG_CHANNEL.send(log);
        return;
    }

    if let Ok(mut buffer) = LOG_BUFFER.lock() {
        buffer.push_back(log);
        while buffer.len() > LOG_BUFFER_CAPACITY {
            buffer.pop_front();
        }
    }
}

use tracing::field::Visit;

#[derive(Debug, Clone, Serialize)]
pub struct FrontendLog {
    pub level: String,
    pub message: String,
}

pub struct FrontendLogLayer;

struct MessageVisitor {
    pub message: Option<String>,
}

impl Visit for MessageVisitor {
    fn record_debug(&mut self, field: &tracing::field::Field, value: &dyn std::fmt::Debug) {
        if field.name() == "message" {
            self.message = Some(format!("{:?}", value));
        }
    }
}

impl<S> Layer<S> for FrontendLogLayer
where
    S: Subscriber,
{
    fn on_event(&self, event: &Event<'_>, _ctx: tracing_subscriber::layer::Context<'_, S>) {
        let mut visitor = MessageVisitor { message: None };
        event.record(&mut visitor);

        if let Some(msg) = visitor.message {
            let log = FrontendLog {
                level: event.metadata().level().to_string(),
                message: msg,
            };
            push_log(log);
        }
    }
}
