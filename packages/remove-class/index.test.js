import test from 'tape';
import removeClass from './index';
import createElement from 'saladbar.utils/element';
import { of } from 'fluture';

test('removeClass removes a class from an element', assert => {
  const testEl = createElement({ classes: ['default', 'remove-this'] });
  const result = removeClass('remove-this', testEl);
  const expected = ['default'];
  assert.deepEqual(result.classList.values.sort(), expected.sort());
  assert.end();
});

test('removeClass removes multiple classes from an element', assert => {
  const testEl = createElement({
    classes: ['default', 'remove-class', 'also-remove'],
  });
  const result = removeClass(['remove-class', 'also-remove'], testEl);
  const expected = ['default'];
  assert.deepEqual(result.classList.values.sort(), expected.sort());
  assert.end();
});

test('removeClass removes single class from multiple elements', assert => {
  const testEls = [
    createElement({ classes: ['default', 'remove-class'] }),
    createElement({ classes: ['default', 'remove-class'] }),
    createElement({ classes: ['default', 'remove-class'] }),
  ];
  const result = removeClass(['remove-class'], testEls);
  const expected = ['default'];
  result.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expected.sort());
  });
  assert.end();
});

test('removeClass removes multiple classes from multiple elements', assert => {
  const testEls = [
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
  ];
  const result = removeClass(['remove-class', 'also-remove'], testEls);
  const expected = ['default'];
  result.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expected.sort());
  });
  assert.end();
});

test('removeClass removes a class from a future element', assert => {
  const futureEl = of(createElement({ classes: ['default', 'remove-class'] }));
  const result = removeClass('remove-class', futureEl);
  const expected = ['default'];
  result.value(el =>
    assert.deepEqual(el.classList.values.sort(), expected.sort())
  );
  assert.end();
});

test('removeClass removes multiple classes from a future element', assert => {
  const futureEl = of(
    createElement({ classes: ['default', 'remove-class', 'also-remove'] })
  );
  const result = removeClass(['remove-class', 'also-remove'], futureEl);
  const expected = ['default'];
  result.value(el =>
    assert.deepEqual(el.classList.values.sort(), expected.sort())
  );
  assert.end();
});

test('removeClass removes a class from multiple future elements', assert => {
  const futureEls = of([
    createElement({ classes: ['default', 'remove-class'] }),
    createElement({ classes: ['default', 'remove-class'] }),
    createElement({ classes: ['default', 'remove-class'] }),
  ]);
  const result = removeClass(['remove-class'], futureEls);
  const expected = ['default'];
  result.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expected.sort());
    })
  );
  assert.end();
});

test('removeClass removes multiple classes from multiple future elements', assert => {
  const futureEls = of([
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
    createElement({ classes: ['default', 'remove-class', 'also-remove'] }),
  ]);
  const result = removeClass(['remove-class', 'also-remove'], futureEls);
  const expected = ['default'];
  result.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expected.sort());
    })
  );
  assert.end();
});
