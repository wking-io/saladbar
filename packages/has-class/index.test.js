import test from 'tape';
import createElement from 'saladbar.utils/element';
import { of } from 'fluture';
import hasClass from './index';

test('hasClass returns true when class exists on an element', assert => {
  const testEl = createElement({ classes: ['default'] });
  const result = hasClass('default', testEl);
  const expected = true;
  assert.equal(result, expected);
  assert.end();
});

test('hasClass returns false when class does not exists on an element', assert => {
  const testEl = createElement({ classes: ['default'] });
  const result = hasClass('not-real', testEl);
  const expected = false;
  assert.equal(result, expected);
  assert.end();
});

test('hasClass returns true when class exists on a future element', assert => {
  const testEl = of(createElement({ classes: ['default'] }));
  const result = hasClass('default', testEl);
  const expected = true;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasClass returns false when class does not exists on a future element', assert => {
  const testEl = of(createElement({ classes: ['default'] }));
  const result = hasClass('not-real', testEl);
  const expected = false;
  result.value(bool => assert.equal(bool, expected));
  assert.end();
});
