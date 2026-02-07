import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  { ignores: ['src/generated/**'] },
  ...nextConfig,
  prettierConfig,
];

export default eslintConfig;
