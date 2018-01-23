import test from 'tape';
import addClass from './index';
import createElement from 'saladbar.utils/element';
import { of } from 'fluture';

test('addClass adds a class to an element', assert => {
  const testEl = createElement({ classes: ['default'] });
  const result = addClass('new-class', testEl);
  const expected = ['default', 'new-class'];
  assert.deepEqual(result.classList.values.sort(), expected.sort());
  assert.end();
});

test('addClass adds multiple classes to an element', assert => {
  const testEl = createElement({ classes: ['default'] });
  const result = addClass(['new-class', 'also-new'], testEl);
  const expected = ['default', 'new-class', 'also-new'];
  assert.deepEqual(result.classList.values.sort(), expected.sort());
  assert.end();
});

test('addClass adds single class to multiple elements', assert => {
  const testEls = [
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ];
  const result = addClass(['new-class'], testEls);
  const expected = ['default', 'new-class'];
  result.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expected.sort());
  });
  assert.end();
});

test('addClass adds multiple classes to multiple elements', assert => {
  const testEls = [
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ];
  const result = addClass(['new-class', 'also-new'], testEls);
  const expected = ['default', 'new-class', 'also-new'];
  result.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expected.sort());
  });
  assert.end();
});

test('addClass adds a class to a future element', assert => {
  const futureEl = of(createElement({ classes: ['default'] }));
  const result = addClass('new-class', futureEl);
  const expected = ['default', 'new-class'];
  result.value(el =>
    assert.deepEqual(el.classList.values.sort(), expected.sort())
  );
  assert.end();
});

test('addClass adds multiple classes to a future element', assert => {
  const futureEl = of(createElement({ classes: ['default'] }));
  const result = addClass(['new-class', 'also-new'], futureEl);
  const expected = ['default', 'new-class', 'also-new'];
  result.value(el =>
    assert.deepEqual(el.classList.values.sort(), expected.sort())
  );
  assert.end();
});

test('addClass adds a class to multiple future elements', assert => {
  const futureEls = of([
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ]);
  const result = addClass(['new-class'], futureEls);
  const expected = ['default', 'new-class'];
  result.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expected.sort());
    })
  );
  assert.end();
});

test('addClass adds multiple classes to multiple future elements', assert => {
  const futureEls = of([
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ]);
  const result = addClass(['new-class', 'also-new'], futureEls);
  const expected = ['default', 'new-class', 'also-new'];
  result.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expected.sort());
    })
  );
  assert.end();
});
