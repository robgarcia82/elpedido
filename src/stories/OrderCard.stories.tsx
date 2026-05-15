/**
 * OrderCard — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 6:470
 *
 * Props (mirrors Figma):
 *   property1: "Default" | "homecard"
 *
 * Default:  CustomerAvatar + ProductList + ActionStack (Próximo / Editar / + item)
 * Homecard: Date (12/04) + Day (Domingo) + ProductList — sem action stack
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

// ── Tokens ─────────────────────────────────────────────────────
const T = {
  cardBg:       '#1b1b1b',             // ordercard/bg
  cardRadius:   16,                    // ordercard/radius
  cardPadding:  spacing[16],           // ordercard/padding
  badgeBg:      '#282828',             // badge/bg
  badgeText:    '#a8a29e',             // badge/text
  badgeRadius:  4,                     // badge/radius
  itemText:     '#a8a29e',             // orderitem/text
  itemGap:      spacing[12],           // orderitem/gap
  avatarBg:     '#282828',             // avatar/placeholder-bg
  avatarName:   colors['surface/on-dark'],   // avatar/name
  avatarPhone:  '#a1a1a1',             // avatar/phone
  btnPrimary:   '#2b3bb3',             // button/primary-bg
  btnSecondary: 'rgba(161,161,161,0.25)', // button/secondary-border
  btnText:      colors['surface/on-dark'], // button text
};

// ── Sub-components ─────────────────────────────────────────────

function QuantityBadge({ qty }: { qty: number }) {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: T.badgeRadius,
      backgroundColor: T.badgeBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 10, fontWeight: 500, lineHeight: '12px', color: T.badgeText, fontFamily: 'Geist, system-ui, sans-serif' }}>
        {qty}
      </span>
    </div>
  );
}

function OrderItem({ qty, name }: { qty: number; name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: T.itemGap, height: 20, flexShrink: 0 }}>
      <QuantityBadge qty={qty} />
      <span style={{ fontSize: 10, fontWeight: 500, lineHeight: '12px', color: T.itemText, fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </div>
  );
}

function CustomerAvatar({ name, phone }: { name: string; phone: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, width: 91, flexShrink: 0 }}>
      {/* Photo circle */}
      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: T.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: T.avatarPhone, fontFamily: 'Geist, system-ui, sans-serif' }}>
          {initials}
        </span>
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, overflow: 'hidden' }}>
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.5px', color: T.avatarName, fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
          {name}
        </span>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: T.avatarPhone, fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
          {phone}
        </span>
      </div>
    </div>
  );
}

// Action button — compact (12px, py-8, px-12)
function ActionBtn({ label, variant = 'secondary', width }: { label: string; variant?: 'primary' | 'secondary'; width?: number }) {
  return (
    <div style={{
      backgroundColor: variant === 'primary' ? T.btnPrimary : T.btnSecondary,
      borderRadius: radius.full,
      paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 12, flexShrink: 0, cursor: 'pointer',
      width: width,
    }}>
      <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: T.btnText, fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  );
}

// ── OrderCard ──────────────────────────────────────────────────
interface OrderCardProps {
  property1?: 'Default' | 'homecard';
  customer?: { name: string; phone: string };
  products?: { qty: number; name: string }[];
  date?: string;
  day?: string;
}

const DEFAULT_PRODUCTS = [
  { qty: 2, name: 'Pastel de carne' },
  { qty: 1, name: 'Kibe sem cebola' },
  { qty: 1, name: 'Coxinha' },
  { qty: 2, name: 'Coca Cola' },
  { qty: 1, name: 'Coca cola Zero' },
];

function OrderCard({
  property1 = 'Default',
  customer = { name: 'Renato C.', phone: '(11) 98580-6049' },
  products = DEFAULT_PRODUCTS,
  date = '12/04',
  day = 'Domingo',
}: OrderCardProps) {
  const isDefault  = property1 === 'Default';
  const isHomecard = property1 === 'homecard';

  return (
    <div style={{
      backgroundColor: T.cardBg,
      borderRadius: T.cardRadius,
      padding: T.cardPadding,
      width: 344,
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {/* Content row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        overflow: 'hidden',
        width: '100%',
      }}>
        {/* Left */}
        <div style={{
          display: 'flex',
          flex: isHomecard ? '1 0 0' : undefined,
          alignItems: isHomecard ? 'center' : 'flex-start',
          justifyContent: isDefault ? 'center' : undefined,
          gap: 16,
          overflow: 'hidden',
          flexShrink: isDefault ? 0 : undefined,
          minWidth: isHomecard ? 0 : undefined,
        }}>
          {/* Default: CustomerAvatar */}
          {isDefault && (
            <CustomerAvatar name={customer.name} phone={customer.phone} />
          )}

          {/* Homecard: Date + Day */}
          {isHomecard && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '24px', color: T.avatarName, fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {date}
                  </span>
                </div>
              </div>
              <div style={{ width: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: T.avatarName, fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {day}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Product list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', overflow: 'hidden', flexShrink: 0 }}>
            {products.map((p, i) => <OrderItem key={i} qty={p.qty} name={p.name} />)}
          </div>
        </div>

        {/* Right: ActionStack — Default only */}
        {isDefault && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 112,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <ActionBtn label="Próximo" variant="primary" />
            <ActionBtn label="Editar"  variant="secondary" width={70} />
            <ActionBtn label="+ item"  variant="secondary" width={70} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Meta ────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/OrderCard',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
    docs: {
      description: {
        component: `Order card — DS El Pedido (Figma node \`6:470\`).

**property1=Default** — CustomerAvatar + ProductList + ActionStack (Próximo / Editar / + item)
**property1=homecard** — Data + Dia + ProductList, sem action stack

Width: 344px (fixo) · bg: \`ordercard/bg\` (#1b1b1b) · radius: 16px · padding: 16px`,
      },
    },
  },
};
export default meta;

// ── Stories ────────────────────────────────────────────────────

export const Default: StoryObj = {
  name: 'property1=Default',
  render: () => <OrderCard property1="Default" />,
};

export const Homecard: StoryObj = {
  name: 'property1=homecard',
  render: () => <OrderCard property1="homecard" />,
};

export const BothVariants: StoryObj = {
  name: 'Both variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <OrderCard property1="Default" />
      <OrderCard property1="homecard" />
    </div>
  ),
};

export const FewItems: StoryObj = {
  name: 'Few items',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <OrderCard property1="Default" customer={{ name: 'Maria S.', phone: '(21) 99876-5432' }} products={[{ qty: 1, name: 'Coxinha' }, { qty: 2, name: 'Suco de laranja' }]} />
      <OrderCard property1="homecard" date="15/05" day="Quinta" products={[{ qty: 1, name: 'Hamburguer' }, { qty: 1, name: 'Batata frita' }]} />
    </div>
  ),
};

export const KanbanColumn: StoryObj = {
  name: 'Multiple cards',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <span style={{ color: colors['neutral/text-muted'], fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Em andamento · 2 pedidos</span>
      <OrderCard property1="Default" />
      <OrderCard property1="Default" customer={{ name: 'Ana M.', phone: '(21) 99876-5432' }} products={[{ qty: 1, name: 'Hamburguer' }, { qty: 1, name: 'Batata frita' }, { qty: 2, name: 'Refrigerante' }]} />
    </div>
  ),
};
