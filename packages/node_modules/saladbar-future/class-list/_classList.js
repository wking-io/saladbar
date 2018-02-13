import { curry } from 'ramda';
import { of } from 'fluture';
import { classList } from 'saladbar-core';

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
const _classList = (method, cn, dom) => of(classList(method, cn, dom));

export default curry(_classList);
