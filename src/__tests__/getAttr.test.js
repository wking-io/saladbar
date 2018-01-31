/* eslint no-magic-numbers: 0 */

import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import getAttr from '../get-attr';

test('getAttr returns value of attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('aria-expanded', testEl);
  const expected = 'false';
  assert.equal(actual, expected);
  assert.end();
});

test('getAttr returns error if attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('not-real', testEl);
  const expected = true;
  assert.equal(actual.hasOwnProperty('error'), expected);
  assert.end();
});

test('getAttr returns value of attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = getAttr('aria-expanded', futureEl);
  const expected = 'false';
  actual.fork(
    () => assert.fail('getAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getAttr returns error if attribute not found on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = getAttr('not-real', futureEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getAttr did not return an error.')
  );
  assert.end();
});
