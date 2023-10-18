import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'index.umd.js',
    format: 'umd',
    name: 'Paletter',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    nodeResolve(),
  ],
};
