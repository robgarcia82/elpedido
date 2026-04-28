import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

interface Props { title?: string; currency?: string; number?: string; percentage?: string; description?: string; width?: number; }

function MetricCard({ title = 'Ticket médio', currency = 'R$', number = '38,90', percentage = '20%', description = 'mês a mês', width = 199 }: Props) {
  return (
    <div style={{ width, backgroundColor: colors['neutral/background'], borderRadius: radius.md, padding: spacing[16], fontFamily: 'Geist, system-ui, sans-serif', boxShadow: '0 4px 32px rgba(23,28,34,0.04)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[16] }}>
        <span style={{ fontSize: textStyles['Heading/Overline'].fontSize, fontWeight: textStyles['Heading/Overline'].fontWeight, letterSpacing: textStyles['Heading/Overline'].letterSpacing, textTransform: 'uppercase', color: colors['neutral/text-label'] }}>{title}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[8] }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: spacing[4] }}>
            <span style={{ fontSize: textStyles['Heading/Currency'].fontSize, fontWeight: textStyles['Heading/Currency'].fontWeight, letterSpacing: textStyles['Heading/Currency'].letterSpacing, color: colors['surface/on-dark'], lineHeight: `${textStyles['Heading/Currency'].lineHeight}px` }}>{currency}</span>
            <span style={{ fontSize: textStyles['Heading/Display'].fontSize, fontWeight: textStyles['Heading/Display'].fontWeight, letterSpacing: textStyles['Heading/Display'].letterSpacing, color: colors['surface/on-dark'], lineHeight: `${textStyles['Heading/Display'].lineHeight}px` }}>{number}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
            <span style={{ fontSize: textStyles['Body/Caption'].fontSize, fontWeight: textStyles['Body/Caption'].fontWeight, color: colors['feedback/positive'] }}>{percentage}</span>
            <span style={{ fontSize: textStyles['Body/Caption'].fontSize, fontWeight: textStyles['Body/Caption'].fontWeight, color: colors['neutral/text-muted'] }}>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Components/MetricCard',
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title: { control: 'text' }, currency: { control: 'text' },
    number: { control: 'text' }, percentage: { control: 'text' },
    description: { control: 'text' }, width: { control: { type: 'range', min: 140, max: 361 } },
  },
};
export default meta;

export const TicketMedio: StoryObj = { name: 'Ticket médio', args: { title: 'Ticket médio', currency: 'R$', number: '38,90', percentage: '20%', description: 'mês a mês', width: 199 }, render: (args) => <MetricCard {...args} /> };
