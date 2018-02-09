import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasProp from './_hasProp';

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasProp = (prop, el) => branch(_hasProp(prop))(el);

export default curry(hasProp);
