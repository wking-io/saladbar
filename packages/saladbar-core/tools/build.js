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

console.log('\nBuilding saladbar-core.js ...');

exec('rollup -c -f umd -n saladbarCore -o lib/umd/saladbar-core.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
});

console.log('\nBuilding saladbar-core.min.js ...');

exec('rollup -c -f umd -n saladbarCore -o lib/umd/saladbar-core.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
});

const size = gzipSize.sync(fs.readFileSync('lib/umd/saladbar-core.min.js'));

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
