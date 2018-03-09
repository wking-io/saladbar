import { curry } from 'ramda';
import Either from 'data.either';
import { isProp } from 'saladbar-core';

// _isProp :: String -> String -> DOM Element -> Future Error Bool
const _isProp = (prop, val, dom) =>
  Either.fromNullable(isProp(prop, val, dom)).leftMap(() => ({
    error: `There is not a property with the following name on this element: ${prop}`,
  }));

export default curry(_isProp);
