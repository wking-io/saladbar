import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setAttr = curry((attr, val, el) => {
  el.setAttribute(attr, val);
  return of(el);
});

export default _setAttr;
