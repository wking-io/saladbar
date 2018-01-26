/* eslint no-magic-numbers: 0 */

import { compose } from 'ramda';
import createElement from 'saladbar.utils/element';
import getProp from 'saladbar.getprop';
import { of } from 'fluture';
import setProp from './index';
import test from 'tape';

test('setProp sets value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getProp('innerHTML'),
    setProp('innerHTML', 'Goodbye!')
  );
  const expected = 'Goodbye!';
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setProp creates new property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setProp sets value of property on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = of(document.querySelector('.default'));
  const actual = compose(getProp('innerHTML'), setProp('innerHTML', 'true'));
  const expected = 'true';
  actual(testEl).value(attr => assert.equal(attr, expected));
  assert.end();
});

test('setProp creates new prop if property not found on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = of(document.querySelector('.default'));
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  actual(testEl).value(attr => assert.equal(attr, expected));
  assert.end();
});
