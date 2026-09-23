/** Reads a boolean flag persisted in `localStorage`, defaulting to `false`. */
export function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

/** Persists a boolean flag to `localStorage`. Silently no-ops if unavailable. */
export function writeFlag(key: string, value: boolean): void {
  try {
    window.localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* Non-fatal: the choice just won't survive a reload. */
  }
}
