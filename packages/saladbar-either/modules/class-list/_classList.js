import { curry } from 'ramda';
import Result from 'folktale/result';
import { classList } from 'saladbar-core';

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
const _classList = (method, cn, dom) =>
  Result.fromNullable(classList(method, cn, dom), {
    error: 'Error running classList function.',
  });

export default curry(_classList);
