import { useEffect, useRef, useState } from 'react';
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
   * so the mount effect below can depend on it.
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
 * simulator canvas inside the returned ref's element — mirroring the
 * package README's own `simulator.screen.addChild(loadScreen(scene))`
 * pattern. A parse or `loadScreen` failure is reported via `error` without
 * tearing down whatever last rendered successfully.
 */
export function useSimulatorPreview(sceneJsonText: string): SimulatorPreviewResult {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const simulatorRef = useRef<Simulator | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!container) {
      return;
    }

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
      container.replaceChildren();

      const simulator = createSimulator(container, {
        width: scene.width,
        height: scene.height,
      });
      simulator.screen.addChild(root);
      simulator.start();
      simulatorRef.current = simulator;
      setError(null);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [container, sceneJsonText]);

  // Unmount-only cleanup, separate from the per-keystroke effect above so a
  // debounced re-render mid-typing never tears down the live simulator.
  useEffect(() => {
    return () => {
      simulatorRef.current?.destroy();
      simulatorRef.current = null;
    };
  }, []);

  return { containerRef: setContainer, error };
}
