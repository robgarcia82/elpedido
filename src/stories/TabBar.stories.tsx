import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState, useEffect } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

// Web-native TabBar with CSS transition for Storybook preview
// (The React Native version uses Animated.spring in production)
interface TabItem { label: string; value: string; }

function TabBarWeb({ tabs, activeTab, onTabChange }: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (v: string) => void;
}) {
  const [tabRects, setTabRects] = useState<{ width: number; left: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = tabs.findIndex((t) => t.value === activeTab);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[data-tab]');
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const rects = Array.from(items).map((el) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, left: r.left - containerLeft };
    });
    setTabRects(rects);
  }, [tabs]);

  const indicatorLeft = tabRects[activeIndex]?.left ?? 0;
  const indicatorWidth = tabRects[activeIndex]?.width ?? 0;

  return (
    <div
      style={{
        width: '100%',
        borderBottom: `1px solid ${colors['neutral/border']}`,
        position: 'relative',
        fontFamily: 'Geist, system-ui, sans-serif',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: spacing[24],
          paddingTop: spacing[12],
          paddingLeft: spacing[16],
          paddingRight: spacing[16],
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              data-tab={tab.value}
              onClick={() => onTabChange(tab.value)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
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

      {/* Animated sliding indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          height: 2,
          backgroundColor: colors['brand/accent'],
          borderRadius: 1,
          width: indicatorWidth,
          transform: `translateX(${indicatorLeft}px)`,
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Components/TabBar',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Horizontal tab navigation with an animated sliding indicator. The blue bar springs to the active tab. In React Native, uses `Animated.spring` with tension:120 / friction:14.',
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
        <div style={{ padding: 16, color: '#666', fontSize: 12, fontFamily: 'monospace' }}>
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
          tabs={[
            { label: 'Resumo', value: 'resumo' },
            { label: 'Detalhes', value: 'detalhes' },
          ]}
          activeTab={active}
          onTabChange={setActive}
        />
      </div>
    );
  },
};
