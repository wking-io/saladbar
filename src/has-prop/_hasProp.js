import { curry } from 'ramda';
import { of } from 'fluture';

/* 
 * @sig String -> DOM Element -> Future Bool
 */
const _hasProp = (prop, el) => of(prop in el);

export default curry(_hasProp);
