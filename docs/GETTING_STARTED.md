# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org) >= 22
- npm (ships with Node)

## Installation

```bash
git clone https://github.com/RichardMcQuiston01/lvgl-simulator-demo.git
cd lvgl-simulator-demo
npm install
```

## Usage

```bash
npm run dev          # launch the Vite dev server
npm run build         # type-check and build the production bundle to dist/
npm run preview        # serve the production build locally
npm run lint            # ESLint
npm run typecheck        # tsc project-reference build (no emit)
npm run format             # Prettier check
```

## Examples

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

## Navigation demo

The **Navigation Demo** toggle in the header switches to a fixed,
interactive demo of
[`createNavigator()`](https://github.com/RichardMcQuiston01/lvgl-simulator/blob/main/docs/GETTING_STARTED.md#navigation-multi-view-uis) —
the package's multi-screen navigation API (added in `0.2.0`). Click
**Settings** to push a second screen, **Advanced** to push a third (capped
at `maxDepth: 2`), and **Back** to pop one level. Unlike the Scene Editor,
this mode isn't backed by JSON and isn't editable: a navigator's
`push`/`pop` calls are wired up as live event-listener code, which the
scene schema has no way to express. The left-hand panel explains the API
and shows the actual wiring behind the demo.
