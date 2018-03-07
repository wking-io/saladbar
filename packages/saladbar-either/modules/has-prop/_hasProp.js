import { curry } from 'ramda';
import Result from 'folktale/result';
import { hasProp } from 'saladbar-core';

// _hasProp :: String -> DOM Element -> Future Error Bool
const _hasProp = (prop, dom) =>
  Result.fromNullable(hasProp(prop, dom), {
    error: 'Error running hasProp function.',
  });

export default curry(_hasProp);
