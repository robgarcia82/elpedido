/**
 * HomeScreen — Screens/HomeScreen
 * Figma: gx9nnEbGpAZooHbnK9H2PH, node 1:853
 *
 * Componentes do DS usados:
 *   BalanceCard   — hero card balanço do mês
 *   TabBar/TabItem — Vendas | Clientes | Produtos | Dicas
 *   Combobox      — "Todos os locais"
 *   MetricCard    — Ticket médio + Lucro no mês
 *   ChartCard     — Vendas em Abril
 *   BottomNavBar  — Home | Clientes | Pedidos | Estoque | Insights
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Icon, BalanceCard, BottomNavBar, type NavTab } from './_ds-components';

const F = 'Geist, system-ui, sans-serif';

// BalanceCard — imported from _ds-components (node 1:205)

// ─────────────────────────────────────────────────────────────
// TabBar — node 1:871
// Tabs: Vendas | Clientes | Produtos | Dicas
// ─────────────────────────────────────────────────────────────
const TABS = ['Vendas', 'Clientes', 'Produtos', 'Dicas'];

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div style={{
      width: '100%', borderBottom: '1px solid rgba(161,161,161,0.25)',
      fontFamily: F, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 24, paddingLeft: 16, paddingRight: 16, paddingTop: 12, alignItems: 'flex-start' }}>
        {TABS.map(tab => {
          const isActive = tab === active;
          return (
            <div key={tab} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', flexShrink: 0, cursor: 'pointer' }} onClick={() => onChange(tab)}>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', color: isActive ? '#ffffff' : '#a1a1a1', whiteSpace: 'nowrap' }}>
                {tab}
              </span>
              <div style={{ height: 2, width: '100%', backgroundColor: isActive ? '#2b7fff' : 'transparent', borderRadius: 1 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Combobox — node 1:263 — full width "Todos os locais"
// ─────────────────────────────────────────────────────────────
function Combobox({ label = 'Todos os locais' }: { label?: string }) {
  return (
    <div style={{
      width: '100%', height: 40, borderRadius: 100,
      border: '1px solid rgba(161,161,161,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: 16, paddingRight: 16,
      boxSizing: 'border-box', fontFamily: F, cursor: 'pointer', flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', color: '#a1a1a1', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        {/* Chevron icon from Icon component */}
        <Icon type="Chevron down" size={24} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MetricCard — node 1:876/1:877
