import Result from 'folktale/result';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getProp from '../get-prop';

test('getProp returns value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('innerHTML', testEl);
  const expected = 'Hello!';
  actual
    .mapError(() => assert.fail('getProp returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getProp returns error if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('not-real', testEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getProp did not return an error.'));
  assert.end();
});

test('getProp returns value of property on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = getProp('innerHTML', futureEl);
  const expected = 'Hello!';
  actual
    .mapError(() => assert.fail('getProp returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getProp returns error if property not found on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = getProp('not-real', futureEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getProp did not return an error.'));
  assert.end();
});
