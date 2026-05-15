import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, radius } from '../theme/tokens';

// ── Icon component — same as Icon.stories.tsx ─────────────────
// Imported inline to avoid cross-story dependency
const ICON_TYPES = [
  'Favoritos', 'Arrow left', 'Entradas', 'Bebidas', 'Sobremesa',
  'Lanche', 'Acompanhamento', 'Search', 'Home', 'Clientes',
  'Pedidos', 'Estoque', 'Insights', 'Chevron down', 'Check',
] as const;
type IconType = typeof ICON_TYPES[number];

function Icon({ type, size = 24 }: { type: IconType; size?: 16 | 24 }) {
  const s = size;
  const p = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', style: { flexShrink: 0 as const, display: 'block' as const } };
  const st = { stroke: '#ffffff', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (type) {
    case 'Favoritos':      return <svg {...p}><path d="M12 21C12 21 3 15.5 3 9a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 6.5-9 12-9 12z" {...st}/></svg>;
    case 'Arrow left':     return <svg {...p}><path d="M19 12H5" {...st}/><path d="M12 5L5 12L12 19" {...st}/></svg>;
    case 'Search':         return <svg {...p}><circle cx="10.5" cy="10.5" r="6.5" {...st}/><path d="M15.5 15.5L21 21" {...st}/></svg>;
    case 'Home':           return <svg {...p}><path d="M3 12L12 3l9 9" {...st}/><path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" {...st}/></svg>;
    case 'Clientes':       return <svg {...p}><circle cx="12" cy="8" r="4" {...st}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...st}/></svg>;
    case 'Pedidos':        return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" {...st}/><path d="M8 8h8M8 12h8M8 16h5" {...st}/></svg>;
    case 'Estoque':        return <svg {...p}><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" {...st}/><path d="M9 22V12h6v10" {...st}/></svg>;
    case 'Insights':       return <svg {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" {...st}/></svg>;
    case 'Chevron down':   return <svg {...p}><path d="M6 9L12 15L18 9" {...st}/></svg>;
    case 'Check':          return <svg {...p}><path d="M4 12l5 5L20 7" {...st}/></svg>;
    default:               return <svg {...p}><circle cx="12" cy="12" r="4" {...st}/></svg>;
  }
}

// ── IconButton ────────────────────────────────────────────────
type IBState = 'default' | 'hover' | 'pressed' | 'disabled';
type IBStyle = 'filled' | 'ghost';

function IconButton({
  state    = 'default',
  style    = 'filled',
  icon     = 'Arrow left' as IconType,
}: {
  state?: IBState;
  style?: IBStyle;
  icon?: IconType;
}) {
  const isFilled   = style === 'filled';
  const isHover    = state === 'hover';
  const isPressed  = state === 'pressed';
  const isDisabled = state === 'disabled';

  const bg = !isFilled ? 'transparent'
    : isHover   ? colors['neutral/surface-elevated-hover']
    : isPressed ? colors['neutral/surface-pressed']
    : colors['neutral/surface-elevated'];

  return (
    <div style={{
      width: 40, height: 40, borderRadius: radius.full,
      backgroundColor: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.35 : (isHover && !isFilled) ? 0.6 : 1,
      transition: 'background 0.15s',
    }}>
      {/* Uses Icon component — not hardcoded */}
      <Icon type={icon} size={24} />
    </div>
  );
}

const STATES: IBState[] = ['default', 'hover', 'pressed', 'disabled'];

const meta: Meta = {
  title: 'Components/IconButton',
  parameters: { backgrounds: { default: 'dark' } },
};
export default meta;

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['filled', 'ghost'] as IBStyle[]).map(style => (
        <div key={style}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>style={style}</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {STATES.map(state => (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <IconButton state={state} style={style} />
                <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>{state}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Filled: StoryObj = {
  render: () => <div style={{ display: 'flex', gap: 12 }}>{STATES.map(s => <IconButton key={s} state={s} style="filled" />)}</div>,
};

export const Ghost: StoryObj = {
  render: () => <div style={{ display: 'flex', gap: 12 }}>{STATES.map(s => <IconButton key={s} state={s} style="ghost" />)}</div>,
};

export const AllIcons: StoryObj = {
  name: 'All icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {ICON_TYPES.map(type => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <IconButton icon={type} />
          <span style={{ fontSize: 9, color: colors['neutral/text-tertiary'], fontFamily: 'monospace', textAlign: 'center', maxWidth: 64 }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: StoryObj = {
  name: 'Interactive',
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const state: IBState = pressed ? 'pressed' : hovered ? 'hover' : 'default';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
        >
          <IconButton state={state} />
        </div>
        <span style={{ fontSize: 12, color: colors['neutral/text-tertiary'], fontFamily: 'Geist, sans-serif' }}>state: {state}</span>
      </div>
    );
  },
};
