import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasClass from '../has-class';

test('hasClass returns true when class exists on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = hasClass('default', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasClass returns false when class does not exists on an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const result = hasClass('not-real', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasClass returns true when class exists on a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const result = hasClass('default', taskEl);
  const expected = true;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasClass returns false when class does not exists on a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const result = hasClass('not-real', taskEl);
  const expected = false;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});
