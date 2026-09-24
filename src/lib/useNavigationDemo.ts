import { useEffect, useRef } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Label,
  Switch,
  createNavigator,
  createSimulator,
  type Simulator,
} from '@richardmcquiston01/lvgl-simulator';

const WIDTH = 320;
const HEIGHT = 240;
const PADDING = 12;
const ROW_GAP = 12;
const CONTENT_WIDTH = WIDTH - PADDING * 2;

export interface NavigationDemoResult {
  readonly containerRef: React.RefObject<HTMLDivElement | null>;
}

function createView(): Container {
  return new Container({
    width: WIDTH,
    height: HEIGHT,
    padding: PADDING,
    layout: { type: 'flex', direction: 'column', rowGap: ROW_GAP, crossAlign: 'start' },
  });
}

function createRow(rowHeight: number): Container {
  return new Container({
    width: CONTENT_WIDTH,
    height: rowHeight,
    layout: { type: 'flex', direction: 'row', columnGap: 12, crossAlign: 'center' },
  });
}

/**
 * Builds three views wired together with `createNavigator()` — Home →
 * Settings → Advanced, capped at `maxDepth: 2` — and mounts them into
 * `container`. Mirrors the pattern shown in the "How it works" panel next
 * to this canvas, and in `@richardmcquiston01/lvgl-simulator`'s own
 * `playground/`.
 */
function buildDemo(container: HTMLDivElement): Simulator {
  const simulator = createSimulator(container, { width: WIDTH, height: HEIGHT });

  const homeView = createView();
  const settingsButton = new Button({ width: 140, height: 32, text: 'Settings' });
  homeView.addChild(new Label({ width: CONTENT_WIDTH, height: 20, text: 'Home' }));
  homeView.addChild(
    new Label({ width: CONTENT_WIDTH, height: 40, text: 'Tap Settings to push a new screen.' }),
  );
  homeView.addChild(settingsButton);

  const settingsView = createView();
  const darkModeLabel = new Label({ width: 200, height: 20, text: 'Dark mode: off' });
  const darkModeSwitch = new Switch({ width: 44, height: 24 });
  darkModeSwitch.addEventListener('valueChanged', () => {
    darkModeLabel.text = `Dark mode: ${darkModeSwitch.checked ? 'on' : 'off'}`;
  });
  const darkModeRow = createRow(24);
  darkModeRow.addChild(darkModeSwitch);
  darkModeRow.addChild(darkModeLabel);
  const advancedButton = new Button({ width: 140, height: 32, text: 'Advanced' });
  const settingsBackButton = new Button({ width: 140, height: 32, text: 'Back' });
  settingsView.addChild(new Label({ width: CONTENT_WIDTH, height: 20, text: 'Settings' }));
  settingsView.addChild(darkModeRow);
  settingsView.addChild(advancedButton);
  settingsView.addChild(settingsBackButton);

  const advancedView = createView();
  const debugLoggingCheckbox = new Checkbox({ width: 200, height: 20, text: 'Debug logging' });
  const advancedBackButton = new Button({ width: 140, height: 32, text: 'Back' });
  advancedView.addChild(new Label({ width: CONTENT_WIDTH, height: 20, text: 'Advanced' }));
  advancedView.addChild(
    new Label({ width: CONTENT_WIDTH, height: 20, text: 'Depth 2 — as deep as this demo goes.' }),
  );
  advancedView.addChild(debugLoggingCheckbox);
  advancedView.addChild(advancedBackButton);

  const navigator = createNavigator(simulator.screen, homeView, simulator.renderOnce, {
    maxDepth: 2,
  });
  settingsButton.addEventListener('clicked', () => navigator.push(settingsView));
  advancedButton.addEventListener('clicked', () => navigator.push(advancedView));
  settingsBackButton.addEventListener('clicked', () => navigator.pop());
  advancedBackButton.addEventListener('clicked', () => navigator.pop());

  simulator.renderOnce();
  return simulator;
}

/**
 * Mounts the Home/Settings/Advanced `createNavigator()` demo into the
 * returned ref's element on mount, and tears it down on unmount. Unlike
 * `useSimulatorPreview`, there's no JSON text to react to — navigation
 * isn't expressible in the scene schema (a button's `clicked` handler
 * calling `navigator.push()` is live code, which JSON can't carry), so
 * this demo is fixed rather than editable.
 */
export function useNavigationDemo(): NavigationDemoResult {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.replaceChildren();
    const simulator = buildDemo(container);

    return () => {
      simulator.destroy();
    };
  }, []);

  return { containerRef };
}
