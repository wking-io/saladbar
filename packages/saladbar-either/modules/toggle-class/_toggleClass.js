import { curry } from 'ramda';
import Result from 'folktale/result';
import { toggleClass } from 'saladbar-core';

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
const _toggleClass = (cn, dom) =>
  Result.fromNullable(toggleClass(cn, dom), {
    error: 'Error running toggleClass.',
  });

export default curry(_toggleClass);
