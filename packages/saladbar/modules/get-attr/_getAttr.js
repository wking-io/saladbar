import Either from 'data.either';
import { curry } from 'ramda';
import { getAttr } from 'saladbar-core';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = (attr, dom) =>
  Either.fromNullable(getAttr(attr, dom)).leftMap(() => ({
    error: `No attribute was found with the following name: ${attr}`,
  }));

export default curry(_getAttr);
