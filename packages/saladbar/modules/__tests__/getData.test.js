import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getData from '../get-data';

test('getData returns value of data attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getData('test', testEl);
  const expected = 'true';
  actual
    .leftMap(() => assert.fail('getData returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getData returns error if data attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = getData('not-real', testEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getData did not return an error.'));
  assert.end();
});

test('getData returns value of data attribute on either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = getData('test', eitherEl);
  const expected = 'true';
  actual
    .leftMap(() => assert.fail('getData returned an error.'))
    .map(attr => assert.equal(attr, expected));
  assert.end();
});

test('getData returns error if data attribute not found on either element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = getData('not-real', eitherEl);
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() => assert.fail('getData did not return an error.'));
  assert.end();
});
