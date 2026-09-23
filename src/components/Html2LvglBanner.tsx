import { useCallback, useState } from 'react';

import { readFlag, writeFlag } from '../lib/persistentFlag';

const DISMISSED_KEY = 'html2lvgl-banner-dismissed';

/**
 * Dismissible banner promoting html2lvgl.com — a tool that converts an
 * existing HTML page into the scene JSON this demo edits. Dismissal
 * persists across reloads via `localStorage`.
 */
export function Html2LvglBanner() {
  const [isDismissed, setIsDismissed] = useState<boolean>(() => readFlag(DISMISSED_KEY));

  const handleDismiss = useCallback((): void => {
    setIsDismissed(true);
    writeFlag(DISMISSED_KEY, true);
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="html2lvgl promotion"
      className="flex items-center justify-between gap-3 border-b border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-100"
    >
      <p>
        Have an HTML page you want as an LVGL scene? Convert it automatically with{' '}
        <a
          href="https://html2lvgl.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-sky-700 dark:hover:text-sky-300"
        >
          html2lvgl.com
        </a>
        .
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss html2lvgl banner"
        className="shrink-0 rounded-md p-1 text-lg leading-none text-sky-700 hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-sky-300 dark:hover:bg-sky-900"
      >
        &times;
      </button>
    </div>
  );
}
