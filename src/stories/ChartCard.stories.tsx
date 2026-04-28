import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard } from '../components/ChartCard';

const meta: Meta<typeof ChartCard> = {
  title: 'Components/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Bar chart card. 45 bars using brand/accent color with grid lines and x-axis labels.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChartCard>;

export const Default: Story = { args: { title: 'Vendas em Abril' } };
export const CustomTitle: Story = { name: 'Custom title', args: { title: 'Pedidos em Maio' } };
