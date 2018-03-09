import Either from 'data.either';
import { curry } from 'ramda';
import { getClass } from 'saladbar-core';

// _getClass :: Int -> DOM Element -> Future Error String
const _getClass = (idx, dom) =>
  Either.fromNullable(getClass(idx, dom)).leftMap(() => ({
    error: `No class was found with the following index: ${idx}`,
  }));

export default curry(_getClass);
