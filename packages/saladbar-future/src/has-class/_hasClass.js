import { curry } from 'ramda';
import { of } from 'fluture';
import { hasClass } from 'saladbar-core';

// _hasClass :: String -> DOM Element -> Future Error DOM Element
const _hasClass = (cn, dom) => of(hasClass(cn, dom));

export default curry(_hasClass);
