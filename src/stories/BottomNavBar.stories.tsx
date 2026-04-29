import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';

type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';

// Exact SVG paths from Figma DS El Pedido — same as Icon component
const ICON_PATHS: Record<NavTab, React.ReactNode> = {
  Home: (
    <svg viewBox="0 0 22 21" fill="currentColor">
      <path d="M3 20V10.625L1.2 12L0 10.4L3 8.1V5H5V6.575L11 2L22 10.4L20.8 11.975L19 10.625V20H3ZM5 18H10V14H12V18H17V9.1L11 4.525L5 9.1V18ZM3 4C3 3.16667 3.29167 2.45833 3.875 1.875C4.45833 1.29167 5.16667 1 6 1C6.28333 1 6.52083 0.904167 6.7125 0.7125C6.90417 0.520833 7 0.283333 7 0H9C9 0.833333 8.70833 1.54167 8.125 2.125C7.54167 2.70833 6.83333 3 6 3C5.71667 3 5.47917 3.09583 5.2875 3.2875C5.09583 3.47917 5 3.71667 5 4H3Z" />
    </svg>
  ),
  Clientes: (
    <svg viewBox="0 0 22 22" fill="currentColor">
      <path d="M16.675 5.325C18.225 6.875 19 8.76667 19 11C19 13.2333 18.225 15.125 16.675 16.675C15.125 18.225 13.2333 19 11 19C8.76667 19 6.875 18.225 5.325 16.675C3.775 15.125 3 13.2333 3 11C3 8.76667 3.775 6.875 5.325 5.325C6.875 3.775 8.76667 3 11 3C13.2333 3 15.125 3.775 16.675 5.325ZM15.25 15.25C16.4167 14.0833 17 12.6667 17 11C17 9.33333 16.4167 7.91667 15.25 6.75C14.0833 5.58333 12.6667 5 11 5C9.33333 5 7.91667 5.58333 6.75 6.75C5.58333 7.91667 5 9.33333 5 11C5 12.6667 5.58333 14.0833 6.75 15.25C7.91667 16.4167 9.33333 17 11 17C12.6667 17 14.0833 16.4167 15.25 15.25ZM13.15 13.8125C13.7833 13.3542 14.2333 12.75 14.5 12H7.5C7.76667 12.75 8.21667 13.3542 8.85 13.8125C9.48333 14.2708 10.2 14.5 11 14.5C11.8 14.5 12.5167 14.2708 13.15 13.8125ZM7.7875 9.7125C7.97917 9.90417 8.21667 10 8.5 10C8.78333 10 9.02083 9.90417 9.2125 9.7125C9.40417 9.52083 9.5 9.28333 9.5 9C9.5 8.71667 9.40417 8.47917 9.2125 8.2875C9.02083 8.09583 8.78333 8 8.5 8C8.21667 8 7.97917 8.09583 7.7875 8.2875C7.59583 8.47917 7.5 8.71667 7.5 9C7.5 9.28333 7.59583 9.52083 7.7875 9.7125ZM12.7875 9.7125C12.9792 9.90417 13.2167 10 13.5 10C13.7833 10 14.0208 9.90417 14.2125 9.7125C14.4042 9.52083 14.5 9.28333 14.5 9C14.5 8.71667 14.4042 8.47917 14.2125 8.2875C14.0208 8.09583 13.7833 8 13.5 8C13.2167 8 12.9792 8.09583 12.7875 8.2875C12.5958 8.47917 12.5 8.71667 12.5 9C12.5 9.28333 12.5958 9.52083 12.7875 9.7125ZM0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5V2H2V5H0ZM5 22H2C1.45 22 0.979167 21.8042 0.5875 21.4125C0.195833 21.0208 0 20.55 0 20V17H2V20H5V22ZM17 22V20H20V17H22V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H17ZM20 5V2H17V0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V5H20Z" />
    </svg>
  ),
  Pedidos: (
    <svg viewBox="0 0 18 20" fill="currentColor">
      <path d="M5.7125 15.2361C5.90417 15.0231 6 14.7593 6 14.4444C6 14.1296 5.90417 13.8657 5.7125 13.6528C5.52083 13.4398 5.28333 13.3333 5 13.3333C4.71667 13.3333 4.47917 13.4398 4.2875 13.6528C4.09583 13.8657 4 14.1296 4 14.4444C4 14.7593 4.09583 15.0231 4.2875 15.2361C4.47917 15.4491 4.71667 15.5556 5 15.5556C5.28333 15.5556 5.52083 15.4491 5.7125 15.2361ZM5.7125 10.7917C5.90417 10.5787 6 10.3148 6 10C6 9.68519 5.90417 9.4213 5.7125 9.20833C5.52083 8.99537 5.28333 8.88889 5 8.88889C4.71667 8.88889 4.47917 8.99537 4.2875 9.20833C4.09583 9.4213 4 9.68519 4 10C4 10.3148 4.09583 10.5787 4.2875 10.7917C4.47917 11.0046 4.71667 11.1111 5 11.1111C5.28333 11.1111 5.52083 11.0046 5.7125 10.7917ZM5.7125 6.34722C5.90417 6.13426 6 5.87037 6 5.55556C6 5.24074 5.90417 4.97685 5.7125 4.76389C5.52083 4.55093 5.28333 4.44444 5 4.44444C4.71667 4.44444 4.47917 4.55093 4.2875 4.76389C4.09583 4.97685 4 5.24074 4 5.55556C4 5.87037 4.09583 6.13426 4.2875 6.34722C4.47917 6.56019 4.71667 6.66667 5 6.66667C5.28333 6.66667 5.52083 6.56019 5.7125 6.34722ZM8 15.5556H14V13.3333H8V15.5556ZM8 11.1111H14V8.88889H8V11.1111ZM8 6.66667H14V4.44444H8V6.66667ZM2 20C1.45 20 0.979167 19.7824 0.5875 19.3472C0.195833 18.912 0 18.3889 0 17.7778V2.22222C0 1.61111 0.195833 1.08796 0.5875 0.652778C0.979167 0.217593 1.45 0 2 0H16C16.55 0 17.0208 0.217593 17.4125 0.652778C17.8042 1.08796 18 1.61111 18 2.22222V17.7778C18 18.3889 17.8042 18.912 17.4125 19.3472C17.0208 19.7824 16.55 20 16 20H2ZM2 17.7778H16V2.22222H2V17.7778Z" />
    </svg>
  ),
  Estoque: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3ZM3 18H17V7H3V18ZM2 5H18V2H2V5ZM8 13H12V11H8V13Z" />
    </svg>
  ),
  Insights: (
    <svg viewBox="0 0 22 22" fill="currentColor">
      <path d="M10 21.975V14.975L4.525 17.9L3.5 16.1L9.375 13L3.5 9.9L4.525 8.1L10 11.025V4H12V11.025L17.475 8.1L18.5 9.9L12.625 13L18.5 16.1L17.475 17.9L12 14.975V21.975H10Z" />
    </svg>
  ),
};

