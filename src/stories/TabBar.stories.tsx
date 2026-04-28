import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

interface TabItem { label: string; value: string; }

function TabBar({ tabs, activeTab, onTabChange }: { tabs: TabItem[]; activeTab: string; onTabChange: (v: string) => void; }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef  = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false });

  const measure = useCallback(() => {
    const i = tabs.findIndex(t => t.value === activeTab);
    const el = tabRefs.current[i];
    const row = rowRef.current;
    if (!el || !row) return;
    const rr = row.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInd({ left: er.left - rr.left, width: er.width, ready: true });
  }, [activeTab, tabs]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure]);

  return (
    <div style={{ width: '100%', borderBottom: `1px solid ${colors['neutral/border']}`, position: 'relative', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div ref={rowRef} style={{ display: 'flex', gap: spacing[24], paddingTop: spacing[12], paddingLeft: spacing[16], paddingRight: spacing[16] }}>
        {tabs.map((tab, i) => (
          <button key={tab.value} ref={el => { tabRefs.current[i] = el; }} onClick={() => onTabChange(tab.value)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: `0 0 ${spacing[12]}px`, fontSize: textStyles['Body/Label'].fontSize, fontWeight: textStyles['Body/Label'].fontWeight, color: tab.value === activeTab ? colors['surface/on-dark'] : colors['neutral/text-tertiary'], fontFamily: 'inherit', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 0, height: 2, backgroundColor: colors['brand/accent'], borderRadius: 1, left: ind.left, width: ind.width, opacity: ind.ready ? 1 : 0, transition: ind.ready ? 'left 0.3s ease-out, width 0.3s ease-out' : 'none' }} />
    </div>
  );
}

const SALES_TABS = [{ label: 'Vendas', value: 'vendas' }, { label: 'Clientes', value: 'clientes' }, { label: 'Produtos', value: 'produtos' }, { label: 'Dicas', value: 'dicas' }];
const PERIOD_TABS = [{ label: 'Hoje', value: 'today' }, { label: '7 dias', value: 'week' }, { label: '30 dias', value: 'month' }, { label: '12 meses', value: 'year' }];

const meta: Meta = { title: 'Components/TabBar', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const Interactive: StoryObj = { name: 'Interactive', render: () => { const [a, sA] = useState('vendas'); return <div style={{ width: 393 }}><TabBar tabs={SALES_TABS} activeTab={a} onTabChange={sA} /></div>; } };
export const PeriodTabs: StoryObj = { name: 'Period tabs', render: () => { const [a, sA] = useState('month'); return <div style={{ width: 393 }}><TabBar tabs={PERIOD_TABS} activeTab={a} onTabChange={sA} /></div>; } };
export const TwoTabs: StoryObj = { name: '2 tabs', render: () => { const [a, sA] = useState('resumo'); return <div style={{ width: 393 }}><TabBar tabs={[{ label: 'Resumo', value: 'resumo' }, { label: 'Detalhes', value: 'detalhes' }]} activeTab={a} onTabChange={sA} /></div>; } };
