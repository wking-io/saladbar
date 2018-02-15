import { of, reject } from 'fluture';
import { curry } from 'ramda';
import { getData } from 'saladbar-core';

// _getData :: String -> DOM Element -> Future Error String
const _getData = (prop, dom) => {
  const result = getData(prop, dom);

  return result
    ? of(result)
    : reject({
        error: `No attribute was found with the following name: ${prop}`,
      });
};

export default curry(_getData);
