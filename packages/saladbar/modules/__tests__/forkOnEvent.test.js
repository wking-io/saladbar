import { of, reject } from 'fluture';
import test from 'tape';
import forkOnEvent from '../forkOnEvent';

test('forkOnEvent handles successful Future by auto forking it on an action.', assert => {
  const testFuture = () => of(2);
  const expected = 2;
  const result = forkOnEvent(
    assert.fail,
    actual => assert.equal(actual, expected),
    testFuture
  );
  result();
  assert.end();
});

test('forkOnEvent handles failed Future by auto forking it on an action.', assert => {
  const testFuture = () => reject(2);
  const expected = 2;
  const result = forkOnEvent(
    actual => assert.equal(actual, expected),
    val =>
      assert.fail(
        `Test failed because Future returned success with a value of ${val}`
      ),
    testFuture
  );
  result();
  assert.end();
});
