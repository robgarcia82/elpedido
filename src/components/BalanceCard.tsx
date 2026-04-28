import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

// ─── Decorative asset URLs from Figma DS (valid 7 days) ──────────────────────
// TODO: Download and store as local assets for production
const DECORATION_GRADIENT = {
  uri: 'https://www.figma.com/api/mcp/asset/659d8da6-bb52-46fc-b150-75468073c084',
};
const DECORATION_TEXTURE = {
  uri: 'https://www.figma.com/api/mcp/asset/b2eff665-00da-4172-85c8-1fabc28268e9',
};
const DECORATION_OVERLAY = {
  uri: 'https://www.figma.com/api/mcp/asset/f4ad0931-61e0-4d06-8194-b96f66a0f646',
};

interface BalanceCardProps {
  title?: string;
  value?: string;
  sign?: string;
  amount?: string;
}

export function BalanceCard({
  title = 'Balanço do mês',
  value = 'R$ 8.982',
  sign = '+',
  amount = 'R$ 392',
}: BalanceCardProps) {
  return (
    <View style={styles.container}>
      {/* Layer 1 — Gradient circle decoration (left bleed) */}
      <Image source={DECORATION_GRADIENT} style={styles.decorationGradient} resizeMode="cover" />

      {/* Layer 2 — Wave/texture pattern (right side) */}
      <Image source={DECORATION_TEXTURE} style={styles.decorationTexture} resizeMode="cover" />

      {/* Layer 3 — Generative texture overlay (opacity 35%) */}
      <Image source={DECORATION_OVERLAY} style={styles.decorationOverlay} resizeMode="cover" />

      {/* Content — positioned over decorations */}
      <View style={styles.content}>
        {/* Title — muted gray */}
        <Text style={styles.title}>{title}</Text>

        {/* Balance section */}
        <View style={styles.balanceSection}>
          <Text style={styles.value}>{value}</Text>
          <View style={styles.comparison}>
            <Text style={styles.sign}>{sign}</Text>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card: dark background (NOT blue), 361x215, radius/md
  container: {
    width: 361,
    height: 215,
    backgroundColor: colors['neutral/background'],
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  decorationGradient: {
    position: 'absolute',
    width: 469,
    height: 469,
    left: -250,
    top: 16,
  },
  decorationTexture: {
    position: 'absolute',
    width: 335,
    height: 307,
    left: 123,
    top: 59,
  },
  decorationOverlay: {
    position: 'absolute',
    width: 437,
    height: 475,
    left: 0,
    top: 0,
    opacity: 0.35,
  },
  content: {
    position: 'absolute',
    left: spacing[16],
    top: spacing[16],
    width: 203,
    height: 175, // 215 (card) - 16 (top) - 24 (bottom) = 175
    justifyContent: 'flex-start', // primaryAxisAlignItems: MIN
    gap: 64, // itemSpacing: 64
    overflow: 'hidden',
  },
  title: {
    ...textStyles['Heading/H3'],
    color: colors['neutral/text-muted'],
  },
  balanceSection: {
    flexDirection: 'column',
  },
  value: {
    ...textStyles['Heading/Hero'],
    color: colors['surface/on-dark'],
  },
  comparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  sign: {
    ...textStyles['Body/Comparison'],
    color: colors['feedback/positive'],
  },
  amount: {
    ...textStyles['Body/Comparison'],
    color: colors['feedback/positive'],
  },
});
