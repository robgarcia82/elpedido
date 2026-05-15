// ============================================================
// DS El Pedido — Design Tokens
// Source: Figma DS aE63DfO5z6PKevs0791B9q
// ============================================================

// ── Colors ───────────────────────────────────────────────────

export const colors = {

  // ── Brand ─────────────────────────────────────────────────
  'brand/primary':         '#2B3BB3', // color-interaction-enabled
  'brand/primary-pressed': '#1E2B8A', // color-interaction-pressed
  'brand/accent':          '#2B7FFF',
  'brand/nav-active':      '#4C7DFE', // color-border-focus

  // ── Background scale ──────────────────────────────────────
  // color-background-weak  → card surfaces (OrderCard bg)
  // color-background-medium → elevated surfaces, badges, textfields
  // color-background-strong → hover states
  'color/bg-default':  '#0E0E0E', // system background (darkest)
  'color/bg-weak':     '#1B1B1B', // ordercard/bg
  'color/bg-base':     '#1F1F1F', // color-background-default (ButtonCard)
  'color/bg-medium':   '#282828', // color-background-medium (badges, textfields, avatar)
  'color/bg-strong':   '#373737', // color-background-strong (hover, dividers)

  // ── Text ──────────────────────────────────────────────────
  'color/text-inverted':    '#FFFFFF', // color-text-inverted (primary text on dark)
  'color/text-on-light':    '#FAFAFA', // color-text-on-light
  'color/text-default':     '#A1A1A1', // color-text-default (avatar/phone, secondary info)
  'color/text-strong':      '#A8A29E', // color-text-strong (badge/text, orderitem/text)
  'color/text-placeholder': '#B7B7B7', // color-text-placeholder (textfield label, searchbar)
  'color/text-danger':      '#E03333', // color-text-danger
  'color/text-success':     '#6CB527', // color-text-success

  // ── Borders ───────────────────────────────────────────────
  'color/border-default': 'rgba(161,161,161,0.25)', // button/secondary-border, textfield unfocused
  'color/border-focus':   '#4C7DFE', // textfield/border-focus, active inputs
  'color/border-danger':  '#E03333', // textfield/border-error
  'color/border-subtle':  'rgba(255,255,255,0.07)', // card borders, dividers

  // ── Surface ───────────────────────────────────────────────
  'surface/on-dark':    '#FFFFFF', // button/primary-text, text on dark bg
  'surface/on-primary': '#FAFAFA', // text on brand/primary bg

  // ── Neutral (legacy aliases — kept for backward compat) ───
  'neutral/background':             '#1F1F1F',
  'neutral/surface-elevated':       '#282828',
  'neutral/surface-elevated-hover': '#373737',
  'neutral/surface-pressed':        '#1E1E1E',
  'neutral/border':                 'rgba(161,161,161,0.25)',
  'neutral/text-secondary':         '#A8A29E',
  'neutral/text-tertiary':          '#A1A1A1',
  'neutral/text-muted':             '#808080',
  'neutral/text-disabled':          'rgba(161,161,161,0.5)',
  'neutral/placeholder':            '#B7B7B7',

  // ── Feedback ──────────────────────────────────────────────
  'feedback/positive': '#6CB527',
  'feedback/negative': '#E03333',

  // ── Icon ──────────────────────────────────────────────────
  'icon/active':   '#4C7DFE',
  'icon/inactive': '#A1A1A1',
  'icon/disabled': 'rgba(161,161,161,0.35)',

  // ── System ────────────────────────────────────────────────
  'system/background': '#0E0E0E',

} as const;

// ── Spacing ───────────────────────────────────────────────────
// Mapped from Figma spacing collection
export const spacing = {
  4:  4,   // spacing/4
  8:  8,   // spacing/8
  12: 12,  // spacing/12
  16: 16,  // spacing/16
  24: 24,  // spacing/24
  32: 32,  // spacing/32
  48: 48,  // spacing/48 (avatar/photo-size)
  64: 64,  // spacing/64
} as const;

// ── Radius ────────────────────────────────────────────────────
export const radius = {
  sm:   4,   // badge/radius
  md:   16,  // radius/md — cards (ButtonCard, OrderCard)
  lg:   24,  // larger cards
  full: 100, // button/radius, avatar/photo-radius — pill/circle
  pill: 62,  // textfield/radius — pill inputs
} as const;

// ── Icon sizes ────────────────────────────────────────────────
export const iconSize = {
  sm: 16, // icon/size-sm
  md: 24, // icon/size-md
} as const;

// ── Component tokens ──────────────────────────────────────────

