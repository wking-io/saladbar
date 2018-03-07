import { curry } from 'ramda';
import Result from 'folktale/result';
import { hasClass } from 'saladbar-core';

// _hasClass :: String -> DOM Element -> Future Error DOM Element
const _hasClass = (cn, dom) =>
  Result.fromNullable(hasClass(cn, dom), {
    error: 'Error running hasClass function.',
  });

export default curry(_hasClass);
