import { compose } from 'ramda';
import Either from 'data.either';
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
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});

test('setData sets value of data property on either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(getData('test'), setData('test', 'false'));
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData creates new data property if property not found on either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData returns error if data property is not a valid property name on either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = setData('_notreal_', 'false', eitherEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});

test('setData sets value of data property on single element with result of Either value', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(getData('test'), setData('test', Either.of('false')));
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData creates new data property if property not found on single element with result of Either value', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getData('notReal'),
    setData('notReal', Either.of('false'))
  );
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData returns error if data property is not a valid property name on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = setData('_notreal_', Either.of('false'), testEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});

test('setData sets value of data property with Either value on either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(getData('test'), setData('test', Either.of('false')));
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData creates new data property if property not found on either element with the result of an Either value', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(
    getData('notReal'),
    setData('notReal', Either.of('false'))
  );
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setData returns error if data property is not a valid property name on either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = setData('_notreal_', Either.of('false'), eitherEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('setData passed with invalid property name.'));
  assert.end();
});
