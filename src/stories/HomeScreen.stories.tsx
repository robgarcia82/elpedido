import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { colors, spacing, textStyles, radius } from '../theme/tokens';

// ── Mini components (pure React) ────────────────────────────

function BalanceCardSimple() {
  return (
    <div style={{ width: '100%', height: 215, backgroundColor: colors['neutral/background'], borderRadius: radius.md, overflow: 'hidden', position: 'relative', fontFamily: 'inherit' }}>
      <img src="./BalanceCardBG.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      <div style={{ position: 'absolute', left: spacing[16], top: spacing[16], width: 203 }}>
        <div style={{ color: colors['neutral/text-muted'], fontSize: 14, marginBottom: 64 }}>Balanço do mês</div>
        <div style={{ color: colors['surface/on-dark'], fontSize: 48, fontWeight: '400', letterSpacing: -0.5, lineHeight: 1 }}>R$ 8.982</div>
        <div style={{ color: colors['feedback/positive'], fontSize: 16, marginTop: 4 }}>+ R$ 392</div>
      </div>
    </div>
  );
}

function TabBarSimple({ tabs, activeTab, onTabChange }: { tabs: {label: string; value: string}[]; activeTab: string; onTabChange: (v: string) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false });
  const measure = useCallback(() => {
    const i = tabs.findIndex(t => t.value === activeTab);
    const el = tabRefs.current[i]; const row = rowRef.current;
    if (!el || !row) return;
    const rr = row.getBoundingClientRect(); const er = el.getBoundingClientRect();
    setInd({ left: er.left - rr.left, width: er.width, ready: true });
  }, [activeTab, tabs]);
  useLayoutEffect(() => { const id = requestAnimationFrame(measure); return () => cancelAnimationFrame(id); }, [measure]);
  return (
    <div style={{ borderBottom: `1px solid ${colors['neutral/border']}`, position: 'relative', fontFamily: 'inherit' }}>
      <div ref={rowRef} style={{ display: 'flex', gap: spacing[24], paddingTop: spacing[12], paddingLeft: spacing[16], paddingRight: spacing[16] }}>
        {tabs.map((tab, i) => (
          <button key={tab.value} ref={el => { tabRefs.current[i] = el; }} onClick={() => onTabChange(tab.value)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: `0 0 ${spacing[12]}px`, fontSize: 14, fontWeight: 500, color: tab.value === activeTab ? colors['surface/on-dark'] : colors['neutral/text-tertiary'], fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>{tab.label}</button>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 0, height: 2, backgroundColor: colors['brand/accent'], borderRadius: 1, left: ind.left, width: ind.width, opacity: ind.ready ? 1 : 0, transition: ind.ready ? 'left 0.3s ease-out, width 0.3s ease-out' : 'none' }} />
    </div>
  );
}

function MetricCardSimple({ title, currency, number, percentage, description }: any) {
  return (
    <div style={{ flex: 1, backgroundColor: colors['neutral/background'], borderRadius: radius.md, padding: spacing[16], fontFamily: 'inherit' }}>
      <div style={{ color: colors['neutral/text-label'], fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing[16] }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: spacing[8] }}>
        <span style={{ color: colors['surface/on-dark'], fontSize: 18, fontWeight: 500 }}>{currency}</span>
        <span style={{ color: colors['surface/on-dark'], fontSize: 36, fontWeight: 500, letterSpacing: -0.5, lineHeight: '40px' }}>{number}</span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <span style={{ color: colors['feedback/positive'], fontSize: 12 }}>{percentage}</span>
        <span style={{ color: colors['neutral/text-muted'], fontSize: 12 }}>{description}</span>
      </div>
    </div>
  );
}

