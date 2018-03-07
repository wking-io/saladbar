import { compose } from 'ramda';
import Result from 'folktale/result';
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
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData creates new data property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData returns error if data property is not a valid property name on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = setData('_notreal_', 'false', testEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});

test('setData sets value of data property on future element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = compose(getData('test'), setData('test', 'false'));
  const expected = 'false';
  actual(futureEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData creates new data property if property not found on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  actual(futureEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData returns error if data property is not a valid property name on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = setData('_notreal_', 'false', futureEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});
