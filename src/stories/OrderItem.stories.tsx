import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing } from '../theme/tokens';

function QtyBadge({ qty }: { qty: number }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: colors['neutral/surface-elevated'], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 500, color: colors['neutral/text-secondary'], lineHeight: 1 }}>{qty}</span>
    </div>
  );
}

function OrderItem({ qty = 1, name = 'Pastel de carne' }: { qty?: number; name?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <QtyBadge qty={qty} />
      <span style={{ fontSize: 12, fontWeight: 500, color: colors['neutral/text-secondary'], whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}

const ITEMS = [{ qty: 2, name: 'Pastel de carne' }, { qty: 1, name: 'Kibe sem cebola' }, { qty: 1, name: 'Coxinha' }, { qty: 2, name: 'Coca Cola' }, { qty: 1, name: 'Coca cola Zero' }];

const meta: Meta = { title: 'Components/OrderItem', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const Default: StoryObj = { render: () => <OrderItem /> };
export const List: StoryObj = { name: 'Product list', render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{ITEMS.map((p, i) => <OrderItem key={i} {...p} />)}</div> };
