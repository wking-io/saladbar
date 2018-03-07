import { curry } from 'ramda';
import Result from 'folktale/result';
import { on } from 'saladbar-core';

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
const _on = (event, handler, dom) =>
  Result.fromNullable(on(event, handler, dom), {
    error: 'Error running on function.',
  });

export default curry(_on);
