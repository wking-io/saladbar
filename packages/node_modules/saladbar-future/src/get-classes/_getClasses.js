import { of, reject } from 'fluture';
import { getClasses } from 'saladbar-core';

// _getClasses :: DOM Element -> Future Error String
const _getClasses = dom => {
  const result = getClasses(dom);

  return result
    ? of(result)
    : reject({
        error: `No classes were found on this element.`,
      });
};

export default _getClasses;
