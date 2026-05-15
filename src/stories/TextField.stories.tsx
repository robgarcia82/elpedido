/**
 * TextField — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 1:927
 *
 * Pill-shaped input com floating label.
 * States: Enabled | Filled | Hover | Active | Invalid | Success | Disabled
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

// ── Tokens — node 1:927 ───────────────────────────────────────
const TF = {
  bgDefault:       '#282828', // textfield/bg-default
  bgHover:         '#373737', // textfield/bg-hover
  textLabel:       '#b7b7b7', // textfield/text-label (placeholder)
  textLabelFloat:  '#a1a1a1', // textfield/text-label-float
  textValue:       '#ffffff', // textfield/text-value
  textPlaceholder: '#b7b7b7', // textfield/text-placeholder
  textError:       '#e03333', // textfield/text-error
  textSuccess:     '#6cb527', // textfield/text-success
  borderFocus:     '#4c7dfe', // textfield/border-focus
  borderError:     '#e03333', // textfield/border-error
  radius: 62,   // textfield/radius — pill
  height: 48,   // avatar/photo-size (48px)
  padH:   16,   // spacing/16
  padV:    6,   // textfield/padding-v
  border:  2,   // textfield/border-width
  font: 'Geist, system-ui, sans-serif',
} as const;

type TFState = 'Enabled' | 'Filled' | 'Hover' | 'Active' | 'Invalid' | 'Success' | 'Disabled';

// ── TextField — fiel ao Figma ─────────────────────────────────
function TextField({
  state = 'Enabled',
  label = 'Label',
  value = 'Placeholder',
  hint,
  width = 220,
}: {
  state?:  TFState;
  label?:  string;
  value?:  string;
  hint?:   string;
  width?:  number;
}) {
  const isEnabled  = state === 'Enabled';
  const isFilled   = state === 'Filled';
  const isHover    = state === 'Hover';
  const isActive   = state === 'Active';
  const isInvalid  = state === 'Invalid';
  const isSuccess  = state === 'Success';
  const isDisabled = state === 'Disabled';
  const hasHint    = isInvalid || isSuccess;

  // ── Pill base style ───────────────────────────────────────
  const pill: React.CSSProperties = {
    display:         'flex',
    alignItems:      'center',
    height:          TF.height,
    width:           width,
    paddingLeft:     TF.padH,
    paddingRight:    TF.padH,
    paddingTop:      isFilled ? 8 : TF.padV,   // Filled: pt-8, others: py-6
    paddingBottom:   TF.padV,
    borderRadius:    TF.radius,
    backgroundColor: isHover ? TF.bgHover : TF.bgDefault,
    border:          isActive  ? `${TF.border}px solid ${TF.borderFocus}`
                   : isInvalid ? `${TF.border}px solid ${TF.borderError}`
                   : 'none',
    opacity:         isDisabled ? 0.4 : 1,
    boxSizing:       'border-box',
    overflow:        'hidden',
    flexShrink:      0,
  };

  // ── Floating label + value block (Filled / Active) ────────
  const FloatingContent = ({ active = false }: { active?: boolean }) => (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', paddingTop: 4, // spacing/4
      whiteSpace: 'nowrap', overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Floating label — 10px Medium */}
      <span style={{ fontSize: 10, fontWeight: 500, lineHeight: '12px', color: TF.textLabelFloat, fontFamily: TF.font }}>
        {label}
      </span>
      {/* Value / cursor — 14px Regular */}
      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', fontFamily: TF.font,
        color: active ? TF.textPlaceholder : TF.textValue }}>
        {active ? `|${value}` : value}
      </span>
    </div>
  );

  // ── Invalid / Success — wrapper com pill + hint abaixo ────
  if (hasHint) {
    const hintText = hint ?? (isSuccess ? 'Validação bem-sucedida' : 'Este campo é obrigatório');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
        {/* input-field pill */}
        <div style={{
          ...pill,
          border: isInvalid ? `${TF.border}px solid ${TF.borderError}` : 'none',
          overflow: 'hidden',
        }}>
          {/* label-value: flex-1 inside the pill */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            flex: '1 0 0', alignItems: 'flex-start',
            paddingTop: 4, overflow: 'hidden',
            height: '100%', whiteSpace: 'nowrap', minWidth: 0,
          }}>
            <span style={{ fontSize: 10, fontWeight: 500, lineHeight: 'normal', color: TF.textLabelFloat, fontFamily: TF.font }}>
              {label}
            </span>
            <span style={{ fontSize: 14, fontWeight: isSuccess ? 400 : 500, lineHeight: '20px', color: TF.textValue, fontFamily: TF.font }}>
              {value}
            </span>
          </div>
        </div>
        {/* hint */}
        <div style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: 8, overflow: 'hidden', width: '100%' }}>
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 'normal', whiteSpace: 'nowrap',
            color: isSuccess ? TF.textSuccess : TF.textError, fontFamily: TF.font }}>
            {hintText}
          </span>
        </div>
      </div>
    );
  }

  // ── Enabled / Hover / Disabled — só label como placeholder ──
  if (isEnabled || isHover || isDisabled) {
    return (
      <div style={pill}>
        <span style={{
          fontSize: 14, fontWeight: 400, lineHeight: '20px',
          color: TF.textLabel, fontFamily: TF.font,
          ...(isDisabled ? { width: 152 } : { whiteSpace: 'nowrap' }),
        }}>
          {label}
        </span>
      </div>
    );
  }

  // ── Filled / Active — floating label + value ──────────────
  return (
    <div style={pill}>
      <FloatingContent active={isActive} />
    </div>
  );
}

