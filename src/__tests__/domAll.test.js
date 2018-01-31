/* eslint no-magic-numbers: 0 */

import test from 'tape';
import createElement from '../utils/element';
import domAll from '../dom-all';
import isArray from '../utils/is-array';
import isElmNode from '../utils/is-elm-node';

test('domAll returns a future that resolves to an element when element exists.', assert => {
  const document = createElement(3, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = domAll('.default', root);
  const expected = true;
  actual.fork(
    err => assert.fail(err),
    els => {
      assert.equal(isArray(els), expected);
      els.forEach(el => assert.equal(isElmNode(el), expected));
    }
  );
  assert.end();
});

test('domAll returns a future that resolves to an error when element does not exists.', assert => {
  const document = createElement(3, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = domAll('.not-real', root);
  const expected = 'Elements with selector .not-real not found.';
  actual.fork(
    err => assert.equal(err.error, expected),
    () => assert.fail(`Elements that did not exist returned a resolved future`)
  );
  assert.end();
});
