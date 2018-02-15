import { curry } from 'ramda';
import { of } from 'fluture';
import { hasStyle } from 'saladbar-core';

// _hasStyle :: String -> DOM Element -> Future Error Bool
const _hasStyle = (prop, dom) => of(hasStyle(prop, dom));

export default curry(_hasStyle);
