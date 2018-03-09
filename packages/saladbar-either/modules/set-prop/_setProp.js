import { curry } from 'ramda';
import Either from 'data.either';
import { setProp } from 'saladbar-core';

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
const _setProp = (prop, val, dom) =>
  Either.fromNullable(setProp(prop, val, dom)).leftMap(() => ({
    error: 'Error running setProp function.',
  }));

export default curry(_setProp);
