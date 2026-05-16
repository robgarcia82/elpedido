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
import NumberFlow from '@number-flow/react';
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

// ─────────────────────────────────────────────────────────────
// BUTTON CARD — node 1:278
// Category selection card with icon + label
// ─────────────────────────────────────────────────────────────

export interface ButtonCardProps {
  state?:    'Default' | 'Selected';
  label?:    string;
  showIcon?: boolean;
  icon?:     IconType;
  onClick?:  () => void;
}

export function ButtonCard({
  state    = 'Default',
  label    = 'Value',
  showIcon = true,
  icon     = 'Favoritos',
  onClick,
}: ButtonCardProps) {
  const isSelected = state === 'Selected';
  return (
    <div onClick={onClick} style={{
      width: 120, height: 88, borderRadius: 16,
      backgroundColor: isSelected ? '#2b3bb3' : '#1f1f1f',
      padding: '8px 12px 12px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: showIcon ? 'space-between' : 'flex-end',
      cursor: 'pointer', boxSizing: 'border-box', flexShrink: 0,
      transition: 'background 0.15s',
    }}>
      {showIcon && <div style={{ width: 24, height: 24 }}><Icon type={icon} size={24} /></div>}
      <span style={{
        fontSize: 14, fontWeight: 500, lineHeight: '16px',
        color: isSelected ? '#fafafa' : '#a8a29e',
        fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap',
      }}>{label}</span>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// BALANCE CARD — node 146:366 (DS El Pedido)
// bg: #1f1f1f, radius/md=16, 215px tall, full-width
// 3 decorative image layers + content (title + value + comparison)
// ─────────────────────────────────────────────────────────────

export interface BalanceCardProps {
  title?:  string;
  value?:  string;
  sign?:   string;
  amount?: string;
}

export function BalanceCard({
  title  = 'Balanço do mês',
  value  = 'R$ 8.982',
  sign   = '+',
  amount = 'R$ 392',
}: BalanceCardProps) {
  // Parse numeric values for NumberFlow animation
  const parseNum = (v: string) => parseFloat(v.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
  const valueNum  = parseNum(value);
  const amountNum = parseNum(amount);
  const valuePrefix  = value.match(/^[^0-9]*/)?.[0] ?? '';
  const amountPrefix = amount.match(/^[^0-9]*/)?.[0] ?? '';

  // Animate from 0 on mount
  const [animated, setAnimated] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      width: '100%', height: 215,
      backgroundColor: '#1f1f1f',
      borderRadius: 16, overflow: 'hidden', position: 'relative',
      fontFamily: 'Geist, system-ui, sans-serif', flexShrink: 0,
    }}>
      {/* Background image — local asset (no expiry) */}
      <img
        src="./BalanceCardBG.png"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />
      {/* Content — left:16 top:16, flex-col gap:64 */}
      <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'flex-start', overflow: 'hidden' }}>
        <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '28px', color: '#808080', margin: 0, flexShrink: 0 }}>
          {title}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', flexShrink: 0, letterSpacing: -0.5, whiteSpace: 'nowrap' }}>
          {/* Animated value — Heading/Hero 48px */}
          <NumberFlow
            value={animated ? valueNum : 0}
            prefix={valuePrefix}
            locales="pt-BR"
            respectMotionPreference={false}
            transformTiming={{ duration: 2000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            spinTiming={{ duration: 2000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            opacityTiming={{ duration: 600, easing: 'ease-out' }}
            style={{
              fontSize: 48, fontWeight: 400, color: '#ffffff',
              lineHeight: 1, letterSpacing: -0.5,
              fontVariantNumeric: 'tabular-nums',
              '--number-flow-mask-height': '0.2em',
            } as React.CSSProperties}
          />
          {/* Animated comparison — Body/Comparison 16px */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#6cb527', margin: 0 }}>{sign}</p>
            <NumberFlow
              value={animated ? amountNum : 0}
              prefix={amountPrefix}
              locales="pt-BR"
              respectMotionPreference={false}
              transformTiming={{ duration: 1800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              spinTiming={{ duration: 1800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              opacityTiming={{ duration: 500, easing: 'ease-out' }}
              style={{
                fontSize: 16, fontWeight: 500, color: '#6cb527',
                letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums',
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOTTOM NAV BAR — node 1:126
// 5 items: Home | Clientes | Pedidos | Estoque | Insights
// Active: icon/active (#4C7DFE) · Inactive: icon/inactive (#A1A1A1)
// ─────────────────────────────────────────────────────────────

export type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';

const NAV_ICON_PATHS: Record<NavTab, React.ReactNode> = {
  Home: (
    <svg viewBox="0 0 22 21" fill="currentColor">
      <path d="M3 20V10.625L1.2 12L0 10.4L3 8.1V5H5V6.575L11 2L22 10.4L20.8 11.975L19 10.625V20H3ZM5 18H10V14H12V18H17V9.1L11 4.525L5 9.1V18ZM3 4C3 3.16667 3.29167 2.45833 3.875 1.875C4.45833 1.29167 5.16667 1 6 1C6.28333 1 6.52083 0.904167 6.7125 0.7125C6.90417 0.520833 7 0.283333 7 0H9C9 0.833333 8.70833 1.54167 8.125 2.125C7.54167 2.70833 6.83333 3 6 3C5.71667 3 5.47917 3.09583 5.2875 3.2875C5.09583 3.47917 5 3.71667 5 4H3Z" />
    </svg>
  ),
  Clientes: (
    <svg viewBox="0 0 22 22" fill="currentColor">
      <path d="M16.675 5.325C18.225 6.875 19 8.76667 19 11C19 13.2333 18.225 15.125 16.675 16.675C15.125 18.225 13.2333 19 11 19C8.76667 19 6.875 18.225 5.325 16.675C3.775 15.125 3 13.2333 3 11C3 8.76667 3.775 6.875 5.325 5.325C6.875 3.775 8.76667 3 11 3C13.2333 3 15.125 3.775 16.675 5.325ZM15.25 15.25C16.4167 14.0833 17 12.6667 17 11C17 9.33333 16.4167 7.91667 15.25 6.75C14.0833 5.58333 12.6667 5 11 5C9.33333 5 7.91667 5.58333 6.75 6.75C5.58333 7.91667 5 9.33333 5 11C5 12.6667 5.58333 14.0833 6.75 15.25C7.91667 16.4167 9.33333 17 11 17C12.6667 17 14.0833 16.4167 15.25 15.25ZM13.15 13.8125C13.7833 13.3542 14.2333 12.75 14.5 12H7.5C7.76667 12.75 8.21667 13.3542 8.85 13.8125C9.48333 14.2708 10.2 14.5 11 14.5C11.8 14.5 12.5167 14.2708 13.15 13.8125ZM7.7875 9.7125C7.97917 9.90417 8.21667 10 8.5 10C8.78333 10 9.02083 9.90417 9.2125 9.7125C9.40417 9.52083 9.5 9.28333 9.5 9C9.5 8.71667 9.40417 8.47917 9.2125 8.2875C9.02083 8.09583 8.78333 8 8.5 8C8.21667 8 7.97917 8.09583 7.7875 8.2875C7.59583 8.47917 7.5 8.71667 7.5 9C7.5 9.28333 7.59583 9.52083 7.7875 9.7125ZM12.7875 9.7125C12.9792 9.90417 13.2167 10 13.5 10C13.7833 10 14.0208 9.90417 14.2125 9.7125C14.4042 9.52083 14.5 9.28333 14.5 9C14.5 8.71667 14.4042 8.47917 14.2125 8.2875C14.0208 8.09583 13.7833 8 13.5 8C13.2167 8 12.9792 8.09583 12.7875 8.2875C12.5958 8.47917 12.5 8.71667 12.5 9C12.5 9.28333 12.5958 9.52083 12.7875 9.7125ZM0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5V2H2V5H0ZM5 22H2C1.45 22 0.979167 21.8042 0.5875 21.4125C0.195833 21.0208 0 20.55 0 20V17H2V20H5V22ZM17 22V20H20V17H22V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H17ZM20 5V2H17V0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V5H20Z" />
    </svg>
  ),
  Pedidos: (
    <svg viewBox="0 0 18 20" fill="currentColor">
      <path d="M5.7125 15.2361C5.90417 15.0231 6 14.7593 6 14.4444C6 14.1296 5.90417 13.8657 5.7125 13.6528C5.52083 13.4398 5.28333 13.3333 5 13.3333C4.71667 13.3333 4.47917 13.4398 4.2875 13.6528C4.09583 13.8657 4 14.1296 4 14.4444C4 14.7593 4.09583 15.0231 4.2875 15.2361C4.47917 15.4491 4.71667 15.5556 5 15.5556C5.28333 15.5556 5.52083 15.4491 5.7125 15.2361ZM5.7125 10.7917C5.90417 10.5787 6 10.3148 6 10C6 9.68519 5.90417 9.4213 5.7125 9.20833C5.52083 8.99537 5.28333 8.88889 5 8.88889C4.71667 8.88889 4.47917 8.99537 4.2875 9.20833C4.09583 9.4213 4 9.68519 4 10C4 10.3148 4.09583 10.5787 4.2875 10.7917C4.47917 11.0046 4.71667 11.1111 5 11.1111C5.28333 11.1111 5.52083 11.0046 5.7125 10.7917ZM5.7125 6.34722C5.90417 6.13426 6 5.87037 6 5.55556C6 5.24074 5.90417 4.97685 5.7125 4.76389C5.52083 4.55093 5.28333 4.44444 5 4.44444C4.71667 4.44444 4.47917 4.55093 4.2875 4.76389C4.09583 4.97685 4 5.24074 4 5.55556C4 5.87037 4.09583 6.13426 4.2875 6.34722C4.47917 6.56019 4.71667 6.66667 5 6.66667C5.28333 6.66667 5.52083 6.56019 5.7125 6.34722ZM8 15.5556H14V13.3333H8V15.5556ZM8 11.1111H14V8.88889H8V11.1111ZM8 6.66667H14V4.44444H8V6.66667ZM2 20C1.45 20 0.979167 19.7824 0.5875 19.3472C0.195833 18.912 0 18.3889 0 17.7778V2.22222C0 1.61111 0.195833 1.08796 0.5875 0.652778C0.979167 0.217593 1.45 0 2 0H16C16.55 0 17.0208 0.217593 17.4125 0.652778C17.8042 1.08796 18 1.61111 18 2.22222V17.7778C18 18.3889 17.8042 18.912 17.4125 19.3472C17.0208 19.7824 16.55 20 16 20H2ZM2 17.7778H16V2.22222H2V17.7778Z" />
    </svg>
  ),
  Estoque: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3ZM3 18H17V7H3V18ZM2 5H18V2H2V5ZM8 13H12V11H8V13Z" />
    </svg>
  ),
  Insights: (
    <svg viewBox="0 0 22 22" fill="currentColor">
      <path d="M10 21.975V14.975L4.525 17.9L3.5 16.1L9.375 13L3.5 9.9L4.525 8.1L10 11.025V4H12V11.025L17.475 8.1L18.5 9.9L12.625 13L18.5 16.1L17.475 17.9L12 14.975V21.975H10Z" />
    </svg>
  ),
};

const NAV_TABS: NavTab[] = ['Home', 'Clientes', 'Pedidos', 'Estoque', 'Insights'];

export interface BottomNavBarProps {
  activeTab?:  NavTab;
  onTabChange?: (tab: NavTab) => void;
}

export function BottomNavBar({ activeTab = 'Home', onTabChange }: BottomNavBarProps) {
  return (
    <div style={{
      width: '100%', height: 72,
      display: 'flex', alignItems: 'center',
      backgroundColor: '#1f1f1f',       // neutral/background
      boxShadow: '0 -1px 8px rgba(0,0,0,0.3)',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {NAV_TABS.map(tab => {
        const isActive = tab === activeTab;
        const c = isActive ? '#4C7DFE' : '#A1A1A1'; // icon/active | icon/inactive
        return (
          <button key={tab} onClick={() => onTabChange?.(tab)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 4, padding: '12px 0',
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <span style={{ display: 'inline-flex', width: 24, height: 24, color: c, flexShrink: 0, overflow: 'hidden' }}>
              {NAV_ICON_PATHS[tab]}
            </span>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: c }}>
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const DS_ICON_TYPES = ICON_TYPES;
