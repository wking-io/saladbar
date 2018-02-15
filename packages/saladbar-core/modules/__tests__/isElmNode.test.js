import test from 'tape';
import isElmNode from '../utils/is-elm-node';

test('isElmNode returns true when Node is of type Element', assert => {
  const expected = true;
  const el = { nodeType: 1 };
  const actual = isElmNode(el);
  assert.equals(actual, expected);
  assert.end();
});

test('isElmNode returns false when Node is not of type Element', assert => {
  const expected = false;
  const el = { nodeType: 0 };
  const actual = isElmNode(el);
  assert.equals(actual, expected);
  assert.end();
});
