/* eslint no-magic-numbers: 0 */

import createElement from 'saladbar.utils/element';
import getAttr from './index';
import { of } from 'fluture';
import test from 'tape';

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
  const expected = 'ReferenceError: Sorry, not-real was not found.';
  assert.equal(actual.toString(), expected);
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
  const expected = 'ReferenceError: Sorry, not-real was not found.';
  actual.fork(
    err => assert.equal(err.toString(), expected),
    () => assert.fail('getAttr did not return an error.')
  );
  assert.end();
});
