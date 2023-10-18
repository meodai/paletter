import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'index.mjs',
  output: {
    file: 'index.umd.js',
    format: 'umd',
    name: 'Paletter',
  },
  plugins: [
    nodeResolve(),
  ],
};
