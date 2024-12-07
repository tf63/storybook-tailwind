import path from 'node:path'

import type { StorybookConfig } from '@storybook/react-vite'
import react from '@vitejs/plugin-react-swc'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
    stories: [
        '../../../apps/*/src/**/*.stories.*',
        '../../../apps/*/src/**/*.mdx',
        '../../../packages/*/src/**/*.stories.*',
        '../../../packages/*/src/**/*.mdx',
    ],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-essentials',
        '@storybook/addon-links',
        '@storybook/addon-interactions',
        '@storybook/addon-storysource',
        '@storybook/addon-a11y',
        '@storybook/addon-console',
        '@whitespace/storybook-addon-html',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: (config) => {
        return mergeConfig(config, {
            plugins: [react()],
            resolve: {
                alias: {
                    '@repo/app1': path.resolve(__dirname, '../../../apps/app1/src'),
                    '@repo/app2': path.resolve(__dirname, '../../../apps/app2/src'),
                    '@repo/app3': path.resolve(__dirname, '../../../apps/app3/src'),
                    '@repo/ui': path.resolve(__dirname, '../../../packages/ui/src'),
                },
            },
        })
    },
}

export default config
