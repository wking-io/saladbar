/* eslint sort-keys: 0 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import node from 'rollup-plugin-node-resolve';
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

const banner = `/**
 * salad-bar bundled; version ${pkg.version}
 */
`;

export default [
  {
    input: 'src/index.js',
    output: {
      banner,
      file: 'lib/bundle.js',
      format: 'iife',
      name: pkg.name,
    },
    plugins: [
      node({
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/fluture/index.js': ['isFuture', 'of', 'reject'],
        },
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
