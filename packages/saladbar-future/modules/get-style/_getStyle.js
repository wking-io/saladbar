import { of, reject } from 'fluture';
import { curry } from 'ramda';
import { getStyle } from 'saladbar-core';

// _getStyle :: String -> DOM Element -> Future Error String
const _getStyle = (prop, dom) => {
  const result = getStyle(prop, dom);

  return result
    ? of(result)
    : reject({
        error: `No style property was found with the following name: ${prop}`,
      });
};

export default curry(_getStyle);
