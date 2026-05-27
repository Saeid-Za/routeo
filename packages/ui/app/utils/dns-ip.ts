function isValidIpv4(ip: string): boolean {
	const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip)
	if (!m)
		return false
	return [m[1], m[2], m[3], m[4]].every((oct) => {
		const n = Number(oct)
		return n >= 0 && n <= 255
	})
}

/** Lightweight IPv6 check for manual entries (full parser not required). */
function isValidIpv6Loose(ip: string): boolean {
	const cleaned = ip.replace(/^\[|\]$/g, "")
	if (!cleaned.includes(":"))
		return false
	if (cleaned.split("::").length > 2)
		return false
	return /^[0-9a-f:]+$/i.test(cleaned) && cleaned.length >= 2
}

export function isValidDnsIp(ip: string): boolean {
	return isValidIpv4(ip) || isValidIpv6Loose(ip)
}

export function splitIpInput(raw: string): string[] {
	return raw.split(/[\s,;]+/).map(s => s.trim()).filter(Boolean)
}
