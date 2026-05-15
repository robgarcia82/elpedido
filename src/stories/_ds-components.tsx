/**
 * DS El Pedido — Web mirrors for Storybook
 *
 * Implementações web dos componentes do DS para uso nos stories.
 * Espelham exatamente as specs do Figma DS (aE63DfO5z6PKevs0791B9q).
 *
 * Importar nos stories em vez de redefinir localmente:
 *   import { Button, QuantityBadge, OrderItem, CustomerAvatar, Icon } from './_ds-components';
 */

import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

// ─────────────────────────────────────────────────────────────
// ICON — node 1:287
// ─────────────────────────────────────────────────────────────

const ICON_TYPES = [
  'Favoritos', 'Arrow left', 'Entradas', 'Bebidas', 'Sobremesa',
  'Lanche', 'Acompanhamento', 'Search', 'Home', 'Clientes',
  'Pedidos', 'Estoque', 'Insights', 'Chevron down', 'Check',
] as const;

export type IconType = typeof ICON_TYPES[number];
export type IconSize = 16 | 24;

export function Icon({ type, size = 24 }: { type: IconType; size?: IconSize }) {
  const s = size;
  const p = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', style: { flexShrink: 0 as const, display: 'block' as const } };
  const st = { stroke: '#ffffff', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (type) {
    case 'Favoritos':    return <svg {...p}><path d="M12 21C12 21 3 15.5 3 9a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 6.5-9 12-9 12z" {...st}/></svg>;
    case 'Arrow left':  return <svg {...p}><path d="M19 12H5" {...st}/><path d="M12 5L5 12L12 19" {...st}/></svg>;
    case 'Entradas':    return <svg {...p}><path d="M12 3v5M8 5c0 2.5 1.5 4 4 4s4-1.5 4-4" {...st}/><path d="M6 17h12M8 17v4M16 17v4" {...st}/><ellipse cx="12" cy="14" rx="5" ry="2" {...st}/></svg>;
    case 'Bebidas':     return <svg {...p}><path d="M7 3h10l-2 7H9L7 3z" {...st}/><path d="M9 10c0 3.5 1.5 7 3 7s3-3.5 3-7" {...st}/><path d="M9 17h6M10 20h4" {...st}/></svg>;
    case 'Sobremesa':   return <svg {...p}><path d="M5 11h14M5 11C5 7.7 8.1 5 12 5s7 2.7 7 6H5z" {...st}/><path d="M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" {...st}/><path d="M9 11v2M12 11v4M15 11v2" {...st}/></svg>;
    case 'Lanche':      return <svg {...p}><path d="M5 14h14M5 10h14" {...st}/><path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4-4" {...st}/><rect x="5" y="14" width="14" height="3" rx="1.5" {...st}/><path d="M7 17v2M17 17v2" {...st}/></svg>;
    case 'Acompanhamento': return <svg {...p}><path d="M12 3C9 3 6 6 6 10c0 2.5 1.2 4.5 3 5.7V20h6v-4.3C16.8 14.5 18 12.5 18 10c0-4-3-7-6-7z" {...st}/><circle cx="12" cy="10" r="2" {...st}/></svg>;
    case 'Search':      return <svg {...p}><circle cx="10.5" cy="10.5" r="6.5" {...st}/><path d="M15.5 15.5L21 21" {...st}/></svg>;
    case 'Home':        return <svg {...p}><path d="M3 12L12 3l9 9" {...st}/><path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" {...st}/></svg>;
    case 'Clientes':    return <svg {...p}><circle cx="12" cy="8" r="4" {...st}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...st}/></svg>;
    case 'Pedidos':     return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" {...st}/><path d="M8 8h8M8 12h8M8 16h5" {...st}/></svg>;
    case 'Estoque':     return <svg {...p}><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" {...st}/><path d="M9 22V12h6v10" {...st}/></svg>;
    case 'Insights':    return <svg {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" {...st}/></svg>;
    case 'Chevron down':return <svg {...p}><path d="M6 9L12 15L18 9" {...st}/></svg>;
    case 'Check':       return <svg {...p}><path d="M4 12l5 5L20 7" {...st}/></svg>;
    default:            return <svg {...p}><circle cx="12" cy="12" r="4" {...st}/></svg>;
  }
}

// ─────────────────────────────────────────────────────────────
// BUTTON — node 1:817
// Primary | Secondary × Default | Pressed | Disabled × High | Medium | Small
// ─────────────────────────────────────────────────────────────

const SECONDARY_BORDER_BG = 'rgba(161,161,161,0.25)';

const BTN_SIZES = {
  High:   { paddingTop: 16, paddingBottom: 16, paddingLeft: 20, paddingRight: 20, fontSize: 18, lineHeight: '24px' },
  Medium: { paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, fontSize: 16, lineHeight: '24px', width: 158, height: 48 },
  Small:  { paddingTop:  8, paddingBottom:  8, paddingLeft: 12, paddingRight: 12, fontSize: 12, lineHeight: '16px', width: 123 },
} as const;

function getBtnBg(tertiary: 'Primary' | 'Secondary', state: 'Default' | 'Pressed' | 'Disabled', size: 'High' | 'Medium' | 'Small'): string {
  if (tertiary === 'Primary') {
    if (state === 'Pressed') return '#1e2b8a';
    return '#2b3bb3';
  }
  if (state === 'Pressed')  return '#282828';
  if (state === 'Disabled' && size !== 'Small') return '#373737';
  return SECONDARY_BORDER_BG;
}

export interface ButtonProps {
  tertiary?:  'Primary' | 'Secondary';
  state?:     'Default' | 'Pressed' | 'Disabled';
  size?:      'High' | 'Medium' | 'Small';
  label?:     string;
  /** Override fixed width (e.g. 70 for compact OrderCard buttons) */
  width?:     number;
  /** Remove fixed width — button hugs its content */
  autoWidth?: boolean;
  showLeadingIcon?:  boolean;
  showTrailingIcon?: boolean;
  onClick?: () => void;
}

export function Button({
  tertiary = 'Primary', state = 'Default', size = 'High',
  label = 'Novo pedido', width, autoWidth = false,
  showLeadingIcon = false, showTrailingIcon = false,
  onClick,
}: ButtonProps) {
  const { width: _defaultW, ...sizeNoWidth } = BTN_SIZES[size] as typeof BTN_SIZES[typeof size] & { width?: number };
  const sizeStyle = {
    ...(autoWidth ? sizeNoWidth : BTN_SIZES[size]),
    ...(width !== undefined ? { width } : {}),
  };
  const iconSize = size === 'High' ? 24 : size === 'Medium' ? 20 : 16;

  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      borderRadius: radius.full,
      backgroundColor: getBtnBg(tertiary, state, size),
      opacity: state === 'Disabled' ? 0.4 : 1,
      cursor:  state === 'Disabled' ? 'not-allowed' : 'pointer',
      fontFamily: 'Geist, system-ui, sans-serif',
      fontWeight: 500, color: colors['surface/on-dark'],
      whiteSpace: 'nowrap', boxSizing: 'border-box' as const, gap: 8,
      ...sizeStyle,
    }}>
      {showLeadingIcon && <Icon type="Search" size={iconSize as IconSize} />}
      <span style={{ fontSize: (sizeStyle as { fontSize: number }).fontSize, lineHeight: (sizeStyle as { lineHeight: string }).lineHeight, fontWeight: 500, textAlign: 'center', flex: (showLeadingIcon || showTrailingIcon) ? 1 : undefined }}>
        {label}
      </span>
      {showTrailingIcon && <Icon type="Search" size={iconSize as IconSize} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QUANTITY BADGE — node 1:632
// ─────────────────────────────────────────────────────────────

export function QuantityBadge({ qty }: { qty: number }) {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: 4,
      backgroundColor: '#282828',              // badge/bg → neutral/surface-elevated
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: 10, fontWeight: 500, lineHeight: '12px',
        color: '#a8a29e',                      // badge/text → neutral/text-secondary
        fontFamily: 'Geist, system-ui, sans-serif',
      }}>
        {qty}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ORDER ITEM — node 1:639
