import React, { useRef, useEffect } from 'react';
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

// Each tab manages its own indicator opacity — no position math needed
function TabItem({ label, isActive, onPress }: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const indicatorOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const indicatorWidth   = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(indicatorOpacity, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(indicatorWidth, {
        toValue: isActive ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
      {/* Indicator sits at the bottom of the tab, full width of text */}
      <Animated.View
        style={[
          styles.indicator,
          {
            opacity: indicatorOpacity,
            // Animate width from 0 → 100% for a "grow" effect
            width: indicatorWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </TouchableOpacity>
  );
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.value}
            label={tab.label}
            isActive={tab.value === activeTab}
            onPress={() => onTabChange(tab.value)}
          />
        ))}
      </View>
      {/* Bottom border */}
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    gap: spacing[24],
    paddingTop: spacing[12],
    paddingHorizontal: spacing[16],
  },
  tabItem: {
    paddingBottom: spacing[12],
    alignItems: 'flex-start',
  },
  label: {
    ...textStyles['Body/Label'],
    color: colors['neutral/text-tertiary'],
  },
  labelActive: {
    color: colors['surface/on-dark'],
  },
  indicator: {
    height: 2,
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
    // Align to the bottom of the tab
    marginTop: 8,
  },
  border: {
    height: 1,
    backgroundColor: colors['neutral/border'],
    marginTop: -1,
  },
});
