import Task from 'data.task';
import { curry } from 'ramda';
import { getClass } from 'saladbar-core';

// _getClass :: Int -> DOM Element -> Future Error String
const _getClass = (idx, dom) => {
  const result = getClass(idx, dom);

  return result
    ? of(result)
    : reject({
        error: `No class was found with the following index: ${idx}`,
      });
};

export default curry(_getClass);
