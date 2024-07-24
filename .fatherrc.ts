import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  umd: {
    output: 'dist',
    entry: {
      'src/index.ts': {},
    },
  },
  esm: { output: 'es', ignores: ['src/**/*/demo/*.tsx'] },
  cjs: { output: 'lib', ignores: ['src/**/*/demo/*.tsx'] },
});
