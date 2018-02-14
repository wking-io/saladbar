import { curry } from 'ramda';
import { of } from 'fluture';
import { hasAttr } from 'saladbar-core';

// _hasAttr :: String -> DOM Element -> Future Error Bool
const _hasAttr = (attr, dom) => of(hasAttr(attr, dom));

export default curry(_hasAttr);
