import test from 'tape';
import createElement from '../utils/create/createElement';
import domAll from '../dom-all';
import isArray from '../utils/is-array';
import isElmNode from '../utils/is-elm-node';

test('domAll returns an array of elements when element exists.', assert => {
  const document = createElement(3, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = domAll('.default', root);
  const expected = true;
  assert.equal(isArray(actual) && actual.every(isElmNode), expected);
  assert.end();
});

test('domAll returns null when no elements exist.', assert => {
  const document = createElement(3, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = domAll('.not-real', root);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
