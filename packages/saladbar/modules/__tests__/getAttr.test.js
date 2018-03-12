import test from 'tape';
import Either from 'data.either';
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
    .leftMap(() => assert.fail('getAttr returned an error.'))
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
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getAttr did not return an error.'));
  assert.end();
});

test('getAttr returns value of attribute on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = getAttr('aria-expanded', eitherEl);
  const expected = 'false';
  actual
    .leftMap(() => assert.fail('getAttr returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getAttr returns error if attribute not found on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = getAttr('not-real', eitherEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getAttr did not return an error.'));
  assert.end();
});
