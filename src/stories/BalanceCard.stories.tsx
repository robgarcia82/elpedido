import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

// CSS keyframes injected once
const STYLE_ID = 'balance-card-fade-style';
const CSS = `
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bc-title      { animation: fadeSlideDown 0.5s ease-out 0ms   both; }
  .bc-value      { animation: fadeSlideDown 0.5s ease-out 150ms both; }
  .bc-comparison { animation: fadeSlideDown 0.5s ease-out 300ms both; }
`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

const DECORATION_GRADIENT = 'https://www.figma.com/api/mcp/asset/659d8da6-bb52-46fc-b150-75468073c084';
const DECORATION_TEXTURE  = 'https://www.figma.com/api/mcp/asset/b2eff665-00da-4172-85c8-1fabc28268e9';
const DECORATION_OVERLAY  = 'https://www.figma.com/api/mcp/asset/f4ad0931-61e0-4d06-8194-b96f66a0f646';

interface Props {
  title?: string;
  value?: string;
  sign?: string;
  amount?: string;
}

function BalanceCardWeb({ title = 'Balanço do mês', value = 'R$ 8.982', sign = '+', amount = 'R$ 392' }: Props) {
  // Key to re-trigger animation on replay
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { injectStyles(); }, []);

  return (
    <div>
      <div
        key={animKey}
        style={{
          width: 361,
          height: 215,
          backgroundColor: colors['neutral/background'],
          borderRadius: radius.md,
          overflow: 'hidden',
          position: 'relative',
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        {/* Decorations */}
        <img src={DECORATION_GRADIENT} style={{ position: 'absolute', width: 469, height: 469, left: -250, top: 16, objectFit: 'cover' }} alt="" />
        <img src={DECORATION_TEXTURE}  style={{ position: 'absolute', width: 335, height: 307, left: 123,  top: 59,  objectFit: 'cover' }} alt="" />
        <img src={DECORATION_OVERLAY}  style={{ position: 'absolute', width: 437, height: 475, left: 0,    top: 0,   objectFit: 'cover', opacity: 0.35 }} alt="" />

        {/* Content */}
        <div style={{ position: 'absolute', left: spacing[16], top: spacing[16], width: 203, height: 175, display: 'flex', flexDirection: 'column', gap: 64 }}>

          {/* Title */}
          <span
            className="bc-title"
            style={{ fontSize: textStyles['Heading/H3'].fontSize, fontWeight: textStyles['Heading/H3'].fontWeight, lineHeight: `${textStyles['Heading/H3'].lineHeight}px`, color: colors['neutral/text-muted'] }}
          >
            {title}
          </span>

          {/* Balance section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span
              className="bc-value"
              style={{ fontSize: textStyles['Heading/Hero'].fontSize, fontWeight: textStyles['Heading/Hero'].fontWeight, color: colors['surface/on-dark'], letterSpacing: textStyles['Heading/Hero'].letterSpacing }}
            >
              {value}
            </span>

            <div
              className="bc-comparison"
              style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}
            >
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'], letterSpacing: textStyles['Body/Comparison'].letterSpacing }}>{sign}</span>
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'], letterSpacing: textStyles['Body/Comparison'].letterSpacing }}>{amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Replay button */}
      <button
        onClick={() => setAnimKey(k => k + 1)}
        style={{
          marginTop: 16,
          padding: '6px 16px',
          background: 'transparent',
          border: `1px solid ${colors['neutral/surface-elevated']}`,
          borderRadius: 8,
          color: colors['neutral/text-tertiary'],
          cursor: 'pointer',
          fontSize: 12,
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        ↺ Replay animation
      </button>
    </div>
  );
}

const meta: Meta = {
  title: 'Components/BalanceCard',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Hero balance card with staggered fade-in animation. Texts appear top to bottom: title (0ms) → value (150ms) → comparison (300ms). Uses `Animated.timing` in React Native.',
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

export const Default: StoryObj = {
  name: 'Default — fade top to bottom',
  args: { title: 'Balanço do mês', value: 'R$ 8.982', sign: '+', amount: 'R$ 392' },
  render: (args) => <BalanceCardWeb {...args} />,
};

export const NegativeBalance: StoryObj = {
  name: 'Negative balance',
  args: { title: 'Balanço do mês', value: 'R$ 3.240', sign: '-', amount: 'R$ 580' },
  render: (args) => <BalanceCardWeb {...args} />,
};

export const HighValue: StoryObj = {
  name: 'High value',
  args: { title: 'Faturamento anual', value: 'R$ 142.500', sign: '+', amount: 'R$ 28.000' },
  render: (args) => <BalanceCardWeb {...args} />,
};
