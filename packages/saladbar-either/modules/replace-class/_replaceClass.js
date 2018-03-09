import { curry } from 'ramda';
import Either from 'data.either';
import { replaceClass } from 'saladbar-core';

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
const _replaceClass = (ocn, ncn, dom) =>
  Either.fromNullable(replaceClass(ocn, ncn, dom)).leftMap(() => ({
    error: 'Error running replaceClass',
  }));

export default curry(_replaceClass);
