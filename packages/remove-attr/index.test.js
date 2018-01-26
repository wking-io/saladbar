/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import createElement from 'saladbar.utils/element';
import hasAttr from 'saladbar.hasattr';
import { of } from 'fluture';
import removeAttr from './index';
import test from 'tape';

test('removeAttr removes attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasAttr('aria-expanded'), removeAttr('aria-expanded'));
  const expected = false;
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('removeAttr does not return error if attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasAttr('not-real'), removeAttr('not-real'));
  const expected = false;
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('removeAttr removes attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(hasAttr('aria-expanded'), removeAttr('aria-expanded'));
  const expected = false;
  actual(futureEl).fork(
    () => assert.fail('removeAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('removeAttr does not return error if attribute not found on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(hasAttr('not-real'), removeAttr('not-real'));
  const expected = false;
  actual(futureEl).fork(
    () => assert.fail('removeAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});
