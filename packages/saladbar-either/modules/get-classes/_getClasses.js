import Result from 'folktale/result';
import { getClasses } from 'saladbar-core';

// _getClasses :: DOM Element -> Future Error String
const _getClasses = dom =>
  Result.fromNullable(getClasses(dom), {
    error: `No classes were found on this element.`,
  });

export default _getClasses;
