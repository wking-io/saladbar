import { curry } from 'ramda';
import Either from 'data.either';
import { classList } from 'saladbar-core';

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
const _classList = (method, cn, dom) =>
  Either.fromNullable(classList(method, cn, dom)).leftMap(() => ({
    error: 'Error running classList function.',
  }));

export default curry(_classList);
