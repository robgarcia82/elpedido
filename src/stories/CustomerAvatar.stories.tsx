import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, spacing, radius } from '../theme/tokens';

function CustomerAvatar({ name = 'Renato C.', phone = '(11) 98580-6049', imageUrl }: { name?: string; phone?: string; imageUrl?: string }) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 91, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: colors['neutral/surface-elevated'], display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {imageUrl
          ? <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 14, fontWeight: 500, color: colors['neutral/text-tertiary'] }}>{initials}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors['surface/on-dark'], textAlign: 'center', lineHeight: '20px' }}>{name}</span>
        <span style={{ fontSize: 12, color: colors['neutral/text-tertiary'], textAlign: 'center', lineHeight: '16px' }}>{phone}</span>
      </div>
    </div>
  );
}

const meta: Meta = { title: 'Components/CustomerAvatar', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const Default: StoryObj = { render: () => <CustomerAvatar /> };
export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <CustomerAvatar name="Renato C." phone="(11) 98580-6049" />
      <CustomerAvatar name="Maria Santos" phone="(21) 99876-5432" />
      <CustomerAvatar name="João" phone="(31) 91234-5678" />
    </div>
  ),
};
