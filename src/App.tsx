import { useMemo, useState } from 'react';

import { CodeEditorPanel } from './components/CodeEditorPanel';
import { DonateCard } from './components/DonateCard';
import { PreviewPanel } from './components/PreviewPanel';
import { DEFAULT_PRESET_ID, SCENE_PRESETS } from './lib/exampleScenes';
import { useSimulatorPreview } from './lib/useSimulatorPreview';

function findPresetOrDefault(presetId: string) {
  return SCENE_PRESETS.find((preset) => preset.id === presetId) ?? SCENE_PRESETS[0]!;
}

export function App() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEFAULT_PRESET_ID);
  const [sceneText, setSceneText] = useState<string>(() =>
    JSON.stringify(findPresetOrDefault(DEFAULT_PRESET_ID).scene, null, 2),
  );

  const { containerRef, error } = useSimulatorPreview(sceneText);

  const presets = useMemo(() => SCENE_PRESETS, []);

  const handleSelectPreset = (presetId: string): void => {
    setSelectedPresetId(presetId);
    setSceneText(JSON.stringify(findPresetOrDefault(presetId).scene, null, 2));
  };

  return (
    <div className="flex h-screen min-h-0 flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-3">
        <h1 className="text-lg font-semibold">LVGL Simulator Demo</h1>
        <p className="text-sm text-slate-400">
          Edit the scene JSON on the left; the canvas on the right updates live via{' '}
          <code className="rounded bg-slate-800 px-1 py-0.5">
            @richardmcquiston01/lvgl-simulator
          </code>
          .
        </p>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-auto lg:flex-row">
        <CodeEditorPanel
          sceneText={sceneText}
          onSceneTextChange={setSceneText}
          presets={presets}
          selectedPresetId={selectedPresetId}
          onSelectPreset={handleSelectPreset}
          error={error}
        />
        <PreviewPanel containerRef={containerRef} />
      </main>

      <DonateCard />
    </div>
  );
}
