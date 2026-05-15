import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';
import { Button, QuantityStepper } from './_ds-components';

const PRODUCT_IMG = 'https://www.figma.com/api/mcp/asset/8e61b257-9c83-4606-95a8-56b5aa7e1b7a';

type CardState = 'default' | 'incart' | 'edit';

function ProductCard({
  name = 'Produto',
  price = 'R$ 12,90',
  state: initialState = 'default',
}: {
  name?: string;
  price?: string;
  state?: CardState;
}) {
  const [qty, setQty] = useState(1);
  const [state, setState] = useState(initialState);
  const inCart = state === 'incart' || state === 'edit';

  return (
    <div style={{
      width: 120, backgroundColor: '#1b1b1b', borderRadius: 16,
      padding: 8, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', gap: 12,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {/* Product image */}
      <div>
        <div style={{ width: '100%', height: 90, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
          <img src={PRODUCT_IMG} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: colors['surface/on-dark'] }}>{name}</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: colors['neutral/text-secondary'] }}>{price}</span>
        </div>
      </div>

      {/* Controls — uses Button and QuantityStepper from DS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {inCart ? (
          <>
            {/* QuantityStepper — node 1:813 */}
            <QuantityStepper
              value={qty}
              onChange={setQty}
              min={0}
            />
            {/* Button (Secondary, Small) — node 1:817 */}
            <Button tertiary="Secondary" size="Small" label="Observação" autoWidth />
          </>
        ) : (
          <>
            {/* Button (Primary, Small) — node 1:817 */}
            <Button
              tertiary="Primary"
              size="Small"
              label="Adicionar"
              autoWidth
              onClick={() => { setState('incart'); setQty(1); }}
            />
            {/* Button (Secondary, Small) — node 1:817 */}
            <Button tertiary="Secondary" size="Small" label="Observação" autoWidth />
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

export const Default: StoryObj = {
  render: () => <ProductCard name="Coca Cola" price="R$ 6,50" state="default" />,
};

export const InCart: StoryObj = {
  name: 'In cart',
  render: () => <ProductCard name="Coca Cola" price="R$ 6,50" state="incart" />,
};

export const Grid: StoryObj = {
  name: 'Product grid',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {['Coca Cola', 'Pastel', 'Coxinha', 'Suco'].map(name => (
        <ProductCard key={name} name={name} price="R$ 8,90" />
      ))}
    </div>
  ),
};
