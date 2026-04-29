import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

// ── Component tokens ──────────────────────────────────────────
const tokens = {
  trackBg:      colors['neutral/surface-elevated'],
  activeBg:     colors['brand/primary'],
  activeText:   colors['surface/on-dark'],
  inactiveText: colors['neutral/text-tertiary'],
  trackPadding: spacing[4],
  itemPaddingH: spacing[16],
  itemPaddingV: 6,
  itemHeight:   44,
  itemRadius:   62,
  trackRadius:  radius.full,
};

// ── Pure HTML Segment ─────────────────────────────────────────
function Segment({
  items,
  selectedIndex,
  onSelect,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: tokens.trackBg,
      padding: tokens.trackPadding,
      borderRadius: tokens.trackRadius,
      gap: 0,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {items.map((label, i) => {
        const isActive = i === selectedIndex;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              height: tokens.itemHeight,
              paddingLeft: tokens.itemPaddingH,
              paddingRight: tokens.itemPaddingH,
              paddingTop: tokens.itemPaddingV,
              paddingBottom: tokens.itemPaddingV,
              borderRadius: tokens.itemRadius,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isActive ? tokens.activeBg : 'transparent',
              color: isActive ? tokens.activeText : tokens.inactiveText,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '16px',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── Token reference table ─────────────────────────────────────
function TokenTable() {
  const rows = [
    ['segment/track-bg',       'neutral/surface-elevated', tokens.trackBg],
    ['segment/active-bg',      'brand/primary',            tokens.activeBg],
    ['segment/active-text',    'surface/on-dark',          tokens.activeText],
    ['segment/inactive-text',  'neutral/text-tertiary',    tokens.inactiveText],
    ['segment/track-padding',  'spacing/4',                `${tokens.trackPadding}px`],
    ['segment/item-padding-h', 'spacing/16',               `${tokens.itemPaddingH}px`],
    ['segment/item-padding-v', '—',                        `${tokens.itemPaddingV}px`],
    ['segment/item-height',    '—',                        `${tokens.itemHeight}px`],
    ['segment/item-radius',    '—',                        `${tokens.itemRadius}px`],
    ['segment/track-radius',   'radius/full',              `${tokens.trackRadius}px`],
  ];
  return (
    <table style={{ borderCollapse: 'collapse', fontSize: 12, fontFamily: 'Geist, monospace', color: colors['neutral/text-secondary'], marginTop: 24 }}>
      <thead>
        <tr>{['Token', 'Alias', 'Value'].map(h => (
          <th key={h} style={{ padding: '6px 12px', textAlign: 'left', color: colors['neutral/text-muted'], borderBottom: `1px solid ${colors['neutral/border']}` }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map(([token, alias, value]) => (
          <tr key={token}>
            <td style={{ padding: '6px 12px', fontFamily: 'monospace' }}>{token}</td>
            <td style={{ padding: '6px 12px', color: colors['neutral/text-tertiary'] }}>{alias}</td>
            <td style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {String(value).startsWith('#') && (
                <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: String(value), display: 'inline-block', flexShrink: 0, border: '1px solid rgba(255,255,255,.1)' }} />
              )}
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Segment',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Segmented control — pill-style tab selector.

**Figma:** node \`192:100\` (DS El Pedido)
**RN:** \`src/components/Segment.tsx\`

All colors and spacing are bound to semantic component tokens which alias the DS base tokens.`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────
export const TwoItems: StoryObj = {
  name: '2 items',
  render: () => {
    const [s, setS] = useState(0);
    return <Segment items={['Item 1', 'Item 2']} selectedIndex={s} onSelect={setS} />;
  },
};

export const ThreeItems: StoryObj = {
  name: '3 items',
  render: () => {
    const [s, setS] = useState(0);
    return <Segment items={['Item 1', 'Item 2', 'Item 3']} selectedIndex={s} onSelect={setS} />;
  },
};

export const RealLabels: StoryObj = {
  name: 'Real labels',
  render: () => {
    const [s, setS] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Segment items={['Vendas', 'Clientes']} selectedIndex={s} onSelect={setS} />
        <Segment items={['Hoje', '7 dias', '30 dias']} selectedIndex={1} onSelect={() => {}} />
        <Segment items={['Resumo', 'Detalhes']} selectedIndex={0} onSelect={() => {}} />
        <Segment items={['Entradas', 'Bebidas', 'Sobremesas']} selectedIndex={2} onSelect={() => {}} />
      </div>
    );
  },
};

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, system-ui, sans-serif' }}>
      {['2 items — selected 1', '2 items — selected 2'].map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'], width: 160, flexShrink: 0 }}>{label}</span>
          <Segment items={['Item 1', 'Item 2']} selectedIndex={i} onSelect={() => {}} />
        </div>
      ))}
      {['3 items — selected 1', '3 items — selected 2', '3 items — selected 3'].map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'], width: 160, flexShrink: 0 }}>{label}</span>
          <Segment items={['Item 1', 'Item 2', 'Item 3']} selectedIndex={i} onSelect={() => {}} />
        </div>
      ))}
    </div>
  ),
};

export const Tokens: StoryObj = {
  name: 'Design tokens',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif' }}>
      <Segment items={['Item 1', 'Item 2', 'Item 3']} selectedIndex={0} onSelect={() => {}} />
      <TokenTable />
    </div>
  ),
};
