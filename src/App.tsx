import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CodeEditorPanel } from './components/CodeEditorPanel';
import { DonateCard } from './components/DonateCard';
import { HelpButton } from './components/HelpButton';
import { Html2LvglBanner } from './components/Html2LvglBanner';
import { PreviewPanel } from './components/PreviewPanel';
import { ThemeToggle } from './components/ThemeToggle';
import {
  DEFAULT_PRESET_ID,
  SCENE_PRESETS,
  findPreset,
  type ScenePreset,
} from './lib/exampleScenes';
import { decodeSceneFromUrl, encodeSceneForUrl } from './lib/shareLink';
import { useTheme } from './lib/theme';
import { useSimulatorPreview } from './lib/useSimulatorPreview';

const SHARED_PRESET_ID = 'shared-scene';
const STATUS_TIMEOUT_MS = 2500;

/** Reads a `#scene=<base64>` fragment left by "Share", if present and valid. */
function readSharedPresetFromLocation(): ScenePreset | null {
  const match = /^#scene=(.+)$/.exec(window.location.hash);
  if (!match) {
    return null;
  }
  try {
    const decoded = decodeSceneFromUrl(match[1]!);
    const scene = JSON.parse(decoded) as ScenePreset['scene'];
    return { id: SHARED_PRESET_ID, label: 'Shared scene (from link)', scene };
  } catch {
    return null;
  }
}

export function App() {
  const [theme, toggleTheme] = useTheme();

  const [sharedPreset] = useState<ScenePreset | null>(() => readSharedPresetFromLocation());
  const presets = useMemo<readonly ScenePreset[]>(
    () => (sharedPreset ? [...SCENE_PRESETS, sharedPreset] : SCENE_PRESETS),
    [sharedPreset],
  );

  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    sharedPreset?.id ?? DEFAULT_PRESET_ID,
  );
  const [sceneText, setSceneText] = useState<string>(() =>
    JSON.stringify(findPreset(presets, selectedPresetId).scene, null, 2),
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const statusTimeoutRef = useRef<number | null>(null);

  // Deliberately left as-is (not cleared): the `#scene=` fragment doubles
  // as a permalink, so reloading the page reproduces the same scene.
  // (An earlier version cleared it in an effect keyed on `sharedPreset` —
  // that raced React StrictMode's dev-only mount→unmount→remount cycle:
  // the first mount's effect cleared the hash before the second mount's
  // `useState` initializer above re-read it, so it always came back
  // empty. Reading is safe to repeat; clearing as a side effect isn't.)

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current !== null) {
        window.clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const { containerRef, error } = useSimulatorPreview(sceneText);

  const showStatus = useCallback((message: string): void => {
    setStatusMessage(message);
    if (statusTimeoutRef.current !== null) {
      window.clearTimeout(statusTimeoutRef.current);
    }
    statusTimeoutRef.current = window.setTimeout(() => {
      setStatusMessage(null);
    }, STATUS_TIMEOUT_MS);
  }, []);

  const handleSelectPreset = useCallback(
    (presetId: string): void => {
      setSelectedPresetId(presetId);
      setSceneText(JSON.stringify(findPreset(presets, presetId).scene, null, 2));
    },
    [presets],
  );

  const handleFormat = useCallback((): void => {
    try {
      const parsed: unknown = JSON.parse(sceneText);
      setSceneText(JSON.stringify(parsed, null, 2));
      showStatus('Formatted');
    } catch {
      showStatus("Can't format — fix the JSON error first");
    }
  }, [sceneText, showStatus]);

  const handleCopy = useCallback((): void => {
    navigator.clipboard.writeText(sceneText).then(
      () => showStatus('Copied to clipboard'),
      () => showStatus('Copy failed'),
    );
  }, [sceneText, showStatus]);

  const handleReset = useCallback((): void => {
    handleSelectPreset(selectedPresetId);
    showStatus('Reset to preset');
  }, [handleSelectPreset, selectedPresetId, showStatus]);

  const handleShare = useCallback((): void => {
    const fragment = `#scene=${encodeSceneForUrl(sceneText)}`;
    const url = `${window.location.origin}${window.location.pathname}${fragment}`;
    navigator.clipboard.writeText(url).then(
      () => {
        window.history.replaceState(null, '', fragment);
        showStatus('Share link copied');
      },
      () => showStatus('Copy failed'),
    );
  }, [sceneText, showStatus]);

  return (
    <div className="flex h-screen min-h-0 flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Html2LvglBanner />

      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div>
          <h1 className="text-lg font-semibold">LVGL Simulator Demo</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Edit the scene JSON on the left; the canvas on the right updates live via{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">
              @richardmcquiston01/lvgl-simulator
            </code>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <HelpButton />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-auto lg:flex-row">
        <CodeEditorPanel
          sceneText={sceneText}
          onSceneTextChange={setSceneText}
          presets={presets}
          selectedPresetId={selectedPresetId}
          onSelectPreset={handleSelectPreset}
          error={error}
          statusMessage={statusMessage}
          onFormat={handleFormat}
          onCopy={handleCopy}
          onReset={handleReset}
          onShare={handleShare}
        />
        <PreviewPanel containerRef={containerRef} />
      </main>

      <DonateCard theme={theme} />
    </div>
  );
}
