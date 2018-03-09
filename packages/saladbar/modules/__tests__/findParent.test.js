import { compose } from 'ramda';
import Either from 'data.either';
import test from 'tape';
import createDom from '../utils/create/createDom';
import findParent from '../find-parent';
import hasClass from '../has-class';

test('findParent returns parent that matched the predicate on an element.', assert => {
  const { document } = createDom('default').window;
  const testEl = document.querySelector('.default');
  const testFindParent = findParent(document);
  const result = compose(
    hasClass('wrapper'),
    testFindParent(hasClass('wrapper'))
  )(testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('findParent returns parent that matched the predicate on a future element.', assert => {
  const { document } = createDom('default').window;
  const testEl = Either.of(document.querySelector('.default'));
  const testFindParent = findParent(document);
  const result = compose(
    hasClass('wrapper'),
    testFindParent(hasClass('wrapper'))
  )(testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('findParent returns body when passed an predicate that does not find a matching parent element on a single element.', assert => {
  const { document } = createDom('default').window;
  const testEl = document.querySelector('.default');
  const testFindParent = findParent(document);
  const result = testFindParent(hasClass('not-real'))(testEl);
  const expected = document.body;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual.nodeName, expected.nodeName));
  assert.end();
});

test('findParent returns body when passed an predicate that does not find a matching parent element on a future element.', assert => {
  const { document } = createDom('default').window;
  const testEl = Either.of(document.querySelector('.default'));
  const testFindParent = findParent(document);
  const result = testFindParent(hasClass('not-real'))(testEl);
  const expected = document.body;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual.nodeName, expected.nodeName));
  assert.end();
});
