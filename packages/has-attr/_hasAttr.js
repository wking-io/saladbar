import { curry } from 'ramda';
import { of } from 'fluture';

// _hasClass :: String -> DOM Element -> Future Bool
const _hasAttr = curry((attr, el) => of(el.hasAttribute(attr)));

export default _hasAttr;
