pub mod dns;
pub mod interface;
pub mod traffic;

pub use dns::*;
pub use interface::*;
pub use traffic::*;

use serde::{Deserialize, Serialize};

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NetworkInterface {
    pub name: String,
    pub code_name: String,
    pub ips: Vec<String>,
    pub is_default: bool,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct DnsRecord {
    #[serde(rename(deserialize = "InterfaceAlias", serialize = "interfaceAlias"))]
    pub interface_alias: String,

    #[serde(rename(deserialize = "ServerAddresses", serialize = "serverAddresses"))]
    pub server_addresses: Vec<String>,
}
