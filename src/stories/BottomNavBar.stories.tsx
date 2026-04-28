import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';

const meta: Meta<typeof BottomNavBar> = {
  title: 'Components/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bottom navigation bar with 5 items. Composition of BottomNavItem instances. Active item uses icon/active (#4C7DFE). Inactive uses icon/inactive (#A1A1A1).',
      },
    },
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavBar>;

// --- Interactive ---
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [active, setActive] = useState<NavTab>('Home');
    return (
      <div style={{ width: 393, position: 'relative', height: 120 }}>
        <BottomNavBar activeTab={active} onTabChange={setActive} />
        <div style={{ padding: '12px 16px', color: '#888', fontSize: 13 }}>
          Active: <strong style={{ color: '#4C7DFE' }}>{active}</strong>
        </div>
      </div>
    );
  },
};

// --- Home active ---
export const HomeActive: Story = {
  name: 'Home active',
  args: {
    activeTab: 'Home',
    onTabChange: () => {},
  },
};

// --- Pedidos active ---
export const PedidosActive: Story = {
  name: 'Pedidos active',
  args: {
    activeTab: 'Pedidos',
    onTabChange: () => {},
  },
};

// --- Insights active ---
export const InsightsActive: Story = {
  name: 'Insights active',
  args: {
    activeTab: 'Insights',
    onTabChange: () => {},
  },
};
