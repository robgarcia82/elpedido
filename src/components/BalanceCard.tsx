import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

// Local background asset — no expiry, works offline
const BG_IMAGE = require('../assets/images/BalanceCardBG.png');

const TOTAL_IMAGES = 1;
const MIN_SKELETON_MS = 800;
const FALLBACK_MS = 2500; // start animation even if images fail to load

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
  const advancedRef = useRef(false);
  const [bgReady, setBgReady] = useState(false);

  const skeletonOpacity = useRef(new Animated.Value(1)).current;
  const bgOpacity       = useRef(new Animated.Value(0)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const titleY          = useRef(new Animated.Value(-8)).current;
  const valueOpacity    = useRef(new Animated.Value(0)).current;
  const valueY          = useRef(new Animated.Value(-8)).current;
  const compOpacity     = useRef(new Animated.Value(0)).current;
  const compY           = useRef(new Animated.Value(-8)).current;

  const advance = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    const elapsed = Date.now() - startTime.current;
    const wait = Math.max(0, MIN_SKELETON_MS - elapsed);
    setTimeout(() => setBgReady(true), wait);
  };

  const handleImageLoad = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= TOTAL_IMAGES) advance();
  };

  // Fallback: if images never load, start anyway
  useEffect(() => {
    const t = setTimeout(advance, FALLBACK_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!bgReady) return;
    Animated.parallel([
      Animated.timing(skeletonOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      const fadeIn = (opacity: Animated.Value, y: Animated.Value) =>
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(y, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]);
      Animated.stagger(150, [
        fadeIn(titleOpacity, titleY),
        fadeIn(valueOpacity, valueY),
        fadeIn(compOpacity, compY),
      ]).start();
    });
  }, [bgReady]);

  return (
    <View style={styles.container}>
      {/* Skeleton */}
      <Animated.View style={[styles.skeleton, { opacity: skeletonOpacity }]} />

      {/* Background image — local asset */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        <Image source={BG_IMAGE} style={styles.bgImage} resizeMode="cover" onLoad={handleImageLoad} onError={handleImageLoad} />
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
  bgImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  content: {
    position: 'absolute',
    left: spacing[16], top: spacing[16],
    width: 203, height: 175,
    justifyContent: 'flex-start',
    gap: 64,
  },
  title:          { ...textStyles['Heading/H3'],      color: colors['neutral/text-muted'] },
  balanceSection: { flexDirection: 'column' },
  value:          { ...textStyles['Heading/Hero'],    color: colors['surface/on-dark'] },
  comparison:     { flexDirection: 'row', alignItems: 'center', gap: spacing[4] },
  sign:           { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
  amount:         { ...textStyles['Body/Comparison'], color: colors['feedback/positive'] },
});
