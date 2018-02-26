import test from 'tape';
import createElement from '../utils/create/createElement';
import getAttr from '../get-attr';

test('getAttr returns value of attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('aria-expanded', testEl);
  const expected = 'false';
  assert.equal(actual, expected);
  assert.end();
});

test('getAttr returns null if attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('not-real', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
