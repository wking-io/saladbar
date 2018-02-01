/* eslint sort-keys: 0 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import node from 'rollup-plugin-node-resolve';
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
      file: pkg.browser,
      format: 'iife',
      name: 'saladbar',
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
    ],
  },
  {
    external: Object.keys(pkg.dependencies),
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      includePaths({
        paths: ['src'],
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: babelrc,
      }),
    ],
  },
];
