/* eslint no-magic-numbers: 0 */

import createElement from 'saladbar.utils/element';
import getData from './index';
import { of } from 'fluture';
import test from 'tape';

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

test('getData returns error if data attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getData('not-real', testEl);
  const expected = true;
  assert.equal(actual.hasOwnProperty('error'), expected);
  assert.end();
});

test('getData returns value of data attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = getData('test', futureEl);
  const expected = 'true';
  actual.fork(
    () => assert.fail('getData returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getData returns error if data attribute not found on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = getData('not-real', futureEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getData did not return an error.')
  );
  assert.end();
});
