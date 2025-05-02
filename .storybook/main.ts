import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    docs: {
        autodocs: true,
    },
}

export default config
