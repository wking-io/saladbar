import Result from 'folktale/result';
import { curry } from 'ramda';
import { setData } from 'saladbar-core';

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
const _setData = (prop, val, dom) =>
  Result.fromNullable(setData(prop, val, dom), {
    error: `The following data attribute you passed in is not valid: ${prop}`,
  });

export default curry(_setData);
