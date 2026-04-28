import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

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
      {/* Gradient decorations — use ImageBackground or LinearGradient in production */}
      <View style={styles.decorationLeft} />
      <View style={styles.decorationRight} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.balanceSection}>
          <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
            {value}
          </Text>
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
  container: {
    width: 361,
    height: 215,
    backgroundColor: colors['brand/primary'],
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  // Decorative blurred circles simulated with semi-transparent views
  // In production, replace with react-native-linear-gradient or Skia
  decorationLeft: {
    position: 'absolute',
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(97, 120, 255, 0.45)',
    left: -124,
    top: 133,
  },
  decorationRight: {
    position: 'absolute',
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(80, 200, 120, 0.35)',
    left: 176,
    top: 32,
  },
  content: {
    position: 'absolute',
    left: spacing[16],
    top: spacing[16],
    width: 203,
    justifyContent: 'space-between',
    gap: spacing[64],
  },
  title: {
    ...textStyles['Heading/H3'],
    color: colors['neutral/text-muted'],
  },
  balanceSection: {
    gap: 5,
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
