/**
 * ShoppingCart — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 1:893
 *
 * Barra inferior do carrinho — 3 variantes:
 *   Default  — resumo + botão "Enviar pedido"
 *   Pressed  — expandido com itens + totais + botão
 *   Buttons  — "Adicionar item" + "Marcar como pago"
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';
import { Button } from './_ds-components';

// ── Tokens ─────────────────────────────────────────────────────
const T = {
  bg:          '#282828',   // color-background-medium
  textInverted: '#ffffff',  // color-text-inverted
  textDefault:  '#a1a1a1',  // color-text-default
  textLabel:    '#ffffff',  // color-text-inverted (price)
  divider:      '#373737',  // color-background-strong
  width:        360,
  font: 'Geist, system-ui, sans-serif',
} as const;

// ── ChevronDown / ChevronUp SVG inline ────────────────────────
const Chevron = ({ up = false }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d={up ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'}
      stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// ── Arrow right inline SVG ────────────────────────────────────
const ArrowRight = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M5 12H19" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Order item row ─────────────────────────────────────────────
function OrderRow({ name, price }: { name: string; price: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
      <span style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: T.textDefault, fontFamily: T.font }}>
        {name}
      </span>
      <span style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: T.textDefault, fontFamily: T.font }}>
        {price}
      </span>
    </div>
  );
}

// ── ShoppingCart ───────────────────────────────────────────────
interface ShoppingCartProps {
  property1?:  'Default' | 'Pressed' | 'Buttons';
  itemCount?:  string;
  totalPrice?: string;
  items?:      { name: string; price: string }[];
}

const DEFAULT_ITEMS = [
  { name: 'Coca-Cola',         price: 'R$ 8,00' },
  { name: 'Coca-Cola Zero',    price: 'R$ 8,00' },
  { name: 'X-Tudo do Patrão X 2', price: 'R$ 36,00' },
];

function ShoppingCart({
  property1  = 'Default',
  itemCount  = '4 itens selecionados',
  totalPrice = 'R$ 88,00',
  items      = DEFAULT_ITEMS,
}: ShoppingCartProps) {
  const isDefault = property1 === 'Default';
  const isPressed = property1 === 'Pressed';
  const isButtons = property1 === 'Buttons';

  return (
    <div style={{
      width:           T.width,
      backgroundColor: T.bg,
      borderRadius:    '16px 16px 0 0', // rounded top corners only
      padding:         spacing[16],
      display:         'flex',
      alignItems:      'flex-start',
      gap:             isButtons ? 16 : undefined,
      justifyContent:  isButtons ? undefined : 'space-between',
      boxSizing:       'border-box',
      boxShadow:       '0px -5px 7.5px rgba(0,0,0,0.6)', // drop-shadow top
      fontFamily:      T.font,
    }}>

      {/* ── Default + Pressed ─────────────────────────────── */}
      {(isDefault || isPressed) && (
        <div style={{ display: 'flex', flex: '1 0 0', flexDirection: 'column', gap: 24, alignItems: 'flex-start', minWidth: 0 }}>

          {/* Top section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: isPressed ? 16 : 0 }}>

            {/* Summary row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '32px', color: T.textInverted, whiteSpace: 'nowrap' }}>
                {itemCount}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', color: T.textInverted, whiteSpace: 'nowrap' }}>
                  {totalPrice}
                </span>
                <Chevron up={isPressed} />
              </div>
            </div>

            {/* Expanded details (Pressed) */}
            {isPressed && (
              <>
                {/* Divider */}
                <div style={{ width: '100%', height: 1, backgroundColor: T.divider }} />
                {/* Items list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                  {items.map((item, i) => (
                    <OrderRow key={i} name={item.name} price={item.price} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Send order button — Button(Primary, Medium) full-width */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 48, width: '100%',
            backgroundColor: colors['brand/primary'], // button/primary-bg
            borderRadius: radius.full,
            paddingLeft: spacing[16], paddingRight: spacing[16],
            paddingTop: 12, paddingBottom: 12,
            boxSizing: 'border-box', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#ffffff', whiteSpace: 'nowrap' }}>
              Enviar pedido
            </span>
            <ArrowRight />
          </div>
        </div>
      )}

      {/* ── Buttons variant ───────────────────────────────── */}
      {isButtons && (
        <>
          {/* "Adicionar item" — Secondary, flex-1 */}
          <div style={{
            flex: '1 0 0', height: 48, minWidth: 0,
            backgroundColor: 'rgba(161,161,161,0.25)', // button/secondary-border
            borderRadius: radius.full,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingLeft: spacing[16], paddingRight: spacing[16],
            cursor: 'pointer', boxSizing: 'border-box',
          }}>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#ffffff', whiteSpace: 'nowrap', fontFamily: T.font }}>
              Adicionar item
            </span>
          </div>

          {/* "Marcar como pago" — Secondary, hug */}
          <div style={{
            height: 48, flexShrink: 0,
            backgroundColor: 'rgba(161,161,161,0.25)',
            borderRadius: radius.full,
            display: 'flex', alignItems: 'center',
            paddingLeft: spacing[16], paddingRight: spacing[16],
            cursor: 'pointer', boxSizing: 'border-box',
          }}>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#ffffff', whiteSpace: 'nowrap', fontFamily: T.font }}>
              Marcar como pago
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Meta ───────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/ShoppingCart',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
    docs: {
      description: {
        component: `Barra inferior do carrinho — DS El Pedido (Figma node \`1:893\`).

**property1=Default** — resumo (itemCount + totalPrice + chevron) + botão "Enviar pedido"  
**property1=Pressed** — expandido com lista de itens + divider + botão  
**property1=Buttons** — dois botões: "Adicionar item" + "Marcar como pago"

Width: 360px · bg: \`color-background-medium\` (#282828) · drop-shadow top`,
      },
    },
  },
};
export default meta;

export const Default: StoryObj = {
  name: 'property1=Default',
  render: () => <ShoppingCart property1="Default" />,
};

export const Pressed: StoryObj = {
  name: 'property1=Pressed (expanded)',
  render: () => <ShoppingCart property1="Pressed" />,
};

export const Buttons: StoryObj = {
  name: 'property1=Buttons',
  render: () => <ShoppingCart property1="Buttons" />,
};

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['Default', 'Pressed', 'Buttons'] as const).map(v => (
        <div key={v}>
          <div style={{ color: '#a1a1a1', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Geist, sans-serif' }}>
            property1={v}
          </div>
          <ShoppingCart property1={v} />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: StoryObj = {
  name: 'Interactive (toggle Default ↔ Pressed)',
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ShoppingCart
          property1={expanded ? 'Pressed' : 'Default'}
          itemCount="4 itens selecionados"
          totalPrice="R$ 88,00"
        />
        <button
          onClick={() => setExpanded(e => !e)}
          style={{ background: 'none', border: '1px solid #373737', borderRadius: 8, color: '#a1a1a1', padding: '6px 16px', cursor: 'pointer', fontFamily: 'Geist, sans-serif', fontSize: 12 }}
        >
          Toggle expanded
        </button>
      </div>
    );
  },
};
