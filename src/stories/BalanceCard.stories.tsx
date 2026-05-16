/**
 * BalanceCard — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 146:366
 *
 * Hero balance card com 3 camadas decorativas + conteúdo.
 * Props: title · value · sign · amount
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BalanceCard } from './_ds-components';

const meta: Meta = {
  title: 'Components/BalanceCard',
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title:  { control: 'text' },
    value:  { control: 'text' },
    sign:   { control: { type: 'radio' }, options: ['+', '-'] },
    amount: { control: 'text' },
  },
};
export default meta;

export const Default: StoryObj = {
  render: () => <BalanceCard />,
};

export const NegativeBalance: StoryObj = {
  name: 'Negative balance',
  render: () => <BalanceCard value="R$ 4.210" sign="-" amount="R$ 543" />,
};

export const HighValue: StoryObj = {
  name: 'High value',
  render: () => <BalanceCard value="R$ 42.800" sign="+" amount="R$ 3.200" />,
};

export const CustomTitle: StoryObj = {
  name: 'Custom title',
  render: () => <BalanceCard title="Faturamento de Abril" value="R$ 12.340" sign="+" amount="R$ 1.820" />,
};
