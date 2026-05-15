import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';

// ── Icon types — mirrors Figma DS node 1:287 ──────────────────
const ICON_TYPES = [
  'Favoritos', 'Arrow left', 'Entradas', 'Bebidas', 'Sobremesa',
  'Lanche', 'Acompanhamento', 'Search', 'Home', 'Clientes',
  'Pedidos', 'Estoque', 'Insights', 'Chevron down', 'Check',
] as const;

type IconType = typeof ICON_TYPES[number];
type IconSize = 16 | 24;

// ── All icons as inline SVG — permanent, no expiry ────────────
function Icon({ type, size = 24 }: { type: IconType; size?: IconSize }) {
  const s = size;
  const props = {
    width: s, height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    style: { flexShrink: 0 as const, display: 'block' as const },
  };
  const st = { stroke: '#ffffff', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const fi = { fill: '#ffffff' };

  switch (type) {
    case 'Favoritos':
      return <svg {...props}><path d="M12 21C12 21 3 15.5 3 9a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 6.5-9 12-9 12z" {...st} /></svg>;

    case 'Arrow left':
      return <svg {...props}><path d="M19 12H5" {...st} /><path d="M12 5L5 12L12 19" {...st} /></svg>;

    case 'Entradas':
      return <svg {...props}>
        <path d="M12 3v5M8 5c0 2.5 1.5 4 4 4s4-1.5 4-4" {...st} />
        <path d="M6 17h12M8 17v4M16 17v4" {...st} />
        <ellipse cx="12" cy="14" rx="5" ry="2" {...st} />
      </svg>;

    case 'Bebidas':
      return <svg {...props}>
        <path d="M7 3h10l-2 7H9L7 3z" {...st} />
        <path d="M9 10c0 3.5 1.5 7 3 7s3-3.5 3-7" {...st} />
        <path d="M9 17h6" {...st} />
        <path d="M10 20h4" {...st} />
      </svg>;

    case 'Sobremesa':
      return <svg {...props}>
        <path d="M5 11h14M5 11C5 7.7 8.1 5 12 5s7 2.7 7 6H5z" {...st} />
        <path d="M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" {...st} />
        <path d="M9 11v2M12 11v4M15 11v2" {...st} />
      </svg>;

    case 'Lanche':
      return <svg {...props}>
        <path d="M5 14h14M5 10h14" {...st} />
        <path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4-4" {...st} />
        <rect x="5" y="14" width="14" height="3" rx="1.5" {...st} />
        <path d="M7 17v2M17 17v2" {...st} />
      </svg>;

    case 'Acompanhamento':
      return <svg {...props}>
        <path d="M12 3C9 3 6 6 6 10c0 2.5 1.2 4.5 3 5.7V20h6v-4.3C16.8 14.5 18 12.5 18 10c0-4-3-7-6-7z" {...st} />
        <circle cx="12" cy="10" r="2" {...st} />
      </svg>;

    case 'Search':
      return <svg {...props}>
        <circle cx="10.5" cy="10.5" r="6.5" {...st} />
        <path d="M15.5 15.5L21 21" {...st} />
      </svg>;

    case 'Home':
      return <svg {...props}>
        <path d="M3 12L12 3l9 9" {...st} />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" {...st} />
      </svg>;

    case 'Clientes':
      return <svg {...props}>
        <circle cx="12" cy="8" r="4" {...st} />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...st} />
      </svg>;

    case 'Pedidos':
      return <svg {...props}>
        <rect x="4" y="3" width="16" height="18" rx="2" {...st} />
        <path d="M8 8h8M8 12h8M8 16h5" {...st} />
      </svg>;

    case 'Estoque':
      return <svg {...props}>
        <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" {...st} />
        <path d="M9 22V12h6v10" {...st} />
      </svg>;

    case 'Insights':
      return <svg {...props}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" {...st} />
      </svg>;

    case 'Chevron down':
      return <svg {...props}><path d="M6 9L12 15L18 9" {...st} /></svg>;

    case 'Check':
      return <svg {...props}><path d="M4 12l5 5L20 7" {...st} /></svg>;

    default:
      return <div style={{ width: s, height: s, borderRadius: 4, backgroundColor: colors['neutral/border'], opacity: 0.3 }} />;
  }
}

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
