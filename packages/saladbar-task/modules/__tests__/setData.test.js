import { compose } from 'ramda';
import Task from 'data.task';
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
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setData creates new data property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setData returns error if data property is not a valid property name on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = setData('_notreal_', 'false', testEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('setData passed with invalid property name.')
  );
  assert.end();
});

test('setData sets value of data property on task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(getData('test'), setData('test', 'false'));
  const expected = 'false';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setData creates new data property if property not found on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(getData('notReal'), setData('notReal', 'false'));
  const expected = 'false';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setData returns error if data property is not a valid property name on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = setData('_notreal_', 'false', taskEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('setData passed with invalid property name.')
  );
  assert.end();
});
