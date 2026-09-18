import type { Ref } from 'react';

export interface PreviewPanelProps {
  readonly containerRef: Ref<HTMLDivElement>;
}

/** Right-hand pane: hosts the simulator's `<canvas>`, mounted by `useSimulatorPreview`. */
export function PreviewPanel({ containerRef }: PreviewPanelProps) {
  return (
    <section
      aria-label="Live preview"
      className="flex h-full min-h-0 flex-col gap-3 bg-white p-4 lg:w-1/2 dark:bg-slate-950"
    >
      <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-300">
        Live preview
      </h2>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        {/* The simulator paints raw pixels to a `<canvas>` with no accessible
            content of its own, so this is labelled as a visual-only region
            rather than left to confuse assistive tech with an empty name. */}
        <div
          ref={containerRef}
          role="img"
          aria-label="Rendered scene preview (visual only — the canvas itself isn't screen-reader accessible; use the JSON editor to inspect the scene)"
          className="[&>canvas]:shadow-lg"
        />
      </div>
    </section>
  );
}
