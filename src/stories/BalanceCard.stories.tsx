import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

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
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
  `;
  document.head.appendChild(s);
}

const BG_IMAGE = './BalanceCardBG.png';
const MIN_SKELETON_MS = 800;

interface Props { title?: string; value?: string; sign?: string; amount?: string; }

function BalanceCard({ title = 'Balanço do mês', value = 'R$ 8.982', sign = '+', amount = 'R$ 392' }: Props) {
  const [phase, setPhase] = useState<'skeleton' | 'bg-in' | 'texts-in'>('skeleton');
  const [displayValue, setDisplayValue] = useState('');
  const [animKey, setAnimKey] = useState(0);
  const loadedRef = useRef(false);
  const startRef  = useRef(Date.now());

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    setPhase('skeleton');
    loadedRef.current = false;
    startRef.current = Date.now();
    setDisplayValue('');
  }, [animKey]);

  const advance = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    const wait = Math.max(0, MIN_SKELETON_MS - (Date.now() - startRef.current));
    setTimeout(() => setPhase('bg-in'), wait);
  };

  useEffect(() => {
    if (phase !== 'bg-in') return;
    const t = setTimeout(() => setPhase('texts-in'), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // Count-up animation
  useEffect(() => {
    if (phase !== 'texts-in') return;
    const match = value.match(/^([^0-9]*)([0-9][0-9.,]*)$/);
    if (!match) { setDisplayValue(value); return; }
    const prefix = match[1];
    const numStr  = match[2];
    const sep     = numStr.includes('.') ? '.' : ',';
    const numeric = parseFloat(numStr.replace(/\./g, '').replace(',', '.'));
    const DURATION = 1400;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const cur = Math.round(eased * numeric);
      setDisplayValue(prefix + cur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, value]);

  const showBg    = phase === 'bg-in' || phase === 'texts-in';
  const showTexts = phase === 'texts-in';

  return (
    <div>
      <div key={animKey} style={{ width: 361, height: 215, backgroundColor: colors['neutral/background'], borderRadius: radius.md, overflow: 'hidden', position: 'relative', fontFamily: 'Geist, system-ui, sans-serif' }}>
        {/* Skeleton */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundColor: colors['neutral/surface-elevated'], transition: 'opacity 0.4s ease', opacity: showBg ? 0 : 1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', backgroundSize: '600px 100%', animation: 'bcShimmer 1.4s infinite linear' }} />
        </div>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, transition: 'opacity 0.5s ease', opacity: showBg ? 1 : 0 }}>
          <img src={BG_IMAGE} onLoad={advance} onError={advance} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
        {/* Content */}
        <div style={{ position: 'absolute', left: spacing[16], top: spacing[16], width: 203, height: 175, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 64, zIndex: 5 }}>
          <span style={{ fontSize: textStyles['Heading/H3'].fontSize, fontWeight: textStyles['Heading/H3'].fontWeight, color: colors['neutral/text-muted'], opacity: showTexts ? 1 : 0, animation: showTexts ? 'bcFadeSlide 0.5s ease-out 0ms both' : 'none' }}>{title}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: textStyles['Heading/Hero'].fontSize, fontWeight: textStyles['Heading/Hero'].fontWeight, letterSpacing: textStyles['Heading/Hero'].letterSpacing, color: colors['surface/on-dark'], opacity: showTexts ? 1 : 0, animation: showTexts ? 'bcFadeSlide 0.5s ease-out 150ms both' : 'none' }}>{displayValue}</span>
            <div style={{ display: 'flex', gap: spacing[4], opacity: showTexts ? 1 : 0, animation: showTexts ? 'bcFadeSlide 0.5s ease-out 300ms both' : 'none' }}>
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'] }}>{sign}</span>
              <span style={{ fontSize: textStyles['Body/Comparison'].fontSize, fontWeight: textStyles['Body/Comparison'].fontWeight, color: colors['feedback/positive'] }}>{amount}</span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setAnimKey(k => k + 1)} style={{ marginTop: 16, padding: '6px 16px', background: 'transparent', border: `1px solid ${colors['neutral/surface-elevated']}`, borderRadius: 8, color: colors['neutral/text-tertiary'], cursor: 'pointer', fontSize: 12, fontFamily: 'Geist, system-ui, sans-serif' }}>↺ Replay</button>
    </div>
  );
}

const meta: Meta = {
  title: 'Components/BalanceCard',
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title: { control: 'text' }, value: { control: 'text' },
    sign: { control: { type: 'radio' }, options: ['+', '-'] }, amount: { control: 'text' },
  },
};
export default meta;

export const Default: StoryObj = { args: { title: 'Balanço do mês', value: 'R$ 8.982', sign: '+', amount: 'R$ 392' }, render: (args) => <BalanceCard {...args} /> };
export const NegativeBalance: StoryObj = { name: 'Negative balance', args: { title: 'Balanço do mês', value: 'R$ 3.240', sign: '-', amount: 'R$ 580' }, render: (args) => <BalanceCard {...args} /> };
export const HighValue: StoryObj = { name: 'High value', args: { title: 'Faturamento anual', value: 'R$ 142.500', sign: '+', amount: 'R$ 28.000' }, render: (args) => <BalanceCard {...args} /> };
