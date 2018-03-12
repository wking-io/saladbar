import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasData from '../has-data';

test('hasData returns true when data attribute exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasData('test', testEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasData returns false when data attribute does not exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasData('not-real', testEl);
  const expected = false;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasData returns true when data attribute exists on a either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = hasData('test', testEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasData returns false when data attribute does not exists on a either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Either.of(document.querySelector('.default'));
  const result = hasData('not-real', testEl);
  const expected = false;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});
