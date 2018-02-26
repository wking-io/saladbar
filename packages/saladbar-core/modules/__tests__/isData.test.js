import test from 'tape';
import createElement from '../utils/create/createElement';
import isData from '../is-data';

test('isData returns true when data attribute exists and value matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isData('test', 'true', testEl);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('isData returns false when data attribute exists and value does not match on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isData('test', 'false', testEl);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('isData returns false when data attribute does not exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = isData('not-real', 'test', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
