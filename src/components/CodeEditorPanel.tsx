import type { ChangeEvent } from 'react';

import type { ScenePreset } from '../lib/exampleScenes';

export interface CodeEditorPanelProps {
  readonly sceneText: string;
  readonly onSceneTextChange: (nextText: string) => void;
  readonly presets: readonly ScenePreset[];
  readonly selectedPresetId: string;
  readonly onSelectPreset: (presetId: string) => void;
  readonly error: string | null;
}

/** Left-hand pane: a preset picker and a plain-`<textarea>` JSON scene editor. */
export function CodeEditorPanel({
  sceneText,
  onSceneTextChange,
  presets,
  selectedPresetId,
  onSelectPreset,
  error,
}: CodeEditorPanelProps) {
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onSceneTextChange(event.target.value);
  };

  const handlePresetChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onSelectPreset(event.target.value);
  };

  return (
    <section
      aria-label="Scene editor"
      className="flex h-full min-h-0 flex-col gap-3 border-b border-slate-800 bg-slate-900 p-4 lg:w-1/2 lg:border-r lg:border-b-0"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Scene JSON</h2>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          Preset
          <select
            className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-200 focus:border-sky-500 focus:outline-none"
            value={selectedPresetId}
            onChange={handlePresetChange}
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <textarea
        aria-label="Scene JSON editor"
        aria-invalid={error !== null}
        aria-describedby={error !== null ? 'scene-editor-error' : undefined}
        className="min-h-0 flex-1 resize-none rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
        spellCheck={false}
        value={sceneText}
        onChange={handleTextareaChange}
      />

      <p
        id="scene-editor-error"
        role="alert"
        aria-live="polite"
        className="min-h-5 text-sm text-red-400"
      >
        {error ?? ''}
      </p>
    </section>
  );
}
