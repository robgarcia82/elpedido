import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

const BAR_DATA: [number, number][] = [
  [0,154],[7,85],[14,85],[21,29],[28,29],[35,125],[42,125],[49,65],[56,65],[63,65],[70,65],[77,172],[84,172],[91,38],[98,38],[105,38],[112,161],[119,161],[126,32],[133,108],[140,118],[147,118],[154,141],[161,161],[168,57],[175,34],[182,180],[189,30],[196,156],[203,113],[210,136],[217,174],[224,39],[231,125],[238,150],[245,62],[252,116],[259,176],[266,48],[273,52],[280,159],[287,164],[294,55],[301,38],[308,164],
];
const GRID_Y = [0, 54, 108, 162, 216];
const AXIS = [{ label: '08:00', x: 8 }, { label: '12:00', x: 99 }, { label: '16:00', x: 187 }, { label: '20:00', x: 275 }];

function ChartCard({ title = 'Vendas em Abril' }: { title?: string }) {
  return (
    <div style={{ width: 361, backgroundColor: colors['neutral/background'], borderRadius: radius.md, paddingTop: spacing[24], paddingLeft: spacing[24], paddingRight: spacing[24], paddingBottom: spacing[16], fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ marginBottom: spacing[16] }}>
        <span style={{ fontSize: textStyles['Heading/H3'].fontSize, fontWeight: textStyles['Heading/H3'].fontWeight, color: colors['surface/on-dark'] }}>{title}</span>
      </div>
      <div style={{ position: 'relative', width: 313, height: 298 }}>
        {/* Grid lines */}
        {GRID_Y.map((y, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, top: 33 + y, width: 313, height: 1, backgroundColor: 'rgba(66,66,66,0.5)' }} />
        ))}
        {/* Bars */}
        {BAR_DATA.map(([x, h], i) => (
          <div key={i} style={{ position: 'absolute', left: 0.5 + x, bottom: 32, width: 5, height: h, backgroundColor: colors['brand/accent'], borderRadius: 1 }} />
        ))}
        {/* X-axis */}
        {AXIS.map(({ label, x }) => (
          <span key={label} style={{ position: 'absolute', bottom: 8, left: x, fontSize: textStyles['Body/AxisLabel'].fontSize, fontWeight: textStyles['Body/AxisLabel'].fontWeight, color: colors['neutral/text-tertiary'] }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = { title: 'Components/ChartCard', parameters: { backgrounds: { default: 'dark' } }, argTypes: { title: { control: 'text' } } };
export default meta;

export const Default: StoryObj = { args: { title: 'Vendas em Abril' }, render: (args) => <ChartCard {...args} /> };
export const CustomTitle: StoryObj = { name: 'Custom title', args: { title: 'Pedidos em Maio' }, render: (args) => <ChartCard {...args} /> };
