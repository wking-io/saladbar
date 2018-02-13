import { of, reject } from 'fluture';
import { curry } from 'ramda';
import { getProp } from 'saladbar-core';

// _getProp :: String -> DOM Element -> Future Error String
const _getProp = (prop, dom) => {
  const result = getProp(prop, dom);

  return result
    ? of(result)
    : reject({
        error: `No property was found with the following name: ${prop}`,
      });
};

export default curry(_getProp);
