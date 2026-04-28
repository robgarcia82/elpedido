import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

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
      <Image source={DECORATION_GRADIENT} style={styles.decorationGradient} resizeMode="cover" />
      <Image source={DECORATION_TEXTURE} style={styles.decorationTexture} resizeMode="cover" />
      <Image source={DECORATION_OVERLAY} style={styles.decorationOverlay} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
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
  container: {
    width: '100%',
    height: 215,
    backgroundColor: colors['neutral/background'],
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  decorationGradient: { position: 'absolute', width: 469, height: 469, left: -250, top: 16 },
  decorationTexture:  { position: 'absolute', width: 335, height: 307, left: 123, top: 59 },
  decorationOverlay:  { position: 'absolute', width: 437, height: 475, left: 0, top: 0, opacity: 0.35 },
  content: {
    position: 'absolute',
    left: spacing[16], top: spacing[16],
    width: 203, height: 175,
    justifyContent: 'flex-start',
    gap: 64,
  },
  title:         { ...textStyles['Heading/H3'],      color: colors['neutral/text-muted'] },
  balanceSection:{ flexDirection: 'column' },
  value:         { ...textStyles['Heading/Hero'],     color: colors['surface/on-dark'] },
  comparison:    { flexDirection: 'row', alignItems: 'center', gap: spacing[4] },
  sign:          { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
  amount:        { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
});
