import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const ArrowLeft = ({ color = '#fff' }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type IBState = 'default' | 'hover' | 'pressed' | 'disabled';
type IBStyle = 'filled' | 'ghost';

function IconButton({ state = 'default', style = 'filled', icon }: { state?: IBState; style?: IBStyle; icon?: React.ReactNode }) {
  const isFilled   = style === 'filled';
  const isHover    = state === 'hover';
  const isPressed  = state === 'pressed';
  const isDisabled = state === 'disabled';
  const bg = !isFilled ? 'transparent'
    : isHover   ? colors['neutral/surface-elevated-hover']
    : isPressed ? colors['neutral/surface-pressed']
    : colors['neutral/surface-elevated'];
  const iconColor = isDisabled ? colors['icon/disabled'] : colors['surface/on-dark'];

  return (
    <div style={{
      width: 40, height: 40, borderRadius: radius.full,
      backgroundColor: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.35 : isHover && !isFilled ? 0.6 : 1,
      boxShadow: isPressed && isFilled ? 'inset 0 2px 4px rgba(0,0,0,0.15)' : 'none',
      border: isHover && isFilled ? `1px solid ${colors['neutral/surface-elevated-hover']}` : 'none',
      transition: 'background 0.15s',
    }}>
      {icon || <ArrowLeft color={iconColor} />}
    </div>
  );
}

const STATES: IBState[] = ['default', 'hover', 'pressed', 'disabled'];

const meta: Meta = { title: 'Components/IconButton', parameters: { backgrounds: { default: 'dark' } } };
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

export const Filled: StoryObj = { render: () => <div style={{ display: 'flex', gap: 12 }}>{STATES.map(s => <IconButton key={s} state={s} style="filled" />)}</div> };
export const Ghost: StoryObj = { render: () => <div style={{ display: 'flex', gap: 12 }}>{STATES.map(s => <IconButton key={s} state={s} style="ghost" />)}</div> };
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
