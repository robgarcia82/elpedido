import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { colors, spacing } from '../theme/tokens';
import { BalanceCard } from '../components/BalanceCard';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { TabBar } from '../components/TabBar';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';

// Tab data
const TABS = [
  { label: 'Vendas', value: 'vendas' },
  { label: 'Clientes', value: 'clientes' },
  { label: 'Produtos', value: 'produtos' },
  { label: 'Dicas', value: 'dicas' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('vendas');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');

  return (
    <View style={styles.screen}>
      {/* Status bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors['system/background']}
      />

      {/* Safe area top */}
      <SafeAreaView style={styles.safeTop}>
        {/* Scrollable content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Balance Card ── */}
          <View style={styles.section}>
            <BalanceCard
              title="Balanço do mês"
              value="R$ 8.982"
              sign="+"
              amount="R$ 392"
            />
          </View>

          {/* ── Tab Navigation ── */}
          <TabBar
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* ── Metric Cards + Chart ── */}
          <View style={styles.section}>
            {/* Metric cards row */}
            <View style={styles.metricsRow}>
              <MetricCard
                title="Ticket médio"
                currency="R$"
                number="38,90"
                percentage="20%"
                description="mês a mês"
                width={175}
              />
              <MetricCard
                title="Lucro no mês"
                currency="R$"
                number="5.304"
                percentage="18%"
                description="de margem de lucro"
                width={175}
              />
            </View>

            {/* Chart card */}
            <ChartCard title="Vendas em Abril" />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ── Bottom Navigation Bar (fixed) ── */}
      <View style={styles.bottomNavWrapper}>
        <BottomNavBar
          activeTab={activeNav}
          onTabChange={setActiveNav}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors['system/background'],
  },
  safeTop: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 88, // space for BottomNavBar (72) + extra padding
    gap: spacing[24],
  },
  section: {
    paddingHorizontal: spacing[16],
    gap: spacing[8],
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing[8],
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Extra padding for iPhone home indicator
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors['neutral/background'],
  },
});
