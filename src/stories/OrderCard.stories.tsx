/**
 * OrderCard — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 6:470
 * Implementação fiel ao Tailwind gerado pelo Figma.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';
import { Button, QuantityBadge, OrderItem, CustomerAvatar } from './_ds-components';

const DEFAULT_PRODUCTS = [
  { qty: 2, name: 'Pastel de carne' },
  { qty: 1, name: 'Kibe sem cebola' },
  { qty: 1, name: 'Coxinha' },
  { qty: 2, name: 'Coca Cola' },
  { qty: 1, name: 'Coca cola Zero' },
];

interface OrderCardProps {
  property1?: 'Default' | 'homecard';
  customer?:  { name: string; phone: string };
  products?:  { qty: number; name: string }[];
  date?:      string;
  day?:       string;
}

function OrderCard({
  property1 = 'Default',
  customer  = { name: 'Renato C.', phone: '(11) 98580-6049' },
  products  = DEFAULT_PRODUCTS,
  date      = '12/04',
  day       = 'Domingo',
}: OrderCardProps) {
  const isDefault  = property1 === 'Default';
  const isHomecard = property1 === 'homecard';

  return (
    <div style={{
      backgroundColor: '#1b1b1b',
      borderRadius: 16,
      padding: spacing[16],
      width: 344,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}>

      {/* ── DEFAULT ─────────────────────────────────────────────
          content: flex items-center justify-between overflow-clip w-full
          Figma: node 6:417
      ─────────────────────────────────────────────────────── */}
      {isDefault && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          overflow: 'hidden', width: '100%', flexShrink: 0,
        }}>
          {/* left: flex gap-16 justify-center shrink-0 (align-items:stretch = default)
              Children STRETCH vertically to fill left section height.
              Figma: node 6:418 */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
            /* NO alignItems → defaults to stretch */
          }}>
            {/* CustomerAvatar — node 1:626 */}
            <CustomerAvatar name={customer.name} phone={customer.phone} />

            {/* product-list — node 6:420 */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              gap: 4, alignItems: 'flex-start',
              overflow: 'hidden', flexShrink: 0,
            }}>
              {products.map((p, i) => <OrderItem key={i} qty={p.qty} name={p.name} />)}
            </div>
          </div>

          {/* action-stack: flex-col h-112 items-end justify-between shrink-0
              h=112 is the anchor: action-stack defines the content row height.
              Figma: node 6:426 */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            height: 112,
            alignItems: 'flex-end', justifyContent: 'space-between',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <Button tertiary="Primary"   size="Small" label="Próximo" autoWidth />
            <Button tertiary="Secondary" size="Small" label="Editar"  width={70} />
            <Button tertiary="Secondary" size="Small" label="+ item"  width={70} />
          </div>
        </div>
      )}

      {/* ── HOMECARD ────────────────────────────────────────────
          content: flex gap-16 items-center overflow-clip w-full
          (NO justify-between — date+products fill the row)
          Figma: node 6:472
      ─────────────────────────────────────────────────────── */}
      {isHomecard && (
        <div style={{
          display: 'flex', gap: 16, alignItems: 'center',
          overflow: 'hidden', width: '100%',
        }}>
          {/* left: flex flex-1 gap-16 items-center min-w-0
              flex-1 fills available width; items-center centers date vs products.
              Figma: node 6:473 */}
          <div style={{
            display: 'flex', flex: '1 0 0', gap: 16,
            alignItems: 'center', overflow: 'hidden', minWidth: 0,
          }}>
            {/* Date and Day — node 6:521
                Two stacked avatar blocks (date + day), flex-col justify-center */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {/* 12/04 — 18px/24lh */}
              <div style={{ width: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '24px', color: colors['surface/on-dark'], fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {date}
                  </span>
                </div>
              </div>
              {/* Domingo — 12px/16lh */}
              <div style={{ width: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: colors['surface/on-dark'], fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {day}
                  </span>
                </div>
              </div>
            </div>

            {/* product-list — node 6:475
                justify-center: items centered within column height */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              gap: 4, alignItems: 'flex-start', justifyContent: 'center',
              overflow: 'hidden', flexShrink: 0,
            }}>
              {products.map((p, i) => <OrderItem key={i} qty={p.qty} name={p.name} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/OrderCard',
  parameters: { backgrounds: { default: 'dark' }, layout: 'centered' },
};
export default meta;

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
      <OrderCard property1="Default"  customer={{ name: 'Maria S.', phone: '(21) 99876-5432' }} products={[{ qty: 1, name: 'Coxinha' }, { qty: 2, name: 'Suco de laranja' }]} />
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
