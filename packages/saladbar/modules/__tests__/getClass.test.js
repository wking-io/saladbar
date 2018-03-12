import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getClass from '../get-class';

test('getClass returns class at index when class exists at that index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = getClass(0, testEl);
  const expected = 'default';
  result
    .leftMap(() => assert.fail())
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('getClass returns error when class does not exists at index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = getClass(1, testEl);
  const expected = true;
  result
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail('getClass did not return errror when index does not exist')
    );
  assert.end();
});

test('getClass returns class at index when class exists at that index on a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const result = getClass(0, eitherEl);
  const expected = 'default';
  result
    .leftMap(() => assert.fail())
    .map(actual => assert.equal(actual, expected));
  assert.end();
});

test('getClass returns error when class does not exists at index on a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const result = getClass(1, eitherEl);
  const expected = true;
  result
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(() =>
      assert.fail('getClass did not return errror when index does not exist')
    );
  assert.end();
});
