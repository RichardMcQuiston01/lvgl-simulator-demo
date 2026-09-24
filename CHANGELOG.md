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
- Help dialog (WAI-ARIA pattern), editor toolbar (Format/Copy/Reset/Share
  with shareable `#scene=` links), explicit light/dark theme toggle, a
  deeper accessibility audit (contrast, touch targets, landmarks — see
  `docs/ROADMAP.md`), a custom favicon, and OG/Twitter meta tags.
- Production uptime monitor: a scheduled GitHub Actions workflow checks
  `lvgl-simulator-demo.vercel.app` every 15 minutes and files a GitHub issue
  on failure, auto-closing it once the site recovers.
- Bumped `@richardmcquiston01/lvgl-simulator` to `^0.2.0` and added a
  "Navigation Demo" mode (header toggle) showcasing its new
  `createNavigator()` API: a fixed three-screen demo (Home → Settings →
  Advanced) plus a "How it works" panel with a read-only code snippet,
  since navigation's `push`/`pop` wiring is live code the JSON scene
  editor can't express.
