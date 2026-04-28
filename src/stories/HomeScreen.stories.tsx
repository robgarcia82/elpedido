import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BalanceCard } from '../components/BalanceCard';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { TabBar } from '../components/TabBar';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';
import { colors, spacing } from '../theme/tokens';

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
    <div
      style={{
        width: 393,
        height: 852,
        backgroundColor: colors['system/background'],
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 40,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
      }}
    >
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <span style={{ color: '#fff', fontSize: 14, fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>9:30</span>
        <span style={{ color: '#fff', fontSize: 12, fontFamily: 'Geist, sans-serif', opacity: 0.8 }}>▲ ▲ ▌</span>
      </div>

      {/* Scrollable content */}
      <div style={{ overflowY: 'auto', height: 'calc(100% - 44px - 72px)', paddingBottom: 16 }}>
        {/* Balance Card */}
        <div style={{ padding: `${spacing[16]}px` }}>
          <BalanceCard title="Balanço do mês" value="R$ 8.982" sign="+" amount="R$ 392" />
        </div>

        {/* Tab Bar */}
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Metric Cards + Chart */}
        <div style={{ padding: `${spacing[16]}px`, display: 'flex', flexDirection: 'column', gap: spacing[8] }}>
          <div style={{ display: 'flex', gap: spacing[8] }}>
            <MetricCard title="Ticket médio" currency="R$" number="38,90" percentage="20%" description="mês a mês" width={175} />
            <MetricCard title="Lucro no mês" currency="R$" number="5.304" percentage="18%" description="de margem" width={175} />
          </div>
          <ChartCard title="Vendas em Abril" />
        </div>
      </div>

      {/* Bottom Nav */}
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
    docs: {
      description: {
        component: 'Full Home screen composition using all DS El Pedido components.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <HomeScreenPreview />,
};
