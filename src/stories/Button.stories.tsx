/**
 * Button — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 1:817
 *
 * Props (mirrors Figma exactly):
 *   tertiary: "Primary" | "Secondary"
 *   state:    "Default" | "Pressed" | "Disabled"
 *   size:     "High" | "Medium" | "Small"
 *   label, showLeadingIcon, showTrailingIcon
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, radius } from '../theme/tokens';

// ── Icon placeholder (Search) — matches Figma leading/trailing icon slot ──
const SearchIcon = ({ size }: { size: number }) => (
  <div style={{ width: size, height: size, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
    <svg width={size} height={size} viewBox="0 0 16 16"
      fill={colors['surface/on-dark']}
      style={{ position: 'absolute', inset: '16.67%', width: '66.66%', height: '66.66%' }}>
      <path d="M9.8 9.8C10.73 8.87 11.2 7.73 11.2 6.4 11.2 5.07 10.73 3.93 9.8 3 8.87 2.07 7.73 1.6 6.4 1.6 5.07 1.6 3.93 2.07 3 3 2.07 3.93 1.6 5.07 1.6 6.4 1.6 7.73 2.07 8.87 3 9.8 3.93 10.73 5.07 11.2 6.4 11.2 7.73 11.2 8.87 10.73 9.8 9.8ZM6.4 12.8C4.61 12.8 3.1 12.18 1.86 10.94.62 9.7 0 8.19 0 6.4 0 4.61.62 3.1 1.86 1.86 3.1.62 4.61 0 6.4 0 8.19 0 9.7.62 10.94 1.86 12.18 3.1 12.8 4.61 12.8 6.4 12.8 7.15 12.68 7.85 12.45 8.51 12.22 9.17 11.89 9.77 11.46 10.32L16 14.88 14.88 16 10.32 11.46C9.77 11.89 9.17 12.22 8.51 12.45 7.85 12.68 7.15 12.8 6.4 12.8Z"/>
    </svg>
  </div>
);

// ── Exact specs extracted from Figma node 1:817 ────────────────
// bg resolved per: tertiary × state × size
function getBg(tertiary: 'Primary' | 'Secondary', state: 'Default' | 'Pressed' | 'Disabled', size: 'High' | 'Medium' | 'Small'): string {
  if (tertiary === 'Primary') {
    if (state === 'Pressed')  return '#1e2b8a'; // button/primary-bg-pressed
    return '#2b3bb3';                           // button/primary-bg (Default + Disabled)
  }
  // Secondary
  if (state === 'Pressed') return '#282828';                  // button/secondary-bg-pressed
  if (state === 'Disabled' && size !== 'Small') return '#373737'; // palette/gray-700 (High + Medium only)
  return 'rgba(161,161,161,0.25)';                            // button/secondary-border (Default, Small Disabled)
}

// size → exact padding, width, font per Figma
const SIZE_STYLES: Record<'High' | 'Medium' | 'Small', React.CSSProperties> = {
  High:   { padding: '16px 20px',   fontSize: 18, lineHeight: '24px'                   },
  Medium: { padding: '14px 16px',   fontSize: 16, lineHeight: '24px', width: 158, height: 48 },
  Small:  { padding: '8px 12px',    fontSize: 12, lineHeight: '16px', width: 123        },
};

const ICON_SIZE: Record<'High' | 'Medium' | 'Small', number> = {
  High: 24, Medium: 20, Small: 16,
};

// ── Button component — props match Figma 1:1 ─────────────────
interface ButtonProps {
  tertiary?:        'Primary' | 'Secondary';
  state?:           'Default' | 'Pressed' | 'Disabled';
  size?:            'High' | 'Medium' | 'Small';
  label?:           string;
  showLeadingIcon?: boolean;
  showTrailingIcon?:boolean;
}

function Button({
  tertiary        = 'Primary',
  state           = 'Default',
  size            = 'High',
  label           = 'Novo pedido',
  showLeadingIcon = false,
  showTrailingIcon= false,
}: ButtonProps) {
  const iconSize = ICON_SIZE[size];

  return (
    <div style={{
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  (showLeadingIcon || showTrailingIcon) ? 'space-between' : 'center',
      borderRadius:    radius.full,     // var(--button/radius, 100px)
      backgroundColor: getBg(tertiary, state, size),
      opacity:         state === 'Disabled' ? 0.4 : 1,
      cursor:          state === 'Disabled' ? 'not-allowed' : 'pointer',
      fontFamily:      'Geist, system-ui, sans-serif',
      fontWeight:      500,
      color:           colors['surface/on-dark'], // button/primary-text | secondary-text (both white)
      whiteSpace:      'nowrap',
      boxSizing:       'border-box' as const,
      gap:             8,
      ...SIZE_STYLES[size],
    }}>
      {showLeadingIcon  && <SearchIcon size={iconSize} />}
      <span style={{ fontSize: SIZE_STYLES[size].fontSize, lineHeight: SIZE_STYLES[size].lineHeight, fontWeight: 500 }}>
        {label}
      </span>
      {showTrailingIcon && <SearchIcon size={iconSize} />}
    </div>
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

Props (mirrors Figma exactly):
- \`tertiary\`: Primary | Secondary
- \`state\`: Default | Pressed | Disabled
- \`size\`: High | Medium | Small
- \`label\`, \`showLeadingIcon\`, \`showTrailingIcon\`

**High**: px=20 py=16, auto width, 18px  
**Medium**: px=16 py=14, w=158px h=48px, 16px  
**Small**: px=12 py=8, w=123px, 12px`,
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
      {(['High', 'Medium', 'Small'] as const).map(size => (
        <div key={size}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            size={size}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {(['Primary', 'Secondary'] as const).map(tertiary =>
              (['Default', 'Pressed', 'Disabled'] as const).map(state => (
                <div key={`${tertiary}-${state}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button tertiary={tertiary} state={state} size={size} />
                  <span style={{ fontSize: 9, color: colors['neutral/text-tertiary'], fontFamily: 'monospace', textAlign: 'center' }}>
                    {tertiary}<br/>{state}
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
      {(['Default', 'Pressed', 'Disabled'] as const).map(state => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button tertiary="Primary" state={state} label="Salvar" />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{state}</span>
        </div>
      ))}
    </div>
  ),
};

export const Secondary: StoryObj = {
  name: 'Secondary',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['Default', 'Pressed', 'Disabled'] as const).map(state => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button tertiary="Secondary" state={state} label="Cancelar" />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{state}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['High', 'Medium', 'Small'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Button size={size} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'Geist, sans-serif' }}>
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: StoryObj = {
  name: 'With leading + trailing icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['High', 'Medium', 'Small'] as const).map(size => (
        <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size={size} tertiary="Primary"   label="Buscar" showLeadingIcon />
          <Button size={size} tertiary="Secondary" label="Buscar" showLeadingIcon />
          <Button size={size} tertiary="Primary"   label="Próximo" showTrailingIcon />
        </div>
      ))}
    </div>
  ),
};

export const SecondaryDisabledBg: StoryObj = {
  name: 'Secondary Disabled — bg by size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <span style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
        High + Medium → #373737 (palette/gray-700) · Small → rgba(161,161,161,0.25)
      </span>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {(['High', 'Medium', 'Small'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Button tertiary="Secondary" state="Disabled" size={size} label="Disabled" />
            <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{size}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
