import type { ChangeEvent } from 'react';

import type { ScenePreset } from '../lib/exampleScenes';

export interface CodeEditorPanelProps {
  readonly sceneText: string;
  readonly onSceneTextChange: (nextText: string) => void;
  readonly presets: readonly ScenePreset[];
  readonly selectedPresetId: string;
  readonly onSelectPreset: (presetId: string) => void;
  readonly error: string | null;
  readonly statusMessage: string | null;
  readonly onFormat: () => void;
  readonly onCopy: () => void;
  readonly onReset: () => void;
  readonly onShare: () => void;
}

// Interactive-control borders use slate-500 in both themes (rather than
// the lighter slate-300/700 used for merely decorative dividers) — that's
// the color WCAG 1.4.11 (non-text contrast) actually requires for a UI
// component's own boundary: it's =>3:1 against every background these
// controls sit on (white/slate-50 in light, slate-800/950 in dark),
// verified in /tmp/contrast-check.js during the accessibility pass.
const TOOLBAR_BUTTON_CLASSES =
  'rounded-md border border-slate-500 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 ' +
  'hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ' +
  'dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';

/** Left-hand pane: preset picker, a toolbar, and a plain-`<textarea>` JSON scene editor. */
export function CodeEditorPanel({
  sceneText,
  onSceneTextChange,
  presets,
  selectedPresetId,
  onSelectPreset,
  error,
  statusMessage,
  onFormat,
  onCopy,
  onReset,
  onShare,
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
      className="flex h-full min-h-0 flex-col gap-3 border-b border-slate-200 bg-slate-50 p-4 lg:w-1/2 lg:border-r lg:border-b-0 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-300">
          Scene JSON
        </h2>
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          Preset
          <select
            className="rounded-md border border-slate-500 bg-white px-2 py-1 text-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-slate-800 dark:text-slate-200"
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

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={TOOLBAR_BUTTON_CLASSES} onClick={onFormat}>
          Format
        </button>
        <button type="button" className={TOOLBAR_BUTTON_CLASSES} onClick={onCopy}>
          Copy
        </button>
        <button type="button" className={TOOLBAR_BUTTON_CLASSES} onClick={onReset}>
          Reset
        </button>
        <button type="button" className={TOOLBAR_BUTTON_CLASSES} onClick={onShare}>
          Share
        </button>
        <span
          role="status"
          aria-live="polite"
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          {statusMessage ?? ''}
        </span>
      </div>

      <textarea
        aria-label="Scene JSON editor"
        aria-invalid={error !== null}
        aria-describedby={error !== null ? 'scene-editor-error' : undefined}
        className="min-h-0 flex-1 resize-none rounded-md border border-slate-500 bg-white p-3 font-mono text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-slate-950 dark:text-slate-100"
        spellCheck={false}
        value={sceneText}
        onChange={handleTextareaChange}
      />

      {/* `role="alert"` alone is an implicit assertive live region — adding
          `aria-live` too would just duplicate the announcement. */}
      <p
        id="scene-editor-error"
        role="alert"
        className="min-h-5 text-sm text-red-600 dark:text-red-400"
      >
        {error ?? ''}
      </p>
    </section>
  );
}
