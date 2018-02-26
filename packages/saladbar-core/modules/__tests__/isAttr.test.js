import test from 'tape';
import createElement from '../utils/create/createElement';
import isAttr from '../is-attr';

test('isProp returns true when property exists and the value matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isAttr('aria-expanded', 'false', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('isProp returns false when property exists but the value does not match on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isAttr('aria-expanded', 'true', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('isProp returns null when property does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isAttr('not-real', 'test', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
