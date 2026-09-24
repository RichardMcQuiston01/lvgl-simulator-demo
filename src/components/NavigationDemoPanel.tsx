import { useNavigationDemo } from '../lib/useNavigationDemo';
import { Html2LvglBanner } from './Html2LvglBanner';

const CODE_SNIPPET = `const home = new Container({ width: 320, height: 240, padding: 12 });
const settings = new Container({ width: 320, height: 240, padding: 12 });

const openSettings = new Button({ width: 140, height: 32, text: 'Settings' });
const back = new Button({ width: 140, height: 32, text: 'Back' });
home.addChild(openSettings);
settings.addChild(back);

const navigator = createNavigator(simulator.screen, home, simulator.renderOnce);
openSettings.addEventListener('clicked', () => navigator.push(settings));
back.addEventListener('clicked', () => navigator.pop());`;

/** Left-hand pane: explains `createNavigator()` and shows the wiring behind the live demo. */
function HowItWorksPanel() {
  return (
    <section
      aria-label="How the navigation demo works"
      className="flex h-full min-h-0 flex-col gap-3 overflow-auto border-b border-slate-200 bg-slate-50 p-4 lg:w-1/2 lg:border-r lg:border-b-0 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-300">
        How it works
      </h2>

      <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">
            createNavigator()
          </code>{' '}
          mounts one view under a screen at a time and keeps a back-stack, so a "Back" button can
          return to whatever was showing before — added in{' '}
          <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">0.2.0</code>.
        </p>
        <p>
          Unlike the Scene Editor tab, this isn't backed by JSON: a button's{' '}
          <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">clicked</code>{' '}
          handler calling{' '}
          <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">
            navigator.push()
          </code>{' '}
          is live code, and the scene schema can't carry functions — so this demo is fixed rather
          than editable.
        </p>
        <p>
          Try it: <strong>Settings</strong> pushes a second screen, <strong>Advanced</strong> pushes
          a third (capped at <code>maxDepth: 2</code>), and each <strong>Back</strong> pops one
          level.
        </p>
      </div>

      <pre className="min-h-0 flex-1 overflow-auto rounded-md border border-slate-500 bg-white p-3 font-mono text-xs text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <code>{CODE_SNIPPET}</code>
      </pre>
    </section>
  );
}

/** Right-hand pane: the live, interactive `createNavigator()` canvas. */
function NavigationCanvasPanel() {
  const { containerRef } = useNavigationDemo();

  return (
    <section
      aria-label="Navigation demo preview"
      className="flex h-full min-h-0 flex-col gap-3 bg-white p-4 lg:w-1/2 dark:bg-slate-950"
    >
      <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-300">
        Live preview
      </h2>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        {/* Interactive, but — same as the Scene Editor's preview — the simulator
            paints raw pixels with no accessible content of its own, so this is
            labelled as a visual-only region rather than left to confuse
            assistive tech with an empty, mouse/touch-only interactive node. */}
        <div
          ref={containerRef}
          role="img"
          aria-label="Home, Settings, and Advanced screens with Settings/Advanced/Back buttons — visual and mouse/touch only, not screen-reader accessible"
          className="[&>canvas]:shadow-lg"
        />
      </div>

      <Html2LvglBanner />
    </section>
  );
}

/** "Navigation Demo" mode: a two-pane layout matching the Scene Editor's, minus the editor. */
export function NavigationDemoPanel() {
  return (
    <>
      <HowItWorksPanel />
      <NavigationCanvasPanel />
    </>
  );
}
