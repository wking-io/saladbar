import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setProp = (attr, val, el) => {
  el[attr] = val;
  return of(el);
};

export default curry(_setProp);
