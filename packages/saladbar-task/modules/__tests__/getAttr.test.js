import Task from 'data.task';
import test from 'tape';
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
  actual.fork(
    () => assert.fail('getAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
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
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getAttr did not return an error.')
  );
  assert.end();
});

test('getAttr returns value of attribute on task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = getAttr('aria-expanded', taskEl);
  const expected = 'false';
  actual.fork(
    () => assert.fail('getAttr returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getAttr returns error if attribute not found on task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = getAttr('not-real', taskEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getAttr did not return an error.')
  );
  assert.end();
});
