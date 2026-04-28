import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
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
  const containerRef = useRef<View>(null);
  const tabRefs      = useRef<(View | null)[]>([]);
  const indicatorX   = useRef(new Animated.Value(0)).current;
  const indicatorW   = useRef(new Animated.Value(0)).current;
  const [ready, setReady] = useState(false);

  const activeIndex = tabs.findIndex(t => t.value === activeTab);

  const measureTab = useCallback(() => {
    const tabRef = tabRefs.current[activeIndex];
    if (!tabRef || !containerRef.current) return;

    tabRef.measureLayout(
      containerRef.current as any,
      (x, _y, width) => {
        Animated.parallel([
          Animated.spring(indicatorX, {
            toValue: x,
            useNativeDriver: false,
            tension: 60,
            friction: 20,
          }),
          Animated.spring(indicatorW, {
            toValue: width,
            useNativeDriver: false,
            tension: 60,
            friction: 20,
          }),
        ]).start();
        setReady(true);
      },
      () => {} // onFail
    );
  }, [activeIndex]);

  // Re-measure on every tab change and after initial layout
  useEffect(() => {
    // Small delay lets the layout settle (needed on web)
    const t = setTimeout(measureTab, 16);
    return () => clearTimeout(t);
  }, [measureTab]);

  return (
    <View style={styles.container}>
      {/* Tabs row — this is the reference frame for measureLayout */}
      <View ref={containerRef} style={styles.content}>
        {tabs.map((tab, index) => {
          const isActive = tab.value === activeTab;
          return (
            <TouchableOpacity
              key={tab.value}
              ref={el => { tabRefs.current[index] = el; }}
              style={styles.tabItem}
              onPress={() => onTabChange(tab.value)}
              onLayout={index === activeIndex ? measureTab : undefined}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Indicator — same parent as tabs, so measureLayout coords align */}
        <Animated.View
          style={[
            styles.indicator,
            {
              opacity: ready ? 1 : 0,
              width: indicatorW,
              transform: [{ translateX: indicatorX }],
            },
          ]}
        />
      </View>
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
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
  },
});
