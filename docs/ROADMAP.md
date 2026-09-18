# ROADMAP

Ordered by dependency, not by date. Mirrors the stage numbering in
`docs/PLAN.md`; update the status line as each stage completes.

## Stage 0: Scaffolding — in progress

- [ ] Vite + React + TypeScript project, Tailwind CSS, ESLint + Prettier
- [ ] `@richardmcquiston01/lvgl-simulator` added as a dependency
- [ ] `LICENSE` populated, `.gitignore` added
- [ ] CI workflow: install, lint, typecheck, build

## Stage 1: Editor/preview layout — in progress

- [ ] Two-pane layout component (editor left, preview right)
- [ ] Responsive stack below the layout breakpoint (preview below editor)

## Stage 2: Live simulator integration — in progress

- [ ] Debounced JSON → `loadScreen()` → `createSimulator()` wiring
- [ ] Inline error display that preserves the last valid render
- [ ] Seeded default scene + preset dropdown

## Stage 3: Floating donate widget — in progress

- [ ] Bottom-right card (QR + Stripe link)
- [ ] Close control (persisted)
- [ ] Minimize control (persisted, independent of close)

## Stage 4: Polish, examples, docs — not started

- [ ] Expanded preset gallery
- [ ] Accessibility pass
- [ ] Repo `README.md` finished (usage, screenshot)

## Stage 5: CI/CD & Vercel deployment — not started

- [ ] GitHub Actions gate on PRs into `dev`/`staging`/`main`
- [ ] Vercel project linked; preview deployments per PR
- [ ] Production deployment on merge to `main`

## Open items

- No target dates yet.
- Vercel project linkage (Stage 5) requires repo access from a Vercel
  account/team — tracked separately from the app code itself.