// ── Interactive ───────────────────────────────────────────────
function TextFieldInteractive({ label = 'Label', width = 220 }: { label?: string; width?: number }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const state: TFState = focused ? 'Active' : hasValue ? 'Filled' : 'Enabled';

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: TF.height, width,
        paddingLeft: TF.padH, paddingRight: TF.padH,
        paddingTop: (hasValue || focused) ? 8 : TF.padV,
        paddingBottom: TF.padV,
        borderRadius: TF.radius,
        backgroundColor: TF.bgDefault,
        border: focused ? `${TF.border}px solid ${TF.borderFocus}` : 'none',
        boxSizing: 'border-box', overflow: 'hidden',
        cursor: 'text', transition: 'border-color 0.15s',
        fontFamily: TF.font,
      }}>
        {(hasValue || focused) ? (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 4, flex: 1, overflow: 'hidden' }}>
            <span style={{ fontSize: 10, fontWeight: 500, lineHeight: '12px', color: TF.textLabelFloat }}>
              {label}
            </span>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoFocus={focused && !hasValue}
              style={{
                fontSize: 14, fontWeight: 400, lineHeight: '20px',
                color: TF.textValue, background: 'none',
                border: 'none', outline: 'none', padding: 0,
                fontFamily: TF.font, width: '100%', caretColor: 'white',
              }}
            />
          </div>
        ) : (
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={label}
            style={{
              fontSize: 14, fontWeight: 400, lineHeight: '20px',
              color: TF.textLabel, background: 'none',
              border: 'none', outline: 'none', padding: 0,
              fontFamily: TF.font, width: '100%', caretColor: 'white',
            }}
          />
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: TF.textLabelFloat, fontFamily: TF.font }}>
        state: {state}
      </div>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/TextField',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Pill-shaped text field — DS El Pedido (Figma node \`1:927\`).

**States:** Enabled · Filled · Hover · Active · Invalid · Success · Disabled

Tokens: \`textfield/bg-default\` (#282828) · \`textfield/radius\` (62px) · \`textfield/border-focus\` (#4c7dfe) · \`textfield/text-label-float\` (#a1a1a1)`,
      },
    },
  },
};
export default meta;

const STATES: TFState[] = ['Enabled', 'Filled', 'Hover', 'Active', 'Invalid', 'Success', 'Disabled'];

// ── Stories ───────────────────────────────────────────────────

export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: TF.font }}>
      {STATES.map(state => (
        <div key={state} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ width: 72, fontSize: 11, color: TF.textLabelFloat, textAlign: 'right', paddingTop: 14, flexShrink: 0 }}>
            {state}
          </span>
          <TextField state={state} label="Label" value="Placeholder" />
        </div>
      ))}
    </div>
  ),
};

export const Enabled: StoryObj  = { render: () => <TextField state="Enabled" label="Label" /> };
export const Filled: StoryObj   = { render: () => <TextField state="Filled"  label="Label" value="Placeholder" /> };
export const Hover: StoryObj    = { render: () => <TextField state="Hover"   label="Label" /> };
export const Active: StoryObj   = { render: () => <TextField state="Active"  label="Label" value="Placeholder" /> };
export const Invalid: StoryObj  = { render: () => <TextField state="Invalid" label="Label" value="Placeholder" hint="Este campo é obrigatório" /> };
export const Success: StoryObj  = { render: () => <TextField state="Success" label="Label" value="Placeholder" hint="Validação bem-sucedida" /> };
export const Disabled: StoryObj = { render: () => <TextField state="Disabled" label="Label" /> };

export const WithLabels: StoryObj = {
  name: 'With real labels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField state="Enabled"  label="Nome completo" />
      <TextField state="Filled"   label="Nome completo"  value="Renato Carvalho" />
      <TextField state="Active"   label="E-mail"         value="renato@" />
      <TextField state="Invalid"  label="E-mail"         value="email-invalido" hint="Formato de e-mail inválido" />
      <TextField state="Success"  label="Usuário"        value="robgarcia82"    hint="Usuário disponível!" />
      <TextField state="Disabled" label="CPF" />
    </div>
  ),
};

export const Interactive: StoryObj = {
  name: 'Interactive',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TextFieldInteractive label="Nome" />
      <TextFieldInteractive label="E-mail" />
    </div>
  ),
};
