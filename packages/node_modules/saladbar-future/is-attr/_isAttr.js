import { curry } from 'ramda';
import { of, reject } from 'fluture';
import { isAttr } from 'saladbar-core';

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
const _isAttr = (prop, val, dom) => {
  const result = isAttr(prop, val, dom);

  return result
    ? of(result)
    : reject({
        error: `There is not an attribute with the following name on this element: ${prop}`,
      });
};

export default curry(_isAttr);
