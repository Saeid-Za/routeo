import type { DnsProvider } from "~/types"

/** Key for persisting user-added DNS presets in `localStorage`. */
export const CUSTOM_DNS_STORAGE_KEY = "routeo-custom-dns"

export const dnsProviders: DnsProvider[] = [
	{
		name: "Cloudflare DNS",
		icon: "i-devicon:cloudflare",
		ips: ["1.1.1.1", "1.0.0.1"],
		tags: [
			{ name: "Fast", icon: "i-mdi-speedometer" },
			{ name: "Privacy", icon: "i-mdi-shield-check" },
		],
	},
	{
		name: "Google DNS",
		icon: "i-streamline-ultimate-color:google-logo",
		ips: ["8.8.8.8", "8.8.4.4"],
		tags: [
			{ name: "Global", icon: "i-mdi-earth" },
			{ name: "Reliable", icon: "i-mdi-thumb-up" },
		],
	},
	{
		name: "Quad9 DNS",
		icon: "i-simple-icons:quad9",
		ips: ["9.9.9.9", "149.112.112.112"],
		tags: [
			{ name: "Secure", icon: "i-mdi-lock" },
			{ name: "Privacy", icon: "i-mdi-shield-check" },
		],
	},
	{
		name: "OpenDNS",
		icon: "i-simple-icons:cisco",
		ips: ["208.67.222.222", "208.67.220.220"],
		tags: [
			{ name: "Family Filter", icon: "i-mdi-account-group" },
			{ name: "Reliable", icon: "i-mdi-thumb-up" },
		],
	},
	{
		name: "AdGuard DNS",
		icon: "i-simple-icons:adguard",
		ips: ["94.140.14.14", "94.140.15.15"],
		tags: [
			{ name: "Adblock", icon: "i-mdi-block-helper" },
			{ name: "Privacy", icon: "i-mdi-shield-check" },
		],
	},
	{
		name: "NextDNS",
		icon: "i-simple-icons:nextdns",
		ips: ["45.90.28.0", "45.90.30.0"],
		tags: [
			{ name: "Customizable", icon: "i-mdi-tune" },
			{ name: "Privacy", icon: "i-mdi-shield-check" },
		],
	},
	{
		name: "Shekan",
		icon: "/images/dns/shekan.png",
		ips: ["178.22.122.100", "185.51.200.2"],
		tags: [
			{ name: "ChatGPT", icon: "i-hugeicons:chat-gpt" },
			{ name: "Regional", icon: "i-solar:lock-password-unlocked-bold-duotone" },
		],
	},
	{
		name: "Begzar",
		icon: "/images/dns/begzar.png",
		ips: ["185.55.226.24", "185.55.226.25", "185.55.226.26"],
		tags: [
			{ name: "Regional", icon: "i-solar:lock-password-unlocked-bold-duotone" },
		],
	},
	{
		name: "Radar Game",
		icon: "/images/dns/radar.svg",
		ips: ["10.202.10.10", "10.202.10.11"],
		tags: [
			{ name: "Gaming", icon: "i-mdi-gamepad-variant" },
			{ name: "Regional", icon: "i-solar:lock-password-unlocked-bold-duotone" },
		],
	},
	{
		name: "Electro",
		icon: "/images/dns/electro.png",
		ips: ["78.157.42.101", "78.157.42.100"],
		tags: [
			{ name: "Gaming", icon: "i-mdi-gamepad-variant" },
			{ name: "Regional", icon: "i-solar:lock-password-unlocked-bold-duotone" },
		],
	},
	{
		name: "Level3 DNS",
		icon: "i-simple-icons:lumen",
		ips: ["4.2.2.4", "4.2.2.1"],
		tags: [
			{ name: "Global", icon: "i-mdi-earth" },
			{ name: "Reliable", icon: "i-mdi-thumb-up" },
		],
	},
	{
		name: "Verisign DNS",
		icon: "/images/dns/verisign.svg",
		ips: ["64.6.64.6", "64.6.65.6"],
		tags: [
			{ name: "Reliable", icon: "i-mdi-thumb-up" },
			{ name: "Privacy", icon: "i-mdi-shield-check" },
		],
	},
]
