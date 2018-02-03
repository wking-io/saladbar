/* eslint no-magic-numbers: 0 */

const isSuccess = code =>
  [200, 201, 202, 203, 204, 205, 206].some(c => c === code);

const requestComplete = 4;

const handleResponse = (xhr, reject, resolve) => () => {
  try {
    if (xhr.readyState === requestComplete) {
      if (isSuccess(xhr.status)) {
        resolve(xhr.response);
      } else {
        reject({
          error: `Your httpRequest failed with an error code of ${xhr.status}`,
        });
      }
    }
  } catch (e) {
    reject({ error: `Caught Exception: ${e.description}` });
  }
};

export default handleResponse;
