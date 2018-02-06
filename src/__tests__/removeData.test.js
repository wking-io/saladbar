/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import { of } from 'fluture';
import test from 'tape';
import createElement from '../utils/element';
import hasData from '../has-data';
import removeData from '../remove-data';

test('removeData removes data attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasData('test'), removeData('test'));
  const expected = false;
  actual(testEl).fork(
    () => assert.fail('removeData returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('removeData does not return error if data attribute does not exist on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasData('test'), removeData('not-real'));
  const expected = true;
  actual(testEl).fork(
    () => assert.fail('removeData returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('removeData removes data attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(hasData('test'), removeData('test'));
  const expected = false;
  actual(futureEl).fork(
    () => assert.fail('removeData returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('removeData does not return error if data attribute does not exist on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(hasData('test'), removeData('not-real'));
  const expected = true;
  actual(futureEl).fork(
    () => assert.fail('removeData returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});
