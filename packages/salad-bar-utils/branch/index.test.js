import test from 'tape';
import { of, value } from 'fluture';
import branch from './index';

test('branch evaluates single value successfully', assert => {
  const value = 2;
  const fn = a => a + 2;
  const expected = 4;
  const result = branch(fn)(value);
  assert.equal(expected, result);
  assert.end();
});

test('branch evaluates array value successfully', assert => {
  const value = [2, 4];
  const fn = a => a + 2;
  const expected = [4, 6];
  const result = branch(fn)(value);
  assert.deepEqual(expected, result);
  assert.end();
});

test('branch evaluates future single value successfully', assert => {
  const value = of(2);
  const fn = a => a + 2;
  const expected = 4;
  const result = branch(fn)(value);
  result.value(res => assert.equal(expected, res));
  assert.end();
});

test('branch evaluates future array value successfully', assert => {
  const value = of([2, 4]);
  const fn = a => a + 2;
  const expected = [4, 6];
  const result = branch(fn)(value);
  result.value(res => assert.deepEqual(expected, res));
  assert.end();
});
