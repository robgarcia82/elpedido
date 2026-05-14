/**
 * AvatarPhoto — DS El Pedido
 * Figma: aE63DfO5z6PKevs0791B9q, node 1:762
 *
 * Circular avatar with two variants:
 *  - Initials: placeholder with text initials on elevated bg
 *  - Photo: real image fill
 *
 * Usage:
 *   <AvatarPhoto type="initials" initials="RC" />
 *   <AvatarPhoto type="photo" uri="https://..." />
 *   <AvatarPhoto type="photo" uri="https://..." size={64} />
 */

import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/tokens';

// ── Tokens ────────────────────────────────────────────────────
const TOKENS = {
  bg:        colors['neutral/surface-elevated'], // avatar/placeholder-bg
  textColor: colors['neutral/text-tertiary'],    // avatar/phone
  size:      48,
} as const;

// ── Props ─────────────────────────────────────────────────────
type AvatarPhotoType = 'initials' | 'photo';

interface AvatarPhotoBaseProps {
  /** Size in px — applies to both width and height (default: 48) */
  size?: number;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
}

interface AvatarPhotoInitialsProps extends AvatarPhotoBaseProps {
  type: 'initials';
  /** 1–2 character string shown as placeholder (e.g. "RC") */
  initials: string;
  uri?: never;
}

interface AvatarPhotoPhotoProps extends AvatarPhotoBaseProps {
  type: 'photo';
  /** Image source URI */
  uri: string;
  initials?: never;
}

export type AvatarPhotoProps = AvatarPhotoInitialsProps | AvatarPhotoPhotoProps;

// ── Component ─────────────────────────────────────────────────
export function AvatarPhoto(props: AvatarPhotoProps) {
  const { type, size = TOKENS.size, accessibilityLabel } = props;

  const containerStyle: ViewStyle = {
    width:  size,
    height: size,
    borderRadius: size / 2,
  };

  if (type === 'photo') {
    return (
      <Image
        source={{ uri: props.uri }}
        style={[styles.base, containerStyle]}
        accessibilityLabel={accessibilityLabel ?? 'Avatar'}
        accessibilityRole="image"
        resizeMode="cover"
      />
    );
  }

  // type === 'initials'
  const fontSize = Math.round(size * 0.25); // scales proportionally with container

  return (
    <View
      style={[styles.base, styles.initialsContainer, containerStyle]}
      accessibilityLabel={accessibilityLabel ?? `Avatar ${props.initials}`}
      accessibilityRole="image"
    >
      <Text
        style={[styles.initialsText, { fontSize, lineHeight: fontSize * 1.3 }]}
        numberOfLines={1}
      >
        {props.initials.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  initialsContainer: {
    backgroundColor: TOKENS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color:      TOKENS.textColor,
    fontWeight: '500',
    textAlign:  'center',
  },
});