const BAR_DATA: [number, number][] = [[0,154],[7,85],[14,85],[21,29],[28,29],[35,125],[42,125],[49,65],[56,65],[63,65],[70,65],[77,172],[84,172],[91,38],[98,38],[105,38],[112,161],[119,161],[126,32],[133,108],[140,118],[147,118],[154,141],[161,161],[168,57],[175,34],[182,180],[189,30],[196,156],[203,113],[210,136],[217,174],[224,39],[231,125],[238,150],[245,62],[252,116],[259,176],[266,48],[273,52],[280,159],[287,164],[294,55],[301,38],[308,164]];

function ChartCardSimple() {
  return (
    <div style={{ backgroundColor: colors['neutral/background'], borderRadius: radius.md, padding: `${spacing[24]}px ${spacing[24]}px ${spacing[16]}px`, fontFamily: 'inherit' }}>
      <div style={{ color: colors['surface/on-dark'], fontSize: 16, fontWeight: 500, marginBottom: spacing[16] }}>Vendas em Abril</div>
      <div style={{ position: 'relative', width: 313, height: 260 }}>
        {[0,54,108,162,216].map((y,i) => <div key={i} style={{ position: 'absolute', left: 0, top: y, width: 313, height: 1, backgroundColor: 'rgba(66,66,66,0.5)' }} />)}
        {BAR_DATA.map(([x, h], i) => <div key={i} style={{ position: 'absolute', left: x, bottom: 24, width: 5, height: h, backgroundColor: colors['brand/accent'], borderRadius: 1 }} />)}
        {[{ label: '08:00', x: 8 }, { label: '12:00', x: 99 }, { label: '16:00', x: 187 }, { label: '20:00', x: 275 }].map(({ label, x }) => (
          <span key={label} style={{ position: 'absolute', bottom: 4, left: x, fontSize: 10, color: colors['neutral/text-tertiary'] }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

const TABS = [{ label: 'Vendas', value: 'vendas' }, { label: 'Clientes', value: 'clientes' }, { label: 'Produtos', value: 'produtos' }, { label: 'Dicas', value: 'dicas' }];
const NAV = ['Home', 'Clientes', 'Pedidos', 'Estoque', 'Insights'];
const NAV_ICONS: Record<string, string> = { Home: '🏠', Clientes: '👤', Pedidos: '📋', Estoque: '📦', Insights: '✳️' };

function HomeScreenPreview() {
  const [activeTab, setActiveTab] = useState('vendas');
  const [activeNav, setActiveNav] = useState('Home');
  return (
    <div style={{ width: 393, height: 852, backgroundColor: '#0E0E0E', position: 'relative', overflow: 'hidden', borderRadius: 40, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>9:30</span>
        <span style={{ color: '#fff', fontSize: 12 }}>▲▲▌</span>
      </div>
      <div style={{ overflowY: 'auto', height: 'calc(100% - 44px - 72px)', padding: spacing[16], display: 'flex', flexDirection: 'column', gap: spacing[24] }}>
        <BalanceCardSimple />
        <TabBarSimple tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', gap: spacing[8] }}>
          <MetricCardSimple title="Ticket médio" currency="R$" number="38,90" percentage="20%" description="mês a mês" />
          <MetricCardSimple title="Lucro no mês" currency="R$" number="5.304" percentage="18%" description="de margem" />
        </div>
        <ChartCardSimple />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72, backgroundColor: colors['neutral/background'], display: 'flex', boxShadow: '0 -1px 8px rgba(0,0,0,0.3)' }}>
        {NAV.map(tab => {
          const isActive = tab === activeNav;
          const c = isActive ? colors['icon/active'] : colors['icon/inactive'];
          return (
            <button key={tab} onClick={() => setActiveNav(tab)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{NAV_ICONS[tab]}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: c, fontFamily: 'inherit' }}>{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const meta: Meta = { title: 'Screens/HomeScreen', parameters: { layout: 'centered', backgrounds: { default: 'dark' } } };
export default meta;
export const Default: StoryObj = { render: () => <HomeScreenPreview /> };
