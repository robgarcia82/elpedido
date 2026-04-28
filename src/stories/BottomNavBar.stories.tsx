import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';
const NAV_ITEMS: { label: string; tab: NavTab }[] = [
  { label: 'Home', tab: 'Home' }, { label: 'Clientes', tab: 'Clientes' },
  { label: 'Pedidos', tab: 'Pedidos' }, { label: 'Estoque', tab: 'Estoque' },
  { label: 'Insights', tab: 'Insights' },
];

// Icon SVGs
const ICONS: Record<string, string> = {
  Home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  Clientes: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  Pedidos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
  Estoque: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4v2l4 4v12l4 2 4-2V8l4-4V2z"/></svg>`,
  Insights: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>`,
};

function BottomNavBar({ activeTab, onTabChange }: { activeTab: NavTab; onTabChange: (t: NavTab) => void }) {
  return (
    <div style={{ width: 393, height: 72, display: 'flex', alignItems: 'center', backgroundColor: colors['neutral/background'], boxShadow: '0 -1px 8px rgba(0,0,0,0.3)', fontFamily: 'Geist, system-ui, sans-serif' }}>
      {NAV_ITEMS.map(({ label, tab }) => {
        const isActive = tab === activeTab;
        const c = isActive ? colors['icon/active'] : colors['icon/inactive'];
        return (
          <button key={tab} onClick={() => onTabChange(tab)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[4], padding: `${spacing[12]}px 0`, background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ color: c, display: 'flex' }} dangerouslySetInnerHTML={{ __html: ICONS[tab].replace('fill="currentColor"', `fill="${c}"`) }} />
            <span style={{ fontSize: textStyles['Body/NavLabel'].fontSize, fontWeight: textStyles['Body/NavLabel'].fontWeight, color: c }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

const meta: Meta = { title: 'Components/BottomNavBar', parameters: { backgrounds: { default: 'dark' }, layout: 'fullscreen' } };
export default meta;

export const Interactive: StoryObj = { name: 'Interactive', render: () => { const [a, sA] = useState<NavTab>('Home'); return <BottomNavBar activeTab={a} onTabChange={sA} />; } };
export const HomeActive: StoryObj = { name: 'Home active', render: () => <BottomNavBar activeTab="Home" onTabChange={() => {}} /> };
export const PedidosActive: StoryObj = { name: 'Pedidos active', render: () => <BottomNavBar activeTab="Pedidos" onTabChange={() => {}} /> };
