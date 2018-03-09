import Task from 'data.task';
import { curry } from 'ramda';
import { getAttr } from 'saladbar-core';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = (attr, dom) => {
  const result = getAttr(attr, dom);

  return result
    ? of(result)
    : reject({
        error: `No attribute was found with the following name: ${attr}`,
      });
};

export default curry(_getAttr);
