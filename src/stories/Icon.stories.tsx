import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors } from '../theme/tokens';

// ── Icon types ────────────────────────────────────────────────
type IconType =
  | 'Favoritos' | 'Empty' | 'Arrow left' | 'Search'
  | 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights'
  | 'Entradas' | 'Bebidas' | 'Sobremesa' | 'Lanche' | 'Acompanhamento';

// ── SVG paths per icon ────────────────────────────────────────
const ICON_PATHS: Record<IconType, React.ReactNode> = {
  Favoritos: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
  Empty: <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />,
  'Arrow left': <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />,
  Search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />,
  Home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  Clientes: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  Pedidos: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />,
  Estoque: <path d="M20 2H4v2l4 3.4V21l4-2 4 2V7.4L20 4V2z" />,
  Insights: <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />,
  Entradas: <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-5.44-8.99-5.44-8.99 0h8.99zM1.02 17h15v2h-15z" />,
  Bebidas: <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />,
  Sobremesa: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />,
  Lanche: <path d="M4 16v-1.09C2.81 14.47 2 13.33 2 12c0-1.66 1.34-3 3-3 .35 0 .68.07 1 .18V5c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v4.18c.32-.11.65-.18 1-.18 1.66 0 3 1.34 3 3 0 1.33-.81 2.47-2 2.91V16h1v2H3v-2h1zm2 0h12v-1H6v1zm-.5-3.5h13c.28-.31.5-.64.5-1s-.22-.69-.5-1h-13c-.28.31-.5.64-.5 1s.22.69.5 1zM7 9h10V6H7v3z" />,
  Acompanhamento: <path d="M15.5 2.1L11 6.6 9.5 5.1 5.6 9l1.5 1.5-4.6 4.6L4 18l2.1 2.1L8 22l3.8-3.8 1.5 1.5 3.9-3.9-1.5-1.5 4.5-4.5-4.7-7.7zm.5 9.4L12.3 8l1.4-1.4 3.7 6-1.4 1.4-3.9-2.5zm-8.1.1l3.8-3.8L13.3 9l-3.8 3.8-1.6-1.2z" />,
};

const ALL_ICONS = Object.keys(ICON_PATHS) as IconType[];

const CATEGORIES = {
  'Navegação': ['Home', 'Clientes', 'Pedidos', 'Estoque', 'Insights'] as IconType[],
  'Categorias': ['Entradas', 'Bebidas', 'Sobremesa', 'Lanche', 'Acompanhamento'] as IconType[],
  'UI': ['Search', 'Arrow left', 'Favoritos', 'Empty'] as IconType[],
};

// ── Icon SVG component ────────────────────────────────────────
function IconSvg({ type, size = 24, color = '#fff' }: { type: IconType; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {ICON_PATHS[type]}
    </svg>
  );
}

// ── Icon card ─────────────────────────────────────────────────
function IconCard({ type, color }: { type: IconType; color: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(type);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div
      onClick={copy}
      title={`type="${type}"`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '16px 12px', borderRadius: 12,
        backgroundColor: colors['neutral/surface-elevated'],
        cursor: 'pointer', width: 88, transition: 'background 0.15s',
        border: `1px solid ${copied ? colors['brand/accent'] : 'transparent'}`,
      }}
    >
      <IconSvg type={type} color={color} />
      <span style={{ fontSize: 10, color: copied ? colors['brand/accent'] : colors['neutral/text-tertiary'], fontFamily: 'Geist, monospace', textAlign: 'center', lineHeight: 1.3 }}>
        {copied ? 'Copied!' : type}
      </span>
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Icon',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Icon library for DS El Pedido. 14 icons organized by category. Click any icon to copy its `type` value.',
      },
    },
  },
};
export default meta;

// All icons by category
export const AllIcons: StoryObj = {
  name: 'All icons',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {Object.entries(CATEGORIES).map(([category, icons]) => (
        <div key={category}>
          <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{category}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {icons.map(type => <IconCard key={type} type={type} color={colors['surface/on-dark']} />)}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Active vs Inactive state
export const ActiveInactive: StoryObj = {
  name: 'Active / Inactive',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Active — icon/active</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['Home','Clientes','Pedidos','Estoque','Insights'] as IconType[]).map(t => <IconCard key={t} type={t} color={colors['icon/active']} />)}
        </div>
      </div>
      <div>
        <div style={{ color: colors['neutral/text-muted'], fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Inactive — icon/inactive</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['Home','Clientes','Pedidos','Estoque','Insights'] as IconType[]).map(t => <IconCard key={t} type={t} color={colors['icon/inactive']} />)}
        </div>
      </div>
    </div>
  ),
};

// Size scale
export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, fontFamily: 'Geist, system-ui, sans-serif' }}>
      {[16, 20, 24, 32, 40].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <IconSvg type="Home" size={size} color={colors['surface/on-dark']} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

// Interactive picker
export const Picker: StoryObj = {
  name: 'Interactive picker',
  render: () => {
    const [active, setActive] = useState<IconType>('Home');
    const [color, setColor] = useState(colors['icon/active']);
    return (
      <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 24, backgroundColor: colors['neutral/surface-elevated'], borderRadius: 16 }}>
          <IconSvg type={active} size={48} color={color} />
          <div>
            <div style={{ color: colors['surface/on-dark'], fontSize: 18, fontWeight: 500 }}>{active}</div>
            <div style={{ color: colors['neutral/text-tertiary'], fontSize: 12, marginTop: 4, fontFamily: 'monospace' }}>type="{active}"</div>
          </div>
        </div>
        {/* Color selector */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[colors['surface/on-dark'], colors['icon/active'], colors['icon/inactive'], colors['feedback/positive'], colors['brand/accent']].map(c => (
            <button key={c} onClick={() => setColor(c)} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c, border: c === color ? '2px solid white' : '2px solid transparent', cursor: 'pointer' }} />
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ALL_ICONS.map(type => (
            <div key={type} onClick={() => setActive(type)} style={{ padding: 12, borderRadius: 10, backgroundColor: active === type ? colors['brand/accent'] + '33' : colors['neutral/surface-elevated'], border: `1px solid ${active === type ? colors['brand/accent'] : 'transparent'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
              <IconSvg type={type} color={active === type ? colors['brand/accent'] : color} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
