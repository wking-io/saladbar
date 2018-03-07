import { curry } from 'ramda';
import Result from 'folktale/result';
import { isData } from 'saladbar-core';

// _isData :: String -> String -> DOM Element -> Future Error Bool
const _isData = (prop, val, dom) =>
  Result.fromNullable(isData(prop, val, dom), {
    error: `There is not a data-attribute with the following name on this element: ${prop}`,
  });

export default curry(_isData);
