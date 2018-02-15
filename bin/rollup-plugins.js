const babel = require('rollup-plugin-babel');
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');

const babelrc = {
  plugins: ['external-helpers'],
  presets: [
    [
      'env',
      {
        modules: false,
      },
    ],
  ],
};

const rollupPlugins = path => [
  nodeResolve({
    browser: true,
    jsnext: true,
  }),
  includePaths({
    paths: [path],
  }),
  babel({
    babelrc: false,
    exclude: ['node_modules/**', '!packages/node_modules/**'],
    presets: babelrc,
  }),
  uglify(),
];

module.exports = rollupPlugins;
