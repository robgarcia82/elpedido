import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const PRODUCT_IMG = 'https://www.figma.com/api/mcp/asset/947c3365-6b70-4b77-8bc8-641faeb35496';

// ── Button (Small) — mirrors Button DS component ──────────────
function Button({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  return (
    <button style={{
      height: 32,
      paddingLeft: spacing[12], paddingRight: spacing[12],
      borderRadius: radius.full,
      backgroundColor: variant === 'primary' ? colors['brand/primary'] : 'transparent',
      border: variant === 'secondary' ? `1px solid ${colors['neutral/border']}` : 'none',
      color: colors['surface/on-dark'],
      fontSize: 12, fontWeight: 500, lineHeight: '16px',
      fontFamily: 'Geist, system-ui, sans-serif',
      cursor: 'pointer', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.15s',
    }}>
      {label}
    </button>
  );
}

// ── QuantityStepper ───────────────────────────────────────────
function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ width: 104, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={() => onChange(Math.max(0, value - 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', backgroundColor: colors['neutral/surface-elevated'], color: colors['surface/on-dark'], fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
      <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: -0.5, color: colors['surface/on-dark'], fontFamily: 'Geist, sans-serif' }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', backgroundColor: colors['brand/primary'], color: colors['surface/on-dark'], fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
  );
}

// ── ProductCardHorizontal ─────────────────────────────────────
interface ProductCardHorizontalProps {
  productName?: string;
  productPrice?: string;
  state?: 'default' | 'incart';
}

function ProductCardHorizontal({
  productName = 'Text',
  productPrice = 'Number',
  state: initialState = 'default',
}: ProductCardHorizontalProps) {
  const [qty, setQty] = useState(1);
  const [state, setState] = useState(initialState);

  return (
    <div style={{
      width: 344, height: 64,
      backgroundColor: '#1b1b1b',
      borderRadius: 16,
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      gap: spacing[12],
      fontFamily: 'Geist, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Product image */}
      <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
        <img src={PRODUCT_IMG} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Product info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing[4], minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '12px', color: colors['surface/on-dark'], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {productName}
        </span>
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: colors['neutral/text-secondary'], whiteSpace: 'nowrap' }}>
          {productPrice}
        </span>
      </div>

      {/* Actions */}
      {state === 'incart' ? (
        <QuantityStepper value={qty} onChange={setQty} />
      ) : (
        <div style={{ display: 'flex', gap: spacing[8], flexShrink: 0 }}>
          {/* Button (Secondary, Small) — uses Button DS component */}
          <Button label="Detalhes" variant="secondary" />
          {/* Button (Primary, Small) — uses Button DS component */}
          <Button label="Adicionar" variant="primary" />
        </div>
      )}
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/ProductCardHorizontal',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Card horizontal de produto — listas de pedido/checkout.

**state=Default**: Button(Secondary, Small) "Detalhes" + Button(Primary, Small) "Adicionar"
**state=InCart**: QuantityStepper (−/qty/+)

Reutiliza: **Button** (Small) · **QuantityStepper**

Figma: node \`1:956\``,
      },
    },
  },
};
export default meta;

export const Default: StoryObj = {
  name: 'state=Default',
  render: () => <ProductCardHorizontal productName="Coca Cola" productPrice="R$ 6,50" state="default" />,
};

export const InCart: StoryObj = {
  name: 'state=InCart',
  render: () => <ProductCardHorizontal productName="Coca Cola" productPrice="R$ 6,50" state="incart" />,
};

export const BothStates: StoryObj = {
  name: 'Both states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ProductCardHorizontal productName="Pastel de carne" productPrice="R$ 8,90" state="default" />
      <ProductCardHorizontal productName="Coca Cola"       productPrice="R$ 6,50" state="incart" />
    </div>
  ),
};

export const List: StoryObj = {
  name: 'Product list',
  render: () => {
    const items = [
      { name: 'Pastel de carne', price: 'R$ 8,90' },
      { name: 'Kibe sem cebola', price: 'R$ 7,50' },
      { name: 'Coxinha',         price: 'R$ 5,90' },
      { name: 'Coca Cola',       price: 'R$ 6,50' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(({ name, price }) => (
          <ProductCardHorizontal key={name} productName={name} productPrice={price} />
        ))}
      </div>
    );
  },
};
