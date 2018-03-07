import { curry } from 'ramda';
import Result from 'folktale/result';
import { isAttr } from 'saladbar-core';

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
const _isAttr = (attr, val, dom) =>
  Result.fromNullable(isAttr(attr, val, dom), {
    error: `There is not an attribute with the following name on this element: ${attr}`,
  });

export default curry(_isAttr);
