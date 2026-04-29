import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.base = '/elpedido/';

    // Strip "use client" directives that break Vite bundling
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'strip-use-client',
      transform(code: string, id: string) {
        if (id.includes('node_modules') && code.includes('"use client"')) {
          return { code: code.replace(/"use client";\s*/g, '') };
        }
      },
    });

    return config;
  },
};

export default config;
