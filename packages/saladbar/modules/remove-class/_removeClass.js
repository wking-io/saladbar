import { curry } from 'ramda';
import Either from 'data.either';
import { removeClass } from 'saladbar-core';

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
const _removeClass = (cn, dom) =>
  Either.fromNullable(removeClass(cn, dom)).leftMap(() => ({
    error: 'Error running removeClass function.',
  }));

export default curry(_removeClass);
