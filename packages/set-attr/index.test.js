import { compose } from 'ramda';
import createElement from 'saladbar.utils/element';
import getAttr from 'saladbar.getattr';
import { of } from 'fluture';
import setAttr from './index';
import test from 'tape';

test('setAttr sets value of attribute on single element', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setAttr returns error if attribute not found on single element', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = setAttr('not-real', 'false', testEl);
  const expected = 'ReferenceError: Sorry, not-real was not found.';
  assert.equal(actual.toString(), expected);
  assert.end();
});

test('setAttr sets value of attribute on future element', assert => {
  const testEl = of(createElement({ attrs: { 'aria-expanded': 'false' } }));
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(testEl).value(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr returns error if attribute not found on future element', assert => {
  const testEl = of(createElement({ attrs: { 'aria-expanded': 'false' } }));
  const actual = setAttr('not-real', 'false', testEl);
  const expected = 'ReferenceError: Sorry, not-real was not found.';
  actual.fork(
    err => assert.equal(err.toString(), expected),
    () => assert.fail('setAttr did not return an error.')
  );
  assert.end();
});
