// ESLint will be only used to lint node scripts.

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'airbnb-base',
  env: {
    node: true,
    shelljs: true,
  },
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
  },
};
