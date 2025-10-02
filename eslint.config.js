import js from '@eslint/js'
import globals from 'globals'

import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: pluginPrettier,
      '@typescript-eslint': tseslint.plugin
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // Spread recommended TypeScript rules
      eslintConfigPrettier // Prettier config goes last
    ],
    rules: {
      ...pluginReact.configs.recommended.rules, // Spread React's recommended rules
      ...pluginReact.configs['jsx-runtime'].rules, // Spread React's JSX runtime rules
      ...reactHooks.configs.recommended.rules, // Spread React Hooks rules
      ...reactRefresh.configs.vite.rules, // Spread React Refresh rules for Vite

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-key': ['off', { checkFragmentShorthand: false }],
      'react/no-unknown-property': ['error', { ignore: ['viewBox'] }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      'arrow-body-style': ['error', 'as-needed'],
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
      ],
      'default-param-last': ['warn'],
      'import/prefer-default-export': 'off',
      'import/export': 'off',

      'prettier/prettier': 'error'
    }
  }
])
