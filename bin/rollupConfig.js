const path = require('path');

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

const inputOptions = (filepath, option) =>
  ({
    // Browser-friendly UMD build
    browser: {
      input: path.resolve(filepath, './src/index.js'),
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: [
            'node_modules/**',
            path.resolve(filepath, 'node_modules/**'),
          ],
        }),
      ],
    },
    common: {
      input: path.resolve(filepath, './src/index.js'),
      plugins: [
        babel({
          exclude: [
            'node_modules/**',
            path.resolve(filepath, 'node_modules/**'),
          ],
        }),
      ],
    },
    module: {
      input: path.resolve(filepath, './src/index.js'),
      plugins: [
        babel({
          exclude: [
            'node_modules/**',
            path.resolve(filepath, 'node_modules/**'),
          ],
        }),
      ],
    },
  }[option]);

const outputOptions = (pkg, option) =>
  ({
    browser: {
      file: pkg.browser,
      format: 'umd',
      name: 'bundle',
    },
    common: {
      file: pkg.main,
      format: 'cjs',
      name: 'bundle',
    },
    module: {
      file: pkg.module,
      format: 'es',
      name: 'bundle',
    },
  }[option]);

module.exports = {
  inputOptions,
  outputOptions,
};
