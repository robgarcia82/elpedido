import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from '../theme/tokens';

// ── Tokens ────────────────────────────────────────────────────
const TOKENS = {
  bg:        colors['neutral/surface-elevated'],
  textColor: colors['neutral/text-tertiary'],
};

const SAMPLE_PHOTO = 'https://www.figma.com/api/mcp/asset/10556111-4c77-48cf-9722-32870ce3d855';

// ── Pure HTML AvatarPhoto ─────────────────────────────────────
interface AvatarPhotoProps {
  type: 'initials' | 'photo';
  initials?: string;
  uri?: string;
  size?: number;
}

function AvatarPhoto({ type, initials = 'RC', uri, size = 48 }: AvatarPhotoProps) {
  const base: React.CSSProperties = {
    width:        size,
    height:       size,
    borderRadius: '50%',
    overflow:     'hidden',
    flexShrink:   0,
  };

  if (type === 'photo' && uri) {
    return (
      <img
        src={uri}
        alt="Avatar"
        style={{ ...base, objectFit: 'cover', display: 'block' }}
      />
    );
  }

  const fontSize = Math.round(size * 0.25);

  return (
    <div style={{
      ...base,
      backgroundColor: TOKENS.bg,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
    }}>
      <span style={{
        fontSize,
        fontWeight:  500,
        color:       TOKENS.textColor,
        fontFamily:  'Geist, system-ui, sans-serif',
        lineHeight:  1,
        userSelect:  'none',
      }}>
        {initials.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/AvatarPhoto',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `Circular avatar — 48×48px by default, scalable via \`size\` prop.

**type=initials** — placeholder com iniciais sobre \`avatar/placeholder-bg\`
**type=photo** — imagem circular via \`uri\`

**Tokens:** \`avatar/placeholder-bg\` → neutral/surface-elevated · \`avatar/phone\` → neutral/text-tertiary`,
      },
    },
  },
};
export default meta;

// ── Stories ───────────────────────────────────────────────────

export const Initials: StoryObj = {
  name: 'type=Initials',
  render: () => <AvatarPhoto type="initials" initials="RC" />,
};

export const Photo: StoryObj = {
  name: 'type=Photo',
  render: () => <AvatarPhoto type="photo" uri={SAMPLE_PHOTO} />,
};

export const BothVariants: StoryObj = {
  name: 'Both variants',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <AvatarPhoto type="initials" initials="RC" />
        <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'] }}>Initials</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <AvatarPhoto type="photo" uri={SAMPLE_PHOTO} />
        <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'] }}>Photo</span>
      </div>
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', fontFamily: 'Geist, system-ui, sans-serif' }}>
      {[24, 32, 48, 64, 80].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <AvatarPhoto type="initials" initials="RC" size={size} />
          <span style={{ fontSize: 10, color: colors['neutral/text-tertiary'] }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const InitialVariants: StoryObj = {
  name: 'Initials — multiple users',
  render: () => {
    const users = [
      { initials: 'RC', name: 'Renato C.' },
      { initials: 'MS', name: 'Maria S.' },
      { initials: 'JP', name: 'João P.' },
      { initials: 'AL', name: 'Ana L.' },
      { initials: 'B',  name: 'Bruno' },
    ];
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontFamily: 'Geist, system-ui, sans-serif' }}>
        {users.map(u => (
          <div key={u.initials} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <AvatarPhoto type="initials" initials={u.initials} />
            <span style={{ fontSize: 11, color: colors['neutral/text-tertiary'] }}>{u.name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const InCustomerCard: StoryObj = {
  name: 'In customer card context',
  render: () => (
    <div style={{ display: 'flex', gap: 24, fontFamily: 'Geist, system-ui, sans-serif' }}>
      {[
        { type: 'initials' as const, initials: 'RC', name: 'Renato C.', phone: '(11) 98580-6049' },
        { type: 'photo'    as const, uri: SAMPLE_PHOTO, name: 'Renato C.', phone: '(11) 98580-6049' },
      ].map((user, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 91 }}>
          {user.type === 'initials'
            ? <AvatarPhoto type="initials" initials={user.initials!} />
            : <AvatarPhoto type="photo" uri={user.uri!} />
          }
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors['surface/on-dark'] }}>{user.name}</span>
            <span style={{ fontSize: 12, color: colors['neutral/text-tertiary'] }}>{user.phone}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
