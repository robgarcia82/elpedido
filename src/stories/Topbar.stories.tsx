import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

// Arrow left SVG path from DS El Pedido Icon component
const ArrowLeft = ({ color = '#fff' }: { color?: string }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19L5 12L12 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── IconButton sub-component ──────────────────────────────────
function IconButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 40,
        borderRadius: radius.full,
        backgroundColor: colors['neutral/surface-elevated'],
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[8],
        flexShrink: 0,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = colors['neutral/surface-elevated-hover'])}
      onMouseLeave={e => (e.currentTarget.style.background = colors['neutral/surface-elevated'])}
    >
      <ArrowLeft color={colors['surface/on-dark']} />
    </button>
  );
}

// ── Topbar component ──────────────────────────────────────────
interface TopbarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
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
      width: '100%',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${spacing[16]}px`,
      backgroundColor: colors['system/background'],
      fontFamily: 'Geist, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Left */}
      <div style={{ width: SIDE_WIDTH, display: 'flex', alignItems: 'center' }}>
        {showBack && <IconButton onClick={onBack} />}
      </div>

      {/* Title */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontSize: textStyles['Heading/H3'].fontSize,
          fontWeight: textStyles['Heading/H3'].fontWeight,
          lineHeight: `${textStyles['Heading/H3'].lineHeight}px`,
          color: colors['surface/on-dark'],
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
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
        component: `
Navigation bar with optional back button (IconButton) and centered title.

**Props:**
- \`title\` — string displayed in the center
- \`onBack\` — optional callback; renders IconButton (Arrow left) when provided
- \`rightSlot\` — optional node on the right for symmetry/actions

**Design tokens:**
- bg: \`system/background\`
- title: \`Heading/H3\` · \`surface/on-dark\`
- back button: \`neutral/surface-elevated\` bg · \`radius/full\`
        `.trim(),
      },
    },
  },
  argTypes: {
    title:    { control: 'text', description: 'Page title' },
    showBack: { control: 'boolean', description: 'Show back button' },
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
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['brand/accent'], fontSize: 14, fontWeight: 500, fontFamily: 'Geist, system-ui, sans-serif', padding: 0 }}>
            Editar
          </button>
        }
      />
    </div>
  ),
};
