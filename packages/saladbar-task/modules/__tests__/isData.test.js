import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import isData from '../is-data';

test('isData returns true when property exists and the value matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isData('test', 'true', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isData returns true when property exists and the value matches on a task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = isData('test', 'true', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isData returns false when property exists but the value does not match on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isData('test', 'false', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isData returns false when property exists but the value does not match on a task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = isData('test', 'false', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isData returns error when property does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isData('not-real', 'test', testEl);
  const expected = true;
  result.fork(
    actual => assert.equal(actual.hasOwnProperty('error'), expected),
    err => assert.fail(err)
  );
  assert.end();
});

test('isData returns error when property does not exist on a task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = isData('not-real', 'test', testEl);
  const expected = true;
  result.fork(
    actual => assert.equal(actual.hasOwnProperty('error'), expected),
    err => assert.fail(err)
  );
  assert.end();
});
