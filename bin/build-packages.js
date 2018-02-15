#!/usr/bin/env node

/* eslint no-console: 0 */
/* eslint import/unambiguous: 0 */

// Build all modules in the packages/ folder

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { encaseN, of } = require('fluture');
const { compose, chain, curry, map, traverse } = require('ramda');
const buildPackage = require('./build-package');

const readDir = encaseN(fs.readdir);
const stat = encaseN(fs.stat);

// getPackagePath :: String -> String
const getPackagePath = pkg => path.resolve('packages/node_modules', pkg);

// isDirectory :: {k: v} -> Bool
const isDirectory = pkgStat => pkgStat.isDirectory();

// getStatus :: String -> Future Error Bool
const getStatus = compose(map(isDirectory), stat, getPackagePath);

// announceBuild :: String -> Bool -> Bool
const announceBuild = curry((pkg, status) => {
  if (status) console.log(chalk.cyan(`Building ${pkg}...`));
  return status;
});

// buildModule :: String -> Bool -> Future Error {k: v}
const buildModule = pkg => status =>
  status ? compose(buildPackage, getPackagePath)(pkg) : of({ skipped: pkg });

// build :: String -> Future Error {k: v}
const build = pkg =>
  compose(chain(compose(buildModule(pkg))), map(announceBuild(pkg)), getStatus)(
    pkg
  );

// Error -> ⚠️
const stop = error => {
  console.error(chalk.red('Build Error'));
  console.error(error.stack);
  process.exit(1);
};

const success = () => {
  console.log(chalk.green('All packages have been built successfully!'));
};

readDir('packages/node_modules')
  .chain(traverse(of, build))
  .fork(stop, success);
