import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getProp from '../get-prop';

test('getProp returns value of property on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('innerHTML', testEl);
  const expected = 'Hello!';
  actual.fork(
    () => assert.fail('getProp returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getProp returns error if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = getProp('not-real', testEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getProp did not return an error.')
  );
  assert.end();
});

test('getProp returns value of property on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = getProp('innerHTML', taskEl);
  const expected = 'Hello!';
  actual.fork(
    () => assert.fail('getProp returned an error.'),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('getProp returns error if property not found on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = getProp('not-real', taskEl);
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('getProp did not return an error.')
  );
  assert.end();
});
