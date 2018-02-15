const BABEL_ENV = process.env.BABEL_ENV
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs'
const transformImports = require('babel-plugin-transform-imports');

const plugins = [
  [transformImports, {
  'react-router': {
    transform: building ? "react-router/es/${member}" : "react-router/${member}",
    preventFullImport: true
}}]]

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers')
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'dev-expression'
  )
}

module.exports = {
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }
    ]
  ],
  plugins: plugins
}