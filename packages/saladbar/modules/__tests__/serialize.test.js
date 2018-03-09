import Either from 'data.either';
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
  actual
    .leftMap(err => assert.fail(`serialize returned an error - ${err.error}.`))
    .map(data => assert.deepEqual(data, expected));
  assert.end();
});

test('serialize generates data object from either form element.', assert => {
  const document = createForm('test-form');
  const eitherForm = Either.of(document.querySelector('.test-form'));
  const actual = serialize(eitherForm);
  const expected = expectedData;
  actual
    .leftMap(err => assert.fail(`serialize returned an error - ${err.error}.`))
    .map(data => assert.deepEqual(data, expected));
  assert.end();
});

test('serialize returns error if passed an invalid input.', assert => {
  const actual = serialize({ selector: '.form' });
  const expected = true;
  actual
    .leftMap(err => assert.equal(err.hasOwnProperty('error'), expected))
    .map(data =>
      assert.fail(`serialize returned success on intended failure - ${data}`)
    );
  assert.end();
});
