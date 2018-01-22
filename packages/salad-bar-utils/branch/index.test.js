import test from 'tape';
import { of, value } from 'fluture';
import branch from './index';

test('branch evaluates single value successfully', assert => {
  const value = 2;
  const fn = a => a + 2;
  const expected = 4;
  const actual = branch(fn)(value);
  assert.equal(actual, expected);
  assert.end();
});

test('branch evaluates array value successfully', assert => {
  const value = [2, 4];
  const fn = a => a + 2;
  const expected = [4, 6];
  const actual = branch(fn)(value);
  assert.deepEqual(actual, expected);
  assert.end();
});

test('branch evaluates future single value successfully', assert => {
  const value = of(2);
  const fn = a => a + 2;
  const expected = 4;
  const future = branch(fn)(value);
  future.value(actual => assert.equal(actual, expected));
  assert.end();
});

test('branch evaluates future array value successfully', assert => {
  const value = of([2, 4]);
  const fn = a => a + 2;
  const expected = [4, 6];
  const future = branch(fn)(value);
  future.value(actual => assert.deepEqual(actual, expected));
  assert.end();
});
