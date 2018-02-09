import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future Error String
 */
const _removeAttr = (attr, el) => {
  el.removeAttribute(attr);
  return of(el);
};

export default curry(_removeAttr);
