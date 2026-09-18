# ROADMAP

Ordered by dependency, not by date. Mirrors the stage numbering in
`docs/PLAN.md`; update the status line as each stage completes.

## Stage 0: Scaffolding — done

- [x] Vite + React + TypeScript project, Tailwind CSS, ESLint + Prettier
- [x] `@richardmcquiston01/lvgl-simulator` added as a dependency
- [x] `LICENSE` populated, `.gitignore` added
- [x] CI workflow: install, lint, typecheck, build

## Stage 1: Editor/preview layout — done

- [x] Two-pane layout component (editor left, preview right)
- [x] Responsive stack below the layout breakpoint (preview below editor)

## Stage 2: Live simulator integration — done

- [x] Debounced JSON → `loadScreen()` → `createSimulator()` wiring
- [x] Inline error display that preserves the last valid render
- [x] Seeded default scene + preset dropdown

## Stage 3: Floating donate widget — done

- [x] Bottom-right card (QR + Stripe link)
- [x] Close control (persisted)
- [x] Minimize control (persisted, independent of close)

## Stage 4: Polish, examples, docs — done

- [x] Expanded preset gallery (disabled-state example, combined widget
      gallery, on top of the original four)
- [x] Accessibility pass — visible focus rings on every interactive control,
      the error message uses `role="alert"` correctly (no redundant
      `aria-live`), the preview canvas's container is labelled as a
      visual-only region (`role="img"` + descriptive `aria-label`) instead
      of exposing an unlabelled/empty node, and a keyboard-only tab pass
      (preset picker → editor → donate controls) was verified end to end
      with Playwright
- [x] Repo `README.md` finished — usage, a real screenshot
      (`docs/images/screenshot.png`), and an Accessibility section

## Stage 5: CI/CD & Vercel deployment — done

- [x] GitHub Actions gate on PRs into `dev`/`staging`/`main` (`ci.yml`, with
      a `concurrency` group so a new push cancels a superseded run)
- [x] Vercel project linked to the repo (was already connected via GitHub
      import) — confirmed via the Vercel API that a push to `dev` produced
      a successful preview deployment (`readyState: READY`) at
      `lvgl-simulator-demo-git-dev-*.vercel.app`, and that `main` already
      has a production deployment slot at `lvgl-simulator-demo.vercel.app`
      that will pick up the app once `main` is promoted
- [x] `.gitignore` covers the local Vercel CLI's `.vercel/` link file
- [x] `package.json` `engines.node` documents the minimum Node version
- [x] README `Deployments` section links the live preview/production URLs

## Stage 4 follow-ups — done

Requested after Stage 4 shipped; not part of the original stage scope.

- [x] Help button opening an accessible dialog (WAI-ARIA pattern, focus
      trap, Escape/backdrop close) documenting the demo, presets, toolbar,
      keyboard shortcuts, and accessibility scope — plus a "Converting
      from HTML" section linking [html2lvgl.com](https://html2lvgl.com/)
      and [html2lvgl.app](https://www.html2lvgl.app/) for anyone who wants
      to start from HTML instead of hand-writing scene JSON
- [x] Editor toolbar: Format, Copy, Reset, and Share (encodes the scene
      into a `#scene=` URL fragment; loaded back as a synthetic preset)
- [x] Explicit light/dark theme toggle (class-based, persisted,
      anti-flash inline script), synced to the donate widget's own
      opt-in light variant
- [x] Deeper accessibility audit: WCAG AA text contrast (4.5:1) and
      non-text/UI-component contrast (3:1) verified programmatically for
      every color pair in both themes (fixed one failing light link
      color and bumped interactive-control borders to a passing value);
      mobile/touch pass at iPhone viewport size (fixed one donate-link
      target under the 24×24px WCAG 2.5.8 minimum); landmarks/labels/
      heading-hierarchy pass via Playwright's accessibility tree
- [x] Custom favicon (replacing the default Vite icon) and OG/Twitter
      social preview meta tags

## Open items

- No target dates yet.
- Production (`lvgl-simulator-demo.vercel.app`) now serves the real app —
  the `dev` → `staging` → `main` promotion (PRs #5, #6) completed after
  Stage 5 shipped.
