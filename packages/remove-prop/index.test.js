/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import createElement from 'saladbar.utils/element';
import getProp from 'saladbar.getprop';
import hasProp from 'saladbar.hasprop';
import { of } from 'fluture';
import removeProp from './index';
import test from 'tape';

test('removeProp removes property on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    hasProp('test'),
    removeProp('test'),
    getProp('dataset')
  );
  const expected = false;
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('removeProp does not return an error if property does not exist on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    hasProp('test'),
    removeProp('not-real'),
    getProp('dataset')
  );
  const expected = true;
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('removeProp removes property on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(
    hasProp('test'),
    removeProp('test'),
    getProp('dataset')
  );
  const expected = false;
  actual(futureEl).fork(
    () => assert.fail('removeProp returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('removeProp does not return error if property does exist on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="false"'],
    classes: 'default',
  });
  const futureEl = of(document.querySelector('.default'));
  const actual = compose(
    hasProp('test'),
    removeProp('not-real'),
    getProp('dataset')
  );
  const expected = true;
  actual(futureEl).fork(
    () => assert.fail('removeProp returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});
