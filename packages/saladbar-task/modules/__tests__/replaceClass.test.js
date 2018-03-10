import Task from 'data.task';
import test from 'tape';
import replaceClass from '../replace-class';
import createElement from '../utils/create/createElement';

test('replaceClass switches out one of the current classes with a new class on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = replaceClass('default', 'new', testEl);
  const expected = [false, true];
  result.fork(
    err => assert.fail(err),
    actual =>
      assert.deepEqual(
        [
          actual.classList.contains('default'),
          actual.classList.contains('new'),
        ],
        expected
      )
  );
  assert.end();
});

test('replaceClass switches out one of the current classes with a new class on a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = Task.of(document.querySelector('.default'));
  const result = replaceClass('default', 'new', testEl);
  const expected = [false, true];
  result.fork(
    err => assert.fail(err),
    actual =>
      assert.deepEqual(
        [
          actual.classList.contains('default'),
          actual.classList.contains('new'),
        ],
        expected
      )
  );
  assert.end();
});
