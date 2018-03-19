import test from 'tape';
import toBool from '../to-bool';

test('toBool returns true boolean when passed true string', assert => {
  const actual = toBool('true');
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('toBool returns false boolean when passed false string', assert => {
  const actual = toBool('false');
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('toBool returns null when passed anything that is not true or false string', assert => {
  const actual = toBool(1);
  const expected = null;
  assert.equal(actual, expected);
  assert.end();
});
