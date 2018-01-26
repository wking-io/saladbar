import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future Error String
 */
const _removeAttr = curry((attr, el) => {
  el.removeAttribute(attr);
  return of(el);
});

export default _removeAttr;
