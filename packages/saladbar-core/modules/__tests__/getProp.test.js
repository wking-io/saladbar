import test from 'tape';
import createElement from '../utils/create/createElement';
import getProp from '../get-prop';

test('getProp returns value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('innerHTML', testEl);
  const expected = 'Hello!';
  assert.equal(actual, expected);
  assert.end();
});

test('getProp returns null if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('not-real', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
