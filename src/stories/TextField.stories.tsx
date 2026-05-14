import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

type TFState = 'enabled' | 'filled' | 'hover' | 'active' | 'invalid' | 'success' | 'disabled';

const STATE_CONFIG: Record<TFState, { border: string; label?: string }> = {
  enabled:  { border: colors['neutral/border'] },
  filled:   { border: colors['neutral/border'] },
  hover:    { border: colors['neutral/text-secondary'] },
  active:   { border: '#2B7FFF' },
  invalid:  { border: '#E03333', label: 'Campo obrigatório' },
  success:  { border: '#6CB527', label: 'Disponível!' },
  disabled: { border: colors['neutral/border'] },
};

function TextField({ state = 'enabled', label = 'Nome', placeholder = 'Digite aqui...', value = '', helperIcon }: {
  state?: TFState; label?: string; placeholder?: string; value?: string; helperIcon?: React.ReactNode;
}) {
  const cfg = STATE_CONFIG[state];
  const isDisabled = state === 'disabled';
  const isInvalid  = state === 'invalid';
  const isSuccess  = state === 'success';
  const isFocused  = state === 'active';
  const isFilled   = state === 'filled' || !!value;
  const helperColor = isInvalid ? '#E03333' : isSuccess ? '#6CB527' : colors['neutral/text-muted'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, opacity: isDisabled ? 0.4 : 1, fontFamily: 'Geist, system-ui, sans-serif', width: 280 }}>
      {label && <span style={{ fontSize: 12, fontWeight: 500, color: colors['neutral/text-secondary'], marginBottom: 2 }}>{label}</span>}
      <div style={{
        height: 48, borderRadius: 8,
        border: `1px solid ${isFocused ? '#2B7FFF' : cfg.border}`,
        backgroundColor: colors['neutral/surface-elevated'],
        display: 'flex', alignItems: 'center',
        paddingLeft: spacing[16], paddingRight: spacing[16],
        boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 16, color: (isFilled || isFocused) ? colors['surface/on-dark'] : colors['neutral/placeholder'], flex: 1 }}>
          {isFilled || isFocused ? (value || 'Golden park') : placeholder}
        </span>
        {(isInvalid || isSuccess) && (
          <span style={{ fontSize: 16 }}>{isInvalid ? '⚠️' : '✅'}</span>
        )}
      </div>
      {cfg.label && <span style={{ fontSize: 12, color: helperColor, marginTop: 2 }}>{cfg.label}</span>}
    </div>
  );
}

const meta: Meta = { title: 'Components/TextField', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['enabled','filled','hover','active','invalid','success','disabled'] as TFState[]).map(state => (
        <div key={state} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontFamily: 'Geist, sans-serif' }}>
          <span style={{ width: 64, fontSize: 11, color: colors['neutral/text-tertiary'], textAlign: 'right', paddingTop: 14, flexShrink: 0 }}>{state}</span>
          <TextField state={state} label="" />
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: StoryObj = { name: 'With label', render: () => <TextField state="enabled" label="Nome do cliente" placeholder="Ex: João Silva" /> };
export const Validation: StoryObj = {
  name: 'Validation states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField state="invalid" label="E-mail" value="email-invalido" />
      <TextField state="success" label="Usuário" value="robgarcia82" />
    </div>
  ),
};
export const Interactive: StoryObj = {
  name: 'Interactive',
  render: () => {
    const [v, sV] = useState('');
    const [focused, sF] = useState(false);
    const state: TFState = focused ? 'active' : v ? 'filled' : 'enabled';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Geist, sans-serif', width: 280 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: colors['neutral/text-secondary'] }}>Nome</span>
        <div style={{ height: 48, borderRadius: 8, border: `1px solid ${focused ? '#2B7FFF' : colors['neutral/border']}`, backgroundColor: colors['neutral/surface-elevated'], display: 'flex', alignItems: 'center', paddingLeft: spacing[16], paddingRight: spacing[16], boxSizing: 'border-box' as const, transition: 'border-color 0.15s' }}>
          <input
            value={v}
            onChange={e => sV(e.target.value)}
            onFocus={() => sF(true)}
            onBlur={() => sF(false)}
            placeholder="Digite aqui..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 16, color: colors['surface/on-dark'], fontFamily: 'inherit' }}
          />
        </div>
        <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'] }}>state: {state}</span>
      </div>
    );
  },
};
