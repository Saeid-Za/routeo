# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-06-02

### Added

- Persist window size and position across sessions via `tauri-plugin-window-state`

### Fixed

- Register the window-state plugin on the Tauri `Builder` so state is saved and restored on launch
- Grant `window-state:default` capability so the plugin can read and write window state
- Disable initial window centering in `tauri.conf.json` so a restored position is not overridden

## [0.1.1] - 2026-05-28

### Fixed

- Card styles on desktop
- Center alignment of the main screen image in the README

### Changed

- UI component styles for badges
- Default window dimensions in the Tauri configuration
- Release workflow now uses `bunx` for the Tauri build script

## [0.1.0] - 2026-05-27

### Added

- Initial release of Routeo — a desktop DNS manager built with Tauri and Nuxt
- DNS latency benchmarking with sequential resolver testing
- One-click switching for popular DNS providers (Cloudflare, Google, Quad9, OpenDNS, AdGuard, NextDNS, and more)
- Custom DNS presets stored locally
- Network visibility: active interface, local IPs, current DNS servers, connection status
- DNS cache flush and restore system defaults
- Live upload/download traffic monitoring
- Integrated Tauri runtime log viewer
- Installers for Windows (NSIS, MSI) and Linux (deb)

[Unreleased]: https://github.com/routeo/routeo/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/routeo/routeo/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/routeo/routeo/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/routeo/routeo/releases/tag/v0.1.0
