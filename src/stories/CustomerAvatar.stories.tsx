import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';
import { CustomerAvatar } from './_ds-components';

const SAMPLE_PHOTO = 'https://www.figma.com/api/mcp/asset/10556111-4c77-48cf-9722-32870ce3d855';

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/CustomerAvatar',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Composed component: **AvatarPhoto** + nome + telefone.

Internamente delega para \`AvatarPhoto\`:
- sem \`photoUri\` → \`<AvatarPhoto type="initials" initials={...} />\`
- com \`photoUri\`  → \`<AvatarPhoto type="photo" uri={...} />\`

Props: \`name\` · \`phone\` · \`photoUri?\` · \`size?\` (default 48)`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const WithInitials: StoryObj = {
  name: 'With initials (no photo)',
  render: () => <CustomerAvatar name="Renato C." phone="(11) 98580-6049" />,
};

export const WithPhoto: StoryObj = {
  name: 'With photo',
  render: () => <CustomerAvatar name="Renato C." phone="(11) 98580-6049" photoUri={SAMPLE_PHOTO} />,
};

export const BothVariants: StoryObj = {
  name: 'Both variants side by side',
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <CustomerAvatar name="Renato C." phone="(11) 98580-6049" />
        <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>type=initials</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <CustomerAvatar name="Renato C." phone="(11) 98580-6049" photoUri={SAMPLE_PHOTO} />
        <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>type=photo</span>
      </div>
    </div>
  ),
};

export const MultipleCustomers: StoryObj = {
  name: 'Multiple customers',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <CustomerAvatar name="Renato C."    phone="(11) 98580-6049" photoUri={SAMPLE_PHOTO} />
      <CustomerAvatar name="Maria Santos" phone="(21) 99876-5432" />
      <CustomerAvatar name="João Pedro"   phone="(31) 91234-5678" />
      <CustomerAvatar name="Ana Lima"     phone="(41) 93456-7890" />
      <CustomerAvatar name="Bruno"        phone="(51) 95678-9012" />
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: 'Avatar sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', fontFamily: 'Geist, system-ui, sans-serif' }}>
      {[32, 40, 48, 64].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CustomerAvatar name="Renato C." phone="(11) 98580-6049" size={size} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
