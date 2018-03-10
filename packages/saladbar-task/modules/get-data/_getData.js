import Task from 'data.task';
import { curry } from 'ramda';
import { getData } from 'saladbar-core';

// _getData :: String -> DOM Element -> Future Error String
const _getData = (prop, dom) => {
  const result = getData(prop, dom);

  return result
    ? Task.of(result)
    : Task.rejected({
        error: `No attribute was found with the following name: ${prop}`,
      });
};

export default curry(_getData);
