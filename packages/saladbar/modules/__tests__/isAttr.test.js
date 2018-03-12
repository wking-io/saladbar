import Either from 'data.either';
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
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns true when property exists and the value matches on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', 'false', testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
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
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns false when property exists but the value does not match on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', 'true', testEl);
  const expected = false;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
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
  result
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});

test('isAttr returns error when property does not exist on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('not-real', 'test', testEl);
  const expected = true;
  result
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});

test('isAttr returns true when property exists and the value matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('aria-expanded', 'false', testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns true when property exists and the value is and Either and matches on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('aria-expanded', Either.of('false'), testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns true when property exists and the value is an Either and matches on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', Either.of('false'), testEl);
  const expected = true;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns false when property exists but the value is an Either and does not match on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('aria-expanded', Either.of('true'), testEl);
  const expected = false;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns false when property exists but the value is an Either and does not match on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('aria-expanded', Either.of('true'), testEl);
  const expected = false;
  result
    .leftMap(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isAttr returns error when property does not exist on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = isAttr('not-real', Either.of('test'), testEl);
  const expected = true;
  result
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});

test('isAttr returns error when property does not exist on a either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = isAttr('not-real', Either.of('test'), testEl);
  const expected = true;
  result
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});
