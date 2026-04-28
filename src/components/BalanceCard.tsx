import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

const BG_IMAGE = require('../assets/images/BalanceCardBG.png');

const TOTAL_IMAGES  = 1;
const MIN_SKELETON_MS = 800;
const FALLBACK_MS   = 2500;
const COUNT_DURATION = 1400; // ms — count-up total duration

// ── Helpers ──────────────────────────────────────────────────
// Parse "R$ 8.982" → { prefix: "R$ ", numeric: 8982, separator: ".", decimals: 0 }
function parseValue(raw: string) {
  const match = raw.match(/^([^0-9]*)([0-9][0-9.,]*)$/);
  if (!match) return { prefix: '', numeric: 0, separator: '.', decimals: 0 };
  const prefix  = match[1];
  const numStr  = match[2];
  const hasDot  = numStr.includes('.');
  const hasComma = numStr.includes(',');
  // Detect thousands separator vs decimal: if last separator has 3 digits after it, it's thousands
  const separator = (hasDot && !hasComma) ? '.' : ',';
  const numeric  = parseFloat(numStr.replace(/\./g, '').replace(',', '.'));
  const decPart  = numStr.split(/[.,]/).slice(-1)[0] ?? '';
  // If last group has exactly 3 digits and there's no explicit decimal intent, treat as thousands
  const decimals = decPart.length === 3 ? 0 : decPart.length;
  return { prefix, numeric, separator, decimals };
}

function formatNum(value: number, separator: string, decimals: number): string {
  if (decimals > 0) {
    return value.toFixed(decimals).replace('.', separator);
  }
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

// ── Component ────────────────────────────────────────────────
interface BalanceCardProps {
  title?: string;
  value?: string;
  sign?: string;
  amount?: string;
}

export function BalanceCard({
  title  = 'Balanço do mês',
  value  = 'R$ 8.982',
  sign   = '+',
  amount = 'R$ 392',
}: BalanceCardProps) {
  const loadedCount = useRef(0);
  const startTime   = useRef(Date.now());
  const advancedRef = useRef(false);
  const rafRef      = useRef<number | null>(null);
  const [bgReady, setBgReady]       = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  const parsed = useRef(parseValue(value));

  // Animated values
  const skeletonOpacity = useRef(new Animated.Value(1)).current;
  const bgOpacity       = useRef(new Animated.Value(0)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const titleY          = useRef(new Animated.Value(-8)).current;
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

  // Fallback timer
  useEffect(() => {
    const t = setTimeout(advance, FALLBACK_MS);
    return () => {
      clearTimeout(t);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!bgReady) return;

    const { prefix, numeric, separator, decimals } = parsed.current;

    // 1. Skeleton out + bg in
    Animated.parallel([
      Animated.timing(skeletonOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(bgOpacity,       { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {

      // 2. Fade title + comparison
      const fadeIn = (opacity: Animated.Value, y: Animated.Value) =>
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(y,       { toValue: 0, duration: 500, useNativeDriver: true }),
        ]);
      Animated.stagger(150, [
        fadeIn(titleOpacity, titleY),
        fadeIn(compOpacity,  compY),
      ]).start();

      // 3. Count-up: 0 → numeric in COUNT_DURATION ms (ease-out cubic)
      const countStart = Date.now();
      setDisplayValue(prefix + formatNum(0, separator, decimals));

      const tick = () => {
        const elapsed  = Date.now() - countStart;
        const progress = Math.min(elapsed / COUNT_DURATION, 1);
        // ease-out expo: rockets from 0, dramatically slows near the end
        const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayValue(prefix + formatNum(eased * numeric, separator, decimals));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    });
  }, [bgReady]);

  return (
    <View style={styles.container}>

      {/* Skeleton placeholder */}
      <Animated.View style={[styles.skeleton, { opacity: skeletonOpacity }]} />

      {/* Background image */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        <Image
          source={BG_IMAGE}
          style={styles.bgImage}
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}>
          {title}
        </Animated.Text>

        <View style={styles.balanceSection}>
          {/* Count-up value */}
          <Text style={styles.value}>
            {displayValue}
          </Text>

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
  bgImage: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
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
