import test from 'tape';
import createForm from '../utils/create/createForm';
import serialize from '../serialize';

const expectedData = {
  input: 'input',
  message: 'message',
  one: 'one',
  yes: 'yes',
};

test('serialize generates data object from form element.', assert => {
  const document = createForm('test-form');
  const testForm = document.querySelector('.test-form');
  const actual = serialize(testForm);
  const expected = expectedData;
  assert.deepEqual(actual, expected);
  assert.end();
});

test('serialize returns null if passed an invalid input.', assert => {
  const actual = serialize({ selector: '.form' });
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
