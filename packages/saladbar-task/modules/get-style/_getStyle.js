import Task from 'data.task';
import { curry } from 'ramda';
import { getStyle } from 'saladbar-core';

// _getStyle :: String -> DOM Element -> Future Error String
const _getStyle = (prop, dom) => {
  const result = getStyle(prop, dom);

  return result
    ? Task.of(result)
    : Task.rejected({
        error: `No style property was found with the following name: ${prop}`,
      });
};

export default curry(_getStyle);
