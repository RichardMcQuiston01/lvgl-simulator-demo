import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// border-slate-500 (not the lighter slate-300/700 used for decorative
// dividers) is what actually clears WCAG 1.4.11's 3:1 non-text contrast
// requirement for this control's own boundary — see CodeEditorPanel.tsx.
const ICON_BUTTON_CLASSES =
  'flex h-9 w-9 items-center justify-center rounded-md border border-slate-500 text-slate-600 ' +
  'hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ' +
  'dark:text-slate-300 dark:hover:bg-slate-800';

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.5 2.3c-.9.5-1 1-1 1.9" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  );
}

/**
 * Header "?" button that opens an accessible dialog documenting the demo:
 * what it does, the preset list, the editor toolbar, keyboard shortcuts,
 * and the canvas's accessibility scope. Implements the WAI-ARIA dialog
 * pattern by hand (focus moves in, Tab/Shift+Tab are trapped, Escape and
 * a backdrop click close it, focus returns to this button on close) since
 * the app has no dialog library dependency.
 */
export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables?.[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialog) {
        return;
      }
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, close]);

  const handleBackdropClick = useCallback((): void => {
    close();
  }, [close]);

  const stopPropagation = useCallback((event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label="Help and documentation"
        className={ICON_BUTTON_CLASSES}
      >
        <HelpIcon />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={handleBackdropClick}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={stopPropagation}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 text-slate-900 shadow-xl focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-lg font-semibold">
                About this demo
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close help"
                className="rounded-md p-1 text-xl leading-none text-slate-500 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                This is a live scene editor for{' '}
                <a
                  href="https://www.npmjs.com/package/@richardmcquiston01/lvgl-simulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 underline dark:text-sky-400"
                >
                  @richardmcquiston01/lvgl-simulator
                </a>
                . Edit the JSON on the left and the canvas on the right updates as you type.
              </p>

              <section>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Presets</h3>
                <p>
                  The dropdown above the editor loads a starting scene — buttons/checkboxes, a
                  switch and slider, styled buttons, a grid layout, a disabled-state example, and a
                  combined widget gallery.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Editor toolbar</h3>
                <ul className="list-disc space-y-0.5 pl-5">
                  <li>
                    <strong>Format</strong> re-indents the current JSON.
                  </li>
                  <li>
                    <strong>Copy</strong> copies the current JSON to your clipboard.
                  </li>
                  <li>
                    <strong>Reset</strong> discards edits and reloads the selected preset.
                  </li>
                  <li>
                    <strong>Share</strong> copies a link that reopens this exact scene for whoever
                    you send it to.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Keyboard</h3>
                <p>
                  Every control is reachable with Tab, with a visible focus ring. This dialog traps
                  Tab while open and closes on <kbd className="rounded border px-1">Esc</kbd> or a
                  click outside it.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Accessibility</h3>
                <p>
                  The preview is a raw <code>&lt;canvas&gt;</code> — it has no accessible content of
                  its own, so it&apos;s labelled as visual-only. Inspect a scene&apos;s actual
                  structure via the JSON editor.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Converting from HTML
                </h3>
                <p>
                  This editor works on scene JSON directly. To convert an existing HTML page into
                  that format instead of hand-writing it, see{' '}
                  <a
                    href="https://html2lvgl.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline dark:text-sky-400"
                  >
                    html2lvgl.com
                  </a>{' '}
                  and its web app,{' '}
                  <a
                    href="https://www.html2lvgl.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline dark:text-sky-400"
                  >
                    html2lvgl.app
                  </a>
                  .
                </p>
              </section>

              <p>
                Full scene format:{' '}
                <a
                  href="https://github.com/RichardMcQuiston01/lvgl-simulator/blob/main/docs/SCENE_SCHEMA.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 underline dark:text-sky-400"
                >
                  SCENE_SCHEMA.md
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
