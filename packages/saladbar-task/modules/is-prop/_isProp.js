import { curry } from 'ramda';
import Task from 'data.task';
import { isProp } from 'saladbar-core';

// _isProp :: String -> String -> DOM Element -> Future Error Bool
const _isProp = (prop, val, dom) => {
  const result = isProp(prop, val, dom);

  return result !== null
    ? Task.of(result)
    : Task.rejected({
        error: `There is not a property with the following name on this element: ${prop}`,
      });
};

export default curry(_isProp);