const NAV_ITEMS = Object.keys(ICON_PATHS) as NavTab[];

function Icon({ type, color, size = 24 }: { type: NavTab; color: string; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', width: size, height: size, color, flexShrink: 0 }}>
      {React.cloneElement(ICON_PATHS[type] as React.ReactElement, { width: size, height: size })}
    </span>
  );
}

function BottomNavBar({ activeTab, onTabChange }: { activeTab: NavTab; onTabChange: (t: NavTab) => void }) {
  return (
    <div style={{
      width: 393, height: 72,
      display: 'flex', alignItems: 'center',
      backgroundColor: colors['neutral/background'],
      boxShadow: '0 -1px 8px rgba(0,0,0,0.3)',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {NAV_ITEMS.map(tab => {
        const isActive = tab === activeTab;
        const c = isActive ? colors['icon/active'] : colors['icon/inactive'];
        return (
          <button key={tab} onClick={() => onTabChange(tab)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: spacing[4], padding: `${spacing[12]}px 0`,
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <Icon type={tab} color={c} />
            <span style={{
              fontSize: textStyles['Body/NavLabel'].fontSize,
              fontWeight: textStyles['Body/NavLabel'].fontWeight,
              color: c, fontFamily: 'inherit',
            }}>
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const meta: Meta = {
  title: 'Components/BottomNavBar',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Bottom navigation bar using Icon component. Active: icon/active (#4C7DFE). Inactive: icon/inactive (#A1A1A1).',
      },
    },
  },
};
export default meta;

export const Interactive: StoryObj = {
  name: 'Interactive',
  render: () => {
    const [active, setActive] = useState<NavTab>('Home');
    return <BottomNavBar activeTab={active} onTabChange={setActive} />;
  },
};

export const HomeActive: StoryObj = {
  name: 'Home active',
  render: () => <BottomNavBar activeTab="Home" onTabChange={() => {}} />,
};

export const PedidosActive: StoryObj = {
  name: 'Pedidos active',
  render: () => <BottomNavBar activeTab="Pedidos" onTabChange={() => {}} />,
};

export const InsightsActive: StoryObj = {
  name: 'Insights active',
  render: () => <BottomNavBar activeTab="Insights" onTabChange={() => {}} />,
};
