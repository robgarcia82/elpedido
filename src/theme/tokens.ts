// ============================================================
// DS El Pedido — Design Tokens
// Auto-extracted from Figma DS: WQhZjUULyqmR36yh7CvKsX
// ============================================================

// --- Colors ---
export const colors = {
  // Brand
  'brand/primary': '#2B3BB3',
  'brand/accent': '#2B7FFF',
  'brand/nav-active': '#4C7DFE',

  // Neutral
  'neutral/background': '#1F1F1F',
  'neutral/surface-elevated': '#282828',
  'neutral/surface-elevated-hover': '#373737',
  'neutral/surface-pressed': '#1E1E1E',
  'neutral/border': 'rgba(161, 161, 161, 0.25)',
  'neutral/text-label': '#919191',
  'neutral/text-secondary': '#A8A29E',
  'neutral/text-tertiary': '#A1A1A1',
  'neutral/text-muted': '#808080',
  'neutral/text-disabled': 'rgba(161, 161, 161, 0.5)',
  'neutral/placeholder': '#B7B7B7',

  // Surface
  'surface/on-dark': '#FFFFFF',
  'surface/on-primary': '#FAFAFA',

  // Feedback
  'feedback/positive': '#6CB527',

  // Icon
  'icon/active': '#4C7DFE',
  'icon/inactive': '#A1A1A1',
  'icon/disabled': 'rgba(161, 161, 161, 0.35)',

  // System
  'system/background': '#0E0E0E',
} as const;

// --- Spacing ---
export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  64: 64,
} as const;

// --- Radius ---
export const radius = {
  sm: 5,
  md: 16,
  full: 100,
} as const;

// --- Typography: Font Sizes ---
export const fontSize = {
  xxs: 10,
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  display: 36,
  '5xl': 48,
} as const;

// --- Typography: Line Heights ---
export const lineHeight = {
  caption: 15,
  tight: 16,
  snug: 20,
  normal: 24,
  relaxed: 28,
  loose: 32,
  display: 40,
} as const;

// --- Typography: Letter Spacing ---
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  extraWide: 1,
} as const;

// --- Typography: Font Weights ---
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// --- Text Styles (pre-composed) ---
export const textStyles = {
  'Heading/Hero': {
    fontFamily: undefined,
    fontSize: fontSize['5xl'],
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.regular,
  },
  'Heading/Display': {
    fontFamily: undefined,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Heading/Currency': {
    fontFamily: undefined,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Heading/H3': {
    fontFamily: undefined,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Heading/Overline': {
    fontFamily: undefined,
    fontSize: fontSize.xxs,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.extraWide,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase' as const,
  },
  'Body/Label': {
    fontFamily: undefined,
    fontSize: fontSize.md,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/Caption': {
    fontFamily: undefined,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },
  'Body/NavLabel': {
    fontFamily: undefined,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/AxisLabel': {
    fontFamily: undefined,
    fontSize: fontSize.xxs,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },
  'Body/Comparison': {
    fontFamily: undefined,
    fontSize: fontSize.lg,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.medium,
  },
  'Body/Input': {
    fontFamily: undefined,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
