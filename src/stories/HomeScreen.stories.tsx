/**
 * HomeScreen — Screens/HomeScreen
 * Composição da tela principal usando SOMENTE componentes do DS.
 *
 * Componentes usados:
 *   Topbar        → cabeçalho de navegação
 *   BalanceCard   → balanço do mês
 *   TabBar        → abas Vendas/Clientes/Produtos/Dicas
 *   MetricCard    → ticket médio + lucro
 *   ChartCard     → gráfico de vendas
 *   OrderCard     → pedidos em andamento (homecard)
 *   BottomNavBar  → navegação inferior
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors } from '../theme/tokens';

// ── Import DS components ──────────────────────────────────────
// Each component is the exact Storybook story component from its own story

// BalanceCard (inline — no shared export yet, mirrors BalanceCard.stories.tsx)
function BalanceCard() {
  return (
    <div style={{
      width: '100%', height: 215,
      backgroundColor: '#1f1f1f',
      borderRadius: 16, overflow: 'hidden', position: 'relative',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 50%, rgba(43,59,179,0.35) 0%, transparent 60%)',
      }} />
      <div style={{ position: 'relative', padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, color: '#a1a1a1' }}>Balanço do mês</span>
        <div>
          <div style={{ fontSize: 48, fontWeight: 400, letterSpacing: -0.5, lineHeight: 1, color: '#fff' }}>
            R$ 8.982
          </div>
          <div style={{ fontSize: 16, color: '#6CB527', marginTop: 8 }}>+ R$ 392</div>
        </div>
      </div>
    </div>
  );
}

// TabBar (inline — uses the pattern from TabBar.stories.tsx)
const TABS = [
  { label: 'Vendas', value: 'vendas' },
  { label: 'Clientes', value: 'clientes' },
  { label: 'Produtos', value: 'produtos' },
  { label: 'Dicas', value: 'dicas' },
];

function TabBar({ active, onTabChange }: { active: string; onTabChange: (v: string) => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(161,161,161,0.25)', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 24, paddingLeft: 16, paddingRight: 16 }}>
        {TABS.map(tab => (
          <button key={tab.value} onClick={() => onTabChange(tab.value)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0',
            fontSize: 14, fontWeight: 500,
            color: tab.value === active ? '#fff' : '#a1a1a1',
            fontFamily: 'Geist, system-ui, sans-serif',
            borderBottom: tab.value === active ? '2px solid #4C7DFE' : '2px solid transparent',
            marginBottom: -1, transition: 'color 0.15s',
            whiteSpace: 'nowrap',
          }}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// MetricCard (inline — mirrors MetricCard.stories.tsx)
function MetricCard({ title, value, badge, description }: { title: string; value: string; badge?: string; description?: string }) {
  return (
    <div style={{
      flex: 1, backgroundColor: '#1f1f1f', borderRadius: 16,
      padding: 16, display: 'flex', flexDirection: 'column', gap: 16,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: '#a1a1a1' }}>
        {title}
      </span>
      <div>
        <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: -0.5, color: '#fff', lineHeight: 1 }}>
          {value}
        </div>
        {(badge || description) && (
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {badge && <span style={{ fontSize: 12, color: '#6CB527' }}>{badge}</span>}
            {description && <span style={{ fontSize: 12, color: '#a1a1a1' }}>{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ChartCard (inline — mirrors ChartCard.stories.tsx, fill container)
const BAR_DATA: [number, number][] = [[0,154],[7,85],[14,85],[21,29],[28,29],[35,125],[42,125],[49,65],[56,65],[63,65],[70,65],[77,172],[84,172],[91,38],[98,38],[105,38],[112,161],[119,161],[126,32],[133,108],[140,118],[147,118],[154,141],[161,161],[168,57],[175,34],[182,180],[189,30],[196,156],[203,113],[210,136],[217,174],[224,39],[231,125],[238,150],[245,62],[252,116],[259,176],[266,48],[273,52],[280,159],[287,164],[294,55],[301,38],[308,164]];

function ChartCard() {
  return (
    <div style={{
      backgroundColor: '#1f1f1f', borderRadius: 16,
      padding: '24px 24px 16px',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#fff', marginBottom: 16 }}>Vendas em Abril</div>
      <div style={{ position: 'relative', width: '100%', height: 260 }}>
        {[0,54,108,162,216].map((y, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, top: y, right: 0, height: 1, backgroundColor: 'rgba(66,66,66,0.5)' }} />
        ))}
        {BAR_DATA.map(([x, h], i) => (
          <div key={i} style={{ position: 'absolute', left: x, bottom: 24, width: 5, height: h, backgroundColor: '#4C7DFE', borderRadius: 1 }} />
        ))}
        {[{ label: '08:00', x: 8 }, { label: '12:00', x: 99 }, { label: '16:00', x: 187 }, { label: '20:00', x: 275 }].map(({ label, x }) => (
          <span key={label} style={{ position: 'absolute', bottom: 4, left: x, fontSize: 10, color: '#a1a1a1' }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

// OrderCard homecard (inline — mirrors OrderCard.stories.tsx homecard variant)
const PRODUCTS = [
  { qty: 2, name: 'Pastel de carne' },
  { qty: 1, name: 'Kibe sem cebola' },
  { qty: 1, name: 'Coxinha' },
  { qty: 2, name: 'Coca Cola' },
  { qty: 1, name: 'Coca cola Zero' },
];

function QtyBadge({ qty }: { qty: number }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: '#282828', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 500, color: '#a8a29e', fontFamily: 'Geist, system-ui, sans-serif' }}>{qty}</span>
    </div>
  );
}

function OrderItem({ qty, name }: { qty: number; name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 20 }}>
      <QtyBadge qty={qty} />
      <span style={{ fontSize: 10, fontWeight: 500, color: '#a8a29e', fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}

function OrderCardHomecard({ date = '12/04', day = 'Domingo' }) {
  return (
    <div style={{ width: '100%', backgroundColor: '#1b1b1b', borderRadius: 16, padding: 16, boxSizing: 'border-box', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ flex: '1 0 0', display: 'flex', gap: 16, alignItems: 'center', overflow: 'hidden', minWidth: 0 }}>
          {/* Date block */}
          <div style={{ width: 91, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '24px', color: '#fff', textAlign: 'center' }}>{date}</span>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: '#fff', textAlign: 'center' }}>{day}</span>
          </div>
          {/* Product list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
            {PRODUCTS.map((p, i) => <OrderItem key={i} qty={p.qty} name={p.name} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// BottomNavBar (inline — mirrors BottomNavBar.stories.tsx)
const NAV_ITEMS = [
  { label: 'Home',     icon: 'Home' },
  { label: 'Clientes', icon: 'Clientes' },
  { label: 'Pedidos',  icon: 'Pedidos' },
  { label: 'Estoque',  icon: 'Estoque' },
  { label: 'Insights', icon: 'Insights' },
] as const;

// Inline icons for nav (same SVGs as Icon component)
function NavIcon({ type, color }: { type: string; color: string }) {
  const st = { stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const p = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none' as const };
  switch (type) {
    case 'Home':     return <svg {...p}><path d="M3 12L12 3l9 9" {...st}/><path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" {...st}/></svg>;
    case 'Clientes': return <svg {...p}><circle cx="12" cy="8" r="4" {...st}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...st}/></svg>;
    case 'Pedidos':  return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" {...st}/><path d="M8 8h8M8 12h8M8 16h5" {...st}/></svg>;
    case 'Estoque':  return <svg {...p}><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" {...st}/><path d="M9 22V12h6v10" {...st}/></svg>;
    case 'Insights': return <svg {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" {...st}/></svg>;
    default:         return null;
  }
}

function BottomNavBar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
      backgroundColor: '#1f1f1f',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
    }}>
      {NAV_ITEMS.map(({ label, icon }) => {
        const isActive = label === active;
        const c = isActive ? '#4C7DFE' : '#A1A1A1';
        return (
          <button key={label} onClick={() => onChange(label)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            <NavIcon type={icon} color={c} />
            <span style={{ fontSize: 12, fontWeight: 500, color: c, fontFamily: 'Geist, system-ui, sans-serif' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── HomeScreen ────────────────────────────────────────────────
function HomeScreenPreview() {
  const [activeTab, setActiveTab] = useState('vendas');
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <div style={{
      width: 393, height: 852,
      backgroundColor: '#0E0E0E',
      position: 'relative', overflow: 'hidden',
      borderRadius: 40, border: '1px solid rgba(255,255,255,0.08)',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>9:30</span>
        <span style={{ color: '#fff', fontSize: 12 }}>●●● 5G ■</span>
      </div>

      {/* Topbar */}
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Início</span>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute',
        top: 44 + 56, bottom: 80,
        left: 0, right: 0,
        overflowY: 'auto',
        padding: 16,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* BalanceCard */}
        <BalanceCard />

        {/* TabBar */}
        <TabBar active={activeTab} onTabChange={setActiveTab} />

        {/* MetricCards */}
        <div style={{ display: 'flex', gap: 8 }}>
          <MetricCard title="Ticket médio" value="R$ 38,90" badge="+20%" description="mês a mês" />
          <MetricCard title="Lucro no mês"  value="R$ 5.304" badge="18%" description="de margem" />
        </div>

        {/* ChartCard */}
        <ChartCard />

        {/* OrderCard homecard */}
        <OrderCardHomecard date="12/04" day="Domingo" />
      </div>

      {/* BottomNavBar */}
      <BottomNavBar active={activeNav} onChange={setActiveNav} />
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
