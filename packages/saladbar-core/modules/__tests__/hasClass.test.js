import test from 'tape';
import createElement from '../utils/create/createElement';
import hasClass from '../has-class';

test('hasClass returns true when class exists on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = hasClass('default', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('hasClass returns false when class does not exist on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = hasClass('not-real', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
