import { curry } from 'ramda';
import Result from 'folktale/result';
import { removeClass } from 'saladbar-core';

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
const _removeClass = (cn, dom) =>
  Result.fromNullable(removeClass(cn, dom), {
    error: 'Error running removeClass function.',
  });

export default curry(_removeClass);
