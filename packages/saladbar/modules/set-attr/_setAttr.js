import { curry } from 'ramda';
import { of } from 'fluture';
import { setAttr } from 'saladbar-core';

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = (attr, val, dom) => of(setAttr(attr, val, dom));

export default curry(_setAttr);
