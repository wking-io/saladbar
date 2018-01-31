import _hasProp from './_hasProp';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasProp = curry((prop, el) => branch(_hasProp(prop))(el));

export default hasProp;
