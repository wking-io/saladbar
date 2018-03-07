import Result from 'folktale/result';
import { curry } from 'ramda';
import { getClass } from 'saladbar-core';

// _getClass :: Int -> DOM Element -> Future Error String
const _getClass = (idx, dom) =>
  Result.fromNullable(getClass(idx, dom), {
    error: `No class was found with the following index: ${idx}`,
  });

export default curry(_getClass);
