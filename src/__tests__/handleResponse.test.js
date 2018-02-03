import Future from 'fluture';
import test from 'tape';
import handleResponse from '../json-requests/_handleResponse';

test('handleResponse returns JSON when response is successful', assert => {
  const fakeResponse = {
    readyState: 4,
    response: { data: true },
    status: 200,
  };
  const actual = Future((reject, resolve) =>
    handleResponse(fakeResponse, reject, resolve)()
  );
  const expected = true;
  actual.fork(
    () => assert.fail('handleResponse returned an error'),
    response => assert.equal(response.data, expected)
  );
  assert.end();
});

test('handleResponse returns error when response is unsuccessful', assert => {
  const fakeResponse = {
    readyState: 4,
    status: 400,
  };
  const actual = Future((reject, resolve) =>
    handleResponse(fakeResponse, reject, resolve)()
  );
  const expected = true;
  actual.fork(
    err => assert.equal(err.hasOwnProperty('error'), expected),
    () => assert.fail('handleResponse did not return an error.')
  );
  assert.end();
});
