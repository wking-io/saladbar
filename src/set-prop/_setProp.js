import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setProp = curry((attr, val, el) => {
  el[attr] = val;
  return of(el);
});

export default _setProp;
