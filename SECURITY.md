# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |

## Reporting a vulnerability

Routeo modifies system DNS settings and may invoke elevated privileges on Windows and Linux. If you discover a security issue, please **do not** open a public GitHub issue.

Instead, email **saeid.za98@gmail.com** with:

- A description of the vulnerability
- Steps to reproduce
- Affected platform(s) and Routeo version
- Impact assessment (if known)

We will acknowledge receipt within 7 days and aim to provide an initial assessment within 14 days.

## Scope

Issues we are especially interested in:

- Privilege escalation beyond what is needed for DNS changes
- Command injection in DNS or network commands
- Path traversal or arbitrary file write via Tauri commands
- Leaking sensitive data through logs or IPC

Out of scope:

- Third-party DNS resolver availability or privacy policies
- Issues requiring physical access to an unlocked machine
