import { of, reject } from 'fluture';
import { curry } from 'ramda';

/**
 * This regex checks the string passed in has the following qualities:
 * 1. Has no spaces.
 * 2. Starts and ends with a letter or number (case-insensitive)
 * 3. If longer than three characters the characters in between are only
 *    letters, numbers, an underscore, a semicolon, or a period.
 */
const validDataRegex = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/;
const onlyOne = 1;
const isValidDataProp = prop => {
  const isMatch = prop.match(validDataRegex);
  return isMatch && isMatch.length === onlyOne;
};
const _setData = curry((prop, val, el) => {
  if (isValidDataProp(prop)) {
    el.dataset[prop] = val;
    return of(el);
  }

  return reject({
    error: `Data property ${prop} is not a valid property name`,
  });
});

export default _setData;
