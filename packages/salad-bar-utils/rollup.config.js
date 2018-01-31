import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'bundle',
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs({
        namedExports: {
          '../../node_modules/fluture/index.js': ['isFuture', 'of'],
        },
      }),
      babel({
        exclude: ['node_modules/**', '../../node_modules/**'],
      }),
      json(),
    ],
  },

  /*
   * CommonJS (for Node) and ES module (for bundlers) build.
   * (We could have three entries in the configuration array
   * instead of two, but it's quicker to generate multiple
   * builds from a single configuration where possible, using
   * an array for the `output` option, where we can specify
   * `file` and `format` for each target)
   */
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      includePaths({
        extensions: ['.js'],
        paths: ['src/branch', 'src/element', 'src/is-array', 'src/is-elm-node'],
      }),
    ],
  },
];
