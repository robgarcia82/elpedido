/**
 * Topbar — DS El Pedido
 * Figma: WQhZjUULyqmR36yh7CvKsX, node 174:64
 *
 * Navigation bar with an optional back button and centered title.
 *
 * Usage:
 *   <Topbar title="Pedidos" onBack={() => navigation.goBack()} />
 *   <Topbar title="Dashboard" /> // no back button
 *
 * Props:
 *   title    — string displayed in the center
 *   onBack   — optional callback; renders IconButton(Arrow left) when provided
 *   rightSlot — optional ReactNode rendered on the right side (for symmetry)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';
import { Icon } from './Icon';

// ── Subcomponent: IconButton ──────────────────────────────────
// Matches DS spec node 133:81: 40×40, radius/full, neutral/surface-elevated bg
interface IconButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

function IconButton({ onPress, accessibilityLabel = 'Voltar' }: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={styles.iconButton}
    >
      <Icon
        type="Arrow left"
        size={24}
        color={colors['surface/on-dark']}
      />
    </TouchableOpacity>
  );
}

// ── Topbar ────────────────────────────────────────────────────
export interface TopbarProps {
  /** Page title displayed in the center */
  title: string;
  /** When provided, renders a back button on the left */
  onBack?: () => void;
  /** Optional node rendered on the right (e.g. an action button) */
  rightSlot?: React.ReactNode;
}

export function Topbar({ title, onBack, rightSlot }: TopbarProps) {
  return (
    <View style={styles.container}>
      {/* Left — back button or spacer */}
      <View style={styles.side}>
        {onBack ? (
          <IconButton onPress={onBack} />
        ) : null}
      </View>

      {/* Center — title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right — optional action or spacer (keeps title centered) */}
      <View style={styles.side}>
        {rightSlot ?? null}
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────
const TOPBAR_HEIGHT = 56; // 44px tap area + spacing
const ICON_BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: TOPBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[16],
    backgroundColor: colors['system/background'],
  },

  // Left / right columns — fixed width so title stays perfectly centered
  side: {
    width: ICON_BUTTON_SIZE + spacing[8], // icon(40) + a little extra
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  // Center column — stretches to fill remaining space
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    ...textStyles['Heading/H3'],
    color: colors['surface/on-dark'],
    textAlign: 'center',
  },

  // IconButton: 40×40, radius/full, neutral/surface-elevated bg, 8px padding
  iconButton: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors['neutral/surface-elevated'],
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
});
