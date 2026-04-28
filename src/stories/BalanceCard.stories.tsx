import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

// Inject keyframes once
const STYLE_ID = 'bc-keyframes';
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes bcFadeSlide {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bcShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
  `;
  document.head.appendChild(s);
}

const DECORATION_GRADIENT = 'https://www.figma.com/api/mcp/asset/659d8da6-bb52-46fc-b150-75468073c084';
const DECORATION_TEXTURE  = 'https://www.figma.com/api/mcp/asset/b2eff665-00da-4172-85c8-1fabc28268e9';
const DECORATION_OVERLAY  = 'https://www.figma.com/api/mcp/asset/f4ad0931-61e0-4d06-8194-b96f66a0f646';
const TOTAL_IMAGES = 3;

interface Props { title?: string; value?: string; sign?: string; amount?: string; }

function BalanceCardWeb({
  title = 'Balanço do mês',
  value = 'R$ 8.982',
  sign  = '+',
  amount = 'R$ 392',
}: Props) {
  const [phase, setPhase] = useState<'loading' | 'bg-in' | 'text-in'>('loading');
  const [animKey, setAnimKey] = useState(0);
  const loadedRef = useRef(0);

  useEffect(() => { injectStyles(); }, []);

  // Reset on replay
  useEffect(() => {
    setPhase('loading');
    loadedRef.current = 0;
  }, [animKey]);

  const handleLoad = () => {
    loadedRef.current += 1;
    if (loadedRef.current >= TOTAL_IMAGES) setPhase('bg-in');
  };

  // After bg fades in, start text animations
  useEffect(() => {
    if (phase !== 'bg-in') return;
    const t = setTimeout(() => setPhase('text-in'), 450); // wait for bg fade
    return () => clearTimeout(t);
  }, [phase]);

  const bgVisible   = phase === 'bg-in' || phase === 'text-in';
  const textsVisible = phase === 'text-in';

  return (
    <div>
      <div
        key={animKey}
        style={{
          width: 361, height: 215,
          backgroundColor: colors['neutral/background'],
          borderRadius: radius.md,
          overflow: 'hidden',
          position: 'relative',
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        {/* ── Skeleton placeholder ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: colors['neutral/surface-elevated'],
          transition: 'opacity 0.4s ease',
          opacity: bgVisible ? 0 : 1,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            backgroundSize: '800px 100%',
            animation: 'bcShimmer 1.4s infinite linear',
          }} />
        </div>

        {/* ── Decoration images (fade in after load) ── */}
        <div style={{
          position: 'absolute', inset: 0,
          transition: 'opacity 0.4s ease',
          opacity: bgVisible ? 1 : 0,
        }}>
          <img src={DECORATION_GRADIENT} onLoad={handleLoad}
            style={{ position:'absolute', width:469, height:469, left:-250, top:16, objectFit:'cover' }} alt="" />
          <img src={DECORATION_TEXTURE} onLoad={handleLoad}
            style={{ position:'absolute', width:335, height:307, left:123, top:59, objectFit:'cover' }} alt="" />
          <img src={DECORATION_OVERLAY} onLoad={handleLoad}
            style={{ position:'absolute', width:437, height:475, left:0, top:0, objectFit:'cover', opacity:0.35 }} alt="" />
        </div>

        {/* ── Content ── */}
        <div style={{
          position: 'absolute',
          left: spacing[16], top: spacing[16],
          width: 203, height: 175,
          display: 'flex', flexDirection: 'column', gap: 64,
          zIndex: 2,
        }}>
          {/* Title */}
          <span style={{
            fontSize: textStyles['Heading/H3'].fontSize,
            fontWeight: textStyles['Heading/H3'].fontWeight,
            lineHeight: `${textStyles['Heading/H3'].lineHeight}px`,
            color: colors['neutral/text-muted'],
            opacity: textsVisible ? 1 : 0,
            animation: textsVisible ? 'bcFadeSlide 0.5s ease-out 0ms both' : 'none',
          }}>
            {title}
          </span>

          {/* Balance */}
          <div style={{ display:'flex', flexDirection:'column', gap: 0 }}>
            <span style={{
              fontSize: textStyles['Heading/Hero'].fontSize,
              fontWeight: textStyles['Heading/Hero'].fontWeight,
              color: colors['surface/on-dark'],
              letterSpacing: textStyles['Heading/Hero'].letterSpacing,
              opacity: textsVisible ? 1 : 0,
              animation: textsVisible ? 'bcFadeSlide 0.5s ease-out 150ms both' : 'none',
            }}>
              {value}
            </span>

            <div style={{
              display:'flex', alignItems:'center', gap: spacing[4],
              opacity: textsVisible ? 1 : 0,
              animation: textsVisible ? 'bcFadeSlide 0.5s ease-out 300ms both' : 'none',
            }}>
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'] }}>{sign}</span>
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'] }}>{amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Replay */}
      <button
        onClick={() => setAnimKey(k => k + 1)}
        style={{
          marginTop: 16, padding: '6px 16px',
          background: 'transparent',
          border: `1px solid ${colors['neutral/surface-elevated']}`,
          borderRadius: 8,
          color: colors['neutral/text-tertiary'],
          cursor: 'pointer', fontSize: 12,
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        ↺ Replay
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
        component:
          'Hero balance card. Background images load first with a shimmer skeleton, then the texts fade in top → bottom (title 0ms → value 150ms → comparison 300ms).',
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
  name: 'Default — shimmer → bg → texts',
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
