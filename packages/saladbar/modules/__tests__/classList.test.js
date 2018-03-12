import Either from 'data.either';
import test from 'tape';
import classList from '../class-list';
import createElement from '../utils/create/createElement';

test('classList adds single class to an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('add', 'new-class', testEl);
  const expected = ['default', 'new-class'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds multiple classes to an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('add', ['new-class', 'also-new'], testEl);
  const expected = ['default', 'new-class', 'also-new'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds single class to multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('add', ['new-class'], testEls);
  const expected = ['default', 'new-class'];
  actual.map(theEls =>
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
  actual.map(theEls =>
    theEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
    })
  );
  assert.end();
});

test('classList adds single class to a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = classList('add', 'new-class', eitherEl);
  const expected = ['default', 'new-class'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds multiple classes to a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = classList('add', ['new-class', 'also-new'], eitherEl);
  const expected = ['default', 'new-class', 'also-new'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList adds single class to multiple either elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Either.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const actual = classList('add', ['new-class'], eitherEls);
  const expected = ['default', 'new-class'];
  actual.map(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
    })
  );
  assert.end();
});

test('classList adds multiple classes to multiple either elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Either.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const actual = classList('add', ['new-class', 'also-new'], eitherEls);
  const expected = ['default', 'new-class', 'also-new'];
  actual.map(testEls =>
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
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes multiple classes from an element', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const actual = classList('remove', ['remove-class', 'also-remove'], testEl);
  const expected = ['default'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes single class from multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actual = classList('remove', ['remove-class'], testEls);
  const expected = ['default'];
  actual.map(theEls =>
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
  actual.map(theEls =>
    theEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
    })
  );
  assert.end();
});

test('classList removes single class from a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = classList('remove', 'remove-class', eitherEl);
  const expected = ['default'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes multiple classes from a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actual = classList('remove', ['remove-class', 'also-remove'], eitherEl);
  const expected = ['default'];
  actual.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expected.sort())
  );
  assert.end();
});

test('classList removes single class from multiple either elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Either.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const actual = classList('remove', ['remove-class'], eitherEls);
  const expected = ['default'];
  actual.map(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expected.sort());
    })
  );
  assert.end();
});

test('classList removes multiple classes from multiple either elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Either.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const actual = classList(
    'remove',
    ['remove-class', 'also-remove'],
    eitherEls
  );
  const expected = ['default'];
  actual.map(testEls =>
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
  actualOne.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort())
  );
  const actualTwo = classList('toggle', 'toggle-this', testEl);
  const expectedTwo = ['default'];
  actualTwo.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort())
  );
  assert.end();
});

test('classList toggles single class from multiple elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const actualOne = classList('toggle', 'toggle-class', testEls);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.map(theEls =>
    theEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort());
    })
  );
  const actualTwo = classList('toggle', 'toggle-class', testEls);
  const expectedTwo = ['default'];
  actualTwo.map(theEls =>
    theEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort());
    })
  );
  assert.end();
});

test('classList toggles single class from a either element', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Either.of(document.querySelector('.default'));
  const actualOne = classList('toggle', 'toggle-class', eitherEl);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort())
  );
  const actualTwo = classList('toggle', 'toggle-class', eitherEl);
  const expectedTwo = ['default'];
  actualTwo.map(el =>
    assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort())
  );
  assert.end();
});

test('classList toggles single class from multiple either elements', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Either.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const actualOne = classList('toggle', 'toggle-class', eitherEls);
  const expectedOne = ['default', 'toggle-class'];
  actualOne.map(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expectedOne.sort());
    })
  );
  const actualTwo = classList('toggle', 'toggle-class', eitherEls);
  const expectedTwo = ['default'];
  actualTwo.map(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(Object.values(el.classList).sort(), expectedTwo.sort());
    })
  );
  assert.end();
});