// bg: #1f1f1f, radius/md, p=16, w=199
// ─────────────────────────────────────────────────────────────
function MetricCard({ title, currency, number, percentage, description }: {
  title: string; currency: string; number: string; percentage: string; description: string;
}) {
  return (
    <div style={{
      backgroundColor: '#1f1f1f', borderRadius: 16, padding: 16,
      width: 199, flexShrink: 0, display: 'flex', alignItems: 'center',
      boxSizing: 'border-box', fontFamily: F,
      boxShadow: '0px 4px 32px 0px rgba(23,28,34,0.04)',
    }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 16, alignItems: 'flex-start', overflow: 'hidden', minWidth: 0 }}>
        {/* Title — Heading/Overline */}
        <span style={{ fontSize: 10, fontWeight: 500, lineHeight: '15px', letterSpacing: 1, textTransform: 'uppercase', color: '#919191', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {/* Value row — Heading/Currency + Heading/Display */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', overflow: 'hidden', letterSpacing: -0.5 }}>
            <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '40px', color: '#ffffff' }}>{currency}</span>
            <span style={{ fontSize: 36, fontWeight: 400, lineHeight: '48px', color: '#ffffff' }}>{number}</span>
          </div>
          {/* Change row — Body/Caption */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden', fontSize: 12, fontWeight: 400, lineHeight: '16px' }}>
            <span style={{ color: '#6cb527' }}>{percentage}</span>
            <span style={{ color: '#808080' }}>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChartCard — node 1:317 — fill container
// ─────────────────────────────────────────────────────────────
const BARS: [number, number][] = [
  [0,154],[7,85],[14,85],[21,29],[28,29],[35,125],[42,125],[49,65],[56,65],[63,65],[70,65],
  [77,172],[84,172],[91,38],[98,38],[105,38],[112,161],[119,161],[126,32],[133,108],[140,118],
  [147,118],[154,141],[161,161],[168,57],[175,34],[182,180],[189,30],[196,156],[203,113],
  [210,136],[217,174],[224,39],[231,125],[238,150],[245,62],[252,116],[259,176],[266,48],
  [273,52],[280,159],[287,164],[294,55],[301,38],[308,164],
];

function ChartCard({ title = 'Vendas em Abril' }: { title?: string }) {
  return (
    <div style={{
      backgroundColor: '#1f1f1f', borderRadius: 16,
      paddingTop: 24, paddingLeft: 24, paddingRight: 24, paddingBottom: 16,
      width: '100%', boxSizing: 'border-box', fontFamily: F, flexShrink: 0,
    }}>
      {/* Header — Heading/H3 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, overflow: 'hidden' }}>
        <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '28px', color: '#ffffff', whiteSpace: 'nowrap' }}>
          {title}
        </span>
      </div>
      {/* Chart area */}
      <div style={{ position: 'relative', width: '100%', height: 298, overflow: 'hidden' }}>
        {/* Grid lines */}
        {[33, 87, 141, 195, 249].map((top, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, top, right: 0, height: 1, backgroundColor: 'rgba(66,66,66,0.5)' }} />
        ))}
        {/* Bars area */}
        <div style={{ position: 'absolute', left: 0.5, top: 70, width: '100%', height: 180 }}>
          {BARS.map(([x, h], i) => (
            <div key={i} style={{ position: 'absolute', left: x, bottom: 0, width: 5, height: h, backgroundColor: '#2b7fff', borderRadius: 1 }} />
          ))}
        </div>
        {/* X axis — Body/AxisLabel */}
        <div style={{ position: 'absolute', top: 266, left: 0, right: 0, height: 32 }}>
          {[{ label: '08:00', left: 8 }, { label: '12:00', left: 99 }, { label: '16:00', left: 187 }, { label: '20:00', left: 275 }].map(({ label, left }) => (
            <span key={label} style={{ position: 'absolute', left, top: 8, fontSize: 10, fontWeight: 400, lineHeight: '15px', color: '#a1a1a1', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// HomeScreen — node 1:853
// 393×852, bg: #0E0E0E
// ─────────────────────────────────────────────────────────────
function HomeScreenPreview() {
  const [activeTab, setActiveTab] = useState('Vendas');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');

  return (
    <div style={{
      width: 393, height: 852,
      backgroundColor: '#0E0E0E',
      position: 'relative', overflow: 'hidden',
      borderRadius: 40, border: '1px solid rgba(255,255,255,0.08)',
      fontFamily: F,
    }}>
      {/* Android status bar — h=40 */}
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: 0.25 }}>9:30</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#fff', fontSize: 12 }}>▲▲</span>
          <span style={{ color: '#fff', fontSize: 12 }}>■</span>
        </div>
      </div>

      {/* Scrollable content — top: 40 (status), bottom: 72 (nav) */}
      <div style={{
        position: 'absolute', top: 40, bottom: 72, left: 0, right: 0,
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 24,
        paddingTop: 8,
      }}>
        {/* BalanceCard — px=16 (Figma node 1:868) */}
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <BalanceCard />
        </div>

        {/* TabBar — full width, no horizontal padding (Figma node 1:870) */}
        <TabBar active={activeTab} onChange={setActiveTab} />

        {/* Container — px=16, gap=24 (Figma node 1:872) */}
        <div style={{ paddingLeft: 16, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 16 }}>

          {/* Combobox — full width */}
          <Combobox label="Todos os locais" />

          {/* Main container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: '100%' }}>

            {/* MetricCards — carrossel com scroll lateral */}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-start',
              overflowX: 'auto', width: '100%',
              marginLeft: -16, marginRight: -16,
              paddingLeft: 16, paddingRight: 16,
              boxSizing: 'border-box',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            } as React.CSSProperties}>
              {[
                { title: 'Ticket médio', currency: 'R$', number: '38,90', percentage: '20%', description: 'Mês a mês' },
                { title: 'Lucro no mês',  currency: 'R$', number: '5.304',  percentage: '20%', description: 'Text' },
                { title: 'Total vendas', currency: 'R$', number: '8.982',  percentage: '12%', description: 'vs mês ant.' },
              ].map(card => (
                <div key={card.title} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <MetricCard {...card} />
                </div>
              ))}
            </div>

            {/* ChartCard — full width */}
            <ChartCard title="Vendas em Abril" />
          </div>
        </div>
      </div>

      {/* BottomNavBar — absolute bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavBar activeTab={activeNav} onTabChange={setActiveNav} />
      </div>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Screens/HomeScreen',
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
};
export default meta;

export const Default: StoryObj = { render: () => <HomeScreenPreview /> };
