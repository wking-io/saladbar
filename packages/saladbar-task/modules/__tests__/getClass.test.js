import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import getClass from '../get-class';

test('getClass returns class at index when class exists at that index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = getClass(0, testEl);
  const expected = 'default';
  result.fork(() => assert.fail(), actual => assert.equal(actual, expected));
  assert.end();
});

test('getClass returns error when class does not exists at index', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = getClass(1, testEl);
  const expected = true;
  result.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () =>
      assert.fail('getClass did not return errror when index does not exist')
  );
  assert.end();
});

test('getClass returns class at index when class exists at that index on a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const result = getClass(0, taskEl);
  const expected = 'default';
  result.fork(() => assert.fail(), actual => assert.equal(actual, expected));
  assert.end();
});

test('getClass returns error when class does not exists at index on a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const result = getClass(1, taskEl);
  const expected = true;
  result.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () =>
      assert.fail('getClass did not return errror when index does not exist')
  );
  assert.end();
});
