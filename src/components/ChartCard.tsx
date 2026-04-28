import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../theme/tokens';

// Bar data from DS: [x_offset, height] for 45 bars
const BAR_DATA: [number, number][] = [
  [0, 154], [7, 85], [14, 85], [21, 29], [28, 29], [35, 125], [42, 125],
  [49, 65], [56, 65], [63, 65], [70, 65], [77, 172], [84, 172], [91, 38],
  [98, 38], [105, 38], [112, 161], [119, 161], [126, 32], [133, 108],
  [140, 118], [147, 118], [154, 141], [161, 161], [168, 57], [175, 34],
  [182, 180], [189, 30], [196, 156], [203, 113], [210, 136], [217, 174],
  [224, 39], [231, 125], [238, 150], [245, 62], [252, 116], [259, 176],
  [266, 48], [273, 52], [280, 159], [287, 164], [294, 55], [301, 38], [308, 164],
];

const GRID_Y = [0, 54, 108, 162, 216];
const AXIS_LABELS = [
  { label: '08:00', x: 8 },
  { label: '12:00', x: 99 },
  { label: '16:00', x: 187 },
  { label: '20:00', x: 275 },
];

const CHART_WIDTH = 313;
const BARS_HEIGHT = 180;
const LINES_HEIGHT = 216;

interface ChartCardProps {
  title?: string;
}

export function ChartCard({ title = 'Vendas em Abril' }: ChartCardProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Chart area */}
      <View style={styles.chartArea}>
        {/* Grid lines */}
        <View style={[styles.linesContainer, { top: 33 }]}>
          {GRID_Y.map((y, i) => (
            <View
              key={i}
              style={[styles.gridLine, { top: y }]}
            />
          ))}
        </View>

        {/* Bars — bottom-aligned */}
        <View style={[styles.barsContainer, { top: 70 }]}>
          {BAR_DATA.map(([x, h], i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  left: x,
                  height: h,
                  bottom: 0,
                  top: BARS_HEIGHT - h,
                },
              ]}
            />
          ))}
        </View>

        {/* X-Axis labels */}
        <View style={[styles.xAxis, { top: 266 }]}>
          {AXIS_LABELS.map(({ label, x }) => (
            <Text
              key={label}
              style={[styles.axisLabel, { position: 'absolute', left: x, top: 8 }]}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 361,
    backgroundColor: colors['neutral/background'],
    borderRadius: radius.md,
    paddingTop: spacing[24],
    paddingHorizontal: spacing[24],
    paddingBottom: spacing[16],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  title: {
    ...textStyles['Heading/H3'],
    color: colors['surface/on-dark'],
  },
  chartArea: {
    height: 298,
    width: CHART_WIDTH,
    position: 'relative',
  },
  linesContainer: {
    position: 'absolute',
    left: 0,
    width: CHART_WIDTH,
    height: LINES_HEIGHT,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    width: CHART_WIDTH,
    height: 1,
    backgroundColor: 'rgba(66, 66, 66, 0.5)',
  },
  barsContainer: {
    position: 'absolute',
    left: 0.5,
    width: CHART_WIDTH,
    height: BARS_HEIGHT,
  },
  bar: {
    position: 'absolute',
    width: 5,
    backgroundColor: colors['brand/accent'],
    borderRadius: 1,
  },
  xAxis: {
    position: 'absolute',
    left: 0,
    width: CHART_WIDTH,
    height: 32,
  },
  axisLabel: {
    ...textStyles['Body/AxisLabel'],
    color: colors['neutral/text-tertiary'],
  },
});
