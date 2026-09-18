import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'lvgl-demo-theme';

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function prefersLight(): boolean {
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

function initialTheme(): Theme {
  return readStoredTheme() ?? (prefersLight() ? 'light' : 'dark');
}

/**
 * The app's own explicit dark/light choice (not the donate widget's —
 * that one deliberately stays opt-in per the project's demo-donate-block
 * conventions). Persisted, and applied via a `dark` class on `<html>`
 * (see `@custom-variant dark` in `src/index.css`) so Tailwind's `dark:`
 * variant is choice-driven rather than tied to the OS preference at
 * every render.
 */
export function useTheme(): readonly [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Non-fatal: the choice just won't survive a reload. */
    }
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggleTheme] as const;
}
