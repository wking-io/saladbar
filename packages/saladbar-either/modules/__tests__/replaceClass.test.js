import Result from 'folktale/result';
import test from 'tape';
import replaceClass from '../replace-class';
import createElement from '../utils/create/createElement';

test('replaceClass switches out one of the current classes with a new class on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = replaceClass('default', 'new', testEl);
  const expected = [false, true];
  result
    .mapError(err => assert.fail(err))
    .map(actual =>
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

test('replaceClass switches out one of the current classes with a new class on a future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = Result.of(document.querySelector('.default'));
  const result = replaceClass('default', 'new', testEl);
  const expected = [false, true];
  result
    .mapError(err => assert.fail(err))
    .map(actual =>
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
