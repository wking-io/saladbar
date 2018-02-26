import { curry } from 'ramda';
import { of, reject } from 'fluture';
import { isData } from 'saladbar-core';

// _isData :: String -> String -> DOM Element -> Future Error Bool
const _isData = (prop, val, dom) => {
  const result = isData(prop, val, dom);

  return result !== null
    ? of(result)
    : reject({
        error: `There is not a data-attribute with the following name on this element: ${prop}`,
      });
};

export default curry(_isData);
