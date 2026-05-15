import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';

// ── Icon assets from Figma DS (node 1:287) ───────────────────
const ASSETS = {
  // size=24
  Favoritos_24:        'https://www.figma.com/api/mcp/asset/9c8d2e48-f73f-4343-bea1-7b903eb8db42',
  ArrowLeft_24:        { v1: 'https://www.figma.com/api/mcp/asset/1aab6440-4bf7-4b3d-b45f-0649c32d76ac', v2: 'https://www.figma.com/api/mcp/asset/78832845-0cd0-4b17-aafa-6ef24b4c8e99' },
  Entradas_24:         'https://www.figma.com/api/mcp/asset/b95ebf6a-e6c7-4ca5-b438-7b41d9ee47a8',
  Bebidas_24:          'https://www.figma.com/api/mcp/asset/6c7983dc-aa23-4ae0-aa13-285e71dd2cfc',
  Sobremesa_24:        'https://www.figma.com/api/mcp/asset/35bf68d0-515c-49cd-96b3-3efd29060e9a',
  Lanche_24:           'https://www.figma.com/api/mcp/asset/02a15e73-a155-498a-a977-0a4942f484b2',
  Acompanhamento_24:   'https://www.figma.com/api/mcp/asset/15522419-d2b3-490c-b498-55e07f9be9ef',
  Search_24:           'https://www.figma.com/api/mcp/asset/ddb27bfc-8250-413a-93d3-df3bd106b9bd',
  Home_24:             'https://www.figma.com/api/mcp/asset/523a94d2-b0b3-4b85-9344-9b6b1c6b436f',
  Clientes_24:         'https://www.figma.com/api/mcp/asset/ad731568-304e-4166-852c-0463bfa79ab4',
  Pedidos_24:          'https://www.figma.com/api/mcp/asset/ac8a7888-5d0e-4997-96b1-d62233d831c2',
  Estoque_24:          'https://www.figma.com/api/mcp/asset/9c0e4a7c-fb5b-4d2a-9c14-492b5aab6842',
  Insights_24:         'https://www.figma.com/api/mcp/asset/64a98922-0c88-4c89-8fec-8b5362366ed6',
  ChevronDown_24:      'https://www.figma.com/api/mcp/asset/03e9a1b4-e48a-4334-a564-509e955d3e66',
  Check_24:            'https://www.figma.com/api/mcp/asset/d66c4f86-bc57-4cbd-835a-fe12baf3d5fa',
  // size=16
  Favoritos_16:        'https://www.figma.com/api/mcp/asset/7f40e67e-f989-4629-93db-34ffdb759ac0',
  ArrowLeft_16:        { v1: 'https://www.figma.com/api/mcp/asset/a2473a6a-ef5a-4a16-95cd-ee9f10f6b10f', v2: 'https://www.figma.com/api/mcp/asset/f05905aa-056c-4166-8bc8-96875fa1be84' },
  Search_16:           'https://www.figma.com/api/mcp/asset/2a1e9fc0-95e1-4e36-a23e-401f155b5888',
  Home_16:             'https://www.figma.com/api/mcp/asset/714248af-ad5f-432e-9fec-893c78f91078',
  Clientes_16:         'https://www.figma.com/api/mcp/asset/e809b571-bffe-4945-839b-ad73c9ef9b7b',
  Pedidos_16:          'https://www.figma.com/api/mcp/asset/8d16a5d3-2dfa-4957-a608-78a7c07b68cc',
  Estoque_16:          'https://www.figma.com/api/mcp/asset/ab284778-b51d-406f-a279-34a53d0957c5',
  Insights_16:         'https://www.figma.com/api/mcp/asset/88dd2c7c-a638-4d54-a6d2-5cf13c10e07e',
  ChevronDown_16:      'https://www.figma.com/api/mcp/asset/a16fc5b1-003b-488f-bdec-b6c5b9e18ae5',
  Check_16:            'https://www.figma.com/api/mcp/asset/64356e9b-c0a4-48eb-8228-9e35e0493792',
};

