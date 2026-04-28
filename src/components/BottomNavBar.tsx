import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme/tokens';

// Icon assets — replace with local vector icons (e.g. @expo/vector-icons, react-native-vector-icons)
// These are placeholder sources; swap with local SVG/PNG in production
const ICONS: Record<string, ImageSourcePropType> = {
  Home: { uri: 'https://www.figma.com/api/mcp/asset/e6d2450c-ae70-4eba-bcc6-eb1e4ef23901' },
  Clientes: { uri: 'https://www.figma.com/api/mcp/asset/a52a3de9-29e1-4052-aa51-c1df2ff1527a' },
  Pedidos: { uri: 'https://www.figma.com/api/mcp/asset/2129d3ec-92e0-4f0e-b836-39064da079e7' },
  Estoque: { uri: 'https://www.figma.com/api/mcp/asset/78bfdb34-b565-4f5d-94db-20095c055bf4' },
  Insights: { uri: 'https://www.figma.com/api/mcp/asset/55e4c176-c600-4793-a077-9043c1bfd2f9' },
};

export type NavTab = 'Home' | 'Clientes' | 'Pedidos' | 'Estoque' | 'Insights';

const NAV_ITEMS: { label: string; tab: NavTab }[] = [
  { label: 'Home', tab: 'Home' },
  { label: 'Clientes', tab: 'Clientes' },
  { label: 'Pedidos', tab: 'Pedidos' },
  { label: 'Estoque', tab: 'Estoque' },
  { label: 'Insights', tab: 'Insights' },
];

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(({ label, tab }) => {
        const isActive = tab === activeTab;
        const iconColor = isActive ? colors['icon/active'] : colors['icon/inactive'];
        const labelColor = isActive ? colors['icon/active'] : colors['icon/inactive'];

        return (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            {/* Icon */}
            <View style={styles.iconWrapper}>
              <Image
                source={ICONS[tab]}
                style={[styles.icon, { tintColor: iconColor }]}
                resizeMode="contain"
              />
            </View>

            {/* Label */}
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 393,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing[4],
    backgroundColor: colors['neutral/background'],
    // Shadow matching DS spec: 0 -1 8 rgba(0,0,0,0.3)
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
  iconWrapper: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    ...textStyles['Body/NavLabel'],
    textAlign: 'center',
  },
});
