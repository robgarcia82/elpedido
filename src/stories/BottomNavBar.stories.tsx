import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';

const meta: Meta<typeof BottomNavBar> = {
  title: 'Components/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Bottom navigation bar with 5 items. Active: icon/active (#4C7DFE). Inactive: icon/inactive (#A1A1A1).',
      },
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

export const HomeActive: StoryObj = {
  args: { activeTab: 'Home', onTabChange: () => {} },
};

export const PedidosActive: StoryObj = {
  name: 'Pedidos active',
  args: { activeTab: 'Pedidos', onTabChange: () => {} },
};
