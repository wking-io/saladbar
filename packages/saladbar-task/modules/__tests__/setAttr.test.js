import { compose } from 'ramda';
import Task from 'data.task';
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
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
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
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setAttr sets value of attribute on task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(
    getAttr('aria-expanded'),
    setAttr('aria-expanded', 'true')
  );
  const expected = 'true';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setAttr creates new attr if attribute not found on task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(getAttr('not-real'), setAttr('not-real', 'false'));
  const expected = 'false';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});
