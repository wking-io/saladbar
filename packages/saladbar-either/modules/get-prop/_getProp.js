import Either from 'data.either';
import { curry } from 'ramda';
import { getProp } from 'saladbar-core';

// _getProp :: String -> DOM Element -> Future Error String
const _getProp = (prop, dom) =>
  Either.fromNullable(getProp(prop, dom)).leftMap(() => ({
    error: `No property was found with the following name: ${prop}`,
  }));

export default curry(_getProp);
