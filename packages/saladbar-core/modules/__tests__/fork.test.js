import { of } from 'fluture';
import { compose, map } from 'ramda';
import test from 'tape';
import fork from '../fork';

test('fork evaluates future correctly.', assert => {
  const future = of(2);
  const expected = 2;
  fork(
    () => assert.fail('fork returned an error.'),
    actual => assert.equal(actual, expected),
    future
  );
  assert.end();
});

test('fork evaluates future correctly in composition.', assert => {
  const expected = 4;
  const error = () => assert.fail('fork returned an error.');
  const evaluate = actual => assert.equal(actual, expected);
  const future = compose(fork(error, evaluate), map(x => x + 2), of);
  future(2);
  assert.end();
});