// ─────────────────────────────────────────────────────────────

export function OrderItem({ qty, name }: { qty: number; name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[12], height: 20, flexShrink: 0 }}>
      <QuantityBadge qty={qty} />
      <span style={{
        fontSize: 10, fontWeight: 500, lineHeight: '12px',
        color: '#a8a29e',                      // orderitem/text → neutral/text-secondary
        fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CUSTOMER AVATAR — node 1:626
// ─────────────────────────────────────────────────────────────

export function CustomerAvatar({ name, phone, photoUri }: { name: string; phone: string; photoUri?: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 12, width: 91, flexShrink: 0,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {/* AvatarPhoto */}
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        backgroundColor: '#282828',            // avatar/placeholder-bg
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
      }}>
        {photoUri
          ? <img src={photoUri} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: '#a1a1a1' }}>{initials}</span>
        }
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.5px', color: colors['surface/on-dark'], textAlign: 'center', whiteSpace: 'nowrap' }}>
          {name}
        </span>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: '#a1a1a1', textAlign: 'center', whiteSpace: 'nowrap' }}>
          {phone}
        </span>
      </div>
    </div>
  );
}

export const DS_ICON_TYPES = ICON_TYPES;

// ─────────────────────────────────────────────────────────────
// QUANTITY STEPPER — node 1:813
// ─────────────────────────────────────────────────────────────

export interface QuantityStepperProps {
  value?: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value = 0, onChange, min = 0, max = 99 }: QuantityStepperProps) {
  return (
    <div style={{ width: 104, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <button
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: value <= min ? 'not-allowed' : 'pointer', backgroundColor: '#282828', color: value <= min ? '#555' : colors['surface/on-dark'], fontSize: 18, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value <= min ? 0.4 : 1, flexShrink: 0 }}
      >−</button>
      <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: -0.5, color: colors['surface/on-dark'], minWidth: 24, textAlign: 'center' }}>{value}</span>
      <button
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: value >= max ? 'not-allowed' : 'pointer', backgroundColor: colors['brand/primary'], color: colors['surface/on-dark'], fontSize: 18, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value >= max ? 0.4 : 1, flexShrink: 0 }}
      >+</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ICON BUTTON — node 1:490
// Filled | Ghost × Default | Hover | Pressed | Disabled
// ─────────────────────────────────────────────────────────────

type IBState = 'default' | 'hover' | 'pressed' | 'disabled';
type IBStyle = 'filled' | 'ghost';

export interface IconButtonProps {
  icon?:     IconType;
  state?:    IBState;
  style?:    IBStyle;
  size?:     IconSize;
  onClick?:  () => void;
}

export function IconButton({
  icon    = 'Arrow left',
  state   = 'default',
  style   = 'filled',
  size    = 24,
  onClick,
}: IconButtonProps) {
  const isFilled   = style === 'filled';
  const isHover    = state === 'hover';
  const isPressed  = state === 'pressed';
  const isDisabled = state === 'disabled';

  const bg = !isFilled       ? 'transparent'
           : isHover         ? '#373737'   // neutral/surface-elevated-hover
           : isPressed       ? '#1e1e1e'   // neutral/surface-pressed
           : '#282828';                    // neutral/surface-elevated

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.35 : 1,
        flexShrink: 0,
        transition: 'background 0.15s',
      }}
    >
      <Icon type={icon} size={size} />
    </div>
  );
}
