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

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const activeIndex = tabs.findIndex((t) => t.value === activeTab);

  // Animate indicator whenever active tab or layout changes
  useEffect(() => {
    if (tabWidths.length === 0 || activeIndex < 0) return;

    Animated.parallel([
      Animated.spring(indicatorX, {
        toValue: tabOffsets[activeIndex] ?? 0,
        useNativeDriver: false,
        tension: 60,
        friction: 20,
      }),
      Animated.spring(indicatorWidth, {
        toValue: tabWidths[activeIndex] ?? 0,
        useNativeDriver: false,
        tension: 60,
        friction: 20,
      }),
    ]).start();
  }, [activeIndex, tabWidths, tabOffsets]);

  const handleTabLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { width, x } = e.nativeEvent.layout;
    setTabWidths((prev) => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
    setTabOffsets((prev) => {
      const next = [...prev];
      next[index] = x;
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
              onLayout={handleTabLayout(index)}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Animated sliding indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: indicatorWidth,
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
    gap: spacing[24],
    paddingTop: spacing[12],
    paddingHorizontal: spacing[16],
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
  // Sliding indicator — sits at the bottom, animated via translateX + width
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing[16],
    height: 2,
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
  },
});
