/* eslint sort-keys: 0 */
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const babelrc = {
  presets: [
    [
      'env',
      {
        modules: false,
      },
    ],
  ],
  plugins: ['external-helpers'],
};

export default [
  {
    external: Object.keys(pkg.dependencies),
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      globals: pkg.dependencies,
    },
    plugins: [
      includePaths({
        paths: ['src'],
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: babelrc,
      }),
      uglify(),
    ],
  },
  {
    external: Object.keys(pkg.dependencies),
    input: 'src/index.esm.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      includePaths({
        paths: ['src'],
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: babelrc,
      }),
      uglify(),
    ],
  },
];
