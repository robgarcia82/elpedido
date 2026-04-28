import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme/tokens';

interface TabItem {
  label: string;
  value: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GAP     = spacing[24]; // gap between tabs
const PADDING = spacing[16]; // paddingLeft of content row

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  const [tabWidths, setTabWidths] = useState<number[]>(Array(tabs.length).fill(0));
  const indicatorX = useRef(new Animated.Value(PADDING)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;
  const measuredCount = useRef(0);

  const activeIndex = tabs.findIndex(t => t.value === activeTab);

  // Compute x position from widths array — no coordinate system issues
  const computeX = (widths: number[], index: number) => {
    let x = PADDING;
    for (let i = 0; i < index; i++) {
      x += widths[i] + GAP;
    }
    return x;
  };

  // Animate indicator when widths are ready and activeIndex changes
  useEffect(() => {
    if (tabWidths[activeIndex] === 0) return;

    const targetX = computeX(tabWidths, activeIndex);
    const targetW = tabWidths[activeIndex];

    Animated.parallel([
      Animated.spring(indicatorX, {
        toValue: targetX,
        useNativeDriver: false,
        tension: 60,
        friction: 20,
      }),
      Animated.spring(indicatorW, {
        toValue: targetW,
        useNativeDriver: false,
        tension: 60,
        friction: 20,
      }),
    ]).start();
  }, [activeIndex, tabWidths]);

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setTabWidths(prev => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab, index) => {
          const isActive = tab.value === activeTab;
          return (
            <TouchableOpacity
              key={tab.value}
              style={styles.tabItem}
              onPress={() => onTabChange(tab.value)}
              onLayout={handleLayout(index)}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Indicator positioned relative to container using computed x from widths */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: indicatorW,
            transform: [{ translateX: indicatorX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors['neutral/border'],
  },
  content: {
    flexDirection: 'row',
    gap: GAP,
    paddingTop: spacing[12],
    paddingLeft: PADDING,
    paddingRight: PADDING,
  },
  tabItem: {
    paddingBottom: spacing[12],
  },
  label: {
    ...textStyles['Body/Label'],
    color: colors['neutral/text-tertiary'],
  },
  labelActive: {
    color: colors['surface/on-dark'],
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
  },
});
