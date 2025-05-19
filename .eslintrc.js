module.exports = {
  extends: [
    '@react-native',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'import',
    'sort-exports',
    'unused-imports',
    'sort-keys-plus',
    'eslint-plugin-react-compiler',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-shadow': 'warn',
    'func-style': ['error', 'expression'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling'],
          'index',
          'object',
        ],
        pathGroups: [
          {
            group: 'builtin',
            pattern: 'react',
            position: 'before',
          },
          {
            group: 'builtin',
            pattern: 'react-native',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
      },
    ],
    'no-shadow': 'off',
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', next: '*', prev: 'block-like'},
    ],
    'react-compiler/react-compiler': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-color-literals': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': [
      'error',
      {skip: ['GradientText', 'OrderTitle']},
    ],
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'unused-imports/no-unused-imports': 'error',
  },
};
