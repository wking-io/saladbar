import { curry } from 'ramda';
import Result from 'folktale/result';
import { isStyle } from 'saladbar-core';

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
const _isStyle = (prop, val, dom) =>
  Result.fromNullable(isStyle(prop, val, dom), {
    error: `There is not a style property with the following name on this element: ${prop}`,
  });

export default curry(_isStyle);