export const componentTokens = {
  // Button
  button: {
    primaryBg:        '#2B3BB3',
    primaryBgPressed: '#1E2B8A',
    primaryText:      '#FFFFFF',
    secondaryBg:      'rgba(161,161,161,0.25)',
    secondaryBgPressed: '#282828',
    secondaryText:    '#FFFFFF',
    radius:           100, // button/radius → radius/full
    paddingH:         16,  // button/padding-h → spacing/16
    paddingV:         14,  // button/padding-v
    gap:              8,   // button/gap → spacing/8
  },

  // TextField
  textfield: {
    bgDefault:      '#282828',
    bgHover:        '#373737',
    textLabel:      '#B7B7B7',
    textLabelFloat: '#A1A1A1',
    textValue:      '#FFFFFF',
    textPlaceholder:'#B7B7B7',
    textError:      '#E03333',
    textSuccess:    '#6CB527',
    borderFocus:    '#4C7DFE',
    borderError:    '#E03333',
    radius:         62, // textfield/radius → pill
    height:         48, // textfield/height (avatar/photo-size)
    paddingH:       16, // textfield/padding-h → spacing/16
    paddingV:       6,  // textfield/padding-v
    borderWidth:    2,  // textfield/border-width
  },

  // OrderCard
  orderCard: {
    bg:      '#1B1B1B', // ordercard/bg → color-background-weak
    radius:  16,        // ordercard/radius → radius/md
    padding: 16,        // ordercard/padding → spacing/16
  },

  // Avatar / CustomerAvatar
  avatar: {
    placeholderBg: '#282828', // avatar/placeholder-bg → color-background-medium
    photoRadius:   100,       // avatar/photo-radius → radius/full
    name:          '#FFFFFF', // avatar/name → surface/on-dark
    phone:         '#A1A1A1', // avatar/phone → color-text-default
    gap:           4,         // avatar/gap → spacing/4
    gapOuter:      12,        // avatar/gap-outer → spacing/12
    photoSize:     48,        // avatar/photo-size → spacing/48
  },

  // Badge / QuantityBadge
  badge: {
    bg:     '#282828', // badge/bg → color-background-medium
    text:   '#A8A29E', // badge/text → color-text-strong
    radius: 4,         // badge/radius → radius/sm
    size:   20,        // badge/size
  },

  // OrderItem
  orderItem: {
    gap:  12, // orderitem/gap → spacing/12
    text: '#A8A29E', // orderitem/text → color-text-strong
  },

  // ButtonCard
  buttonCard: {
    bgDefault:  '#1F1F1F', // color-background-default
    bgSelected: '#2B3BB3', // color-interaction-enabled → brand/primary
    textDefault:  '#A8A29E', // color-text-strong
    textSelected: '#FAFAFA', // color-text-on-light
    radius: 16, // radius/md
    width:  120,
    height:  88,
  },
} as const;

// ── Typography: Font Sizes ────────────────────────────────────
export const fontSize = {
  xxs: 10,  // Badge/Qty, Overline
  xs:  10,
  sm:  12,  // Body/Caption, NavLabel, TextField hint
  md:  14,  // Body/Label, Body/Regular
  lg:  16,  // Body/Input, Button/Label, Heading/H3
  xl:  18,  // Button/Label High
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  display: 36,
  '5xl': 48,
} as const;

// ── Typography: Line Heights ──────────────────────────────────
export const lineHeight = {
  caption: 15,  // Body/AxisLabel
  tight:   16,  // Body/Label, NavLabel
  snug:    20,  // Body/Regular (14px)
  normal:  24,  // Button/Label
  relaxed: 28,
  loose:   32,  // Body/Input
  display: 40,
} as const;

// ── Typography: Letter Spacing ────────────────────────────────
export const letterSpacing = {
  tight:     -0.5,
  normal:     0,
  wide:       0.5, // Avatar/Name tracking
  extraWide:  1,
} as const;

// ── Typography: Font Weights ──────────────────────────────────
export const fontWeight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
};

// ── Text Styles (pre-composed) ────────────────────────────────
export const textStyles = {
  'Heading/Hero': {
    fontSize:      fontSize['5xl'],
    letterSpacing: letterSpacing.tight,
    fontWeight:    fontWeight.regular,
  },
  'Heading/Display': {
    fontSize:      fontSize.display,
    lineHeight:    lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight:    fontWeight.medium,
  },
  'Heading/Currency': {
    fontSize:      fontSize.xl,
    lineHeight:    lineHeight.display,
    letterSpacing: letterSpacing.tight,
    fontWeight:    fontWeight.medium,
  },
  'Heading/H3': {
    fontSize:      fontSize.lg,
    lineHeight:    lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Heading/Overline': {
    fontSize:       fontSize.xxs,
    lineHeight:     lineHeight.caption,
    letterSpacing:  letterSpacing.extraWide,
    fontWeight:     fontWeight.medium,
    textTransform:  'uppercase' as const,
  },
  'Body/Regular': {
    fontSize:      fontSize.md,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.regular,
  },
  'Body/Label': {
    fontSize:      fontSize.md,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Body/Caption': {
    fontSize:      fontSize.sm,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.regular,
  },
  'Body/NavLabel': {
    fontSize:      fontSize.sm,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Body/AxisLabel': {
    fontSize:      fontSize.xxs,
    lineHeight:    lineHeight.caption,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.regular,
  },
  'Body/Comparison': {
    fontSize:      fontSize.lg,
    letterSpacing: letterSpacing.tight,
    fontWeight:    fontWeight.medium,
  },
  'Body/Input': {
    fontSize:      fontSize.lg,
    lineHeight:    lineHeight.loose,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.regular,
  },
  'Badge/Qty': {
    fontSize:      fontSize.xxs,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Button/Label': {
    fontSize:      fontSize.lg,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Button/Label High': {
    fontSize:      fontSize.xl,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
  'Avatar/Name': {
    fontSize:      fontSize.md,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontWeight:    fontWeight.medium,
  },
  'Avatar/Phone': {
    fontSize:      fontSize.sm,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontWeight:    fontWeight.medium,
  },
} as const;

// ── Type helpers ──────────────────────────────────────────────
export type ColorToken       = keyof typeof colors;
export type SpacingToken     = keyof typeof spacing;
export type RadiusToken      = keyof typeof radius;
export type FontSizeToken    = keyof typeof fontSize;
export type LineHeightToken  = keyof typeof lineHeight;
export type TextStyleToken   = keyof typeof textStyles;
