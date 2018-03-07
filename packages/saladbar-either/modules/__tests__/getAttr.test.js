import test from 'tape';
import Result from 'folktale/result';
import createElement from '../utils/create/createElement';
import getAttr from '../get-attr';

test('getAttr returns value of attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('aria-expanded', testEl);
  const expected = 'false';
  actual
    .mapError(() => assert.fail('getAttr returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getAttr returns error if attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getAttr('not-real', testEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getAttr did not return an error.'));
  assert.end();
});

test('getAttr returns value of attribute on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = getAttr('aria-expanded', futureEl);
  const expected = 'false';
  actual
    .mapError(() => assert.fail('getAttr returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getAttr returns error if attribute not found on future element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const futureEl = Result.of(document.querySelector('.default'));
  const actual = getAttr('not-real', futureEl);
  const expected = true;
  actual
    .mapError(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getAttr did not return an error.'));
  assert.end();
});
