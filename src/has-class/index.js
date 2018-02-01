import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasClass from './_hasClass';

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasClass = curry((className, el) => branch(_hasClass(className))(el));

export default hasClass;