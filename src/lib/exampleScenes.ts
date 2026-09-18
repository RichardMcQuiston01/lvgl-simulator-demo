import type { Scene } from '@richardmcquiston01/lvgl-simulator';

/** A named preset shown in the picker, backing a hand-written `Scene` fixture. */
export interface ScenePreset {
  readonly id: string;
  readonly label: string;
  readonly scene: Scene;
}

const gettingStarted: Scene = {
  version: 1,
  width: 240,
  height: 140,
  padding: 16,
  layout: { type: 'flex', direction: 'column', rowGap: 12 },
  children: [
    { type: 'label', width: 200, height: 20, text: 'Getting started' },
    {
      type: 'container',
      width: 200,
      height: 36,
      layout: { type: 'flex', columnGap: 8 },
      children: [
        { type: 'button', width: 90, height: 32, text: 'OK', backgroundColor: '#2196f3' },
        { type: 'checkbox', width: 100, height: 20, text: 'Agree' },
      ],
    },
  ],
};

const switchAndSlider: Scene = {
  version: 1,
  width: 240,
  height: 120,
  padding: 16,
  layout: { type: 'flex', direction: 'column', rowGap: 16 },
  children: [
    { type: 'switch', width: 44, height: 24, checked: true },
    { type: 'slider', width: 200, height: 20, min: 0, max: 100, value: 60 },
  ],
};

const styledButtons: Scene = {
  version: 1,
  width: 240,
  height: 96,
  padding: 16,
  layout: { type: 'flex', columnGap: 12 },
  children: [
    { type: 'button', width: 90, height: 36, text: 'Default' },
    {
      type: 'button',
      width: 90,
      height: 36,
      text: 'Danger',
      style: {
        base: { bgColor: '#e53935' },
        states: { pressed: { bgColor: '#b71c1c' } },
      },
    },
  ],
};

const gridLayout: Scene = {
  version: 1,
  width: 240,
  height: 140,
  padding: 16,
  layout: { type: 'grid', columns: [96, 96], rows: [40, 40], columnGap: 8, rowGap: 8 },
  children: [
    { type: 'label', width: 96, height: 40, text: 'A', gridColumn: 0, gridRow: 0 },
    { type: 'label', width: 96, height: 40, text: 'B', gridColumn: 1, gridRow: 0 },
    { type: 'label', width: 96, height: 40, text: 'C', gridColumn: 0, gridRow: 1 },
    { type: 'label', width: 96, height: 40, text: 'D', gridColumn: 1, gridRow: 1 },
  ],
};

// The `disabled` flag only excludes a widget from pointer interaction — the
// library ships no default disabled *look* (see defaultTheme.disabledColor,
// which isn't wired to any widget's states automatically), so this preset
// supplies its own `style.states.disabled` override to actually show it,
// the same per-state-override mechanism the package README demonstrates
// for a custom pressed color.
const disabledControls: Scene = {
  version: 1,
  width: 240,
  height: 140,
  padding: 16,
  layout: { type: 'flex', direction: 'column', rowGap: 12 },
  children: [
    { type: 'label', width: 200, height: 20, text: 'Disabled state' },
    {
      type: 'button',
      width: 120,
      height: 32,
      text: 'Disabled',
      disabled: true,
      style: { base: {}, states: { disabled: { bgColor: '#e0e0e0', textColor: '#9e9e9e' } } },
    },
    {
      type: 'checkbox',
      width: 160,
      height: 20,
      text: 'Locked',
      checked: true,
      disabled: true,
      indicatorStyle: { base: {}, states: { checked: { bgColor: '#bdbdbd' } } },
    },
  ],
};

const fullGallery: Scene = {
  version: 1,
  width: 260,
  height: 220,
  padding: 16,
  layout: { type: 'flex', direction: 'column', rowGap: 10 },
  children: [
    { type: 'label', width: 220, height: 18, text: 'Widget gallery' },
    {
      type: 'container',
      width: 220,
      height: 32,
      layout: { type: 'flex', columnGap: 8 },
      children: [
        { type: 'button', width: 80, height: 32, text: 'OK' },
        { type: 'checkbox', width: 100, height: 20, text: 'Agree' },
      ],
    },
    {
      type: 'container',
      width: 220,
      height: 24,
      layout: { type: 'flex', columnGap: 12 },
      children: [
        { type: 'switch', width: 44, height: 24, checked: true },
        { type: 'slider', width: 140, height: 20, min: 0, max: 100, value: 40 },
      ],
    },
  ],
};

/** Presets shown in the picker, in display order. */
export const SCENE_PRESETS: readonly ScenePreset[] = [
  { id: 'getting-started', label: 'Getting started', scene: gettingStarted },
  { id: 'switch-and-slider', label: 'Switch & slider', scene: switchAndSlider },
  { id: 'styled-buttons', label: 'Styled buttons', scene: styledButtons },
  { id: 'grid-layout', label: 'Grid layout', scene: gridLayout },
  { id: 'disabled-controls', label: 'Disabled state', scene: disabledControls },
  { id: 'full-gallery', label: 'Full gallery', scene: fullGallery },
];

export const DEFAULT_PRESET_ID: string = SCENE_PRESETS[0]!.id;
