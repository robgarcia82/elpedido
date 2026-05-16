import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BottomNavBar, type NavTab } from './_ds-components';

const meta: Meta = {
  title: 'Components/BottomNavBar',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Bottom navigation bar — DS El Pedido (node \`1:126\`).

5 items: Home · Clientes · Pedidos · Estoque · Insights

Tokens: \`icon/active\` (#4C7DFE) · \`icon/inactive\` (#A1A1A1) · \`neutral/background\` (bg)
Typography: Body/NavLabel (Geist Medium 12/16)`,
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
  name: 'Home active',
  render: () => <BottomNavBar activeTab="Home" />,
};

export const PedidosActive: StoryObj = {
  name: 'Pedidos active',
  render: () => <BottomNavBar activeTab="Pedidos" />,
};

export const InsightsActive: StoryObj = {
  name: 'Insights active',
  render: () => <BottomNavBar activeTab="Insights" />,
};
