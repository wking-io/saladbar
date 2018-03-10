/* eslint no-console: 0 */

const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('Building CommonJS modules ...');

exec('babel modules -d lib/cjs --ignore __tests__', {
  BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel modules -d lib/es --ignore __tests__', {
  BABEL_ENV: 'es',
});

console.log('\nBuilding saladbar-task.js ...');

exec('rollup -c -f umd -n saladbarTask -o lib/umd/saladbar-task.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
});

console.log('\nBuilding saladbar-task.min.js ...');

exec('rollup -c -f umd -n saladbarTask -o lib/umd/saladbar-task.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
});

const size = gzipSize.sync(fs.readFileSync('lib/umd/saladbar-task.min.js'));

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
