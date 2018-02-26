import test from 'tape';
import createElement from '../utils/create/createElement';
import isElmNode from '../utils/is-elm-node';
import dom from '../dom';

test('dom returns an element when element exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.default', root);
  const expected = true;
  assert.equal(isElmNode(actual), expected);
  assert.end();
});

test('dom returns null when element does not exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.not-real', root);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
