import Task from 'data.task';
import test from 'tape';
import branch from '../utils/branch';
import createElement from '../utils/create/createElement';

test('branch takes in non task value wraps it in task and evaluates value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const fn = x => Task.of(x);
  const expected = true;
  const task = branch(fn, testEl);
  task.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    actual => assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch takes in non task array value wraps it in task and evaluates array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const fn = x => Task.of(x);
  const expected = true;
  const task = branch(fn, testEls);
  task.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    actual =>
      assert.deepEqual(
        actual.every(el => el.classList.contains('default')),
        expected
      )
  );
  assert.end();
});

test('branch evaluates task single value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const fn = x => Task.of(x);
  const expected = true;
  const task = branch(fn, taskEl);
  task.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    actual => assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch evaluates task array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const fn = x => Task.of(x);
  const expected = true;
  const task = branch(fn, taskEls);
  task.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    actual =>
      assert.deepEqual(
        actual.every(el => el.classList.contains('default')),
        expected
      )
  );
  assert.end();
});
