import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import guaranteeTask from '../utils/guaranteeTask';
import isTask from '../utils/is-task';

test('guaranteeTask just returns the input if it is a Future', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = Task.of(testEl);
  const actual = guaranteeTask(expected);
  assert.deepEqual(actual, expected);
  assert.end();
});

test('guaranteeTask returns task of DOM Element if passed an unwrapped DOM Element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = true;
  const actual = guaranteeTask(testEl);
  assert.equal(isTask(actual), expected);
  assert.end();
});

test('guaranteeTask returns error if not passed a Future, DOM Element, or valid selector string.', assert => {
  const actual = guaranteeTask({ selector: 'default' });
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () =>
      assert.fail(
        'guaranteeTask did not return error when passed an invalid input.'
      )
  );
  assert.end();
});
