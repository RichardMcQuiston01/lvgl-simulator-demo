# PLAN

## What this is

A TypeScript single-page application that showcases
[`@richardmcquiston01/lvgl-simulator`](https://www.npmjs.com/package/@richardmcquiston01/lvgl-simulator)
in the browser: a live JSON [scene](https://github.com/RichardMcQuiston01/lvgl-simulator/blob/main/docs/SCENE_SCHEMA.md)
editor on the left, a canvas live-preview on the right, rendered by the
published package's `loadScreen()`/`createSimulator()` — nothing about the
simulator's own rendering, widgets, or scene schema is reimplemented here;
this repo only consumes it as a normal npm dependency.

A second "Navigation Demo" mode (toggle in the header) showcases the
package's `createNavigator()` (added in `0.2.0`) the same way — as a normal
consumer, not a reimplementation. It's a fixed, non-editable demo rather
than a JSON preset: a navigator's `push`/`pop` wiring is live code (an
`addEventListener('clicked', ...)` calling `navigator.push()`), which the
scene schema has no way to express.

## Conventions

- TypeScript, `strict: true`, Google TypeScript Style Guide.
- Vite for the SPA build/dev server (project-wide preference for Vite on
  single-page apps), React for component structure and state (editor/preview
  wiring, the donate widget's open/minimized state).
- Tailwind CSS for styling, used wherever it fits.
- Prettier + ESLint (`typescript-eslint`), matching the sibling
  `lvgl-simulator` repo's config shape where reasonable.
- No backend, no database — static SPA, deployed to Vercel.

## Branching & release flow

```
feature/<slug>  →  PR  →  dev  →  PR  →  staging  →  PR  →  main  →  Vercel (production)
```

- All feature work happens on a `feature/<slug>` branch cut from `dev`.
  Each one is scoped to a single stage (or a tightly-coupled group of
  stages) below, opened as a **draft PR into `dev`**, and merged once CI is
  green and the exit criteria for its stage(s) are met.
- Once every stage targeted for a release is merged into `dev` and has been
  manually smoke-tested there, `dev` is promoted to `staging` via PR for
  wider testing.
- Once `staging` is signed off, `staging` is promoted to `main` via PR.
  Merging to `main` is what triggers a Vercel **production** deployment.
- Every PR (regardless of target branch) gets a Vercel **preview**
  deployment for review before merge — see Stage 5.

## Multi-agent, multi-stage development plan

Each stage is scoped as an independent unit of work with its own inputs,
deliverables, and exit criteria, so it can be handed to a separate
agent/contributor and land as its own feature branch/PR. Stage 1 (layout)
and Stage 3 (donate widget) are independent of each other and can run
concurrently once Stage 0 lands; everything else is sequential. See
`docs/ROADMAP.md` for status tracking.

### Stage 0 — Scaffolding

**Agent role:** Scaffold Agent

- Vite + React + TypeScript project (`npm create vite`-equivalent, strict
  `tsconfig`), Tailwind CSS wired in, ESLint + Prettier.
- `@richardmcquiston01/lvgl-simulator` added as a runtime dependency.
- `LICENSE` populated (Apache-2.0, matching `COPYRIGHT`/README), `.gitignore`.
- GitHub Actions CI: install, lint, typecheck, build.
- **Exit criteria:** `npm run dev` serves an empty Tailwind-styled shell;
  `npm run build` produces a deployable `dist/`; CI green on the PR.

### Stage 1 — Editor/preview layout

**Agent role:** Layout Agent · depends on Stage 0

- Two-pane responsive layout: left pane holds the code editor (a
  `<textarea>`), right pane holds the live-preview canvas. Side-by-side at
  wider viewports; the preview pane stacks **below** the editor pane below
  the layout breakpoint.
- **Exit criteria:** Verified in-browser at both a wide (≥1024px) and a
  narrow (<1024px) viewport — side-by-side above the breakpoint, stacked
  (editor first, preview below) beneath it.

### Stage 2 — Live simulator integration

**Agent role:** Integration Agent · depends on Stage 1

- Debounced textarea input → `JSON.parse` → `loadScreen()` → mounted into a
  `createSimulator()` canvas in the preview pane.
- Invalid JSON or a scene the library rejects (bad `version`, unknown node
  `type`) shows a descriptive inline error without tearing down the last
  valid render.
- Seeded with a default example scene on first load, plus a small preset
  dropdown (button/checkbox/switch/slider, flex/grid layout) drawn from the
  package's own README examples and `docs/SCENE_SCHEMA.md`.
- **Exit criteria:** Editing valid scene JSON updates the canvas live;
  invalid JSON surfaces an inline error and preserves the last good render;
  at least one preset per widget type loads correctly.

### Stage 3 — Floating donate widget

**Agent role:** Donate Agent · depends on Stage 0, parallel with Stage 1/2

- Fixed bottom-right card (QR + "Donate via Stripe" link) per the project's
  standard donate block, extended with two independent controls: **close**
  (dismisses entirely) and **minimize** (collapses to a small pill,
  re-expandable) — both states persisted in `localStorage` across reloads.
- **Exit criteria:** Card renders bottom-right on load (unless previously
  dismissed); minimize collapses/re-expands without losing state; close
  persists across a reload; QR decodes to the Stripe link.

### Stage 4 — Polish, examples, docs

**Agent role:** Docs/Polish Agent · depends on Stage 2, Stage 3

- Expand the preset gallery, accessibility pass (labelled regions, focus
  states, `aria-live` on the error message), this repo's own `README.md`
  (usage, screenshot, link to the package's docs).
- **Exit criteria:** README complete; keyboard-only pass through the editor,
  preset picker, and donate widget works end to end.

### Stage 5 — CI/CD & Vercel deployment

**Agent role:** Release Agent · depends on all prior stages

- GitHub Actions gate (lint/typecheck/build) on PRs into `dev`, `staging`,
  and `main`.
- Vercel project linked to the repo: automatic preview deployments per PR,
  production deployment on merge to `main`.
- **Exit criteria:** Opening a PR produces a Vercel preview URL; merging to
  `main` deploys to the production URL automatically.
