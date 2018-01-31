import { curry } from 'ramda';
import { of } from 'fluture';

/* 
 * @sig String -> DOM Element -> Future Bool
 */
const _hasProp = curry((prop, el) => of(prop in el));

export default _hasProp;
