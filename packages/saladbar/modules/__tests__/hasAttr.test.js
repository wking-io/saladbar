import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasAttr from '../has-attr';

test('hasAttr returns true when attribute exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
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
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasAttr returns true when attribute exists on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = hasAttr('aria-expanded', testEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasAttr returns false when attribute does not exists on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = hasAttr('not-real', testEl);
  const expected = false;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});
