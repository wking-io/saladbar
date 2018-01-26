import { curry } from 'ramda';
import isArray from 'saladbar.utils/is-array';
import { of } from 'fluture';

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
