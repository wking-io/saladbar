/* eslint no-magic-numbers: 0 */

import createElement from 'saladbar.utils/element';
import dom from './index';
import isElmNode from 'saladbar.utils/is-elm-node';
import test from 'tape';

test('dom returns a future that resolves to an element when element exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.default', root);
  const expected = true;
  actual.fork(
    err => assert.fail(err),
    el => assert.equal(isElmNode(el), expected)
  );
  assert.end();
});

test('dom returns a future that resolves to an error when element does not exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.not-real', root);
  const expected = 'Element with selector .not-real not found.';
  actual.fork(
    err => assert.equal(err.error, expected),
    () => assert.fail(`Element that did not exist returned a resolved future`)
  );
  assert.end();
});
