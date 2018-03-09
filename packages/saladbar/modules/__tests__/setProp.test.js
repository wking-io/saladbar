import { compose } from 'ramda';
import Either from 'data.either';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getProp from '../get-prop';
import setProp from '../set-prop';

test('setProp sets value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(
    getProp('innerHTML'),
    setProp('innerHTML', 'Goodbye!')
  );
  const expected = 'Goodbye!';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setProp creates new property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  actual(testEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setProp sets value of property on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Either.of(document.querySelector('.default'));
  const actual = compose(getProp('innerHTML'), setProp('innerHTML', 'true'));
  const expected = 'true';
  actual(futureEl).map(attr => assert.equal(attr, expected));
  assert.end();
});

test('setProp creates new prop if property not found on future element', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = Either.of(document.querySelector('.default'));
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  actual(futureEl).map(attr => assert.equal(attr, expected));
  assert.end();
});
