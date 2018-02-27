import { curry } from 'ramda';
import { of, reject } from 'fluture';
import { isProp } from 'saladbar-core';

// _isProp :: String -> String -> DOM Element -> Future Error Bool
const _isProp = (prop, val, dom) => {
  const result = isProp(prop, val, dom);

  return result !== null
    ? of(result)
    : reject({
        error: `There is not a property with the following name on this element: ${prop}`,
      });
};

export default curry(_isProp);
