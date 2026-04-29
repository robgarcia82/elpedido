import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import NumberFlow, { continuous } from '@number-flow/react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

// CSS injected once
const STYLE_ID = 'bc-styles';
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes bcShimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
    @keyframes bcFade {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(s);
}

const BG_IMAGE = './BalanceCardBG.png';
const MIN_SKELETON_MS = 800;

interface Props { title?: string; value?: string; sign?: string; amount?: string; }

function BalanceCard({
  title  = 'Balanço do mês',
  value  = 'R$ 8.982',
  sign   = '+',
  amount = 'R$ 392',
}: Props) {
  // Phase machine: skeleton → bg-in → texts-in
  const [phase, setPhase] = useState<'skeleton' | 'bg-in' | 'texts-in'>('skeleton');
  const [animKey, setAnimKey]   = useState(0);
  const [flowValue, setFlowValue] = useState(0); // what NumberFlow shows

  const loadedRef = useRef(false);
  const startRef  = useRef(Date.now());

  // Parse "R$ 8.982" → { prefix: "R$ ", numeric: 8982 }
  const match   = value.match(/^([^0-9]*)([0-9][0-9.,]*)$/);
  const prefix  = match?.[1] ?? '';
  const numeric = match ? parseFloat(match[2].replace(/\./g, '').replace(',', '.')) : 0;

  // Reset on replay
  useEffect(() => {
    injectStyles();
    setPhase('skeleton');
    setFlowValue(0);
    loadedRef.current = false;
    startRef.current  = Date.now();
  }, [animKey]);

  // Image loaded → wait minimum skeleton time → show bg
  const handleLoad = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    const wait = Math.max(0, MIN_SKELETON_MS - (Date.now() - startRef.current));
    setTimeout(() => setPhase('bg-in'), wait);
  };

  // bg-in → wait for bg fade → texts-in
  useEffect(() => {
    if (phase !== 'bg-in') return;
    const t = setTimeout(() => setPhase('texts-in'), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // texts-in → trigger NumberFlow count-up
  useEffect(() => {
    if (phase !== 'texts-in') return;
    // Small delay so fade-in animation starts first
    const t = setTimeout(() => setFlowValue(numeric), 100);
    return () => clearTimeout(t);
  }, [phase, numeric]);

  const showBg    = phase === 'bg-in'    || phase === 'texts-in';
  const showTexts = phase === 'texts-in';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16 }}>
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
        {/* Skeleton */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          backgroundColor: colors['neutral/surface-elevated'],
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          opacity: showBg ? 0 : 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
            backgroundSize: '600px 100%',
            animation: 'bcShimmer 1.4s infinite linear',
          }} />
        </div>

        {/* Background image */}
        <img
          src={BG_IMAGE}
          onLoad={handleLoad}
          onError={handleLoad}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease',
            opacity: showBg ? 1 : 0,
          }}
        />

        {/* Content */}
        <div style={{
          position: 'absolute',
          left: spacing[16], top: spacing[16],
          width: 203, height: 175,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 5,
        }}>
          {/* Title */}
          <span style={{
            fontSize: textStyles['Heading/H3'].fontSize,
            fontWeight: textStyles['Heading/H3'].fontWeight,
            color: colors['neutral/text-muted'],
            display: 'block',
            opacity: showTexts ? 1 : 0,
            animation: showTexts ? 'bcFade 0.5s ease-out both' : 'none',
          }}>
            {title}
          </span>

          {/* Value + comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* NumberFlow — always mounted, value changes from 0 → numeric */}
            <NumberFlow
              value={flowValue}
              prefix={prefix}
              locales="pt-BR"
              plugins={[continuous]}
              respectMotionPreference={false}
              transformTiming={{ duration: 2000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              spinTiming={{ duration: 2000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              opacityTiming={{ duration: 600, easing: 'ease-out' }}
              style={{
                fontSize: 48,
                fontWeight: 400,
                letterSpacing: -0.5,
                color: colors['surface/on-dark'],
                lineHeight: 0.85,
                fontVariantNumeric: 'tabular-nums',
                opacity: showTexts ? 1 : 0,
                animation: showTexts ? 'bcFade 0.5s ease-out 0.15s both' : 'none',
                '--number-flow-mask-height': '0.2em',
              } as React.CSSProperties}
            />

            {/* Comparison */}
            <div style={{
              display: 'flex', gap: spacing[4],
              opacity: showTexts ? 1 : 0,
              animation: showTexts ? 'bcFade 0.5s ease-out 0.3s both' : 'none',
            }}>
              <span style={{
                fontSize: textStyles['Body/Comparison'].fontSize,
                fontWeight: textStyles['Body/Comparison'].fontWeight,
                color: colors['feedback/positive'],
              }}>{sign}</span>
              <span style={{
                fontSize: textStyles['Body/Comparison'].fontSize,
                fontWeight: textStyles['Body/Comparison'].fontWeight,
                color: colors['feedback/positive'],
              }}>{amount}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setAnimKey(k => k + 1)}
        style={{
          padding: '6px 16px', background: 'transparent',
          border: `1px solid ${colors['neutral/surface-elevated']}`,
          borderRadius: 8, color: colors['neutral/text-tertiary'],
          cursor: 'pointer', fontSize: 12,
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        ↺ Replay
      </button>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/BalanceCard',
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title:  { control: 'text' },
    value:  { control: 'text' },
    sign:   { control: { type: 'radio' }, options: ['+', '-'] },
    amount: { control: 'text' },
  },
};
export default meta;

export const Default: StoryObj = {
  name: 'Default',
  args: { title: 'Balanço do mês', value: 'R$ 8.982', sign: '+', amount: 'R$ 392' },
  render: (args) => <BalanceCard {...args} />,
};

export const NegativeBalance: StoryObj = {
  name: 'Negative balance',
  args: { title: 'Balanço do mês', value: 'R$ 3.240', sign: '-', amount: 'R$ 580' },
  render: (args) => <BalanceCard {...args} />,
};

export const HighValue: StoryObj = {
  name: 'High value',
  args: { title: 'Faturamento anual', value: 'R$ 142.500', sign: '+', amount: 'R$ 28.000' },
  render: (args) => <BalanceCard {...args} />,
};
