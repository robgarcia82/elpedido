import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

function Avatar({ name, phone }: { name: string; phone: string }) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 91, flexShrink: 0 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: colors['neutral/surface-elevated'], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors['neutral/text-tertiary'] }}>{initials}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors['surface/on-dark'], textAlign: 'center' }}>{name}</span>
        <span style={{ fontSize: 12, color: colors['neutral/text-tertiary'], textAlign: 'center' }}>{phone}</span>
      </div>
    </div>
  );
}

function QtyBadge({ qty }: { qty: number }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: colors['neutral/surface-elevated'], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 500, color: colors['neutral/text-secondary'], lineHeight: 1 }}>{qty}</span>
    </div>
  );
}

function ActionBtn({ label, variant = 'secondary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  return (
    <div style={{
      height: 30, paddingLeft: spacing[12], paddingRight: spacing[12],
      borderRadius: radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: variant === 'primary' ? colors['brand/primary'] : colors['neutral/surface-elevated'],
      cursor: 'pointer',
    }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: variant === 'primary' ? colors['surface/on-dark'] : colors['neutral/text-secondary'], fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

interface OrderCardProps {
  customer: { name: string; phone: string };
  products: { qty: number; name: string }[];
  actions?: { label: string; variant?: 'primary' | 'secondary' }[];
}

function OrderCard({ customer, products, actions = [{ label: 'Próx. passo', variant: 'primary' }, { label: 'Editar' }, { label: 'Adic. item' }] }: OrderCardProps) {
  return (
    <div style={{
      backgroundColor: '#1b1b1b', borderRadius: 16,
      border: `1px solid rgba(161,161,161,0.15)`,
      padding: spacing[16], display: 'inline-flex',
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[16] }}>
          <Avatar name={customer.name} phone={customer.phone} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {products.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <QtyBadge qty={p.qty} />
                <span style={{ fontSize: 12, fontWeight: 500, color: colors['neutral/text-secondary'], whiteSpace: 'nowrap' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[8], width: 91 }}>
          {actions.map((a, i) => <ActionBtn key={i} label={a.label} variant={a.variant} />)}
        </div>
      </div>
    </div>
  );
}

const SAMPLE = {
  customer: { name: 'Renato C.', phone: '(11) 98580-6049' },
  products: [
    { qty: 2, name: 'Pastel de carne' },
    { qty: 1, name: 'Kibe sem cebola' },
    { qty: 1, name: 'Coxinha' },
    { qty: 2, name: 'Coca Cola' },
    { qty: 1, name: 'Coca cola Zero' },
  ],
};

const meta: Meta = { title: 'Components/OrderCard', parameters: { backgrounds: { default: 'dark' }, layout: 'centered' } };
export default meta;

export const Default: StoryObj = { render: () => <OrderCard {...SAMPLE} /> };
export const FewItems: StoryObj = { name: 'Few items', render: () => <OrderCard customer={{ name: 'Maria S.', phone: '(11) 91234-5678' }} products={[{ qty: 1, name: 'Coxinha' }, { qty: 2, name: 'Suco de laranja' }]} /> };
export const KanbanColumn: StoryObj = {
  name: 'Multiple cards (kanban)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420, fontFamily: 'Geist, sans-serif' }}>
      <div style={{ color: colors['neutral/text-muted'], fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Em andamento · 2 pedidos</div>
      <OrderCard {...SAMPLE} />
      <OrderCard customer={{ name: 'Ana M.', phone: '(21) 99876-5432' }} products={[{ qty: 1, name: 'Hamburguer' }, { qty: 1, name: 'Batata frita' }, { qty: 2, name: 'Refrigerante' }]} actions={[{ label: 'Entregar', variant: 'primary' }, { label: 'Editar' }]} />
    </div>
  ),
};
