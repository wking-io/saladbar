import { curry } from 'ramda';
import Result from 'folktale/result';
import { setProp } from 'saladbar-core';

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
const _setProp = (prop, val, dom) =>
  Result.fromNullable(setProp(prop, val, dom), {
    error: 'Error running setProp function.',
  });

export default curry(_setProp);
