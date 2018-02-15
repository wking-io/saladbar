import { curry } from 'ramda';
import { of } from 'fluture';
import { removeAttr } from 'saladbar-core';

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
const _removeAttr = (attr, dom) => of(removeAttr(attr, dom));

export default curry(_removeAttr);
