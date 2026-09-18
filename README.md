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

## Screenshot

![Side-by-side scene editor and live canvas preview, showing the "Full gallery" preset](./docs/images/screenshot.png)

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
updates live. The preset picker above the editor loads a few starting points:
buttons/checkboxes, a switch and slider, styled buttons, a grid layout, a
disabled-state example (per-state style overrides — `disabled` alone has no
default look), and a combined widget gallery.

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

A toolbar above the editor offers **Format** (re-indent), **Copy**, **Reset**
(reload the selected preset), and **Share** (copies a link that reopens this
exact scene). A **?** button in the header opens an in-app help dialog
covering all of this; a sun/moon button next to it toggles light/dark theme.

This editor works on scene JSON directly — it doesn't convert HTML. To
convert an existing HTML page into that format instead of hand-writing it,
see [html2lvgl.com](https://html2lvgl.com/) and its web app,
[html2lvgl.app](https://www.html2lvgl.app/).

## Accessibility

Every control — editor, toolbar, preset picker, theme toggle, help dialog,
and donate widget — is keyboard-reachable with a visible focus state and a
proper accessible name; the help dialog implements the WAI-ARIA dialog
pattern (focus moves in, Tab is trapped, Escape/backdrop closes it, focus
returns to the trigger). The live preview itself is a raw `<canvas>` the
underlying package paints pixels to directly — it has no accessible content
of its own, so its container is labelled as a visual-only region
(`role="img"` + a descriptive `aria-label`) rather than left to confuse
assistive tech with an empty name. Inspect a scene's actual structure via
the JSON editor, which is the source of truth.

Verified: WCAG AA text contrast (4.5:1) and non-text/UI-component contrast
(3:1) for every color pair in both themes; touch targets meet the 24×24px
minimum (WCAG 2.5.8) at mobile viewport sizes; landmarks, accessible names,
and heading hierarchy checked with a Playwright accessibility-tree pass.

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
