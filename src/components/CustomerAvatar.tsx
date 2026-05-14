/**
 * CustomerAvatar — DS El Pedido
 * Figma: WQhZjUULyqmR36yh7CvKsX, node 283:98
 *
 * Composed component: AvatarPhoto + customer name + phone.
 *
 * Usage:
 *   // With initials (placeholder)
 *   <CustomerAvatar name="Renato C." phone="(11) 98580-6049" />
 *
 *   // With real photo
 *   <CustomerAvatar name="Renato C." phone="(11) 98580-6049" photoUri="https://..." />
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import { AvatarPhoto } from './AvatarPhoto';

// ── Props ─────────────────────────────────────────────────────
export interface CustomerAvatarProps {
  /** Customer display name — used for initials fallback and label */
  name: string;
  /** Formatted phone number */
  phone: string;
  /** Optional photo URI — renders AvatarPhoto type=photo when provided */
  photoUri?: string;
  /** Avatar size in px (default: 48) */
  size?: number;
}

// ── Component ─────────────────────────────────────────────────
export function CustomerAvatar({
  name,
  phone,
  photoUri,
  size = 48,
}: CustomerAvatarProps) {
  // Derive initials from the first letter of each word (max 2)
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.container}>
      {/* Photo — delegates to AvatarPhoto for both variants */}
      {photoUri ? (
        <AvatarPhoto
          type="photo"
          uri={photoUri}
          size={size}
          accessibilityLabel={`Foto de ${name}`}
        />
      ) : (
        <AvatarPhoto
          type="initials"
          initials={initials}
          size={size}
          accessibilityLabel={`Avatar de ${name}`}
        />
      )}

      {/* Name + phone */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.phone} numberOfLines={1}>
          {phone}
        </Text>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    width: 91,
    alignItems: 'center',
    gap: spacing[12],
  },
  info: {
    alignItems: 'center',
    gap: spacing[4],
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors['surface/on-dark'],
    textAlign: 'center',
  },
  phone: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors['neutral/text-tertiary'],
    textAlign: 'center',
  },
});
