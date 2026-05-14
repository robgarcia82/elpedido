import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const PRODUCT_IMG = 'https://www.figma.com/api/mcp/asset/8e61b257-9c83-4606-95a8-56b5aa7e1b7a';

function SmallBtn({ label, variant = 'secondary', onClick }: { label: string; variant?: 'primary' | 'secondary'; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      height: 32, borderRadius: radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: spacing[12], paddingRight: spacing[12], width: '100%',
      backgroundColor: variant === 'primary' ? colors['brand/primary'] : colors['neutral/border'],
      border: 'none', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: colors['surface/on-dark'] }}>{label}</span>
    </button>
  );
}

function StepperBtn({ icon, onClick, color }: { icon: string; onClick?: () => void; color?: string }) {
  return (
    <button onClick={onClick} style={{
      width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
      backgroundColor: color === 'primary' ? colors['brand/primary'] : colors['neutral/surface-elevated'],
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors['surface/on-dark'],
      fontSize: 18, fontWeight: 500, fontFamily: 'Geist, sans-serif',
    }}>{icon}</button>
  );
}

type CardState = 'default' | 'incart' | 'edit';

function ProductCard({ name = 'Produto', price = 'R$ 12,90', state: initialState = 'default' }: { name?: string; price?: string; state?: CardState }) {
  const [qty, setQty] = useState(0);
  const [state, setState] = useState(initialState);
  const inCart = state === 'incart' || state === 'edit';

  return (
    <div style={{
      width: 120, backgroundColor: '#1b1b1b', borderRadius: 16,
      padding: 8, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', gap: 12, fontFamily: 'Geist, system-ui, sans-serif',
      minHeight: state === 'edit' ? 310 : 246,
    }}>
      {/* Image */}
      <div>
        <div style={{ width: '100%', height: 90, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
          <img src={PRODUCT_IMG} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: colors['surface/on-dark'] }}>{name}</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: colors['neutral/text-secondary'] }}>{price}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {inCart ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <StepperBtn icon="−" onClick={() => { if (qty > 0) setQty(q => q - 1); }} />
              <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: -0.5, color: colors['surface/on-dark'] }}>{qty}</span>
              <StepperBtn icon="+" color="primary" onClick={() => setQty(q => q + 1)} />
            </div>
            <SmallBtn label="Observação" />
          </>
        ) : (
          <>
            <SmallBtn label="Adicionar" variant="primary" onClick={() => { setState('incart'); setQty(1); }} />
            <SmallBtn label="Observação" />
          </>
        )}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Components/ProductCard',
  parameters: { backgrounds: { default: 'dark' }, layout: 'centered' },
};
export default meta;

export const Default: StoryObj = { render: () => <ProductCard name="Coca Cola" price="R$ 6,50" state="default" /> };
export const InCart: StoryObj = { name: 'In cart', render: () => { const [q, sQ] = React.useState(2); return (
  <div style={{ width: 120, backgroundColor: '#1b1b1b', borderRadius: 16, padding: 8, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Geist, sans-serif' }}>
    <div><div style={{ width: '100%', height: 90, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}><img src={PRODUCT_IMG} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div><span style={{ fontSize: 12, fontWeight: 500, color: colors['surface/on-dark'] }}>Coca Cola</span><br/><span style={{ fontSize: 12, color: colors['neutral/text-secondary'] }}>R$ 6,50</span></div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={() => sQ(v => Math.max(0, v-1))} style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: colors['neutral/surface-elevated'], border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>−</button>
      <span style={{ fontSize: 18, fontWeight: 500, color: colors['surface/on-dark'] }}>{q}</span>
      <button onClick={() => sQ(v => v+1)} style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: colors['brand/primary'], border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>+</button>
    </div>
    <button style={{ height: 32, borderRadius: radius.full, backgroundColor: colors['neutral/border'], border: 'none', color: colors['surface/on-dark'], fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, sans-serif' }}>Observação</button>
  </div>
); } };
export const Grid: StoryObj = {
  name: 'Product grid',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {['Coca Cola', 'Pastel', 'Coxinha', 'Suco'].map(name => <ProductCard key={name} name={name} price="R$ 8,90" />)}
    </div>
  ),
};
