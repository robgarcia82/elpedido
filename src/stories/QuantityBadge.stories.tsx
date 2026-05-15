import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';
import { QuantityBadge } from './_ds-components';

const meta: Meta = { title: 'Components/QuantityBadge', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const Default: StoryObj = { render: () => <QuantityBadge qty={1} /> };
export const Multiple: StoryObj = {
  name: 'Multiple quantities',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {[1, 2, 3, 5, 10, 99].map(qty => (
        <div key={qty} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <QuantityBadge qty={qty} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], fontFamily: 'Geist, sans-serif' }}>×{qty}</span>
        </div>
      ))}
    </div>
  ),
};
export const InContext: StoryObj = {
  name: 'In order item context',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Geist, system-ui, sans-serif' }}>
      {[{ qty: 2, name: 'Pastel de carne' }, { qty: 1, name: 'Coxinha' }, { qty: 3, name: 'Coca Cola' }].map(({ qty, name }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <QuantityBadge qty={qty} />
          <span style={{ fontSize: 12, color: colors['neutral/text-secondary'] }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
