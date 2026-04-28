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
          'KPI metric card with title, currency, number, and a comparison indicator. Used in horizontal scroll for dashboard summaries.',
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

// --- Ticket médio ---
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

// --- Lucro no mês ---
export const LucroMes: Story = {
  name: 'Lucro no mês',
  args: {
    title: 'Lucro no mês',
    currency: 'R$',
    number: '5.304',
    percentage: '18%',
    description: 'de margem',
    width: 199,
  },
};

// --- Vendas totais ---
export const VendasTotais: Story = {
  name: 'Vendas totais',
  args: {
    title: 'Vendas este mês',
    currency: 'R$',
    number: '12.534',
    percentage: '33%',
    description: 'mês a mês',
    width: 199,
  },
};

// --- Full width ---
export const FullWidth: Story = {
  name: 'Full width (361px)',
  args: {
    title: 'Faturamento total',
    currency: 'R$',
    number: '89.200',
    percentage: '12%',
    description: 'vs ano anterior',
    width: 361,
  },
};

// --- USD currency ---
export const USDCurrency: Story = {
  name: 'USD currency',
  args: {
    title: 'Revenue',
    currency: '$',
    number: '24.890',
    percentage: '8%',
    description: 'month over month',
    width: 199,
  },
};
