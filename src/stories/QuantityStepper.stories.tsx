import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, radius } from '../theme/tokens';

function QuantityStepper({ value = 0, onChange, min = 0, max = 99 }: { value?: number; onChange?: (v: number) => void; min?: number; max?: number }) {
  return (
    <div style={{ width: 104, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <button
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: value <= min ? 'not-allowed' : 'pointer', backgroundColor: colors['neutral/surface-elevated'], color: value <= min ? colors['neutral/text-disabled'] : colors['surface/on-dark'], fontSize: 18, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value <= min ? 0.4 : 1 }}
      >−</button>
      <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: -0.5, color: colors['surface/on-dark'], minWidth: 24, textAlign: 'center' }}>{value}</span>
      <button
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: value >= max ? 'not-allowed' : 'pointer', backgroundColor: colors['brand/primary'], color: colors['surface/on-dark'], fontSize: 18, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value >= max ? 0.4 : 1 }}
      >+</button>
    </div>
  );
}

const meta: Meta = { title: 'Components/QuantityStepper', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const Default: StoryObj = { render: () => { const [v, sV] = useState(0); return <QuantityStepper value={v} onChange={sV} />; } };
export const WithValue: StoryObj = { name: 'With initial value', render: () => { const [v, sV] = useState(3); return <QuantityStepper value={v} onChange={sV} />; } };
export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, sans-serif' }}>
      {[{ label: 'Zero (min)', v: 0 }, { label: 'Mid value', v: 3 }, { label: 'Max (99)', v: 99 }].map(({ label, v }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 100, fontSize: 11, color: colors['neutral/text-tertiary'] }}>{label}</span>
          <QuantityStepper value={v} />
        </div>
      ))}
    </div>
  ),
};
