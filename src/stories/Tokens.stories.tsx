import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, fontSize, spacing, radius, textStyles } from '../theme/tokens';

// ── Color Swatch ──────────────────────────────────────────
function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: value,
          border: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ color: '#fff', fontSize: 13, fontFamily: 'monospace' }}>{name}</div>
        <div style={{ color: '#666', fontSize: 11, fontFamily: 'monospace' }}>{value}</div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ color: '#4C7DFE', fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Colors Story ─────────────────────────────────────────
function ColorsStory() {
  const groups: Record<string, [string, string][]> = {
    Brand: Object.entries(colors).filter(([k]) => k.startsWith('brand')),
    Neutral: Object.entries(colors).filter(([k]) => k.startsWith('neutral')),
    Surface: Object.entries(colors).filter(([k]) => k.startsWith('surface')),
    Feedback: Object.entries(colors).filter(([k]) => k.startsWith('feedback')),
    Icon: Object.entries(colors).filter(([k]) => k.startsWith('icon')),
    System: Object.entries(colors).filter(([k]) => k.startsWith('system')),
  };

  return (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <h2 style={{ color: '#fff', fontFamily: 'Geist, sans-serif', marginBottom: 32 }}>Colors</h2>
      {Object.entries(groups).map(([group, swatches]) => (
        <Section key={group} title={group}>
          {swatches.map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </Section>
      ))}
    </div>
  );
}

// ── Typography Story ──────────────────────────────────────
function TypographyStory() {
  return (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <h2 style={{ color: '#fff', fontFamily: 'Geist, sans-serif', marginBottom: 32 }}>Typography</h2>

      <Section title="Text Styles">
        {Object.entries(textStyles).map(([name, style]) => (
          <div key={name} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#4C7DFE', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 }}>{name}</div>
            <div
              style={{
                color: '#fff',
                fontFamily: 'Geist, sans-serif',
                fontSize: (style as any).fontSize,
                fontWeight: (style as any).fontWeight,
                lineHeight: (style as any).lineHeight ? `${(style as any).lineHeight}px` : 'normal',
                letterSpacing: (style as any).letterSpacing,
                textTransform: (style as any).textTransform || 'none',
              }}
            >
              The quick brown fox
            </div>
            <div style={{ color: '#555', fontSize: 11, fontFamily: 'monospace', marginTop: 4 }}>
              {(style as any).fontSize}px / {(style as any).lineHeight ?? 'AUTO'}px lh / ls:{(style as any).letterSpacing}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ── Spacing Story ─────────────────────────────────────────
function SpacingStory() {
  return (
    <div style={{ padding: 32, maxWidth: 500 }}>
      <h2 style={{ color: '#fff', fontFamily: 'Geist, sans-serif', marginBottom: 32 }}>Spacing & Radius</h2>

      <Section title="Spacing Scale">
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 80, color: '#888', fontSize: 12, fontFamily: 'monospace' }}>spacing/{key}</div>
            <div style={{ width: value, height: 24, backgroundColor: '#2B7FFF', borderRadius: 3 }} />
            <div style={{ color: '#555', fontSize: 12, fontFamily: 'monospace' }}>{value}px</div>
          </div>
        ))}
      </Section>

      <Section title="Radius Scale">
        {Object.entries(radius).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 80, color: '#888', fontSize: 12, fontFamily: 'monospace' }}>radius/{key}</div>
            <div style={{ width: 48, height: 48, backgroundColor: '#282828', border: '1px solid #444', borderRadius: value }} />
            <div style={{ color: '#555', fontSize: 12, fontFamily: 'monospace' }}>{value}px</div>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ── Meta + Stories ────────────────────────────────────────
const meta: Meta = {
  title: 'Design Tokens/Overview',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;

export const Colors: StoryObj = { render: () => <ColorsStory /> };
export const Typography: StoryObj = { render: () => <TypographyStory /> };
export const Spacing: StoryObj = { render: () => <SpacingStory /> };
