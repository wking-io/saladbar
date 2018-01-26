/* eslint no-magic-numbers: 0 */

import createElement from 'saladbar.utils/element';
import hasAttr from './index';
import { of } from 'fluture';
import test from 'tape';

test('hasAttr returns true when attribute exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});

test('hasAttr returns false when attribute does not exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasAttr('not-real', testEl);
  const expected = false;
  assert.equal(result, expected);
  assert.end();
});

test('hasAttr returns true when attribute exists on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = of(document.querySelector('.default'));
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasAttr returns false when attribute does not exists on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = of(document.querySelector('.default'));
  const result = hasAttr('not-real', testEl);
  const expected = false;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});
