import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ButtonCard, type IconType } from './_ds-components';

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
  { label: 'Favoritos',       icon: 'Favoritos' },
  { label: 'Entradas',        icon: 'Entradas' },
  { label: 'Bebidas',         icon: 'Bebidas' },
  { label: 'Sobremesas',      icon: 'Sobremesa' },
  { label: 'Lanches',         icon: 'Lanche' },
  { label: 'Acompanhamentos', icon: 'Acompanhamento' },
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
      {(['Default', 'Selected'] as const).map(state => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ButtonCard state={state} label="Bebidas" icon="Bebidas" />
          <span style={{ fontSize: 10, color: '#a1a1a1', fontFamily: 'Geist, sans-serif' }}>{state}</span>
        </div>
      ))}
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
