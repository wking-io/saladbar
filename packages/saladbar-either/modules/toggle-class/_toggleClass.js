import { curry } from 'ramda';
import Either from 'data.either';
import { toggleClass } from 'saladbar-core';

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
const _toggleClass = (cn, dom) =>
  Either.fromNullable(toggleClass(cn, dom)).leftMap(() => ({
    error: 'Error running toggleClass.',
  }));

export default curry(_toggleClass);
