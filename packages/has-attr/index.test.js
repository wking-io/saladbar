import createElement from 'saladbar.utils/element';
import hasAttr from './index';
import { of } from 'fluture';
import test from 'tape';

test('hasAttr returns true when attribute exists on an element', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});

test('hasAttr returns false when attribute does not exists on an element', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const result = hasAttr('not-real', testEl);
  const expected = false;
  assert.equal(result, expected);
  assert.end();
});

test('hasAttr returns true when attribute exists on a future element', assert => {
  const testEl = of(createElement({ attrs: { 'aria-expanded': 'false' } }));
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasAttr returns false when attribute does not exists on a future element', assert => {
  const testEl = of(createElement({ attrs: { 'aria-expanded': 'false' } }));
  const result = hasAttr('not-real', testEl);
  const expected = false;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});
