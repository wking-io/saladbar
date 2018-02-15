import { of, reject } from 'fluture';
import { curry } from 'ramda';
import { setData } from 'saladbar-core';

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
const _setData = (prop, val, dom) => {
  const result = setData(prop, val, dom);

  return result
    ? of(result)
    : reject({
        error: `The following data attribute you passed in is not valid: ${prop}`,
      });
};

export default curry(_setData);
