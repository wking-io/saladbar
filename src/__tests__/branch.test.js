/* eslint no-magic-numbers: 0 */

import { of } from 'fluture';
import test from 'tape';
import branch from '../utils/branch';

test('branch takes in non future value wraps it in future and evaluates value successfully', assert => {
  const value = of(2);
  const fn = val => of(val + 2);
  const expected = 4;
  const future = branch(fn, value);
  future.value(actual => assert.equal(actual, expected));
  assert.end();
});

test('branch takes in non future array value wraps it in future and evaluates array value successfully', assert => {
  const value = of([2, 4]);
  const fn = val => of(val + 2);
  const expected = [4, 6];
  const future = branch(fn, value);
  future.value(actual => assert.deepEqual(actual, expected));
  assert.end();
});

test('branch evaluates future single value successfully', assert => {
  const value = of(2);
  const fn = val => of(val + 2);
  const expected = 4;
  const future = branch(fn, value);
  future.value(actual => assert.equal(actual, expected));
  assert.end();
});

test('branch evaluates future array value successfully', assert => {
  const value = of([2, 4]);
  const fn = val => of(val + 2);
  const expected = [4, 6];
  const future = branch(fn, value);
  future.value(actual => assert.deepEqual(actual, expected));
  assert.end();
});
