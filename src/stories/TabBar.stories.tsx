import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TabBar } from '../components/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal tab navigation bar. Supports active state with accent indicator. Place at top of content sections for category/view switching.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

// Tabs data
const SALES_TABS = [
  { label: 'Vendas', value: 'vendas' },
  { label: 'Clientes', value: 'clientes' },
  { label: 'Produtos', value: 'produtos' },
  { label: 'Dicas', value: 'dicas' },
];

const PERIOD_TABS = [
  { label: 'Hoje', value: 'today' },
  { label: '7 dias', value: 'week' },
  { label: '30 dias', value: 'month' },
  { label: '12 meses', value: 'year' },
];

// --- Interactive (with state) ---
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [active, setActive] = useState('vendas');
    return (
      <div style={{ width: 393 }}>
        <TabBar tabs={SALES_TABS} activeTab={active} onTabChange={setActive} />
        <div style={{ padding: 16, color: '#888', fontSize: 13 }}>
          Active tab: <strong style={{ color: '#fff' }}>{active}</strong>
        </div>
      </div>
    );
  },
};

// --- Default (Vendas active) ---
export const VendasActive: Story = {
  name: 'Vendas active',
  args: {
    tabs: SALES_TABS,
    activeTab: 'vendas',
    onTabChange: () => {},
  },
};

// --- Clientes active ---
export const ClientesActive: Story = {
  name: 'Clientes active',
  args: {
    tabs: SALES_TABS,
    activeTab: 'clientes',
    onTabChange: () => {},
  },
};

// --- Period tabs ---
export const PeriodTabs: Story = {
  name: 'Period tabs',
  args: {
    tabs: PERIOD_TABS,
    activeTab: 'month',
    onTabChange: () => {},
  },
};

// --- 2 tabs ---
export const TwoTabs: Story = {
  name: '2 tabs',
  args: {
    tabs: [
      { label: 'Resumo', value: 'resumo' },
      { label: 'Detalhes', value: 'detalhes' },
    ],
    activeTab: 'resumo',
    onTabChange: () => {},
  },
};
