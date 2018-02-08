import { of } from 'fluture';
import test from 'tape';
import branch from '../utils/branch';
import createElement from '../utils/create/createElement';

test('branch takes in non future value wraps it in future and evaluates value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const fn = x => of(x);
  const expected = true;
  const future = branch(fn, testEl);
  future.value(actual =>
    assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch takes in non future array value wraps it in future and evaluates array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const fn = x => of(x);
  const expected = true;
  const future = branch(fn, testEls);
  future.value(actual =>
    assert.deepEqual(
      actual.every(el => el.classList.contains('default')),
      expected
    )
  );
  assert.end();
});

test('branch evaluates future single value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const futureEl = of(document.querySelector('.default'));
  const fn = x => of(x);
  const expected = true;
  const future = branch(fn, futureEl);
  future.value(actual =>
    assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch evaluates future array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const futureEls = of(Array.from(document.querySelectorAll('.default')));
  const fn = x => of(x);
  const expected = true;
  const future = branch(fn, futureEls);
  future.value(actual =>
    assert.deepEqual(
      actual.every(el => el.classList.contains('default')),
      expected
    )
  );
  assert.end();
});
