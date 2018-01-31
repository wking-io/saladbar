import _hasClass from './_hasClass';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasClass = curry((className, el) => branch(_hasClass(className))(el));

export default hasClass;
