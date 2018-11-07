module.exports = {
  extends: ['react-app', 'plugin:jsx-a11y/recommended', 'airbnb'],
  plugins: ['jsx-a11y'],
  overrides: [
    {
      files: [
        '.storybook/**',
        'src/stories/**',
        '**/*.stories.js',
        '**/*.stories.jsx',
        '**/*.stories.ts',
        '**/*.stories.tsx',
        '**/stories.js',
        '**/stories.jsx',
        '**/stories.ts',
        '**/stories.tsx',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: 'typescript-eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/jsx-closing-tag-location': 'off',
        'import/prefer-default-export': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/export': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__docgenInfo'],
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.jsx',
          '**/test.jsx',
          '**/*.test.tsx',
          '**/test.tsx',
          '**/*.config.js',
          '**/stories.jsx',
        ],
      },
    ],
  },
}
