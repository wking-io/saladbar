import Result from 'folktale/result';
import test from 'tape';
import createElement from '../utils/create/createElement';
import isProp from '../is-prop';

test('isProp returns true when property exists and the value matches on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = isProp('innerHTML', 'Hello!', testEl);
  const expected = true;
  result
    .mapError(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isProp returns true when property exists and the value matches on a future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = Result.of(document.querySelector('.default'));
  const result = isProp('innerHTML', 'Hello!', testEl);
  const expected = true;
  result
    .mapError(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isProp returns false when property exists but the value does not match on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = isProp('innerHTML', 'test', testEl);
  const expected = false;
  result
    .mapError(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isProp returns false when property exists but the value does not match on a future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = Result.of(document.querySelector('.default'));
  const result = isProp('innerHTML', 'test', testEl);
  const expected = false;
  result
    .mapError(err => assert.fail(err))
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('isProp returns error when property does not exist on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = isProp('not-real', 'test', testEl);
  const expected = true;
  result
    .mapError(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});

test('isProp returns error when property does not exist on a future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = Result.of(document.querySelector('.default'));
  const result = isProp('not-real', 'test', testEl);
  const expected = true;
  result
    .mapError(actual => assert.equal(actual.hasOwnProperty('error'), expected))
    .map(err => assert.fail(err));
  assert.end();
});
