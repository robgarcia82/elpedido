import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

interface TabItem { label: string; value: string; }

function TabBarWeb({ tabs, activeTab, onTabChange }: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (v: string) => void;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const measure = useCallback(() => {
    const activeIndex = tabs.findIndex(t => t.value === activeTab);
    const el = tabRefs.current[activeIndex];
    const row = rowRef.current;
    if (!el || !row) return;
    const rowRect = row.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - rowRect.left,
      width: elRect.width,
      ready: true,
    });
  }, [activeTab, tabs]);

  // Run after paint so layout is complete
  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure]);

  return (
    <div style={{ width: '100%', borderBottom: `1px solid ${colors['neutral/border']}`, position: 'relative', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div ref={rowRef} style={{ display: 'flex', gap: spacing[24], paddingTop: spacing[12], paddingLeft: spacing[16], paddingRight: spacing[16] }}>
        {tabs.map((tab, i) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              ref={el => { tabRefs.current[i] = el; }}
              onClick={() => onTabChange(tab.value)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: `0 0 ${spacing[12]}px`,
                fontSize: textStyles['Body/Label'].fontSize,
                fontWeight: textStyles['Body/Label'].fontWeight,
                color: isActive ? colors['surface/on-dark'] : colors['neutral/text-tertiary'],
                fontFamily: 'inherit',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sliding indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        height: 2,
        backgroundColor: colors['brand/accent'],
        borderRadius: 1,
        left: indicator.left,
        width: indicator.width,
        opacity: indicator.ready ? 1 : 0,
        transition: indicator.ready
          ? 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'none',
      }} />
    </div>
  );
}

const meta: Meta = {
  title: 'Components/TabBar',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Horizontal tab navigation with animated spring indicator. Blue bar slides to the active tab.',
      },
    },
  },
};
export default meta;

const SALES_TABS = [
  { label: 'Vendas', value: 'vendas' },
  { label: 'Clientes', value: 'clientes' },
  { label: 'Produtos', value: 'produtos' },
  { label: 'Dicas', value: 'dicas' },
];

const PERIOD_TABS = [
  { label: 'Hoje', value: 'today' },
  { label: '7 dias', value: 'week' },
  { label: '30 dias', value: 'month' },
  { label: '12 meses', value: 'year' },
];

export const Interactive: StoryObj = {
  name: 'Interactive — animated indicator',
  render: () => {
    const [active, setActive] = useState('vendas');
    return (
      <div style={{ width: 393 }}>
        <TabBarWeb tabs={SALES_TABS} activeTab={active} onTabChange={setActive} />
        <div style={{ padding: 16, color: '#555', fontSize: 12, fontFamily: 'monospace' }}>
          active: <span style={{ color: colors['brand/accent'] }}>{active}</span>
        </div>
      </div>
    );
  },
};

export const PeriodTabs: StoryObj = {
  name: 'Period tabs',
  render: () => {
    const [active, setActive] = useState('month');
    return (
      <div style={{ width: 393 }}>
        <TabBarWeb tabs={PERIOD_TABS} activeTab={active} onTabChange={setActive} />
      </div>
    );
  },
};

export const TwoTabs: StoryObj = {
  name: '2 tabs',
  render: () => {
    const [active, setActive] = useState('resumo');
    return (
      <div style={{ width: 393 }}>
        <TabBarWeb
          tabs={[{ label: 'Resumo', value: 'resumo' }, { label: 'Detalhes', value: 'detalhes' }]}
          activeTab={active}
          onTabChange={setActive}
        />
      </div>
    );
  },
};
