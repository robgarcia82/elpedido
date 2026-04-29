import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme/tokens';
import { Icon, IconType } from './Icon';

export type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';

const NAV_ITEMS: { label: string; tab: NavTab; icon: IconType }[] = [
  { label: 'Home',     tab: 'Home',     icon: 'Home' },
  { label: 'Clientes', tab: 'Clientes', icon: 'Clientes' },
  { label: 'Pedidos',  tab: 'Pedidos',  icon: 'Pedidos' },
  { label: 'Estoque',  tab: 'Estoque',  icon: 'Estoque' },
  { label: 'Insights', tab: 'Insights', icon: 'Insights' },
];

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(({ label, tab, icon }) => {
        const isActive = tab === activeTab;
        const iconColor = isActive ? colors['icon/active'] : colors['icon/inactive'];

        return (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Icon type={icon} size={24} color={iconColor} />
            <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['neutral/background'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[4],
    paddingVertical: spacing[12],
  },
  label: {
    ...textStyles['Body/NavLabel'],
    textAlign: 'center',
  },
});
