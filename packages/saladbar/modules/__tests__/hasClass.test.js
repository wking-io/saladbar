import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasClass from '../has-class';

test('hasClass returns true when class exists on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = hasClass('default', testEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasClass returns false when class does not exists on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = hasClass('not-real', testEl);
  const expected = false;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasClass returns true when class exists on a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const result = hasClass('default', eitherEl);
  const expected = true;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});

test('hasClass returns false when class does not exists on a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const result = hasClass('not-real', eitherEl);
  const expected = false;
  result.map(bool => assert.equal(bool, expected));
  assert.end();
});
