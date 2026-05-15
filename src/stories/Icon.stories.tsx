import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';
import { Icon, DS_ICON_TYPES } from './_ds-components';

const ICON_TYPES = DS_ICON_TYPES;
type IconType = typeof ICON_TYPES[number];
type IconSize = 16 | 24;

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Icon',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Icon library — DS El Pedido (Figma node \`1:287\`).

**15 tipos:** Favoritos · Arrow left · Entradas · Bebidas · Sobremesa · Lanche · Acompanhamento · Search · Home · Clientes · Pedidos · Estoque · Insights · Chevron down · Check

**Sizes:** 24px (nav / primary actions) · 16px (inline / chips / badges)

Todos os ícones são SVG inline — sem dependência de URLs remotas.`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const AllIcons: StoryObj = {
  name: 'All icons — size=24',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {ICON_TYPES.map(type => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors['neutral/surface-elevated'], borderRadius: 10 }}>
            <Icon type={type} size={24} />
          </div>
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], textAlign: 'center', maxWidth: 72 }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons16: StoryObj = {
  name: 'All icons — size=16',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {ICON_TYPES.map(type => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors['neutral/surface-elevated'], borderRadius: 8 }}>
            <Icon type={type} size={16} />
          </div>
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], textAlign: 'center', maxWidth: 64 }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: 'Sizes — 16 & 24',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {([24, 16] as IconSize[]).map(size => (
        <div key={size}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            size={size} — icon/size-{size === 24 ? 'md' : 'sm'} — {size === 24 ? 'navegação / ações' : 'inline / chips / badges'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {ICON_TYPES.map(type => (
              <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Icon type={type} size={size} />
                <span style={{ fontSize: 9, color: colors['neutral/text-tertiary'], fontFamily: 'monospace' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Picker: StoryObj = {
  name: 'Picker',
  render: () => {
    const [selected, setSelected] = React.useState<IconType>('Home');
    return (
      <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, backgroundColor: colors['neutral/surface-elevated'], borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type={selected} size={24} />
          </div>
          <div style={{ width: 48, height: 48, backgroundColor: colors['neutral/surface-elevated'], borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type={selected} size={16} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: colors['surface/on-dark'] }}>{selected}</div>
            <div style={{ fontSize: 12, color: colors['neutral/text-tertiary'], marginTop: 4 }}>24px + 16px</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ICON_TYPES.map(type => (
            <div key={type} onClick={() => setSelected(type)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: selected === type ? colors['brand/primary'] : colors['neutral/surface-elevated'], borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}>
              <Icon type={type} size={24} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
