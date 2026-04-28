import type { Meta, StoryObj } from '@storybook/react';
import { BalanceCard } from '../components/BalanceCard';

const meta: Meta<typeof BalanceCard> = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Hero balance card. Dark background with decorative textures. Title in muted gray, value in white, comparison in green.',
      },
    },
  },
  argTypes: {
    title:  { control: 'text' },
    value:  { control: 'text' },
    sign:   { control: { type: 'radio' }, options: ['+', '-'] },
    amount: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: { title: 'Balanço do mês', value: 'R$ 8.982', sign: '+', amount: 'R$ 392' },
};

export const NegativeBalance: Story = {
  name: 'Negative balance',
  args: { title: 'Balanço do mês', value: 'R$ 3.240', sign: '-', amount: 'R$ 580' },
};

export const HighValue: Story = {
  name: 'High value',
  args: { title: 'Faturamento anual', value: 'R$ 142.500', sign: '+', amount: 'R$ 28.000' },
};
