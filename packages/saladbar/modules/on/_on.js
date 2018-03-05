import { curry } from 'ramda';
import { of } from 'fluture';
import { on } from 'saladbar-core';

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
const _on = (event, handler, dom) => of(on(event, handler, dom));

export default curry(_on);
