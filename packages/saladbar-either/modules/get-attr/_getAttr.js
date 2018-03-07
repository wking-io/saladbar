import Result from 'folktale/result';
import { curry } from 'ramda';
import { getAttr } from 'saladbar-core';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = (attr, dom) =>
  Result.fromNullable(getAttr(attr, dom), {
    error: `No attribute was found with the following name: ${attr}`,
  });

export default curry(_getAttr);
