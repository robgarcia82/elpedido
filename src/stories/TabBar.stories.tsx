import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TabBar } from '../components/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Horizontal tab navigation with animated sliding indicator.',
      },
    },
  },
};

export default meta;

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

export const Interactive: StoryObj = {
  name: 'Interactive — animated indicator',
  render: () => {
    const [active, setActive] = useState('vendas');
    return <TabBar tabs={SALES_TABS} activeTab={active} onTabChange={setActive} />;
  },
};

export const PeriodTabs: StoryObj = {
  name: 'Period tabs',
  render: () => {
    const [active, setActive] = useState('month');
    return <TabBar tabs={PERIOD_TABS} activeTab={active} onTabChange={setActive} />;
  },
};

export const TwoTabs: StoryObj = {
  name: '2 tabs',
  render: () => {
    const [active, setActive] = useState('resumo');
    return (
      <TabBar
        tabs={[{ label: 'Resumo', value: 'resumo' }, { label: 'Detalhes', value: 'detalhes' }]}
        activeTab={active}
        onTabChange={setActive}
      />
    );
  },
};
