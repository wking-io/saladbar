import { compose } from 'ramda';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getData from '../get-data';
import setData from '../set-data';

test('setData sets value of data property on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(getData('test'), setData('test', 'false'));
  const expected = 'false';
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setData creates new data property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setData returns null if data property is not a valid property name on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = setData('_notreal_', 'false', testEl);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
