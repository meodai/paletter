import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  format: 'umd',
  dest: 'index.umd.js',
  name: 'Paletter',
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
}