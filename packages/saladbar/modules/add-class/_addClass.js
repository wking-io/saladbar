import { curry } from 'ramda';
import Either from 'data.either';
import { addClass } from 'saladbar-core';

// _addClass :: String -> DOM Element -> Future Error DOM Element
const _addClass = (cn, dom) =>
  Either.fromNullable(addClass(cn, dom)).leftMap(() => ({
    error: 'Error while running addClass function.',
  }));

export default curry(_addClass);
