# El Pedido — Design System & App

Mobile app built in **React Native** (exportable to React Native), generated from the **DS El Pedido** Figma design system.

## Stack

- React Native + TypeScript
- Design tokens extracted directly from Figma DS
- All components follow the DS El Pedido component library

## Structure

```
src/
├── theme/
│   └── tokens.ts          # All DS tokens (colors, spacing, typography)
├── components/
│   ├── BalanceCard.tsx    # Hero balance card
│   ├── MetricCard.tsx     # KPI metric card
│   ├── ChartCard.tsx      # Bar chart card
│   ├── TabBar.tsx         # Horizontal tab navigation
│   └── BottomNavBar.tsx   # Bottom navigation bar
├── screens/
│   └── HomeScreen.tsx     # Home screen
└── index.ts               # Exports
```

## DS Components

| Component | Figma Node | Description |
|---|---|---|
| BalanceCard | 141:71 | Hero card with gradient decorations |
| MetricCard | 94:26 | KPI metric with title, value, and change |
| ChartCard | 118:20 | Bar chart with grid lines |
| TabBar | 4:214 | Horizontal tab navigation |
| BottomNavBar | 124:32 | Bottom navigation with 5 items |
| IconButton | 133:81 | Circular icon button |
| SearchBar | 105:52 | Search input with 4 states |
| Icon | 3:87 | 14-variant icon library |

## Design Tokens

All tokens are defined in `src/theme/tokens.ts` and extracted from the Figma DS:

- **Colors**: brand, neutral, surface, feedback, icon
- **Spacing**: 4, 8, 12, 16, 24, 64
- **Radius**: sm (5), md (16), full (100)
- **Typography**: 14 text styles (Heading, Body, System)

## Getting Started

```bash
npm install
npx react-native start
```

### Font setup

Install the **Geist** font and register `Geist-Regular` and `Geist-Medium` in your app.

### Icons

Replace the placeholder Figma asset URLs in `BottomNavBar.tsx` with local vector icons.

---

*Generated from Figma DS El Pedido — [WQhZjUULyqmR36yh7CvKsX](https://www.figma.com/design/WQhZjUULyqmR36yh7CvKsX/DS-El-Pedido)*
