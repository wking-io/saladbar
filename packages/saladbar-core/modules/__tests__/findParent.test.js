import test from 'tape';
import createDom from '../utils/create/createDom';
import findParent from '../find-parent';
import hasClass from '../has-class';

test('findParent returns parent that matched the predicate on an element.', assert => {
  const { document } = createDom('default').window;
  const testEl = document.querySelector('.default');
  const actual = findParent(document, hasClass('wrapper'), testEl);
  const expected = true;
  assert.equal(hasClass('wrapper', actual), expected);
  assert.end();
});

test('findParent returns body when passed an predicate that does not find a matching parent element on a single element.', assert => {
  const { document } = createDom('default').window;
  const testEl = document.querySelector('.default');
  const actual = findParent(document, hasClass('not-real'), testEl);
  const expected = document.body;
  assert.equal(actual.nodeName, expected.nodeName);
  assert.end();
});
