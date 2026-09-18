import type { Ref } from 'react';

export interface PreviewPanelProps {
  readonly containerRef: Ref<HTMLDivElement>;
}

/** Right-hand pane: hosts the simulator's `<canvas>`, mounted by `useSimulatorPreview`. */
export function PreviewPanel({ containerRef }: PreviewPanelProps) {
  return (
    <section
      aria-label="Live preview"
      className="flex h-full min-h-0 flex-col gap-3 bg-slate-950 p-4 lg:w-1/2"
    >
      <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Live preview</h2>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-md border border-slate-800 bg-slate-900">
        <div ref={containerRef} className="[&>canvas]:shadow-lg" />
      </div>
    </section>
  );
}
