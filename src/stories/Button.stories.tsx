import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const SearchIcon = ({ size = 20, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M9.8 9.8C10.73 8.87 11.2 7.73 11.2 6.4 11.2 5.07 10.73 3.93 9.8 3 8.87 2.07 7.73 1.6 6.4 1.6 5.07 1.6 3.93 2.07 3 3 2.07 3.93 1.6 5.07 1.6 6.4 1.6 7.73 2.07 8.87 3 9.8 3.93 10.73 5.07 11.2 6.4 11.2 7.73 11.2 8.87 10.73 9.8 9.8ZM6.4 12.8C4.61 12.8 3.1 12.18 1.86 10.94.62 9.7 0 8.19 0 6.4 0 4.61.62 3.1 1.86 1.86 3.1.62 4.61 0 6.4 0 8.19 0 9.7.62 10.94 1.86 12.18 3.1 12.8 4.61 12.8 6.4 12.8 7.15 12.68 7.85 12.45 8.51 12.22 9.17 11.89 9.77 11.46 10.32L16 14.88 14.88 16 10.32 11.46C9.77 11.89 9.17 12.22 8.51 12.45 7.85 12.68 7.15 12.8 6.4 12.8Z"/>
  </svg>
);

const Spinner = ({ color = '#fff' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ animation: 'btn-spin 1s linear infinite' }}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeOpacity={0.3} strokeWidth={2.5}/>
    <path d="M18 10 A8 8 0 0 0 10 2" stroke={color} strokeWidth={2.5} strokeLinecap="round"/>
  </svg>
);

const VARIANTS = {
  primary:   { bg: colors['brand/primary'],   bgPressed: '#1E2B8A',                        text: colors['surface/on-dark'],  border: 'none' },
  secondary: { bg: 'transparent',             bgPressed: colors['neutral/surface-elevated'], text: colors['surface/on-dark'],  border: `1px solid ${colors['neutral/border']}` },
  ghost:     { bg: 'transparent',             bgPressed: colors['neutral/surface-elevated'], text: colors['brand/primary'],    border: 'none' },
};
const SIZES = {
  high:   { h: 56, px: 24, fontSize: 18, iconSize: 24 },
  medium: { h: 48, px: 16, fontSize: 16, iconSize: 20 },
  small:  { h: 32, px: 12, fontSize: 12, iconSize: 16 },
};

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;
type State = 'default' | 'pressed' | 'disabled' | 'loading';

function Button({ label = 'Novo pedido', variant = 'primary' as Variant, state = 'default' as State, size = 'high' as Size, showLeadingIcon = false }) {
  const t = VARIANTS[variant]; const s = SIZES[size];
  const isLoading = state === 'loading'; const isDisabled = state === 'disabled';
  return (
    <button style={{
      height: s.h, paddingLeft: s.px, paddingRight: s.px,
      backgroundColor: state === 'pressed' ? t.bgPressed : t.bg,
      border: t.border as string, borderRadius: radius.full,
      color: t.text, fontSize: s.fontSize, fontWeight: 500,
      fontFamily: 'Geist, system-ui, sans-serif',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.4 : 1,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: spacing[8], minWidth: size === 'small' ? 100 : 140,
      transition: 'background 0.15s', whiteSpace: 'nowrap',
    }}>
      {isLoading ? <Spinner color={variant === 'ghost' ? colors['brand/primary'] : colors['surface/on-dark']} />
        : <>{showLeadingIcon && <SearchIcon size={s.iconSize} color={t.text} />}{label}</>}
    </button>
  );
}

const LABEL: Record<Variant, string> = { primary: 'Salvar', secondary: 'Cancelar', ghost: 'Ver mais' };

const meta: Meta = {
  title: 'Components/Button',
  parameters: { backgrounds: { default: 'dark' } },
};
export default meta;

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
      {(['high', 'medium', 'small'] as Size[]).map(size => (
        <div key={size}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>size={size}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            {(['primary', 'secondary', 'ghost'] as Variant[]).map(variant =>
              (['default', 'pressed', 'disabled', 'loading'] as State[]).map(state => (
                <div key={`${variant}-${state}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button label={LABEL[variant]} variant={variant} state={state} size={size} />
                  <span style={{ fontSize: 9, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{variant}/{state}</span>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Primary: StoryObj = { name: 'Primary', render: () => <div style={{ display: 'flex', gap: 12 }}><style>{`@keyframes btn-spin{to{transform:rotate(360deg)}}`}</style>{(['default','pressed','disabled','loading'] as State[]).map(s => <Button key={s} label="Salvar" state={s} />)}</div> };
export const Secondary: StoryObj = { name: 'Secondary', render: () => <div style={{ display: 'flex', gap: 12 }}>{(['default','pressed','disabled'] as State[]).map(s => <Button key={s} label="Cancelar" variant="secondary" state={s} />)}</div> };
export const Ghost: StoryObj = { name: 'Ghost', render: () => <div style={{ display: 'flex', gap: 12 }}>{(['default','pressed','disabled'] as State[]).map(s => <Button key={s} label="Ver mais" variant="ghost" state={s} />)}</div> };
export const WithLeadingIcon: StoryObj = { name: 'With icon', render: () => <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Button label="Buscar" showLeadingIcon /><Button label="Buscar" variant="secondary" showLeadingIcon /><Button label="Buscar" size="medium" showLeadingIcon /><Button label="Buscar" size="small" showLeadingIcon /></div> };
