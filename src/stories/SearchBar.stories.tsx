import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { colors, spacing, radius } from '../theme/tokens';

const SearchIcon = ({ color = '#B7B7B7' }) => (
  <svg width={20} height={20} viewBox="0 0 16 16" fill={color} style={{ flexShrink: 0 }}>
    <path d="M9.8 9.8C10.73 8.87 11.2 7.73 11.2 6.4 11.2 5.07 10.73 3.93 9.8 3 8.87 2.07 7.73 1.6 6.4 1.6 5.07 1.6 3.93 2.07 3 3 2.07 3.93 1.6 5.07 1.6 6.4 1.6 7.73 2.07 8.87 3 9.8 3.93 10.73 5.07 11.2 6.4 11.2 7.73 11.2 8.87 10.73 9.8 9.8ZM6.4 12.8C4.61 12.8 3.1 12.18 1.86 10.94.62 9.7 0 8.19 0 6.4 0 4.61.62 3.1 1.86 1.86 3.1.62 4.61 0 6.4 0 8.19 0 9.7.62 10.94 1.86 12.18 3.1 12.8 4.61 12.8 6.4 12.8 7.15 12.68 7.85 12.45 8.51 12.22 9.17 11.89 9.77 11.46 10.32L16 14.88 14.88 16 10.32 11.46C9.77 11.89 9.17 12.22 8.51 12.45 7.85 12.68 7.15 12.8 6.4 12.8Z"/>
  </svg>
);

type SearchBarState = 'default' | 'focused' | 'filled' | 'disabled';

function SearchBar({ state = 'default', placeholder = 'Search...', value = 'Golden park' }: { state?: SearchBarState; placeholder?: string; value?: string }) {
  const isFocused = state === 'focused';
  const isFilled  = state === 'filled';
  const isDisabled = state === 'disabled';
  return (
    <div style={{
      width: 320, height: 48,
      backgroundColor: colors['neutral/surface-elevated'],
      borderRadius: radius.full,
      border: isFocused ? `1.5px solid #2B7FFF` : `1.5px solid transparent`,
      display: 'flex', alignItems: 'center',
      paddingLeft: spacing[16], paddingRight: spacing[16],
      gap: spacing[12],
      opacity: isDisabled ? 0.4 : 1,
      fontFamily: 'Geist, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      <SearchIcon color={isFocused ? '#2B7FFF' : colors['neutral/placeholder']} />
      <span style={{
        fontSize: 16, fontWeight: 400,
        color: (isFilled || isFocused) ? colors['surface/on-dark'] : colors['neutral/placeholder'],
        whiteSpace: 'nowrap', overflow: 'hidden',
      }}>
        {isFilled ? value : placeholder}
      </span>
    </div>
  );
}

function Interactive() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const state = focused ? 'focused' : query ? 'filled' : 'default';
  return (
    <div style={{
      width: 320, height: 48,
      backgroundColor: colors['neutral/surface-elevated'],
      borderRadius: radius.full,
      border: focused ? `1.5px solid #2B7FFF` : `1.5px solid transparent`,
      display: 'flex', alignItems: 'center',
      paddingLeft: spacing[16], paddingRight: spacing[16],
      gap: spacing[12], fontFamily: 'Geist, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      <SearchIcon color={focused ? '#2B7FFF' : colors['neutral/placeholder']} />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search..."
        style={{
          flex: 1, background: 'none', border: 'none', outline: 'none',
          fontSize: 16, fontWeight: 400, fontFamily: 'inherit',
          color: colors['surface/on-dark'],
        }}
      />
    </div>
  );
}

const meta: Meta = { title: 'Components/SearchBar', parameters: { backgrounds: { default: 'dark' } } };
export default meta;

export const AllStates: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Geist, system-ui, sans-serif' }}>
      {(['default', 'focused', 'filled', 'disabled'] as SearchBarState[]).map(state => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 72, fontSize: 11, color: colors['neutral/text-tertiary'], textAlign: 'right', flexShrink: 0 }}>{state}</span>
          <SearchBar state={state} />
        </div>
      ))}
    </div>
  ),
};
export const Default: StoryObj = { render: () => <SearchBar state="default" /> };
export const Focused: StoryObj = { render: () => <SearchBar state="focused" /> };
export const Filled: StoryObj = { name: 'Filled', render: () => <SearchBar state="filled" /> };
export const Disabled: StoryObj = { render: () => <SearchBar state="disabled" /> };
export const InteractiveDemo: StoryObj = { name: 'Interactive (type to test)', render: () => <Interactive /> };
