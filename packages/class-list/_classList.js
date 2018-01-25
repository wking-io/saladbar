import { curry } from 'ramda';
import { of } from 'fluture';

/*
 * @sig String -> String -> DOM Element -> Future DOM Element
 * @sig String -> [String] -> DOM Element -> Future DOM Element
 */
const _classList = curry((method, classname, el) => {
  el.classList[method](classname);
  return of(el);
});

export default _classList;
