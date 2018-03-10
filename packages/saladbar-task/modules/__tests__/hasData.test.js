import Task from 'data.task';
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
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
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
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasData returns true when data attribute exists on a task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = hasData('test', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasData returns false when data attribute does not exists on a task element', assert => {
  const document = createElement(1, {
    attrs: ['data-test="true"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = hasData('not-real', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});
