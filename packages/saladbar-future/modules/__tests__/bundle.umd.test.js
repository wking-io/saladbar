import test from 'tape';

const saladbar = require('../lib/bundle.umd');

const isFunction = func => typeof func === 'function';

test('All exported functions are available and exist.', assert => {
  const result = Object.values(saladbar).every(isFunction);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});
