import Result from 'folktale/result';
import test from 'tape';
import branch from '../utils/branch';
import createElement from '../utils/create/createElement';

test('branch takes in non either value wraps it in either and evaluates value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const testEl = document.querySelector('.default');
  const fn = x => Result.of(x);
  const expected = true;
  const either = branch(fn, testEl);
  either.map(actual =>
    assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch takes in non either array value wraps it in either and evaluates array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const testEls = Array.from(document.querySelectorAll('.default'));
  const fn = x => Result.of(x);
  const expected = true;
  const either = branch(fn, testEls);
  either.map(actual =>
    assert.deepEqual(
      actual.every(el => el.classList.contains('default')),
      expected
    )
  );
  assert.end();
});

test('branch evaluates either single value successfully', assert => {
  const document = createElement(1, { classes: 'default' });
  const eitherEl = Result.of(document.querySelector('.default'));
  const fn = x => Result.of(x);
  const expected = true;
  const either = branch(fn, eitherEl);
  either.map(actual =>
    assert.equal(actual.classList.contains('default'), expected)
  );
  assert.end();
});

test('branch evaluates either array value successfully', assert => {
  const document = createElement(2, { classes: 'default' });
  const eitherEls = Result.of(
    Array.from(document.querySelectorAll('.default'))
  );
  const fn = x => Result.of(x);
  const expected = true;
  const either = branch(fn, eitherEls);
  either.map(actual =>
    assert.deepEqual(
      actual.every(el => el.classList.contains('default')),
      expected
    )
  );
  assert.end();
});
