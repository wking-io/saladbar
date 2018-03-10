import Task from 'data.task';
import test from 'tape';
import classList from '../class-list';
import createElement from '../utils/create/createElement';

test('classList adds single class to an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('add', 'new-class', testEl);
  const expected = ['default', 'new-class'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds multiple classes to an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('add', ['new-class', 'also-new'], testEl);
  const expected = ['default', 'new-class', 'also-new'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds single class to multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('add', ['new-class'], testEls);
  const expected = ['default', 'new-class'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList adds multiple classes to multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('add', ['new-class', 'also-new'], testEls);
  const expected = ['default', 'new-class', 'also-new'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList adds single class to a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = classList('add', 'new-class', taskEl);
  const expected = ['default', 'new-class'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds multiple classes to a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = classList('add', ['new-class', 'also-new'], taskEl);
  const expected = ['default', 'new-class', 'also-new'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds single class to multiple task elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const actual = classList('add', ['new-class'], taskEls);
  const expected = ['default', 'new-class'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList adds multiple classes to multiple task elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const actual = classList('add', ['new-class', 'also-new'], taskEls);
  const expected = ['default', 'new-class', 'also-new'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList removes single class from an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('remove', 'remove-this', testEl);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes multiple classes from an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('remove', ['remove-class', 'also-remove'], testEl);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes single class from multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('remove', ['remove-class'], testEls);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList removes multiple classes from multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('remove', ['remove-class', 'also-remove'], testEls);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList removes single class from a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = classList('remove', 'remove-class', taskEl);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes multiple classes from a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actual = classList('remove', ['remove-class', 'also-remove'], taskEl);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el => assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes single class from multiple task elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const actual = classList('remove', ['remove-class'], taskEls);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList removes multiple classes from multiple task elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const actual = classList('remove', ['remove-class', 'also-remove'], taskEls);
  const expected = ['default'];
  actual.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
      })
  );
  assert.end();
});

test('classList toggles single class from an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actualOne = classList('toggle', 'toggle-this', testEl);
  const expectedOne = ['default', 'toggle-this'];
  actualOne.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el =>
      assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort())
  );
  const actualTwo = classList('toggle', 'toggle-this', testEl);
  const expectedTwo = ['default'];
  actualTwo.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el =>
      assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort())
  );
  assert.end();
});

test('classList toggles single class from multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actualOne = classList('toggle', 'toggle-class', testEls);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(
          Object.values(el.classList).sort(),
          expectedOne.sort()
        );
      })
  );
  const actualTwo = classList('toggle', 'toggle-class', testEls);
  const expectedTwo = ['default'];
  actualTwo.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    theEls =>
      theEls.forEach(el => {
        assert.deepEqual(
          Object.values(el.classList).sort(),
          expectedTwo.sort()
        );
      })
  );
  assert.end();
});

test('classList toggles single class from a task element', assert => {
  const document = createElement(1, { classes: 'default' });
  const taskEl = Task.of(document.querySelector('.default'));
  const actualOne = classList('toggle', 'toggle-class', taskEl);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el =>
      assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort())
  );
  const actualTwo = classList('toggle', 'toggle-class', taskEl);
  const expectedTwo = ['default'];
  actualTwo.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    el =>
      assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort())
  );
  assert.end();
});

test('classList toggles single class from multiple task elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const taskEls = Task.of(Array.from(document.querySelectorAll('.default')));
  const actualOne = classList('toggle', 'toggle-class', taskEls);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(
          Object.values(el.classList).sort(),
          expectedOne.sort()
        );
      })
  );
  const actualTwo = classList('toggle', 'toggle-class', taskEls);
  const expectedTwo = ['default'];
  actualTwo.fork(
    err => assert.fail(`Task failed with the following error: ${err}`),
    testEls =>
      testEls.forEach(el => {
        assert.deepEqual(
          Object.values(el.classList).sort(),
          expectedTwo.sort()
        );
      })
  );
  assert.end();
});
