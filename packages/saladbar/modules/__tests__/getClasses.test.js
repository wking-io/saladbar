import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getClasses from '../get-classes';

test('getClasses returns object of classes with all classes that exist on element', assert => {
  const document = createElement(1, { classes: 'default also-this' });
  const testEl = document.querySelector('.default');
  const result = getClasses(testEl);
  const expected = 2;
  result
    .leftMap(() => assert.fail())
    .map(actual => assert.equal(actual.length, expected));
  assert.end();
});

test('getClasses returns error if no classes found on element', assert => {
  const document = createElement(1, { classes: '', id: 'default' });
  const testEl = document.querySelector('#default');
  const result = getClasses(testEl);
  const expected = true;
  result
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail('getClasses did not return errror when there are no classes.')
    );
  assert.end();
});

test('getClasses returns object of classes with all classes that exist on a future element', assert => {
  const document = createElement(1, { classes: 'default also-this' });
  const futureEl = Either.of(document.querySelector('.default'));
  const result = getClasses(futureEl);
  const expected = 2;
  result
    .leftMap(() => assert.fail())
    .map(actual => assert.equal(actual.length, expected));
  assert.end();
});

test('getClasses returns error no classes found on a future element', assert => {
  const document = createElement(1, { classes: '', id: 'default' });
  const futureEl = Either.of(document.querySelector('#default'));
  const result = getClasses(futureEl);
  const expected = true;
  result
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail('getClasses did not return errror when there are no classes.')
    );
  assert.end();
});
