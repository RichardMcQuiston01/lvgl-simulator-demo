import type { Theme } from '../lib/theme';

export interface ThemeToggleProps {
  readonly theme: Theme;
  readonly onToggle: () => void;
}

const BUTTON_CLASSES =
  'flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 ' +
  'hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ' +
  'dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800';

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4" y1="12" x2="2" y2="12" />
      <line x1="22" y1="12" x2="20" y2="12" />
      <line x1="5" y1="5" x2="6.5" y2="6.5" />
      <line x1="17.5" y1="17.5" x2="19" y2="19" />
      <line x1="5" y1="19" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="19" y2="5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <mask id="themeToggleMoonMask">
        <rect width="24" height="24" fill="white" />
        <circle cx="15" cy="9" r="7" fill="black" />
      </mask>
      <circle cx="12" cy="12" r="9" fill="currentColor" mask="url(#themeToggleMoonMask)" />
    </svg>
  );
}

/** Explicit light/dark toggle for the app shell — see `src/lib/theme.ts`. */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'dark'}
      className={BUTTON_CLASSES}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
