import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const ChevronDown = ({ color = '#A1A1A1', rotated = false }) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ transform: rotated ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CheckIcon = ({ color = '#fff' }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M20 6L9 17 4 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type ComboboxState = 'default' | 'focused' | 'open' | 'filled' | 'disabled';

const OPTIONS = ['Pastel de carne', 'Kibe sem cebola', 'Coxinha', 'Coca Cola', 'Coca Cola Zero', 'Suco de laranja'];

function ComboboxDisplay({ state = 'default', value = '' }: { state?: ComboboxState; value?: string }) {
  const isFocused  = state === 'focused' || state === 'open';
  const isFilled   = state === 'filled' || (state === 'open' && value);
  const isDisabled = state === 'disabled';
  const isOpen     = state === 'open';
  const borderColor = isFocused ? colors['brand/primary'] : isFilled ? colors['surface/on-dark'] : colors['neutral/border'];
  const textColor   = isFilled ? colors['surface/on-dark'] : colors['neutral/placeholder'];
  const chevronColor = isFocused ? colors['brand/primary'] : isFilled ? colors['surface/on-dark'] : colors['neutral/text-tertiary'];

  return (
    <div style={{
      width: 240, height: 40, borderRadius: radius.full,
      border: `1px solid ${borderColor}`,
      display: 'flex', alignItems: 'center',
      paddingLeft: spacing[16], paddingRight: spacing[12],
      gap: spacing[8], opacity: isDisabled ? 0.4 : 1,
      fontFamily: 'Geist, system-ui, sans-serif',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      boxSizing: 'border-box',
    }}>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: textColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {isFilled ? value || 'Item combobox' : 'Selecione...'}
      </span>
      <ChevronDown color={chevronColor} rotated={isOpen} />
    </div>
  );
}

function DropdownItem({ label, state = 'default' }: { label: string; state?: 'default' | 'hover' | 'selected' }) {
  const isSelected = state === 'selected';
  const isHover    = state === 'hover';
  return (
    <div style={{
      height: 44, paddingLeft: spacing[16], paddingRight: spacing[16],
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: isHover ? colors['neutral/surface-elevated-hover'] : 'transparent',
      cursor: 'pointer', transition: 'background 0.1s',
    }}>
      <span style={{ fontSize: 14, color: isSelected ? colors['surface/on-dark'] : colors['neutral/text-secondary'] }}>{label}</span>
      {isSelected && <CheckIcon color={colors['surface/on-dark']} />}
    </div>
  );
}

function ComboboxInteractive() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', width: 240, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div onClick={() => setOpen(o => !o)} style={{
        height: 40, borderRadius: open ? '20px 20px 12px 12px' : radius.full,
        border: `1px solid ${open ? colors['brand/primary'] : value ? colors['surface/on-dark'] : colors['neutral/border']}`,
        display: 'flex', alignItems: 'center',
        paddingLeft: spacing[16], paddingRight: spacing[12], gap: spacing[8],
        cursor: 'pointer', boxSizing: 'border-box', transition: 'border-color 0.15s',
      }}>
        <span style={{ flex: 1, fontSize: 14, color: value ? colors['surface/on-dark'] : colors['neutral/placeholder'] }}>
          {value || 'Selecione...'}
        </span>
        <ChevronDown color={open ? colors['brand/primary'] : value ? colors['surface/on-dark'] : colors['neutral/text-tertiary']} rotated={open} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: 38, left: 0, right: 0, zIndex: 100,
          backgroundColor: colors['neutral/surface-elevated'],
          borderRadius: '0 0 12px 12px',
          border: `1px solid ${colors['brand/primary']}`, borderTop: 'none',
          overflow: 'hidden',
        }}>
          {OPTIONS.map(opt => (
            <div
              key={opt}
              onMouseEnter={() => setHovered(opt)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => { setValue(opt); setOpen(false); }}
              style={{
                height: 44, paddingLeft: spacing[16], paddingRight: spacing[16],
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: hovered === opt ? colors['neutral/surface-elevated-hover'] : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 14, color: value === opt ? colors['surface/on-dark'] : colors['neutral/text-secondary'] }}>{opt}</span>
              {value === opt && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const meta: Meta = { title: 'Components/Combobox', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['default', 'focused', 'filled', 'open', 'disabled'] as ComboboxState[]).map(state => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 64, fontSize: 11, color: colors['neutral/text-tertiary'], textAlign: 'right', flexShrink: 0 }}>{state}</span>
          <ComboboxDisplay state={state} value="Pastel de carne" />
        </div>
      ))}
    </div>
  ),
};

export const WithDropdown: StoryObj = {
  name: 'Open state with dropdown',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', width: 240, position: 'relative' }}>
      <ComboboxDisplay state="open" value="Pastel de carne" />
      <div style={{ marginTop: 4, backgroundColor: colors['neutral/surface-elevated'], borderRadius: 12, overflow: 'hidden', border: `1px solid ${colors['brand/primary']}`, paddingTop: 8, paddingBottom: 8 }}>
        {OPTIONS.map((opt, i) => <DropdownItem key={opt} label={opt} state={i === 2 ? 'selected' : i === 1 ? 'hover' : 'default'} />)}
      </div>
    </div>
  ),
};

export const Interactive: StoryObj = { name: 'Interactive', render: () => <ComboboxInteractive /> };
