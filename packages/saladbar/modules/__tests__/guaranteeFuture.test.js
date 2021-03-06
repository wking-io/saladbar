import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import guaranteeEither from '../utils/guaranteeEither';

test('guaranteeEither just returns the input if it is a Future', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = Either.of(testEl);
  const actual = guaranteeEither(expected);
  assert.deepEqual(actual, expected);
  assert.end();
});

test('guaranteeEither returns either of DOM Element if passed an unwrapped DOM Element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = testEl;
  const actual = guaranteeEither(expected);
  assert.deepEqual(actual, Either.of(expected));
  assert.end();
});

test('guaranteeEither returns error if not passed a Future, DOM Element, or valid selector string.', assert => {
  const actual = guaranteeEither({ selector: 'default' });
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail(
        'guaranteeEither did not return error when passed an invalid input.'
      )
    );
  assert.end();
});
