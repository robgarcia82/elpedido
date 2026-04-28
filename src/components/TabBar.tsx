import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <TouchableOpacity
              key={tab.value}
              style={styles.tabItem}
              onPress={() => onTabChange(tab.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing[12],
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
    width: '100%',
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
  },
});
