import test from 'tape';
import createElement from '../utils/create/createElement';
import hasData from '../has-data';

test('hasData returns true when data attribute exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasData('test', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('hasData returns false when data attribute does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = hasData('not-real', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
