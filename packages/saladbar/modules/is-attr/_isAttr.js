import { curry } from 'ramda';
import Either from 'data.either';
import { isAttr } from 'saladbar-core';

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
const _isAttr = (attr, val, dom) =>
  Either.fromNullable(isAttr(attr, val, dom)).leftMap(() => ({
    error: `There is not an attribute with the following name on this element: ${attr}`,
  }));

export default curry(_isAttr);
