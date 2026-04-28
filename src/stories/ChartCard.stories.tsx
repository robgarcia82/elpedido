import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard } from '../components/ChartCard';

const meta: Meta<typeof ChartCard> = {
  title: 'Components/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bar chart card for data visualization. Displays hourly sales data with grid lines and x-axis time labels. Bars use brand/accent color.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Chart heading' },
  },
};

export default meta;
type Story = StoryObj<typeof ChartCard>;

// --- Default ---
export const Default: Story = {
  args: {
    title: 'Vendas em Abril',
  },
};

// --- Custom title ---
export const CustomTitle: Story = {
  name: 'Custom title',
  args: {
    title: 'Pedidos em Maio',
  },
};

// --- Long title ---
export const LongTitle: Story = {
  name: 'Long title',
  args: {
    title: 'Faturamento diário — Q2 2025',
  },
};
