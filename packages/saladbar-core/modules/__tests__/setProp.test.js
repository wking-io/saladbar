import { compose } from 'ramda';
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
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('setProp creates new property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  assert.equal(actual(testEl), expected);
  assert.end();
});
