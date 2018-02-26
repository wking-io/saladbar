import test from 'tape';
import createElement from '../utils/create/createElement';
import hasAttr from '../has-attr';

test('hasAttr returns true when attribute exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasAttr('aria-expanded', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('hasAttr returns false when attribute does not exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasAttr('not-real', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
