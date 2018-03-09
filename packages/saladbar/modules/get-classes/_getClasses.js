import Either from 'data.either';
import { getClasses } from 'saladbar-core';

// _getClasses :: DOM Element -> Future Error String
const _getClasses = dom =>
  Either.fromNullable(getClasses(dom)).leftMap(() => ({
    error: `No classes were found on this element.`,
  }));

export default _getClasses;
