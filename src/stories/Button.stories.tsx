import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

// ── Icon (Search, 16/20/24px) ─────────────────────────────────
const SearchIcon = ({ size = 20, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M9.8 9.8C10.73 8.87 11.2 7.73 11.2 6.4 11.2 5.07 10.73 3.93 9.8 3 8.87 2.07 7.73 1.6 6.4 1.6 5.07 1.6 3.93 2.07 3 3 2.07 3.93 1.6 5.07 1.6 6.4 1.6 7.73 2.07 8.87 3 9.8 3.93 10.73 5.07 11.2 6.4 11.2 7.73 11.2 8.87 10.73 9.8 9.8ZM6.4 12.8C4.61 12.8 3.1 12.18 1.86 10.94.62 9.7 0 8.19 0 6.4 0 4.61.62 3.1 1.86 1.86 3.1.62 4.61 0 6.4 0 8.19 0 9.7.62 10.94 1.86 12.18 3.1 12.8 4.61 12.8 6.4 12.8 7.15 12.68 7.85 12.45 8.51 12.22 9.17 11.89 9.77 11.46 10.32L16 14.88 14.88 16 10.32 11.46C9.77 11.89 9.17 12.22 8.51 12.45 7.85 12.68 7.15 12.8 6.4 12.8Z"/>
  </svg>
);

// ── Spinner ───────────────────────────────────────────────────
const Spinner = ({ color = '#fff' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none"
    style={{ animation: 'btn-spin 1s linear infinite', flexShrink: 0 }}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeOpacity={0.3} strokeWidth={2.5}/>
    <path d="M18 10 A8 8 0 0 0 10 2" stroke={color} strokeWidth={2.5} strokeLinecap="round"/>
  </svg>
);

// ── Token config — matches Figma DS exactly ───────────────────
// Sizes: High (px=20), Medium (h=48, px=16, w=158), Small (h=32, px=12, w=123)
// Ref: node 1:817 — button/primary-bg, button/secondary-border, palette/gray-700
const SIZES = {
  high:   { h: 56,   px: 20, fontSize: 18, lineHeight: '24px', iconSize: 24, fixedWidth: undefined   },
  medium: { h: 48,   px: 16, fontSize: 16, lineHeight: '24px', iconSize: 20, fixedWidth: 158         },
  small:  { h: 32,   px: 12, fontSize: 12, lineHeight: '16px', iconSize: 16, fixedWidth: 123         },
} as const;

type Variant = 'primary' | 'secondary' | 'ghost';
type Size    = keyof typeof SIZES;
type State   = 'default' | 'pressed' | 'disabled' | 'loading';

// Per-variant + per-state background resolution (matches Figma node 1:817)
function getBg(variant: Variant, state: State, size: Size): string {
  if (variant === 'primary') {
    if (state === 'pressed' || state === 'loading') return '#1E2B8A'; // button/primary-bg-pressed
    return colors['brand/primary'];                                    // button/primary-bg
  }
  if (variant === 'secondary') {
    if (state === 'pressed') return colors['neutral/surface-elevated']; // button/secondary-bg-pressed
    // Disabled: High/Medium use palette/gray-700 (#373737), Small uses button/secondary-border
    if (state === 'disabled') return size === 'small' ? colors['neutral/border'] : '#373737';
    return 'transparent';
  }
  // Ghost
  if (state === 'pressed' || state === 'disabled') return colors['neutral/surface-elevated'];
  return 'transparent';
}

function getTextColor(variant: Variant): string {
  if (variant === 'ghost') return colors['brand/primary']; // button/ghost-text
  return colors['surface/on-dark'];                        // button/primary-text | secondary-text
}

function getBorder(variant: Variant, state: State): string {
  // Secondary default: render border. Disabled secondary has filled bg (no border needed).
  if (variant === 'secondary' && state === 'default') {
    return `1px solid ${colors['neutral/border']}`; // button/secondary-border
  }
  return 'none';
}

// ── Button component ──────────────────────────────────────────
interface ButtonProps {
  label?:          string;
  variant?:        Variant;
  state?:          State;
  size?:           Size;
  showLeadingIcon?: boolean;
}

function Button({
  label           = 'Novo pedido',
  variant         = 'primary',
  state           = 'default',
  size            = 'high',
  showLeadingIcon = false,
}: ButtonProps) {
  const s         = SIZES[size];
  const isLoading = state === 'loading';
  const isDisabled= state === 'disabled';
  const textColor = getTextColor(variant);

  return (
    <button style={{
      height:          s.h,
      paddingLeft:     s.px,
      paddingRight:    s.px,
      width:           s.fixedWidth,
      minWidth:        s.fixedWidth ? undefined : 'auto',
      borderRadius:    radius.full,
      backgroundColor: getBg(variant, state, size),
      border:          getBorder(variant, state),
      color:           textColor,
      fontSize:        s.fontSize,
      lineHeight:      s.lineHeight,
      fontWeight:      500,
      fontFamily:      'Geist, system-ui, sans-serif',
      cursor:          isDisabled ? 'not-allowed' : 'pointer',
      opacity:         isDisabled ? 0.4 : 1,
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  'center',
      gap:             spacing[8],
      transition:      'background 0.15s',
      whiteSpace:      'nowrap',
      boxSizing:       'border-box' as const,
    }}>
      {isLoading
        ? <Spinner color={variant === 'ghost' ? colors['brand/primary'] : colors['surface/on-dark']} />
        : <>
            {showLeadingIcon && <SearchIcon size={s.iconSize} color={textColor} />}
            {label}
          </>
      }
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

**Variants:** Primary · Secondary · Ghost  
**States:** Default · Pressed · Disabled · Loading  
**Sizes:** High (56px, px=20) · Medium (48px, w=158px) · Small (32px, w=123px)

Tokens: \`button/primary-bg\` · \`button/primary-bg-pressed\` · \`button/secondary-border\` · \`button/secondary-bg-pressed\`

> Ghost and Loading are specified in the component description but not yet in the Figma file.`,
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
      <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
      {(['high', 'medium', 'small'] as Size[]).map(size => (
        <div key={size}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            size={size} — h:{SIZES[size].h}px · px:{SIZES[size].px}px{SIZES[size].fixedWidth ? ` · w:${SIZES[size].fixedWidth}px (fixed)` : ' · width:auto'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {(['primary', 'secondary', 'ghost'] as Variant[]).map(variant =>
              (['default', 'pressed', 'disabled', 'loading'] as State[]).map(state => (
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
      <style>{`@keyframes btn-spin{to{transform:rotate(360deg)}}`}</style>
      {(['default', 'pressed', 'disabled', 'loading'] as State[]).map(s => (
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

export const Ghost: StoryObj = {
  name: 'Ghost',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['default', 'pressed', 'disabled'] as State[]).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button label="Ver mais" variant="ghost" state={s} />
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
      <Button label="Buscar" variant="primary" size="high" showLeadingIcon />
      <Button label="Buscar" variant="secondary" size="high" showLeadingIcon />
      <Button label="Buscar" variant="primary" size="medium" showLeadingIcon />
      <Button label="Buscar" variant="primary" size="small" showLeadingIcon />
    </div>
  ),
};

export const SecondaryDisabledBg: StoryObj = {
  name: 'Secondary disabled — bg by size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
        High/Medium: bg #373737 (palette/gray-700) · Small: bg button/secondary-border
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button label="Disabled" variant="secondary" state="disabled" size="high" />
        <Button label="Disabled" variant="secondary" state="disabled" size="medium" />
        <Button label="Disabled" variant="secondary" state="disabled" size="small" />
      </div>
    </div>
  ),
};
