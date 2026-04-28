import type { Meta, StoryObj } from '@storybook/react';
import { BalanceCard } from '../components/BalanceCard';

const meta: Meta<typeof BalanceCard> = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hero balance card. Dark background (neutral/background) with 3 layered decorative textures from the DS. Title in neutral/text-muted, value in white, comparison in feedback/positive.',
      },
    },
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text', description: 'Card heading' },
    value: { control: 'text', description: 'Main balance value' },
    sign: { control: { type: 'radio' }, options: ['+', '-'], description: 'Comparison direction' },
    amount: { control: 'text', description: 'Comparison amount' },
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

export const CustomTitle: Story = {
  name: 'Custom title',
  args: { title: 'Lucro líquido', value: 'R$ 5.304', sign: '+', amount: 'R$ 1.200' },
};
