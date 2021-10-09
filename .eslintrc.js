module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/extensions': 'off',
    'max-len': 'off',
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        fixToUnknown: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
