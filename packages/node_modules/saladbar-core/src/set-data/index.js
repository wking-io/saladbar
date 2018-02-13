import { curry } from 'ramda';

// This regex checks the string passed in has the following qualities:
// 1. Has no spaces.
// 2. Starts and ends with a letter or number (case-insensitive)
// 3. If longer than three characters the characters in between are only
//    letters, numbers, an underscore, a semicolon, or a period.
const validDataRegex = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/;
// String -> Bool
const isValidDataProp = prop => {
  const isMatch = prop.match(validDataRegex);
  return isMatch && isMatch.length === 1;
};

// _setData :: String -> String -> DOM Element -> DOM Element | Null
const _setData = (prop, val, dom) => {
  if (isValidDataProp(prop)) {
    dom.dataset[prop] = val;
    return dom;
  }

  return null;
};

export default curry(_setData);
