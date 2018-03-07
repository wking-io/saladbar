import { curry } from 'ramda';
import Result from 'folktale/result';
import { isProp } from 'saladbar-core';

// _isProp :: String -> String -> DOM Element -> Future Error Bool
const _isProp = (prop, val, dom) =>
  Result.fromNullable(isProp(prop, val, dom), {
    error: `There is not a property with the following name on this element: ${prop}`,
  });

export default curry(_isProp);
