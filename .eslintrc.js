module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    // Отладочные вызовы
    'no-console': 'warn',

    // Потенциальные баги
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-duplicate-case': 'error',
    'no-unreachable': 'error',
    'no-constant-condition': 'warn',

    // Качество кода
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'warn',

    // Импорты
    'import/no-duplicates': 'warn',

    // React / React Native
    'react/self-closing-comp': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
