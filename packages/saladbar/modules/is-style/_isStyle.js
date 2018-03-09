import { curry } from 'ramda';
import Either from 'data.either';
import { isStyle } from 'saladbar-core';

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
const _isStyle = (prop, val, dom) =>
  Either.fromNullable(isStyle(prop, val, dom)).leftMap(() => ({
    error: `There is not a style property with the following name on this element: ${prop}`,
  }));

export default curry(_isStyle);
