import test from 'tape';
import createElement from '../utils/create/createElement';
import getData from '../get-data';

test('getData returns value of data attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getData('test', testEl);
  const expected = 'true';
  assert.equal(actual, expected);
  assert.end();
});

test('getData returns null if data attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getData('not-real', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
