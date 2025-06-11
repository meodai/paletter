import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'index.mjs',
  output: {
    file: 'index.umd.cjs', // Changed extension to .cjs
    format: 'umd',
    name: 'Paletter',
    exports: 'default',
  },
  plugins: [
    nodeResolve(),
  ],
};
