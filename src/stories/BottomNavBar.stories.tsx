import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';

// Same SVG paths as Icon component
const ICON_PATHS: Record<NavTab, React.ReactNode> = {
  Home:     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  Clientes: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  Pedidos:  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />,
  Estoque:  <path d="M20 2H4v2l4 3.4V21l4-2 4 2V7.4L20 4V2z" />,
  Insights: <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />,
};

const NAV_ITEMS = Object.keys(ICON_PATHS) as NavTab[];

function Icon({ type, color }: { type: NavTab; color: string }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
      {ICON_PATHS[type]}
    </svg>
  );
}

function BottomNavBar({ activeTab, onTabChange }: { activeTab: NavTab; onTabChange: (t: NavTab) => void }) {
  return (
    <div style={{ width: 393, height: 72, display: 'flex', alignItems: 'center', backgroundColor: colors['neutral/background'], boxShadow: '0 -1px 8px rgba(0,0,0,0.3)', fontFamily: 'Geist, system-ui, sans-serif' }}>
      {NAV_ITEMS.map(tab => {
        const isActive = tab === activeTab;
        const c = isActive ? colors['icon/active'] : colors['icon/inactive'];
        return (
          <button key={tab} onClick={() => onTabChange(tab)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: spacing[4], padding: `${spacing[12]}px 0`, background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icon type={tab} color={c} />
            <span style={{ fontSize: textStyles['Body/NavLabel'].fontSize, fontWeight: textStyles['Body/NavLabel'].fontWeight, color: c, fontFamily: 'inherit' }}>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

const meta: Meta = {
  title: 'Components/BottomNavBar',
  parameters: { backgrounds: { default: 'dark' }, layout: 'fullscreen' },
  docs: {
    description: {
      component: 'Bottom navigation bar using Icon component for all icons. Active: icon/active (#4C7DFE). Inactive: icon/inactive (#A1A1A1).',
    },
  },
};
export default meta;

export const Interactive: StoryObj = {
  name: 'Interactive',
  render: () => {
    const [active, setActive] = useState<NavTab>('Home');
    return <BottomNavBar activeTab={active} onTabChange={setActive} />;
  },
};

export const HomeActive: StoryObj = { name: 'Home active', render: () => <BottomNavBar activeTab="Home" onTabChange={() => {}} /> };
export const PedidosActive: StoryObj = { name: 'Pedidos active', render: () => <BottomNavBar activeTab="Pedidos" onTabChange={() => {}} /> };
export const InsightsActive: StoryObj = { name: 'Insights active', render: () => <BottomNavBar activeTab="Insights" onTabChange={() => {}} /> };
