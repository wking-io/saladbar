import test from 'tape';

const saladbarFuture = require('../lib/umd/saladbar.min');

const isFunction = func => typeof func === 'function';

test('All exported functions are available and exist.', assert => {
  const result = Object.values(saladbarFuture).every(isFunction);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});
