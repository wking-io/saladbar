import Task from 'data.task';
import { compose, map } from 'ramda';
import test from 'tape';
import fork from '../fork';

test('fork evaluates task correctly.', assert => {
  const task = Task.of(2);
  const expected = 2;
  fork(
    () => assert.fail('fork returned an error.'),
    actual => assert.equal(actual, expected),
    task
  );
  assert.end();
});

test('fork evaluates task correctly in composition.', assert => {
  const expected = 4;
  const error = () => assert.fail('fork returned an error.');
  const evaluate = actual => assert.equal(actual, expected);
  const task = compose(fork(error, evaluate), map(x => x + 2), Task.of);
  task(2);
  assert.end();
});
