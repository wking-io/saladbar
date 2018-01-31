import { curry } from 'ramda';
import { of } from 'fluture';
import isArray from '../utils/is-array';

/*
 * @sig String -> String -> DOM Element -> Future DOM Element
 * @sig String -> [String] -> DOM Element -> Future DOM Element
 */
const _classList = curry((method, classname, el) => {
  isArray(classname)
    ? el.classList[method](...classname)
    : el.classList[method](classname);

  return of(el);
});

export default _classList;
