import test from 'tape';
import isArray from './index';

test('isArray returns true if passed an array', assert => {
  const arr = [1, 2, 3];
  const expected = true;
  const actual = isArray(arr);

  assert.equal(actual, expected);
  assert.end();
});

test('isArray returns false if not passed an array', assert => {
  const str = 'this is a string';
  const expected = false;
  const actual = isArray(str);

  assert.equal(actual, expected);
  assert.end();
});
