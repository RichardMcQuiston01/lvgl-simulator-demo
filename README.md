# LVGL Simulator Demo

## Overview

TypeScript based Single Page Application(SPA) demo for the
[`@richardmcquiston01/lvgl-simulator`](https://www.npmjs.com/package/@richardmcquiston01/lvgl-simulator)
package: a side-by-side JSON scene editor and live canvas preview, rendered
entirely in the browser via the published package — no server, no build step
at runtime.

See [`docs/PLAN.md`](./docs/PLAN.md) for the architecture rationale and the
multi-agent, multi-stage development plan, and
[`docs/ROADMAP.md`](./docs/ROADMAP.md) for current stage status.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 22
- npm (ships with Node)

### Installation

```bash
git clone https://github.com/RichardMcQuiston01/lvgl-simulator-demo.git
cd lvgl-simulator-demo
npm install
```

### Usage

```bash
npm run dev          # launch the Vite dev server
npm run build         # type-check and build the production bundle to dist/
npm run preview        # serve the production build locally
npm run lint            # ESLint
npm run typecheck        # tsc project-reference build (no emit)
npm run format             # Prettier check
```

### Examples

Edit the JSON in the left-hand editor — it's a
[`Scene`](https://github.com/RichardMcQuiston01/lvgl-simulator/blob/main/docs/SCENE_SCHEMA.md)
as consumed by the package's own `loadScreen()` — and the canvas on the right
updates live. The preset picker above the editor loads a few starting points
(buttons/checkboxes, a switch and slider, styled buttons, a grid layout).

```json
{
  "version": 1,
  "width": 240,
  "height": 140,
  "padding": 16,
  "layout": { "type": "flex", "direction": "column", "rowGap": 12 },
  "children": [
    { "type": "label", "width": 200, "height": 20, "text": "Getting started" },
    { "type": "button", "width": 90, "height": 32, "text": "OK" }
  ]
}
```

## Development workflow

- `dev` is the integration branch. All feature work happens on a
  `feature/<slug>` branch cut from `dev`, opened as a PR back into `dev`.
- Once `dev` is validated, it's promoted to `staging` via PR for testing,
  then `staging` to `main` via PR — merging to `main` deploys to production
  on Vercel.

See [`docs/PLAN.md`](./docs/PLAN.md) for the full stage-by-stage plan.

## Deployments

Hosted on [Vercel](https://vercel.com), linked to this repository — every
push gets its own preview deployment, and `main` is the production branch:

- **Production:** https://lvgl-simulator-demo.vercel.app (serves whatever is
  currently on `main`)
- **`dev` preview:** https://lvgl-simulator-demo-git-dev-richard-mcquistons-projects.vercel.app
- **`staging` preview:** https://lvgl-simulator-demo-git-staging-richard-mcquistons-projects.vercel.app

## License

Apache 2.0 — see [`LICENSE`](./LICENSE).

## Copyright

(c)2026 Richard McQuiston. All rights reserved.

## Buy Me a Coffee

If this app, code, or repository has helped you or someone you know, please consider donating. I appreciate any help to offset the costs of development and/or AI Credits.

[**Donate via Stripe**](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800), or scan:

[![Donate via Stripe](./donate.svg)](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800)
