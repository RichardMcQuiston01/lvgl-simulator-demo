export type DemoMode = 'editor' | 'navigation';

export interface DemoModeToggleProps {
  readonly mode: DemoMode;
  readonly onChange: (mode: DemoMode) => void;
}

const BASE_CLASSES =
  'rounded-md border px-3 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none';
const ACTIVE_CLASSES = 'border-sky-600 bg-sky-600 text-white';
const INACTIVE_CLASSES =
  'border-slate-500 bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';

/** Header toggle between the JSON Scene Editor and the fixed Navigation Demo. */
export function DemoModeToggle({ mode, onChange }: DemoModeToggleProps) {
  return (
    <div role="group" aria-label="Demo mode" className="flex items-center gap-1">
      <button
        type="button"
        aria-pressed={mode === 'editor'}
        onClick={() => onChange('editor')}
        className={`${BASE_CLASSES} ${mode === 'editor' ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
      >
        Scene Editor
      </button>
      <button
        type="button"
        aria-pressed={mode === 'navigation'}
        onClick={() => onChange('navigation')}
        className={`${BASE_CLASSES} ${mode === 'navigation' ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
      >
        Navigation Demo
      </button>
    </div>
  );
}
