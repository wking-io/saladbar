import Either from 'data.either';
import test from 'tape';
import toBool from '../to-bool';

test('toBool returns true boolean when passed true string', assert => {
  const result = toBool('true');
  const expected = true;
  result
    .map(actual => assert.equal(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns false boolean when passed false string', assert => {
  const result = toBool('false');
  const expected = false;
  result
    .map(actual => assert.equal(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns expected mixed values of booleans when passed array of boolean strings', assert => {
  const result = toBool(['false', 'true', 'false']);
  const expected = [false, true, false];
  result
    .map(actual => assert.deepEqual(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns error when passed anything that is not true or false string', assert => {
  const result = toBool(1);
  const expected = true;
  result
    .map(() => assert.fail('Should not have passed.'))
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected));
  assert.end();
});

test('toBool returns true boolean when passed true string inside of Either', assert => {
  const result = toBool(Either.of('true'));
  const expected = true;
  result
    .map(actual => assert.equal(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns false boolean when passed false string inside of Either', assert => {
  const result = toBool(Either.of('false'));
  const expected = false;
  result
    .map(actual => assert.equal(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns expected mixed values of booleans when passed array of boolean strings inside of an Either', assert => {
  const result = toBool(Either.of(['false', 'true', 'false']));
  const expected = [false, true, false];
  result
    .map(actual => assert.deepEqual(actual, expected))
    .leftMap(() => assert.fail('Should not have passed'));
  assert.end();
});

test('toBool returns error when passed anything that is not true or false string inside of Either', assert => {
  const result = toBool(Either.of(1));
  const expected = true;
  result
    .map(() => assert.fail('Should not have passed.'))
    .leftMap(actual => assert.equal(actual.hasOwnProperty('error'), expected));
  assert.end();
});
