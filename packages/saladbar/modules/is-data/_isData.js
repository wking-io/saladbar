import { curry } from 'ramda';
import Either from 'data.either';
import { isData } from 'saladbar-core';

// _isData :: String -> String -> DOM Element -> Future Error Bool
const _isData = (prop, val, dom) =>
  Either.fromNullable(isData(prop, val, dom)).leftMap(() => ({
    error: `There is not a data-attribute with the following name on this element: ${prop}`,
  }));

export default curry(_isData);
