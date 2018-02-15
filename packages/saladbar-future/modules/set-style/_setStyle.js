import { curry } from 'ramda';
import { of } from 'fluture';
import { setStyle } from 'saladbar-core';

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = (prop, val, dom) => of(setStyle(prop, val, dom));

export default curry(_setStyle);
