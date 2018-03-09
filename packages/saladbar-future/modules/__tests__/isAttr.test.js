import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import isAttr from '../is-attr';

test('isAttr returns true when property exists and the value matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('aria-expanded', 'false', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isAttr returns true when property exists and the value matches on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', 'false', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isAttr returns false when property exists but the value does not match on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('aria-expanded', 'true', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isAttr returns false when property exists but the value does not match on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', 'true', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(err),
    actual => assert.equal(actual, expected)
  );
  assert.end();
});

test('isAttr returns error when property does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('not-real', 'test', testEl);
  const expected = true;
  result.fork(
    actual => assert.equal(actual.hasOwnProperty('error'), expected),
    err => assert.fail(err)
  );
  assert.end();
});

test('isAttr returns error when property does not exist on a future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = of(document.querySelector('.default'));
  const result = isAttr('not-real', 'test', testEl);
  const expected = true;
  result.fork(
    actual => assert.equal(actual.hasOwnProperty('error'), expected),
    err => assert.fail(err)
  );
  assert.end();
});
