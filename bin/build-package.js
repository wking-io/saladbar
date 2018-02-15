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
const chalk = require('chalk');

const { rollup } = require('rollup');
const { encaseN, encaseP, of } = require('fluture');
const { chain, compose, curry, traverse } = require('ramda');
const rollupPlugins = require('./rollup-plugins');

const ensureDir = encaseN(fs.ensureDir);
const remove = encaseN(fs.remove);
const rollupf = encaseP(rollup);

const resolveLib = fp => path.resolve(fp, 'lib');
const removeLib = compose(remove, resolveLib);
const addLib = compose(ensureDir, resolveLib);

const resetLib = fp =>
  removeLib(fp)
    .and(addLib(fp))
    .map(() => fp);

const rollIt = curry((deps, filepath) =>
  rollupf({
    external: deps,
    input: path.resolve(filepath, './src/index.js'),
    plugins: rollupPlugins(path.resolve(filepath, './src')),
  })
);

const announceBuilt = curry((fp, file, res) => {
  console.error(' ');
  console.log(chalk.green(`  🙌 wrote ${path.basename(fp)}/${file}`));
  return res;
});

const writeBundle = curry((fp, pkg, bundle, format) => {
  const writef = encaseP(bundle.write);
  const file = format === 'es' ? pkg.module : pkg.main;
  const base = { file: path.resolve(fp, file), format };
  const extras = { globals: pkg.globals, name: pkg.name };
  const output = format === 'es' ? base : Object.assign({}, base, extras);
  return writef(output).map(announceBuilt(fp, file));
});

const writeIt = curry((formats, fp, pkg, bundle) =>
  traverse(of, writeBundle(fp, pkg, bundle))(formats)
);

const buildPackage = filepath => {
  const pkg = require(path.resolve(filepath, 'package.json')); // eslint-disable-line global-require
  const topPkg = require(path.resolve(filepath, '../../../package.json')); // eslint-disable-line global-require
  const depsToSkip =
    pkg.name === 'saladbar-future'
      ? Object.keys(topPkg.dependencies || {}).concat('saladbar-core')
      : Object.keys(topPkg.dependencies || {});

  return compose(
    chain(writeIt(['es', 'umd'], filepath, pkg)),
    chain(rollIt(depsToSkip)),
    resetLib
  )(filepath);
};

// Error -> ⚠️
const stop = error => {
  console.error(' ');
  console.error(chalk.red('Module build Error'));
  console.error(error.stack);
  console.error(' ');
  process.exit(1);
};

const success = () => {
  console.error(' ');
  console.log(chalk.green('Your package has been built successfully!'));
  console.error(' ');
};

if (require.main === module) {
  buildPackage(process.argv[process.argv.length - 1]).fork(stop, success);
} else {
  module.exports = buildPackage;
}
