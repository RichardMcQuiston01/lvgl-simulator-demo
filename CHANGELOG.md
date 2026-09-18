# CHANGELOG

## [Unreleased]

- Initial Vite + React + TypeScript + Tailwind scaffold.
- Side-by-side scene editor / live canvas preview, backed by
  `@richardmcquiston01/lvgl-simulator`'s `loadScreen()`/`createSimulator()`.
- Floating donate widget (close + minimize, persisted).
- `docs/PLAN.md` / `docs/ROADMAP.md` multi-agent, multi-stage development plan.
- Two more scene presets (disabled state, full widget gallery) and an
  accessibility pass (visible focus states, correctly-scoped error alert,
  a labelled visual-only preview region).
- README screenshot and Accessibility section.
- CI: cancel superseded runs on the same ref via a `concurrency` group.
- `package.json` `engines.node`, `.gitignore` entry for the local Vercel
  CLI link, and a README `Deployments` section linking the live
  preview/production URLs.
