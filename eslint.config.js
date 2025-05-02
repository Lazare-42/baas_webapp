import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import eslintPluginNoUnsanitized from 'eslint-plugin-no-unsanitized'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginSecurity from 'eslint-plugin-security'
import eslintPluginStorybook from 'eslint-plugin-storybook'

export default [
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            storybook: eslintPluginStorybook,
            '@typescript-eslint': typescriptEslintPlugin,
            security: eslintPluginSecurity,
            prettier: eslintPluginPrettier,
            'no-unsanitized': eslintPluginNoUnsanitized,
        },
        rules: {
            // Règles ESLint de base
            'no-unused-vars': 'warn',

            // Règles React
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Règles TypeScript
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/no-explicit-any': 'off',

            // Règles Prettier
            'prettier/prettier': 'warn',

            // Règles de Sécurité
            'security/detect-object-injection': 'warn',
            'security/detect-non-literal-regexp': 'warn',
            'no-unsanitized/method': 'error',
            'no-unsanitized/property': 'error',

            // Intégrer toutes les règles de eslint-config-prettier
            ...prettier.rules,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/public/**',
            '**/scripts/**',
            '**/env-config.js',
            '**/src/theme/**',
        ],
    },
]
