const BABEL_ENV = process.env.BABEL_ENV;
const transformImports = require('babel-plugin-transform-imports');

const plugins = [
  [
    transformImports,
    {
      ramda: {
        transform: 'ramda/src/${member}',
        preventFullImport: true,
      },
    },
  ],
];

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers');
}

module.exports = {
  presets: [
    [
      'env',
      {
        modules: BABEL_ENV ? false : 'commonjs',
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
  ],
  plugins: BABEL_ENV ? plugins : '',
};
