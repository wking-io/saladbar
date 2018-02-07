/* eslint no-magic-numbers: 0 */

import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import guaranteeFuture from '../utils/guaranteeFuture';

test('guaranteeFuture just returns the input if it is a Future', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = of(testEl);
  const actual = guaranteeFuture(expected);
  assert.deepEqual(actual, expected);
  assert.end();
});

test('guaranteeFuture returns future of DOM Element if passed an unwrapped DOM Element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const expected = testEl;
  const actual = guaranteeFuture(expected);
  assert.deepEqual(actual, of(expected));
  assert.end();
});

test('guaranteeFuture returns error if not passed a Future, DOM Element, or valid selector string.', assert => {
  const actual = guaranteeFuture({ selector: 'default' });
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () =>
      assert.fail(
        'guaranteeFuture did not return error when passed an invalid input.'
      )
  );
  assert.end();
});
