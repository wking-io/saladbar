import { compose } from 'ramda';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasAttr from '../has-attr';
import removeAttr from '../remove-attr';

test('removeAttr removes attribute on single element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasAttr('aria-expanded'), removeAttr('aria-expanded'));
  const expected = false;
  assert.equal(actual(testEl), expected);
  assert.end();
});

test('removeAttr does not return null if attribute not found on single element', assert => {
  const document = createElement(2, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const actual = compose(hasAttr('not-real'), removeAttr('not-real'));
  const expected = false;
  assert.equal(actual(testEl), expected);
  assert.end();
});
