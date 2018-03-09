import { curry } from 'ramda';
import Either from 'data.either';
import { on } from 'saladbar-core';

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
const _on = (event, handler, dom) =>
  Either.fromNullable(on(event, handler, dom)).leftMap(() => ({
    error: 'Error running on function.',
  }));

export default curry(_on);
