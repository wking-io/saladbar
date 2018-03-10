import { compose } from 'ramda';
import Task from 'data.task';
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
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setProp creates new property if property not found on single element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  actual(testEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setProp sets value of property on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(getProp('innerHTML'), setProp('innerHTML', 'true'));
  const expected = 'true';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});

test('setProp creates new prop if property not found on task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = compose(getProp('not-real'), setProp('not-real', 'false'));
  const expected = 'false';
  actual(taskEl).fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    attr => assert.equal(attr, expected)
  );
  assert.end();
});
