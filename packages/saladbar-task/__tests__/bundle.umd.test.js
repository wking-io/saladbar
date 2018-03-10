import test from 'tape';

const saladbarTask = require('../lib/umd/saladbar-task.min');

const isFunction = func => typeof func === 'function';

test('All exported functions are available and exist.', assert => {
  const result = Object.values(saladbarTask).every(isFunction);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});
