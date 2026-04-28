import type { Preview } from '@storybook/react';
import React from 'react';
import { colors } from '../src/theme/tokens';

const preview: Preview = {
  parameters: {
    // Dark background matching DS El Pedido
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: colors['system/background'] },
        { name: 'elevated', value: colors['neutral/background'] },
        { name: 'surface', value: colors['neutral/surface-elevated'] },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    // Mobile viewport presets
    viewport: {
      viewports: {
        iphone14: {
          name: 'iPhone 14',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        iphone14pro: {
          name: 'iPhone 14 Pro',
          styles: { width: '393px', height: '852px' },
          type: 'mobile',
        },
        pixel7: {
          name: 'Pixel 7',
          styles: { width: '412px', height: '915px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'iphone14',
    },
    controls: {
      matchers: {
        color: /(background|color|fill|bg)$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          ['BalanceCard', 'MetricCard', 'ChartCard', 'TabBar', 'BottomNavBar'],
          'Screens',
        ],
      },
    },
  },

  // Global decorator: dark background + centered
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        {
          style: {
            backgroundColor: colors['system/background'],
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: 'Geist, system-ui, sans-serif',
          },
        },
        React.createElement(Story)
      ),
  ],
};

export default preview;
