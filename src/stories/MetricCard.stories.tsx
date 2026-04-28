import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from '../components/MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'KPI metric card with title, currency, number, and a comparison indicator.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Metric label (rendered uppercase)' },
    currency: { control: 'text', description: 'Currency symbol (R$, $, €)' },
    number: { control: 'text', description: 'Numeric value' },
    percentage: { control: 'text', description: 'Change percentage (green)' },
    description: { control: 'text', description: 'Comparison period (muted)' },
    width: { control: { type: 'range', min: 140, max: 361, step: 1 }, description: 'Card width in px' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const TicketMedio: Story = {
  name: 'Ticket médio',
  args: {
    title: 'Ticket médio',
    currency: 'R$',
    number: '38,90',
    percentage: '20%',
    description: 'mês a mês',
    width: 199,
  },
};
