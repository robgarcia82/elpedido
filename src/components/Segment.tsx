/**
 * Segment — DS El Pedido
 * Figma: WQhZjUULyqmR36yh7CvKsX, node 192:100
 *
 * Segmented control (pill-style tab selector).
 *
 * Usage:
 *   const [tab, setTab] = useState(0);
 *   <Segment
 *     items={['Vendas', 'Clientes', 'Produtos']}
 *     selectedIndex={tab}
 *     onSelect={setTab}
 *   />
 *
 * Props:
 *   items         — array of label strings (2–3 items recommended)
 *   selectedIndex — index of the active item
 *   onSelect      — callback with the selected index
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/tokens';

// ── Component tokens (semantic aliases) ───────────────────────
const tokens = {
  trackBg:      colors['neutral/surface-elevated'],   // segment/track-bg
  activeBg:     colors['brand/primary'],               // segment/active-bg
  activeText:   colors['surface/on-dark'],             // segment/active-text
  inactiveText: colors['neutral/text-tertiary'],       // segment/inactive-text
  trackPadding: spacing[4],                            // segment/track-padding
  itemPaddingH: spacing[16],                           // segment/item-padding-h
  itemPaddingV: 6,                                     // segment/item-padding-v
  itemHeight:   44,                                    // segment/item-height
  itemRadius:   62,                                    // segment/item-radius
  trackRadius:  radius.full,                           // segment/track-radius
} as const;

// ── Props ─────────────────────────────────────────────────────
export interface SegmentProps {
  /** Array of label strings — 2 or 3 items recommended */
  items: string[];
  /** Index of the currently active item */
  selectedIndex: number;
  /** Callback fired when a segment is pressed */
  onSelect: (index: number) => void;
}

// ── Component ─────────────────────────────────────────────────
export function Segment({ items, selectedIndex, onSelect }: SegmentProps) {
  return (
    <View style={styles.track}>
      {items.map((label, index) => {
        const isActive = index === selectedIndex;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(index)}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={label}
            style={[styles.item, isActive && styles.itemActive]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.trackBg,
    padding: tokens.trackPadding,
    borderRadius: tokens.trackRadius,
    alignSelf: 'flex-start',
  },
  item: {
    height: tokens.itemHeight,
    paddingHorizontal: tokens.itemPaddingH,
    paddingVertical: tokens.itemPaddingV,
    borderRadius: tokens.itemRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: tokens.activeBg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  labelActive: {
    color: tokens.activeText,
  },
  labelInactive: {
    color: tokens.inactiveText,
  },
});
