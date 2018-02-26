import test from 'tape';
import createElement from '../utils/create/createElement';
import getClasses from '../get-classes';

test('getClasses returns object of classes with all classes that exist on element', assert => {
  const document = createElement(1, { classes: 'default also-this' });
  const testEl = document.querySelector('.default');
  const actual = getClasses(testEl);
  const expected = 2;
  assert.equal(actual.length, expected);
  assert.end();
});

test('getClasses returns null if no classes found on element', assert => {
  const document = createElement(1, { classes: '', id: 'default' });
  const testEl = document.querySelector('#default');
  const actual = getClasses(testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
