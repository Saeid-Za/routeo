# Contributing to Routeo

Thanks for your interest in contributing! Routeo is a Tauri + Nuxt monorepo for managing system DNS on desktop.

## Development setup

```bash
git clone https://github.com/routeo/routeo.git
cd routeo
bun install
bun run dev:ui      # Nuxt on http://localhost:3000
bun run dev:tauri   # Tauri shell (separate terminal, or use `bun run dev`)
```

See the root [README.md](../README.md) for prerequisites and platform notes.

## Monorepo layout

| Path | Purpose |
|------|---------|
| `packages/ui/` | Nuxt 4 frontend — pages, components, composables |
| `packages/ui/layers/core/` | Shared UI layer (UnoCSS, shadcn-style components) |
| `packages/tauri/` | Rust backend — Tauri commands, DNS/network logic |

## Where to change things

| Change | Location |
|--------|----------|
| Add a built-in DNS provider | `packages/ui/app/utils/constants.ts` |
| Custom DNS persistence logic | `packages/ui/app/composables/useCustomDns.ts` |
| New Tauri command | `packages/tauri/src/commands/` → register in `lib.rs` → expose in `packages/ui/app/composables/tauri.ts` |
| DNS apply/flush/reset logic | `packages/tauri/src/commands/network/dns.rs` |
| Main DNS page UI | `packages/ui/app/pages/index.vue` and related components |

## Code style

**Frontend** (`packages/ui`):

```bash
cd packages/ui
bun run lint
bun run typecheck
```

**Backend** (`packages/tauri`):

```bash
cd packages/tauri
cargo fmt
cargo clippy
cargo test
```

## Pull requests

- Describe which platform(s) you tested (Windows / Linux).
- Include a screenshot for visible UI changes.
- Keep PRs focused — one concern per PR when possible.
- Do not commit secrets, `.env` files, `node_modules/`, `target/`, or `.nuxt/`.

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include your OS, network setup (NetworkManager vs plain resolv.conf on Linux), and steps to reproduce.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
