import Task from 'data.task';
import test from 'tape';
import createElement from '../utils/create/createElement';
import hasProp from '../has-prop';

test('hasProp returns true when property exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasProp('classList', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasProp returns false when property does not exists on an element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = document.querySelector('.default');
  const result = hasProp('not-real', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasProp returns true when class exists on a task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = hasProp('classList', testEl);
  const expected = true;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});

test('hasProp returns false when class does not exists on a task element', assert => {
  const document = createElement(1, {
    attrs: ['aria-expanded="false"'],
    classes: 'default',
  });
  const testEl = Task.of(document.querySelector('.default'));
  const result = hasProp('not-real', testEl);
  const expected = false;
  result.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    bool => assert.equal(bool, expected)
  );
  assert.end();
});
