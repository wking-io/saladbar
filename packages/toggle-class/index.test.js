import test from 'tape';
import createElement from 'saladbar.utils/element';
import { of } from 'fluture';
import toggleClass from './index';

test('toggleClass toggles single class from an element', assert => {
  const testEl = createElement({ classes: ['default'] });
  const resultOne = toggleClass('toggle-this', testEl);
  const expectedOne = ['default', 'toggle-this'];
  assert.deepEqual(resultOne.classList.values.sort(), expectedOne.sort());
  const resultTwo = toggleClass('toggle-this', testEl);
  const expectedTwo = ['default'];
  assert.deepEqual(resultTwo.classList.values.sort(), expectedTwo.sort());
  assert.end();
});

test('toggleClass toggles single class from multiple elements', assert => {
  const testEls = [
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ];
  const resultOne = toggleClass('toggle-class', testEls);
  const expectedOne = ['default', 'toggle-class'];
  resultOne.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expectedOne.sort());
  });
  const resultTwo = toggleClass('toggle-class', testEls);
  const expectedTwo = ['default'];
  resultTwo.forEach(el => {
    assert.deepEqual(el.classList.values.sort(), expectedTwo.sort());
  });
  assert.end();
});

test('toggleClass toggles single class from a future element', assert => {
  const futureEl = of(createElement({ classes: ['default'] }));
  const resultOne = toggleClass('toggle-class', futureEl);
  const expectedOne = ['default', 'toggle-class'];
  resultOne.value(el =>
    assert.deepEqual(el.classList.values.sort(), expectedOne.sort())
  );
  const resultTwo = toggleClass('toggle-class', futureEl);
  const expectedTwo = ['default'];
  resultTwo.value(el =>
    assert.deepEqual(el.classList.values.sort(), expectedTwo.sort())
  );
  assert.end();
});

test('toggleClass toggles single class from multiple future elements', assert => {
  const futureEls = of([
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
    createElement({ classes: ['default'] }),
  ]);
  const resultOne = toggleClass('toggle-class', futureEls);
  const expectedOne = ['default', 'toggle-class'];
  resultOne.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expectedOne.sort());
    })
  );
  const resultTwo = toggleClass('toggle-class', futureEls);
  const expectedTwo = ['default'];
  resultTwo.value(testEls =>
    testEls.forEach(el => {
      assert.deepEqual(el.classList.values.sort(), expectedTwo.sort());
    })
  );
  assert.end();
});
