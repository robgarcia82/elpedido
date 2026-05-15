import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, textStyles } from '../theme/tokens';
import { IconButton, Icon } from './_ds-components';

// ── Topbar component ──────────────────────────────────────────
interface TopbarProps {
  title?:     string;
  showBack?:  boolean;
  onBack?:    () => void;
  rightSlot?: React.ReactNode;
}

function Topbar({
  title    = 'Item',
  showBack = true,
  onBack,
  rightSlot,
}: TopbarProps) {
  const SIDE_WIDTH = 48;

  return (
    <div style={{
      width: '100%', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `0 ${spacing[16]}px`,
      backgroundColor: colors['system/background'],
      fontFamily: 'Geist, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Left — IconButton (node 1:490) from DS */}
      <div style={{ width: SIDE_WIDTH, display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <IconButton
            icon="Arrow left"
            style="filled"
            state="default"
            onClick={onBack}
          />
        )}
      </div>

      {/* Title */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontSize: textStyles['Heading/H3'].fontSize,
          fontWeight: textStyles['Heading/H3'].fontWeight,
          lineHeight: `${textStyles['Heading/H3'].lineHeight}px`,
          color: colors['surface/on-dark'],
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {title}
        </span>
      </div>

      {/* Right */}
      <div style={{ width: SIDE_WIDTH, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {rightSlot ?? null}
      </div>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Topbar',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Navigation bar — DS El Pedido.

**Props:** \`title\` · \`showBack\` · \`onBack\` · \`rightSlot\`

Reutiliza: **IconButton** (Arrow left, filled) · **Icon** (Arrow left)`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const Default: StoryObj = {
  name: 'Default — with back button',
  render: () => <Topbar title="Item" showBack />,
};

export const NoBackButton: StoryObj = {
  name: 'No back button',
  render: () => <Topbar title="Dashboard" showBack={false} />,
};

export const LongTitle: StoryObj = {
  name: 'Long title (truncates)',
  render: () => <Topbar title="Relatório de vendas mensais" showBack />,
};

export const WithRightSlot: StoryObj = {
  name: 'With right action',
  render: () => (
    <Topbar
      title="Pedidos"
      showBack
      rightSlot={
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: colors['brand/accent'],
          fontSize: textStyles['Body/Label'].fontSize,
          fontWeight: textStyles['Body/Label'].fontWeight,
          fontFamily: 'Geist, system-ui, sans-serif',
          padding: 0,
        }}>
          Filtrar
        </button>
      }
    />
  ),
};

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 393 }}>
      <Topbar title="Com back button" showBack />
      <Topbar title="Sem back button" showBack={false} />
      <Topbar title="Título longo que vai truncar aqui mesmo" showBack />
      <Topbar title="Com ação direita" showBack
        rightSlot={
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['brand/accent'], fontSize: 14, fontWeight: 500, fontFamily: 'Geist, sans-serif', padding: 0 }}>
            Editar
          </button>
        }
      />
    </div>
  ),
};
