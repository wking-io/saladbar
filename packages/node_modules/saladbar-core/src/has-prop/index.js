import { curry } from 'ramda';
/* 
 * @sig String -> DOM Element -> Bool
 */
const hasProp = (prop, dom) => prop in dom;

export default curry(hasProp);
