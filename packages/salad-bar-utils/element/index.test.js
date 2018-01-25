import createElement from './index.js';
import test from 'tape';

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

test('createElement constructor hasAttribute method returns true if attribute exists on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.hasAttribute('aria-expanded');
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('createElement constructor hasAttribute method returns false if attribute does not exist on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.hasAttribute('aria-stuff');
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('createElement constructor getAttribute method returns value if attribute exists on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.getAttribute('aria-expanded');
  const expected = 'false';
  assert.equal(actual, expected);
  assert.end();
});

test('createElement constructor getAttribute method returns null if attribute does not exist on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.getAttribute('aria-stuff');
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});

test('createElement constructor setAttribute method updates an existing attribute on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.setAttribute('aria-expanded', 'true');
  const expected = 'true';
  assert.equal(actual['aria-expanded'], expected);
  assert.end();
});

test('createElement constructor setAttribute method creates a new attribute on an element.', assert => {
  const testEl = createElement({ attrs: { 'aria-expanded': 'false' } });
  const actual = testEl.setAttribute('aria-stuff', 'true');
  const expected = 'true';
  assert.equal(actual['aria-stuff'], expected);
  assert.end();
});
