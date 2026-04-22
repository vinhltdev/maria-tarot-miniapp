import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'node_modules/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      '@next/next/no-img-element': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default config;
