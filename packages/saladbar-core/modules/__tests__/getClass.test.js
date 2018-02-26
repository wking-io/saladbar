import test from 'tape';
import createElement from '../utils/create/createElement';
import getClass from '../get-class';

test('getClass returns class at index when class exists at that index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getClass(0, testEl);
  const expected = 'default';
  assert.equal(actual, expected);
  assert.end();
});

test('getClass returns null when class does not exists at index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getClass(1, testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
