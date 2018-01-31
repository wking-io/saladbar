#!/usr/bin/env node

/* eslint no-magic-numbers: 0 */
/* eslint no-console: 0 */

// Build all of the packages in the packages/ folder

const Future = require('fluture');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const readDir = Future.encaseN(fs.readdir);
const stat = Future.encaseN(fs.stat);
const { traverse, filter, identity } = require('ramda');

const buildPackage = require('./build-package');

const announce = (msg, color) => val => {
  console.log(chalk[color](msg + val));
  return val;
};

const onlyFolders = pkg =>
  stat(path.resolve('packages', pkg)).map(
    theStat => theStat.isDirectory() && pkg
  );

const build = pack =>
  Future.of(pack)
    .map(announce('Building package: ', 'cyan'))
    .chain(pkg => buildPackage(path.resolve('packages', pkg)));

readDir('packages')
  .chain(traverse(Future.of, onlyFolders))
  .map(filter(identity))
  .chain(traverse(Future.of, build))
  .fork(
    err => {
      console.error(chalk.red('build error'));
      console.error(chalk.red(err));
      process.exit(1);
    },
    () => console.log(chalk.green('Packages have been built successfully'))
  );
