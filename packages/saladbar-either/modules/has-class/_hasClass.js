import { curry } from 'ramda';
import Either from 'data.either';
import { hasClass } from 'saladbar-core';

// _hasClass :: String -> DOM Element -> Future Error DOM Element
const _hasClass = (cn, dom) =>
  Either.fromNullable(hasClass(cn, dom)).leftMap(() => ({
    error: 'Error running hasClass function.',
  }));

export default curry(_hasClass);
