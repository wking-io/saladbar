import test from 'tape';
import createElement from '../utils/create/createElement';
import hasProp from '../has-prop';

test('hasProp returns true when property exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasProp('classList', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('hasProp returns false when property does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasProp('not-real', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
