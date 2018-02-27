import { curry } from 'ramda';
import { of } from 'fluture';
import { hasData } from 'saladbar-core';

// _hasData :: String -> DOM Element -> Future Error Bool
const _hasData = (prop, dom) => of(hasData(prop, dom));

export default curry(_hasData);