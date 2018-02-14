#!/use/bin/env node

/* eslint no-console: 0 */
/* eslint import/unambiguous: 0 */

// Build a single module using a generic Rollup-based build script.
// Reads in a src/index.js, writes to a lib/index.js. Might write
// index-browser.js if it detects that it needs to support a "browser" version.
//
// You can use this on the CLI by doing:
// build-module.js path/to/module

const path = require('path');
const fs = require('fs-extra');

const { rollup } = require('rollup');
const { encaseN, encaseP, of } = require('fluture');
const { compose, curry } = require('ramda');

const ensureDir = encaseN(fs.ensureDir);
const remove = encaseN(fs.remove);
const rollupf = encaseP(rollup);

const resolveLib = filepath => path.resolve(filepath, 'lib');
const removeLib = filepath => compose(remove, resolveLib);
const addLib = filepath => compose(ensureDir, resolveLib);

const rollIt = curry((pkg, filepath) =>
  rollupf({
    input: path.resolve(filepath, './src/index.js'),
  })
);

const buildPackage = filepath => {
  const pkg = require(path.resolve(filepath, 'package.json'));
  const topPkg = require(path.resolve(filepath, '../../../package.json'));
  const depsToSkip = Object.keys(topPkg.dependencies || {});

  return compose(rollIt, addLib, removeLib)(filepath);
};

module.exports = function test(pkg) {
  return of(pkg);
};
