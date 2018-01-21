import test from 'tape';
import isArray from './index';

test('isArray returns true if passed an array', assert => {
  const arr = [1, 2, 3];
  const expected = true;
  const result = isArray(arr);

  assert.equal(expected, result);
  assert.end();
});

test('isArray returns false if not passed an array', assert => {
  const str = 'this is a string';
  const expected = false;
  const result = isArray(str);

  assert.equal(expected, result);
  assert.end();
});
