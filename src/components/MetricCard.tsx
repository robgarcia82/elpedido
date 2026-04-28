import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

interface MetricCardProps {
  title: string;
  currency?: string;
  number: string;
  percentage: string;
  description?: string;
  width?: number;
}

export function MetricCard({
  title,
  currency = 'R$',
  number,
  percentage,
  description = 'mês a mês',
  width = 199,
}: MetricCardProps) {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.content}>
        {/* Title — Heading/Overline */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Values */}
        <View style={styles.valores}>
          {/* Value row: currency + number */}
          <View style={styles.valueRow}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.number}>{number}</Text>
          </View>

          {/* Change row: percentage + description */}
          <View style={styles.changeRow}>
            <Text style={styles.percentage}>{percentage}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['neutral/background'],
    borderRadius: radius.md,
    padding: spacing[16],
    // shadow
    shadowColor: 'rgba(23, 28, 34)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    gap: spacing[16],
  },
  title: {
    ...textStyles['Heading/Overline'],
    color: colors['neutral/text-label'],
  },
  valores: {
    gap: spacing[8],
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[4],
  },
  currency: {
    ...textStyles['Heading/Currency'],
    color: colors['surface/on-dark'],
  },
  number: {
    ...textStyles['Heading/Display'],
    color: colors['surface/on-dark'],
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  percentage: {
    ...textStyles['Body/Caption'],
    color: colors['feedback/positive'],
  },
  descriptionText: {
    ...textStyles['Body/Caption'],
    color: colors['neutral/text-muted'],
  },
});
