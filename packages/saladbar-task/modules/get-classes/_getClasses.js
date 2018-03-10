import Task from 'data.task';
import { getClasses } from 'saladbar-core';

// _getClasses :: DOM Element -> Future Error String
const _getClasses = dom => {
  const result = getClasses(dom);

  return result
    ? Task.of(result)
    : Task.rejected({
        error: `No classes were found on this element.`,
      });
};

export default _getClasses;
