import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';

// ── AvatarPhoto (web) ─────────────────────────────────────────
// Mirrors src/components/AvatarPhoto.tsx for the Storybook web env
const TOKENS = {
  bg:        colors['neutral/surface-elevated'],
  textColor: colors['neutral/text-tertiary'],
};

const SAMPLE_PHOTO = 'https://www.figma.com/api/mcp/asset/10556111-4c77-48cf-9722-32870ce3d855';

interface AvatarPhotoProps {
  type: 'initials' | 'photo';
  initials?: string;
  uri?: string;
  size?: number;
}

function AvatarPhoto({ type, initials = 'RC', uri, size = 48 }: AvatarPhotoProps) {
  const fontSize = Math.round(size * 0.25);
  const base: React.CSSProperties = {
    width: size, height: size, borderRadius: '50%',
    overflow: 'hidden', flexShrink: 0,
  };
  if (type === 'photo' && uri) {
    return <img src={uri} alt="Avatar" style={{ ...base, objectFit: 'cover', display: 'block' }} />;
  }
  return (
    <div style={{ ...base, backgroundColor: TOKENS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize, fontWeight: 500, color: TOKENS.textColor, fontFamily: 'Geist, system-ui, sans-serif', lineHeight: 1, userSelect: 'none' }}>
        {initials.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

// ── CustomerAvatar (web) ──────────────────────────────────────
// Mirrors src/components/CustomerAvatar.tsx — uses AvatarPhoto internally
interface CustomerAvatarProps {
  name: string;
  phone: string;
  photoUri?: string;
  size?: number;
}

function CustomerAvatar({ name, phone, photoUri, size = 48 }: CustomerAvatarProps) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      width: 91, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 12,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}>
      {/* Delegates to AvatarPhoto — same as RN component */}
      {photoUri
        ? <AvatarPhoto type="photo" uri={photoUri} size={size} />
        : <AvatarPhoto type="initials" initials={initials} size={size} />
      }

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors['surface/on-dark'], textAlign: 'center', lineHeight: '20px' }}>
          {name}
        </span>
        <span style={{ fontSize: 12, color: colors['neutral/text-tertiary'], textAlign: 'center', lineHeight: '16px' }}>
          {phone}
        </span>
      </div>
    </div>
  );
}

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
