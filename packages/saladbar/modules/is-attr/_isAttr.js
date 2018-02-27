import { curry } from 'ramda';
import { of, reject } from 'fluture';
import { isAttr } from 'saladbar-core';

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
const _isAttr = (attr, val, dom) => {
  const result = isAttr(attr, val, dom);

  return result !== null
    ? of(result)
    : reject({
        error: `There is not an attribute with the following name on this element: ${attr}`,
      });
};

export default curry(_isAttr);
