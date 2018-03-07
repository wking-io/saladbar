import { curry } from 'ramda';
import Result from 'folktale/result';
import { addClass } from 'saladbar-core';

// _addClass :: String -> DOM Element -> Future Error DOM Element
const _addClass = (cn, dom) =>
  Result.fromNullable(addClass(cn, dom), {
    error: 'Error while running addClass function.',
  });

export default curry(_addClass);
