/* eslint no-magic-numbers: 0 */

import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import getProp from '../get-prop';

test('getProp returns value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('innerHTML', testEl);
  const expected = 'Hello!';
  assert.equal(actual, expected);
  assert.end();
});

test('getProp returns error if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('not-real', testEl);
  const expected = true;
  assert.equal(actual.hasOwnProperty('error'), expected);
  assert.end();
});

test('getProp returns value of property on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = of(document.querySelector('.default'));
  const actual = getProp('innerHTML', futureEl);
  const expected = 'Hello!';
  actual.fork(
    () => assert.fail('getProp returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getProp returns error if property not found on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = of(document.querySelector('.default'));
  const actual = getProp('not-real', futureEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getProp did not return an error.')
  );
  assert.end();
});
