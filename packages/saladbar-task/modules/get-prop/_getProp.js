import Task from 'data.task';
import { curry } from 'ramda';
import { getProp } from 'saladbar-core';

// _getProp :: String -> DOM Element -> Future Error String
const _getProp = (prop, dom) => {
  const result = getProp(prop, dom);

  return result
    ? Task.of(result)
    : Task.rejected({
        error: `No property was found with the following name: ${prop}`,
      });
};

export default curry(_getProp);
