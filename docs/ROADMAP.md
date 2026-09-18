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

## Open items

- No target dates yet.
- Production (`lvgl-simulator-demo.vercel.app`) still serves the
  pre-scaffold placeholder until `dev` is promoted through `staging` to
  `main` per the branching flow in `docs/PLAN.md` — that promotion is a
  separate, deliberate step, not part of either stage above.
