import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
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

const TOTAL_IMAGES = 3;
const MIN_SKELETON_MS = 800;

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
  const loadedCount = useRef(0);
  const startTime = useRef(Date.now());
  const [bgReady, setBgReady] = useState(false);

  // Animated values
  const skeletonOpacity = useRef(new Animated.Value(1)).current;
  const bgOpacity       = useRef(new Animated.Value(0)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const titleY          = useRef(new Animated.Value(-8)).current;
  const valueOpacity    = useRef(new Animated.Value(0)).current;
  const valueY          = useRef(new Animated.Value(-8)).current;
  const compOpacity     = useRef(new Animated.Value(0)).current;
  const compY           = useRef(new Animated.Value(-8)).current;

  const handleImageLoad = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= TOTAL_IMAGES) {
      const elapsed = Date.now() - startTime.current;
      const wait = Math.max(0, MIN_SKELETON_MS - elapsed);
      setTimeout(() => setBgReady(true), wait);
    }
  };

  useEffect(() => {
    if (!bgReady) return;

    // 1. Fade skeleton out + bg in
    Animated.parallel([
      Animated.timing(skeletonOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(bgOpacity,       { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      // 2. Stagger texts top → bottom
      const fadeIn = (opacity: Animated.Value, y: Animated.Value) =>
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(y,       { toValue: 0, duration: 500, useNativeDriver: true }),
        ]);

      Animated.stagger(150, [
        fadeIn(titleOpacity, titleY),
        fadeIn(valueOpacity, valueY),
        fadeIn(compOpacity,  compY),
      ]).start();
    });
  }, [bgReady]);

  return (
    <View style={styles.container}>

      {/* Skeleton placeholder */}
      <Animated.View style={[styles.skeleton, { opacity: skeletonOpacity }]}>
        <Animated.View style={styles.shimmer} />
      </Animated.View>

      {/* Background decorations */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        <Image source={DECORATION_GRADIENT} style={styles.decorationGradient} resizeMode="cover" onLoad={handleImageLoad} />
        <Image source={DECORATION_TEXTURE}  style={styles.decorationTexture}  resizeMode="cover" onLoad={handleImageLoad} />
        <Image source={DECORATION_OVERLAY}  style={styles.decorationOverlay}  resizeMode="cover" onLoad={handleImageLoad} />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}>
          {title}
        </Animated.Text>
        <View style={styles.balanceSection}>
          <Animated.Text style={[styles.value, { opacity: valueOpacity, transform: [{ translateY: valueY }] }]}>
            {value}
          </Animated.Text>
          <Animated.View style={[styles.comparison, { opacity: compOpacity, transform: [{ translateY: compY }] }]}>
            <Text style={styles.sign}>{sign}</Text>
            <Text style={styles.amount}>{amount}</Text>
          </Animated.View>
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
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors['neutral/surface-elevated'],
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  decorationGradient: { position: 'absolute', width: 469, height: 469, left: -250, top: 16 },
  decorationTexture:  { position: 'absolute', width: 335, height: 307, left: 123,  top: 59  },
  decorationOverlay:  { position: 'absolute', width: 437, height: 475, left: 0,    top: 0, opacity: 0.35 },
  content: {
    position: 'absolute',
    left: spacing[16], top: spacing[16],
    width: 203, height: 175,
    justifyContent: 'flex-start',
    gap: 64,
  },
  title:         { ...textStyles['Heading/H3'],      color: colors['neutral/text-muted'] },
  balanceSection:{ flexDirection: 'column' },
  value:         { ...textStyles['Heading/Hero'],    color: colors['surface/on-dark'] },
  comparison:    { flexDirection: 'row', alignItems: 'center', gap: spacing[4] },
  sign:          { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
  amount:        { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
});
