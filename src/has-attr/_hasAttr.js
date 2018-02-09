import { curry } from 'ramda';
import { of } from 'fluture';

// _hasAttr :: String -> DOM Element -> Future e Bool
const _hasAttr = (attr, el) => of(el.hasAttribute(attr));

export default curry(_hasAttr);
