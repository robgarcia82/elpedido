import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

// ── Icon (Search) ─────────────────────────────────────────────
const SearchIcon = ({ size = 20, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M9.8 9.8C10.73 8.87 11.2 7.73 11.2 6.4 11.2 5.07 10.73 3.93 9.8 3 8.87 2.07 7.73 1.6 6.4 1.6 5.07 1.6 3.93 2.07 3 3 2.07 3.93 1.6 5.07 1.6 6.4 1.6 7.73 2.07 8.87 3 9.8 3.93 10.73 5.07 11.2 6.4 11.2 7.73 11.2 8.87 10.73 9.8 9.8ZM6.4 12.8C4.61 12.8 3.1 12.18 1.86 10.94.62 9.7 0 8.19 0 6.4 0 4.61.62 3.1 1.86 1.86 3.1.62 4.61 0 6.4 0 8.19 0 9.7.62 10.94 1.86 12.18 3.1 12.8 4.61 12.8 6.4 12.8 7.15 12.68 7.85 12.45 8.51 12.22 9.17 11.89 9.77 11.46 10.32L16 14.88 14.88 16 10.32 11.46C9.77 11.89 9.17 12.22 8.51 12.45 7.85 12.68 7.15 12.8 6.4 12.8Z"/>
  </svg>
);

// ── Token config — mirrors Figma DS node 1:817 exactly ────────
//
// Variants: Primary | Secondary          (no Ghost)
// States:   Default | Pressed | Disabled (no Loading)
// Sizes:    High (px=20) | Medium (h=48, w=158) | Small (h=32, w=123)
//
// Secondary Default bg = rgba(161,161,161,0.25) fill (button/secondary-border token as fill — no CSS border)
// Secondary Disabled High/Medium = #373737 (palette/gray-700), opacity 40%
// Secondary Disabled Small       = rgba(161,161,161,0.25) (button/secondary-border), opacity 40%

const SECONDARY_BORDER_BG = 'rgba(161,161,161,0.25)'; // button/secondary-border token as bg fill

const SIZES = {
  high:   { h: 56,  px: 20, fontSize: 18, lineHeight: '24px', iconSize: 24, fixedWidth: undefined },
  medium: { h: 48,  px: 16, fontSize: 16, lineHeight: '24px', iconSize: 20, fixedWidth: 158       },
  small:  { h: 32,  px: 12, fontSize: 12, lineHeight: '16px', iconSize: 16, fixedWidth: 123       },
} as const;

type Variant = 'primary' | 'secondary';
type Size    = keyof typeof SIZES;
type State   = 'default' | 'pressed' | 'disabled';

function getBg(variant: Variant, state: State, size: Size): string {
  if (variant === 'primary') {
    if (state === 'pressed') return '#1E2B8A';          // button/primary-bg-pressed
    return colors['brand/primary'];                     // button/primary-bg
  }
  // secondary
  if (state === 'pressed')  return colors['neutral/surface-elevated'];  // button/secondary-bg-pressed (#282828)
  if (state === 'disabled') return size === 'small' ? SECONDARY_BORDER_BG : '#373737'; // palette/gray-700 (High/Med)
  return SECONDARY_BORDER_BG;                           // default: semi-transparent fill, no CSS border
}

// ── Button ────────────────────────────────────────────────────
interface ButtonProps {
  label?:           string;
  variant?:         Variant;
  state?:           State;
  size?:            Size;
  showLeadingIcon?: boolean;
}

function Button({
  label           = 'Novo pedido',
  variant         = 'primary',
  state           = 'default',
  size            = 'high',
  showLeadingIcon = false,
}: ButtonProps) {
  const s = SIZES[size];
  return (
    <button style={{
      height:          s.h,
      paddingLeft:     s.px,
      paddingRight:    s.px,
      width:           s.fixedWidth,
      borderRadius:    radius.full,
      backgroundColor: getBg(variant, state, size),
      border:          'none',
      color:           colors['surface/on-dark'],
      fontSize:        s.fontSize,
      lineHeight:      s.lineHeight,
      fontWeight:      500,
      fontFamily:      'Geist, system-ui, sans-serif',
      cursor:          state === 'disabled' ? 'not-allowed' : 'pointer',
      opacity:         state === 'disabled' ? 0.4 : 1,
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  'space-between',
      gap:             spacing[8],
      transition:      'background 0.15s',
      whiteSpace:      'nowrap',
      boxSizing:       'border-box' as const,
    }}>
      {showLeadingIcon && <SearchIcon size={s.iconSize} color={colors['surface/on-dark']} />}
      {label}
    </button>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Button',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Action button — DS El Pedido (Figma node \`1:817\`).

**Variants:** Primary · Secondary
**States:** Default · Pressed · Disabled
**Sizes:** High (56px, px=20) · Medium (48px, w=158px) · Small (32px, w=123px)

Key tokens:
- \`button/primary-bg\` → brand/primary (#2B3BB3)
- \`button/primary-bg-pressed\` (#1E2B8A)
- \`button/secondary-border\` → rgba(161,161,161,0.25) used as fill (no CSS border)
- \`button/secondary-bg-pressed\` → #282828
- Secondary Disabled (High/Medium): \`palette/gray-700\` (#373737), opacity 40%`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 40 }}>
      {(['high', 'medium', 'small'] as Size[]).map(size => (
        <div key={size}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            size={size} — h:{SIZES[size].h}px · px:{SIZES[size].px}px
            {SIZES[size].fixedWidth ? ` · w:${SIZES[size].fixedWidth}px (fixed)` : ' · width:auto'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {(['primary', 'secondary'] as Variant[]).map(variant =>
              (['default', 'pressed', 'disabled'] as State[]).map(state => (
                <div key={`${variant}-${state}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button label="Novo pedido" variant={variant} state={state} size={size} />
                  <span style={{ fontSize: 9, color: colors['neutral/text-tertiary'], fontFamily: 'monospace', textAlign: 'center' }}>
                    {variant}<br/>{state}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Primary: StoryObj = {
  name: 'Primary',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['default', 'pressed', 'disabled'] as State[]).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button label="Salvar" variant="primary" state={s} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Secondary: StoryObj = {
  name: 'Secondary',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['default', 'pressed', 'disabled'] as State[]).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button label="Cancelar" variant="secondary" state={s} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['high', 'medium', 'small'] as Size[]).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Button label="Novo pedido" size={size} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'Geist, sans-serif' }}>
            {size} — {SIZES[size].h}px{SIZES[size].fixedWidth ? ` × ${SIZES[size].fixedWidth}px` : ''}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithLeadingIcon: StoryObj = {
  name: 'With leading icon',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button label="Buscar" variant="primary"   size="high"   showLeadingIcon />
      <Button label="Buscar" variant="secondary" size="high"   showLeadingIcon />
      <Button label="Buscar" variant="primary"   size="medium" showLeadingIcon />
      <Button label="Buscar" variant="primary"   size="small"  showLeadingIcon />
    </div>
  ),
};

export const SecondaryDisabledBg: StoryObj = {
  name: 'Secondary disabled — bg by size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
        High/Medium → #373737 (palette/gray-700) · Small → rgba(161,161,161,0.25)
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button label="Disabled" variant="secondary" state="disabled" size="high"   />
        <Button label="Disabled" variant="secondary" state="disabled" size="medium" />
        <Button label="Disabled" variant="secondary" state="disabled" size="small"  />
      </div>
    </div>
  ),
};
