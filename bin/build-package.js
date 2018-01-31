#!/usr/bin/env node

/* eslint no-magic-numbers: 0 */
/* eslint no-console: 0 */

/*
 * Build a single module using a generic Rollup-based build script.
 * Reads in a src/index.js, writes to a dist/index.js.
 *
 * You can use this on the CLI by doing:
 * build-module.js path/to/module
 */

// Build package and create files needed for umd, esm, and cjs
const chalk = require('chalk');
const Future = require('fluture');
const { rollup } = require('rollup');
const futureRollup = Future.encaseP(rollup);
const path = require('path');
const { inputOptions, outputOptions } = require('./rollupConfig');

const writeBundle = output => bundle => bundle.write(output);
const getPkg = filepath => require(path.resolve(filepath, 'package.json')); // eslint-disable-line global-require

const buildPackage = filepath => {
  // Create array of futures for the three bundle types
  const builds = ['browser', 'common', 'module'].map(option =>
    futureRollup(inputOptions(filepath, option)).map(
      writeBundle(outputOptions(getPkg(filepath), option))
    )
  );

  return Future.parallel(3, builds);
};

if (require.main === module) {
  buildPackage(process.argv[process.argv.length - 1]).fork(
    err => {
      console.error(chalk.red('build error'));
      console.error(chalk.red(err));
      process.exit(1);
    },
    () => console.log(chalk.green('Packages have been built successfully'))
  );
} else {
  module.exports = buildPackage;
}
