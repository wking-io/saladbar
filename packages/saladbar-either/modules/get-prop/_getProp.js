import Result from 'folktale/result';
import { curry } from 'ramda';
import { getProp } from 'saladbar-core';

// _getProp :: String -> DOM Element -> Future Error String
const _getProp = (prop, dom) =>
  Result.fromNullable(getProp(prop, dom), {
    error: `No property was found with the following name: ${prop}`,
  });

export default curry(_getProp);
