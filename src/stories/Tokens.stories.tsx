import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, fontSize, spacing, radius, iconSize, textStyles, componentTokens } from '../theme/tokens';

const F = 'Geist, system-ui, sans-serif';

// ── helpers ───────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4C7DFE', fontFamily: 'monospace', marginBottom: 20, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, preview }: { label: string; value: string; preview?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      {preview && <div style={{ flexShrink: 0 }}>{preview}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: '#fff', fontFamily: 'monospace' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#666', fontFamily: 'monospace', marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

// ── Colors ────────────────────────────────────────────────────

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <Row
      label={name}
      value={value}
      preview={
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          backgroundColor: value,
          border: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }} />
      }
    />
  );
}

function ColorsStory() {
  const grouped: Record<string, [string, string][]> = {
    'Brand': [],
    'Backgrounds': [],
    'Text': [],
    'Borders': [],
    'Surface': [],
    'Feedback': [],
    'Icon': [],
    'System': [],
    'Neutral (aliases)': [],
  };

  for (const [k, v] of Object.entries(colors)) {
    if (k.startsWith('brand/'))    grouped['Brand'].push([k, v]);
    else if (k.startsWith('color/bg'))   grouped['Backgrounds'].push([k, v]);
    else if (k.startsWith('color/text')) grouped['Text'].push([k, v]);
    else if (k.startsWith('color/border')) grouped['Borders'].push([k, v]);
    else if (k.startsWith('surface/'))   grouped['Surface'].push([k, v]);
    else if (k.startsWith('feedback/'))  grouped['Feedback'].push([k, v]);
    else if (k.startsWith('icon/'))      grouped['Icon'].push([k, v]);
    else if (k.startsWith('system/'))    grouped['System'].push([k, v]);
    else if (k.startsWith('neutral/'))   grouped['Neutral (aliases)'].push([k, v]);
  }

  return (
    <div style={{ padding: 32, maxWidth: 600, fontFamily: F }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Colors</h2>
      {Object.entries(grouped).filter(([, s]) => s.length > 0).map(([group, swatches]) => (
        <Section key={group} title={group}>
          {swatches.map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </Section>
      ))}
    </div>
  );
}

// ── Spacing ───────────────────────────────────────────────────

function SpacingStory() {
  return (
    <div style={{ padding: 32, maxWidth: 600, fontFamily: F }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Spacing</h2>
      <Section title="spacing collection">
        {Object.entries(spacing).map(([key, val]) => (
          <Row
            key={key}
            label={`spacing/${key}`}
            value={`${val}px`}
            preview={
              <div style={{ width: val, height: 16, backgroundColor: '#2B3BB3', borderRadius: 2, minWidth: 2, flexShrink: 0 }} />
            }
          />
        ))}
      </Section>
      <Section title="icon sizes">
        {Object.entries(iconSize).map(([key, val]) => (
          <Row key={key} label={`icon/size-${key}`} value={`${val}px`}
            preview={<div style={{ width: val, height: val, backgroundColor: '#4C7DFE', borderRadius: 2, flexShrink: 0 }} />}
          />
        ))}
      </Section>
    </div>
  );
}

// ── Radius ────────────────────────────────────────────────────

function RadiusStory() {
  return (
    <div style={{ padding: 32, maxWidth: 600, fontFamily: F }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Radius</h2>
      <Section title="radius collection">
        {Object.entries(radius).map(([key, val]) => (
          <Row
            key={key}
            label={`radius/${key}`}
            value={`${val}px`}
            preview={
              <div style={{
                width: 48, height: 36, backgroundColor: '#282828',
                border: '1.5px solid #373737',
                borderRadius: Math.min(val, 18),
                flexShrink: 0,
              }} />
            }
          />
        ))}
      </Section>
    </div>
  );
}

// ── Typography ────────────────────────────────────────────────

function TypographyStory() {
  return (
    <div style={{ padding: 32, maxWidth: 640, fontFamily: F }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Typography</h2>

      <Section title="Text Styles">
        {Object.entries(textStyles).map(([name, style]) => {
          const s = style as any;
          return (
            <div key={name} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 11, color: '#4C7DFE', fontFamily: 'monospace', marginBottom: 6 }}>{name}</div>
              <div style={{
                color: '#fff',
                fontFamily: F,
                fontSize: s.fontSize,
                fontWeight: s.fontWeight,
                lineHeight: s.lineHeight ? `${(s as any).lineHeight}px` : 'normal',
                letterSpacing: s.letterSpacing ? `${s.letterSpacing}px` : undefined,
                textTransform: s.textTransform,
              }}>
                The quick brown fox
              </div>
              <div style={{ fontSize: 10, color: '#555', fontFamily: 'monospace', marginTop: 4 }}>
                {s.fontSize}px / {s.fontWeight} / lh:{s.lineHeight ?? 'auto'} / ls:{s.letterSpacing ?? 0}
              </div>
            </div>
          );
        })}
      </Section>

      <Section title="Font Sizes">
        {Object.entries(fontSize).map(([key, val]) => (
          <Row key={key} label={`fontSize.${key}`} value={`${val}px`}
            preview={<span style={{ fontSize: val, color: '#fff', lineHeight: 1 }}>Aa</span>}
          />
        ))}
      </Section>
    </div>
  );
}

// ── Component Tokens ──────────────────────────────────────────

function ComponentTokensStory() {
  const flat: [string, string][] = [];
  function flatten(obj: any, prefix: string) {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && v !== null && !k.startsWith('__')) {
        flatten(v, `${prefix}.${k}`);
      } else {
        flat.push([`${prefix}.${k}`, String(v)]);
      }
    }
  }
  flatten(componentTokens, 'tokens');

  const grouped: Record<string, [string, string][]> = {};
  for (const [k, v] of flat) {
    const group = k.split('.')[1];
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push([k.split('.').slice(2).join('.'), v]);
  }

  return (
    <div style={{ padding: 32, maxWidth: 600, fontFamily: F }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Component Tokens</h2>
      {Object.entries(grouped).map(([group, rows]) => (
        <Section key={group} title={group}>
          {rows.map(([name, value]) => {
            const isColor = value.startsWith('#') || value.startsWith('rgba');
            return (
              <Row
                key={name}
                label={name}
                value={value}
                preview={isColor
                  ? <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  : undefined
                }
              />
            );
          })}
        </Section>
      ))}
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens',
  parameters: { backgrounds: { default: 'dark' } },
};
export default meta;

export const Colors: StoryObj     = { name: 'Colors',            render: () => <ColorsStory /> };
export const Spacing: StoryObj    = { name: 'Spacing & Radius',  render: () => <div><SpacingStory /><RadiusStory /></div> };
export const Typography: StoryObj = { name: 'Typography',        render: () => <TypographyStory /> };
export const ComponentsTokens: StoryObj = { name: 'Component Tokens', render: () => <ComponentTokensStory /> };
