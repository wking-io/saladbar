/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import hasAttr from '../has-attr';
import removeAttr from '../remove-attr';

test('removeAttr removes attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasAttr('aria-expanded'), removeAttr('aria-expanded'));
  const expected = false;
  actual(testEl).fork(
    () => assert.fail('removeAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
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
  actual(testEl).fork(
    () => assert.fail('removeAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
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
