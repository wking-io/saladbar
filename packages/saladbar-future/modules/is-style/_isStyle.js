import { curry } from 'ramda';
import Task from 'data.task';
import { isStyle } from 'saladbar-core';

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
const _isStyle = (prop, val, dom) => {
  const result = isStyle(prop, val, dom);

  return result !== null
    ? of(result)
    : reject({
        error: `There is not a style property with the following name on this element: ${prop}`,
      });
};

export default curry(_isStyle);
