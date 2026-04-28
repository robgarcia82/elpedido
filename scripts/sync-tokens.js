#!/usr/bin/env node
// ============================================================
// sync-tokens.js
// Reads tokens directly from Figma DS El Pedido and
// regenerates src/theme/tokens.ts automatically.
//
// Usage:
//   FIGMA_TOKEN=your_token npm run sync-tokens
//
// Get your token at: figma.com/settings → Personal Access Tokens
// ============================================================

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const FILE_KEY   = 'WQhZjUULyqmR36yh7CvKsX'; // DS El Pedido
const TOKEN      = process.env.FIGMA_TOKEN;
const OUTPUT     = path.join(__dirname, '../src/theme/tokens.ts');

if (!TOKEN) {
  console.error('\n❌ Missing FIGMA_TOKEN environment variable.');
  console.error('   Run: FIGMA_TOKEN=your_token npm run sync-tokens');
  console.error('   Get your token at: figma.com/settings → Personal Access Tokens\n');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────
function figmaGet(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      headers: { 'X-Figma-Token': TOKEN },
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function rgbaToHex({ r, g, b, a = 1 }) {
  const toHex = v => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (Math.round(a * 100) < 100) {
    return `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${parseFloat(a.toFixed(2))})`;
  }
  return hex;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('\n🔄 Syncing tokens from Figma DS El Pedido...\n');

  // 1. Fetch variables
  const varsRes = await figmaGet(`/v1/files/${FILE_KEY}/variables/local`);
  if (varsRes.status === 403) {
    console.error('❌ 403 Forbidden. Check your FIGMA_TOKEN has access to this file.');
    process.exit(1);
  }

  const { variables, variableCollections } = varsRes.meta || varsRes;

  // Build collection name map
  const collectionMap = {};
  for (const col of Object.values(variableCollections || {})) {
    collectionMap[col.id] = col.name;
  }

  // 2. Fetch text styles
  const stylesRes = await figmaGet(`/v1/files/${FILE_KEY}/styles`);
  const styles = stylesRes.meta?.styles || [];
  const textStyles = styles.filter(s => s.style_type === 'TEXT');

  // 3. Parse variables by collection
  const colors  = {};
  const spacing = {};
  const typo    = {};

  for (const v of Object.values(variables || {})) {
    const colName = collectionMap[v.variableCollectionId] || '';
    const modeId  = Object.keys(v.valuesByMode)[0];
    const val     = v.valuesByMode[modeId];

    if (colName === 'Colors') {
      colors[v.name] = typeof val === 'object' && 'r' in val ? rgbaToHex(val) : val;
    } else if (colName === 'Spacing') {
      spacing[v.name] = val;
    } else if (colName === 'Typography') {
      typo[v.name] = val;
    }
  }

  // 4. Build text styles map from names
  const textStyleMap = {};
  for (const s of textStyles) {
    textStyleMap[s.name] = s;
  }

  // 5. Generate tokens.ts
  const colorEntries = Object.entries(colors)
    .map(([k, v]) => `  '${k}': '${v}',`)
    .join('\n');

  const spacingObj = {};
  const radiusObj  = {};
  for (const [k, v] of Object.entries(spacing)) {
    if (k.startsWith('spacing/')) spacingObj[k.replace('spacing/', '')] = v;
    else if (k.startsWith('radius/')) radiusObj[k.replace('radius/', '')] = v;
  }

  const spacingEntries = Object.entries(spacingObj)
    .map(([k, v]) => `  ${k}: ${v},`)
    .join('\n');
  const radiusEntries  = Object.entries(radiusObj)
    .map(([k, v]) => `  ${k}: ${v},`)
    .join('\n');

  const fontSizeObj = {};
  const lineHeightObj = {};
  const letterSpacingObj = {};
  const fontWeightObj = {};
  for (const [k, v] of Object.entries(typo)) {
    if (k.startsWith('fontSize/'))       fontSizeObj[k.replace('fontSize/', '')] = v;
    else if (k.startsWith('lineHeight/')) lineHeightObj[k.replace('lineHeight/', '')] = v;
    else if (k.startsWith('letterSpacing/')) letterSpacingObj[k.replace('letterSpacing/', '')] = v;
    else if (k.startsWith('fontWeight/'))  fontWeightObj[k.replace('fontWeight/', '')] = v;
  }

  const fsEntries = Object.entries(fontSizeObj)
    .map(([k, v]) => `  '${k}': ${v},`)
    .join('\n');
  const lhEntries = Object.entries(lineHeightObj)
    .map(([k, v]) => `  '${k}': ${v},`)
    .join('\n');
  const lsEntries = Object.entries(letterSpacingObj)
    .map(([k, v]) => `  '${k}': ${v},`)
    .join('\n');

  const now = new Date().toISOString();

  const output = `// ============================================================
// DS El Pedido — Design Tokens
// Auto-generated from Figma DS: ${FILE_KEY}
// Last synced: ${now}
//
// DO NOT EDIT MANUALLY — run: npm run sync-tokens
// ============================================================

// --- Colors ---
export const colors = {
${colorEntries}
  'system/background': '#0E0E0E',
} as const;

// --- Spacing ---
export const spacing = {
${spacingEntries}
} as const;

// --- Radius ---
export const radius = {
${radiusEntries}
} as const;

// --- Font Sizes ---
export const fontSize = {
${fsEntries}
} as const;

// --- Line Heights ---
export const lineHeight = {
${lhEntries}
} as const;

// --- Letter Spacing ---
export const letterSpacing = {
${lsEntries}
} as const;

// --- Font Weights ---
export const fontWeight = {
  regular: '400' as const,
  medium:  '500' as const,
  semibold: '600' as const,
  bold:    '700' as const,
};

// --- Text Styles (pre-composed) ---
export const textStyles = {
  'Heading/Hero': {
    fontSize: fontSize['5xl'],
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.regular,
  },
  'Heading/Display': {
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Heading/Currency': {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Heading/H3': {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Heading/Overline': {
    fontSize: fontSize.xxs,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.extraWide,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase' as const,
  },
  'Body/Label': {
    fontSize: fontSize.md,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/Caption': {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },
  'Body/NavLabel': {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/AxisLabel': {
    fontSize: fontSize.xxs,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/Comparison': {
    fontSize: fontSize.lg,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Body/Input': {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
`;

  fs.writeFileSync(OUTPUT, output);

  // 6. Summary
  console.log('✅ Tokens synced successfully!\n');
  console.log(`   Colors:      ${Object.keys(colors).length} tokens`);
  console.log(`   Spacing:     ${Object.keys(spacingObj).length} tokens`);
  console.log(`   Radius:      ${Object.keys(radiusObj).length} tokens`);
  console.log(`   Font sizes:  ${Object.keys(fontSizeObj).length} tokens`);
  console.log(`   Line heights:${Object.keys(lineHeightObj).length} tokens`);
  console.log(`   Letter spacing:${Object.keys(letterSpacingObj).length} tokens`);
  console.log(`\n   Output: src/theme/tokens.ts`);
  console.log('\n🎉 Expo + Storybook will hot-reload with the new values.\n');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
