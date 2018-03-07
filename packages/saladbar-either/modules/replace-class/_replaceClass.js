import { curry } from 'ramda';
import Result from 'folktale/result';
import { replaceClass } from 'saladbar-core';

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
const _replaceClass = (ocn, ncn, dom) =>
  Result.fromNullable(replaceClass(ocn, ncn, dom), {
    error: 'Error running replaceClass',
  });

export default curry(_replaceClass);
