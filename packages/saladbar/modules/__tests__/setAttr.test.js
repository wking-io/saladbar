import { compose } from 'ramda';
import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getAttr from '../get-attr';
import setAttr from '../set-attr';

test('setAttr sets value of attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if attribute not found on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(getAttr('not-real'), setAttr('not-real', 'false'));
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr sets value of attribute on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if attribute not found on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(getAttr('not-real'), setAttr('not-real', 'false'));
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr sets value of Either attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', Either.of('true'))
  );
  const expected = 'true';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if Either attribute not found on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getAttr('not-real'),
    setAttr('not-real', Either.of('false'))
  );
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr sets value of Either attribute on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', Either.of('true'))
  );
  const expected = 'true';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setAttr creates new attr if Either attribute not found on either element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = compose(
    getAttr('not-real'),
    setAttr('not-real', Either.of('false'))
  );
  const expected = 'false';
  actual(eitherEl).map(attr => assert.equal(attr, expected));
  assert.end();
});
