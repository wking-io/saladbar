import test from 'tape';
import createElement from '../utils/create/createElement';
import isElmNode from '../utils/is-elm-node';
import Result from 'folktale/result';
import dom from '../dom';

test('dom returns a future that resolves to an element when element exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.default', root);
  const expected = true;
  actual
    .mapError(err => assert.fail(err))
    .map(el => assert.equal(isElmNode(el), expected));
  assert.end();
});

test('dom returns a future that resolves to an error when element does not exists.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = document.querySelector('.wrapper');
  const actual = dom('.not-real', root);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail(`Element that did not exist returned a resolved future`)
    );
  assert.end();
});

test('dom returns a future that resolves to an element when element exists and root is Future.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = Result.of(document.querySelector('.wrapper'));
  const actual = dom('.default', root);
  const expected = true;
  actual
    .mapError(err => assert.fail(err))
    .map(el => assert.equal(isElmNode(el), expected));
  assert.end();
});

test('dom returns a future that resolves to an error when element does not exist and root is Future.', assert => {
  const document = createElement(1, { classes: 'default' });
  const root = Result.of(document.querySelector('.wrapper'));
  const actual = dom('.not-real', root);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail(`Element that did not exist returned a resolved future`)
    );
  assert.end();
});
