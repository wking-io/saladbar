import test from 'tape';
import createElement from './index.js';

test('createElement constructor classList.add method works by adding a single class that does not exist.', assert => {
  const expected = ['default', 'new-class'];
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.add('new-class');
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.add method works by adding an array of classes that does not exist.', assert => {
  const expected = ['default', 'new-class', 'also-new'];
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.add(['new-class', 'also-new']);
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.add method does not add a class that already exists.', assert => {
  const expected = ['default'];
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.add(['default']);
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.add method only adds classes that do not exist already to array of classes.', assert => {
  const expected = ['default', 'new-class'];
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.add(['default', 'new-class']);
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.remove method works by removing a single class.', assert => {
  const expected = ['default'];
  const testEl = createElement({ classes: ['default', 'remove-this'] });
  const actual = testEl.classList.remove('remove-this');
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.remove method works by removing an array of classes.', assert => {
  const expected = ['default'];
  const testEl = createElement({
    classes: ['default', 'remove-this', 'also-remove'],
  });
  const actual = testEl.classList.remove(['remove-this', 'also-remove']);
  assert.deepEqual(actual.sort(), expected.sort());
  assert.end();
});

test('createElement constructor classList.toggle method works by toggling a class on and off on a single element.', assert => {
  const testEl = createElement({ classes: ['default'] });
  const actualOne = testEl.classList.toggle('toggle-this');
  const expectedOne = ['default', 'toggle-this'];
  assert.deepEqual(actualOne.sort(), expectedOne.sort());
  const actualTwo = testEl.classList.toggle('toggle-this');
  const expectedTwo = ['default'];
  assert.deepEqual(actualTwo.sort(), expectedTwo.sort());
  assert.end();
});

test('createElement constructor classList.contains method works by returning true when a class exists on an element.', assert => {
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.contains('default');
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('createElement constructor classList.contains method works by returning false when a class does not exists on an element.', assert => {
  const testEl = createElement({ classes: ['default'] });
  const actual = testEl.classList.contains('not-real');
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
