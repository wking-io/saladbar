import { curry } from 'ramda';
import Either from 'data.either';
import { hasProp } from 'saladbar-core';

// _hasProp :: String -> DOM Element -> Future Error Bool
const _hasProp = (prop, dom) =>
  Either.fromNullable(hasProp(prop, dom)).leftMap(() => ({
    error: 'Error running hasProp function.',
  }));

export default curry(_hasProp);
