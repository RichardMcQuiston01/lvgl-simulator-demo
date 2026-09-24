import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createSimulator,
  loadScreen,
  type Container,
  type Scene,
  type Simulator,
} from '@richardmcquiston01/lvgl-simulator';

const DEBOUNCE_MS = 300;

export interface SimulatorPreviewResult {
  /**
   * A callback ref, not a `RefObject` — the hook needs to know exactly when
   * the container element is (re)attached (e.g. `PreviewPanel` unmounting
   * and remounting as the app switches modes), not just its latest value,
   * so the reattach effect below can depend on it.
   */
  readonly containerRef: (node: HTMLDivElement | null) => void;
  /** Descriptive parse/render error for the current text, or `null` when it rendered cleanly. */
  readonly error: string | null;
}

function describeError(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause);
}

function parseScene(sceneJsonText: string): Scene {
  let parsed: unknown;
  try {
    parsed = JSON.parse(sceneJsonText);
  } catch (cause) {
    throw new Error(`Invalid JSON: ${describeError(cause)}`, { cause });
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Scene must be a JSON object (see docs/SCENE_SCHEMA.md).');
  }
  return parsed as Scene;
}

/**
 * Debounces `sceneJsonText`, parses it as a `Scene`, and mounts it into a
 * simulator canvas — mirroring the package README's own
 * `simulator.screen.addChild(loadScreen(scene))` pattern. A parse or
 * `loadScreen` failure is reported via `error` without tearing down
 * whatever last rendered successfully.
 *
 * Building the simulator (on text changes) and attaching its canvas to the
 * returned ref's element are deliberately separate effects: the container
 * can be replaced independently of the text (e.g. `PreviewPanel` unmounting
 * and remounting as the app switches modes), and reattaching must not
 * depend on the current text parsing successfully — otherwise switching
 * away and back while the editor shows a parse error would leave the new
 * container permanently blank instead of showing the last good render.
 */
export function useSimulatorPreview(sceneJsonText: string): SimulatorPreviewResult {
  // Two views of the same element: `latestContainer` is read inside the
  // debounced timeout below, where a value captured by a `[sceneJsonText]`
  // effect's closure would otherwise go stale the moment a container swap
  // happens without `sceneJsonText` also changing (exactly the case on a
  // mode-switch remount) — a ref always reflects whichever container is
  // current at the moment it's actually read, not whenever this effect's
  // closure happened to be created. `container` (state) exists only to
  // give the reattach effect below something to depend on.
  const latestContainer = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const simulatorRef = useRef<Simulator | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    latestContainer.current = node;
    setContainer(node);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      let scene: Scene;
      let root: Container;
      try {
        scene = parseScene(sceneJsonText);
        root = loadScreen(scene);
      } catch (cause) {
        setError(describeError(cause));
        return;
      }

      simulatorRef.current?.destroy();

      // Built against a detached element — attached below via the always-
      // current `latestContainer` ref, and reattached by the effect below
      // if the mounted container element changes afterward.
      const simulator = createSimulator(document.createElement('div'), {
        width: scene.width,
        height: scene.height,
      });
      simulator.screen.addChild(root);
      simulator.start();
      simulatorRef.current = simulator;
      setError(null);

      latestContainer.current?.replaceChildren(simulator.canvas);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [sceneJsonText]);

  // Reattaches the current simulator's canvas whenever the container
  // element changes, independent of whether `sceneJsonText` currently
  // parses — so a container swap always shows the last successful render.
  useEffect(() => {
    if (container && simulatorRef.current) {
      container.replaceChildren(simulatorRef.current.canvas);
    }
  }, [container]);

  // Unmount-only cleanup, separate from the effects above so a debounced
  // re-render mid-typing (or a container swap) never tears down the live
  // simulator.
  useEffect(() => {
    return () => {
      simulatorRef.current?.destroy();
      simulatorRef.current = null;
    };
  }, []);

  return { containerRef, error };
}
