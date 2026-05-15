/**
 * OrderCard — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 6:470
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
      backgroundColor: '#1b1b1b',      // ordercard/bg
      borderRadius: 16,                 // ordercard/radius
      padding: spacing[16],             // ordercard/padding
      width: 344,
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {/* content row — align-items:center distributes all groups centered vertically */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>

        {/* left — avatar/date + product list, centered relative to each other */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexShrink: 0,
        }}>
          {/* Default: CustomerAvatar (node 1:626) */}
          {isDefault && (
            <CustomerAvatar name={customer.name} phone={customer.phone} />
          )}

          {/* Homecard: Date + Day — natural height, centered by parent */}
          {isHomecard && (
            <div style={{
              width: 91,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12, flexShrink: 0,
            }}>
              <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '24px', color: colors['surface/on-dark'], fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                {date}
              </span>
              <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: colors['surface/on-dark'], fontFamily: 'Geist, system-ui, sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }}>
                {day}
              </span>
            </div>
          )}

          {/* product-list — natural height, centered by parent alignItems:center */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 4, alignItems: 'flex-start',
            flexShrink: 0,
          }}>
            {products.map((p, i) => <OrderItem key={i} qty={p.qty} name={p.name} />)}
          </div>
        </div>

        {/* action-stack — centered by content row alignItems:center */}
        {isDefault && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 8, alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <Button tertiary="Primary"   size="Small" label="Próximo" autoWidth />
            <Button tertiary="Secondary" size="Small" label="Editar"  width={70} />
            <Button tertiary="Secondary" size="Small" label="+ item"  width={70} />
          </div>
        )}
      </div>
    </div>
  );
}

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
