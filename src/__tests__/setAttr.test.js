/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import getAttr from '../get-attr';
import setAttr from '../set-attr';

test('setAttr sets value of attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(testEl).value(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if attribute not found on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(getAttr('not-real'), setAttr('not-real', 'false'));
  const expected = 'false';
  actual(testEl).value(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr sets value of attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(futureEl).value(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if attribute not found on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(getAttr('not-real'), setAttr('not-real', 'false'));
  const expected = 'false';
  actual(futureEl).value(attr => assert.equal(attr, expected));
  assert.end();
});
