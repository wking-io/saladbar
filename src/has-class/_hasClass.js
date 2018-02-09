import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future e Bool
 */
const _hasClass = (classname, el) => of(el.classList.contains(classname));

export default curry(_hasClass);
