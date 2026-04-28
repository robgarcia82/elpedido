import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BalanceCard } from '../components/BalanceCard';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { TabBar } from '../components/TabBar';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';

const TABS = [
  { label: 'Vendas', value: 'vendas' },
  { label: 'Clientes', value: 'clientes' },
  { label: 'Produtos', value: 'produtos' },
  { label: 'Dicas', value: 'dicas' },
];

function HomeScreenPreview() {
  const [activeTab, setActiveTab] = useState('vendas');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');

  return (
    <div style={{
      width: 393, height: 852,
      backgroundColor: '#0E0E0E',
      position: 'relative', overflow: 'hidden',
      borderRadius: 40, border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
    }}>
      <div style={{ overflowY: 'auto', height: 'calc(100% - 72px)', padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <BalanceCard title="Balanço do mês" value="R$ 8.982" sign="+" amount="R$ 392" />
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', gap: 8 }}>
          <MetricCard title="Ticket médio" currency="R$" number="38,90" percentage="20%" description="mês a mês" width={175} />
          <MetricCard title="Lucro no mês" currency="R$" number="5.304" percentage="18%" description="de margem" width={175} />
        </div>
        <ChartCard title="Vendas em Abril" />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavBar activeTab={activeNav} onTabChange={setActiveNav} />
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Screens/HomeScreen',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <HomeScreenPreview />,
};
