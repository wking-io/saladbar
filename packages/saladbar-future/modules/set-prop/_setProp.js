import { curry } from 'ramda';
import { of } from 'fluture';
import { setProp } from 'saladbar-core';

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
const _setProp = (prop, val, dom) => of(setProp(prop, val, dom));

export default curry(_setProp);