// ── Icon types (mirrors Figma DS exactly) ─────────────────────
const ICON_TYPES = [
  'Favoritos', 'Arrow left', 'Entradas', 'Bebidas', 'Sobremesa',
  'Lanche', 'Acompanhamento', 'Search', 'Home', 'Clientes',
  'Pedidos', 'Estoque', 'Insights', 'Chevron down', 'Check',
] as const;

type IconType = typeof ICON_TYPES[number];
type IconSize = 16 | 24;

// ── Icon component — renders exact Figma assets ───────────────
function Icon({ type, size = 24 }: { type: IconType; size?: IconSize }) {
  const key = `${type.replace(/ /g, '')}_${size}` as keyof typeof ASSETS;
  const src = ASSETS[key];

  if (!src) return (
    <div style={{ width: size, height: size, borderRadius: 4, backgroundColor: colors['neutral/border'], opacity: 0.3, flexShrink: 0 }} />
  );

  // ArrowLeft — exact positioning from Figma node 1:294 (24px) and 1:325 (16px)
  if (type === 'Arrow left') {
    const vectors = src as { v1: string; v2: string };
    const insetH = size === 16 ? '-1px -10.71%' : '-1px -7.14%';
    const insetD = size === 16 ? '-10.71% -21.43%' : '-7.14% -14.29%';
    return (
      <div style={{ width: size, height: size, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        {/* Horizontal bar — centered vertically, 20.83% inset on sides */}
        <div style={{ position: 'absolute', bottom: '50%', left: '20.83%', right: '20.83%', top: '50%' }}>
          <div style={{ position: 'absolute', top: insetH.split(' ')[0], bottom: insetH.split(' ')[0], left: insetH.split(' ')[1], right: insetH.split(' ')[1] }}>
            <img src={vectors.v1} alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
          </div>
        </div>
        {/* Diagonal tip — 20.83% inset, left quarter */}
        <div style={{ position: 'absolute', bottom: '20.83%', left: '20.83%', right: '50%', top: '20.83%' }}>
          <div style={{ position: 'absolute', top: insetD.split(' ')[0], bottom: insetD.split(' ')[0], left: insetD.split(' ')[1], right: insetD.split(' ')[1] }}>
            <img src={vectors.v2} alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
          </div>
        </div>
      </div>
    );
  }

  // Chevron down — precise absolute positioning from Figma
  if (type === 'Chevron down') {
    const isS = size === 16;
    // size=24: w=12 h=7.41 left=6 top=8.3  |  size=16: w=8 h=4.94 left=4 top=5.53
    const cw = isS ? 8 : 12, ch = isS ? 4.94 : 7.41, cl = isS ? 4 : 6, ct = isS ? 5.53 : 8.3;
    return (
      <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: cl, top: ct, width: cw, height: ch }}>
          <img src={src as string} alt={type} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <img src={src as string} alt={type} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Icon',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Icon library — DS El Pedido (Figma node \`1:287\`).

**Types:** Favoritos · Arrow left · Entradas · Bebidas · Sobremesa · Lanche · Acompanhamento · Search · Home · Clientes · Pedidos · Estoque · Insights · Chevron down · Check

**Sizes:** 24px (nav / primary actions) · 16px (inline / chips / badges)

Tokens: \`icon/size-md\` (24px) · \`icon/size-sm\` (16px)`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const AllIcons: StoryObj = {
  name: 'All icons — size=24',
  render: () => (
    <div style={{ fontFamily: 'Geist, system-ui, sans-serif', display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {ICON_TYPES.map(type => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors['neutral/surface-elevated'], borderRadius: 8 }}>
            <Icon type={type} size={24} />
          </div>
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], textAlign: 'center', maxWidth: 64 }}>{type}</span>
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
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors['neutral/surface-elevated'], borderRadius: 6 }}>
            <Icon type={type} size={16} />
          </div>
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'], textAlign: 'center', maxWidth: 56 }}>{type}</span>
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
            size={size} — icon/size-{size === 24 ? 'md' : 'sm'} — {size === 24 ? 'navegação / ações primárias' : 'inline / chips / badges'}
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
        {/* Preview */}
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
        {/* Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ICON_TYPES.map(type => (
            <div
              key={type}
              onClick={() => setSelected(type)}
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: selected === type ? colors['brand/primary'] : colors['neutral/surface-elevated'],
                borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              <Icon type={type} size={24} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
