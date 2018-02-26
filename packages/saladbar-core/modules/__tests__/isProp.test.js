import test from 'tape';
import createElement from '../utils/create/createElement';
import isProp from '../is-prop';

test('isProp returns true when property exists and value matches on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = isProp('innerHTML', 'Hello!', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('isProp returns false when property exists and value does not match on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = isProp('innerHTML', 'test', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('isProp returns null when property does not exist on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = isProp('not-real', 'test', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
