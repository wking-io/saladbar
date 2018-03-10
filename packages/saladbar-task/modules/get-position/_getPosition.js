import Task from 'data.task';
import { curry } from 'ramda';
import { getPosition } from 'saladbar-core';

// _getPosition :: String -> DOM Element -> Future Error String
const _getPosition = (prop, dom) => {
  const result = getPosition(prop, dom);

  return result
    ? Task.of(result)
    : Task.rejected({
        error: `No attribute was found with the following name: ${prop}`,
      });
};

export default curry(_getPosition);
