/**
 * ButtonCard — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 1:278
 *
 * Category selection card with icon + label.
 * Used in horizontal scroll for category filtering.
 * Props: state (Default|Selected) · label · showIcon
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing } from '../theme/tokens';
import { Icon, type IconType } from './_ds-components';

// ── Tokens ─────────────────────────────────────────────────────
const T = {
  bgDefault:  '#1f1f1f', // color-background-default
  bgSelected: colors['brand/primary'],  // color-interaction-enabled (#2b3bb3)
  textDefault: '#a8a29e', // color-text-strong
  textSelected: '#fafafa', // color-text-on-light
  radius: 16, // radius/md
  width:  120,
  height:  88,
  padH: spacing[12], // spacing/12
  padTop: spacing[8], // spacing/8
  padBot: spacing[12], // spacing/12
} as const;

// ── ButtonCard ─────────────────────────────────────────────────
export interface ButtonCardProps {
  state?:    'Default' | 'Selected';
  label?:    string;
  showIcon?: boolean;
  icon?:     IconType;
  onClick?:  () => void;
}

export function ButtonCard({
  state    = 'Default',
  label    = 'Value',
  showIcon = true,
  icon     = 'Favoritos',
  onClick,
}: ButtonCardProps) {
  const isSelected = state === 'Selected';

  return (
    <div
      onClick={onClick}
      style={{
        width:           T.width,
        height:          T.height,
        borderRadius:    T.radius,
        backgroundColor: isSelected ? T.bgSelected : T.bgDefault,
        padding:         `${T.padTop}px ${T.padH}px ${T.padBot}px`,
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'flex-start',
        justifyContent:  'space-between',
        cursor:          'pointer',
        boxSizing:       'border-box',
        flexShrink:      0,
        transition:      'background 0.15s',
      }}
    >
      {/* Icon slot */}
      {showIcon && (
        <div style={{ width: 24, height: 24, flexShrink: 0 }}>
          <Icon type={icon} size={24} />
        </div>
      )}

      {/* Label */}
      <span style={{
        fontSize:    14,
        fontWeight:  500,
        lineHeight:  '16px',
        color:       isSelected ? T.textSelected : T.textDefault,
        fontFamily:  'Geist, system-ui, sans-serif',
        whiteSpace:  'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

// ── Meta ───────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/ButtonCard',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Category selection card — DS El Pedido (Figma node \`1:278\`).

**States:** Default · Selected  
**Props:** \`state\` · \`label\` · \`showIcon\` · \`icon\`  
Usage: horizontal scroll para filtragem de categorias.`,
      },
    },
  },
};
export default meta;

const CATEGORIES: { label: string; icon: IconType }[] = [
  { label: 'Favoritos',      icon: 'Favoritos' },
  { label: 'Entradas',       icon: 'Entradas' },
  { label: 'Bebidas',        icon: 'Bebidas' },
  { label: 'Sobremesas',     icon: 'Sobremesa' },
  { label: 'Lanches',        icon: 'Lanche' },
  { label: 'Acompanhamentos',icon: 'Acompanhamento' },
];

export const Default: StoryObj = {
  name: 'state=Default',
  render: () => <ButtonCard state="Default" label="Value" />,
};

export const Selected: StoryObj = {
  name: 'state=Selected',
  render: () => <ButtonCard state="Selected" label="Value" />,
};

export const BothStates: StoryObj = {
  name: 'Both states',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <ButtonCard state="Default" label="Bebidas" icon="Bebidas" />
        <span style={{ fontSize: 10, color: '#a1a1a1', fontFamily: 'Geist, sans-serif' }}>Default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <ButtonCard state="Selected" label="Bebidas" icon="Bebidas" />
        <span style={{ fontSize: 10, color: '#a1a1a1', fontFamily: 'Geist, sans-serif' }}>Selected</span>
      </div>
    </div>
  ),
};

export const NoIcon: StoryObj = {
  name: 'showIcon=false',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <ButtonCard state="Default"  label="Bebidas" showIcon={false} />
      <ButtonCard state="Selected" label="Bebidas" showIcon={false} />
    </div>
  ),
};

export const CategoryScroll: StoryObj = {
  name: 'Category scroll (interactive)',
  render: () => {
    const [selected, setSelected] = useState('Entradas');
    return (
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {CATEGORIES.map(({ label, icon }) => (
          <ButtonCard
            key={label}
            state={selected === label ? 'Selected' : 'Default'}
            label={label}
            icon={icon}
            onClick={() => setSelected(label)}
          />
        ))}
      </div>
    );
  },
};

export const AllIcons: StoryObj = {
  name: 'All category icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {CATEGORIES.map(({ label, icon }) => (
        <ButtonCard key={label} label={label} icon={icon} />
      ))}
    </div>
  ),
};
