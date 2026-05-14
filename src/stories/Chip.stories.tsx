import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

type ChipState = 'default' | 'selected' | 'pressed' | 'disabled';

function Chip({ label = 'Item', state = 'default' }: { label?: string; state?: ChipState }) {
  const isSelected = state === 'selected';
  const isPressed  = state === 'pressed';
  const isDisabled = state === 'disabled';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      height: 40, paddingLeft: spacing[16], paddingRight: spacing[16],
      borderRadius: radius.full,
      backgroundColor: isSelected ? colors['neutral/surface-elevated-hover'] : isPressed ? colors['neutral/surface-pressed'] : 'transparent',
      border: `1px solid ${isSelected || isPressed ? colors['neutral/text-secondary'] : colors['neutral/border']}`,
      color: isSelected || isPressed ? colors['surface/on-dark'] : colors['neutral/text-tertiary'],
      fontSize: 14, fontWeight: 500,
      fontFamily: 'Geist, system-ui, sans-serif',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.4 : 1,
      whiteSpace: 'nowrap',
      transition: 'background 0.15s, border-color 0.15s, color 0.15s',
    }}>
      {label}
    </div>
  );
}

function ChipInteractive({ label = 'Item' }: { label?: string }) {
  const [selected, setSelected] = useState(false);
  const [pressed, setPressed] = useState(false);
  const state: ChipState = pressed ? 'pressed' : selected ? 'selected' : 'default';
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); setSelected(s => !s); }}
      onMouseLeave={() => setPressed(false)}
    >
      <Chip label={label} state={state} />
    </div>
  );
}

const LABELS = ['Entradas', 'Bebidas', 'Sobremesas', 'Lanches', 'Acompanhamentos'];

const meta: Meta = { title: 'Components/Chip', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {(['default', 'selected', 'pressed', 'disabled'] as ChipState[]).map(state => (
          <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Chip label="Item segment" state={state} />
            <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>{state}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FilterGroup: StoryObj = {
  name: 'Filter group (interactive)',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Entradas']);
    const toggle = (l: string) => setSelected(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l]);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {LABELS.map(label => (
          <Chip key={label} label={label} state={selected.includes(label) ? 'selected' : 'default'}
            // @ts-ignore
            onClick={() => toggle(label)}
          />
        ))}
      </div>
    );
  },
};

export const SingleSelect: StoryObj = {
  name: 'Single select (interactive)',
  render: () => {
    const [active, setActive] = useState('Entradas');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {LABELS.map(label => (
          <div key={label} onClick={() => setActive(label)} style={{ cursor: 'pointer' }}>
            <Chip label={label} state={active === label ? 'selected' : 'default'} />
          </div>
        ))}
      </div>
    );
  },
};
