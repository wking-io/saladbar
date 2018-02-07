import { of, reject } from 'fluture';
import { curry } from 'ramda';
import isElmNode from '../utils/is-elm-node';

/*
 * @sig String -> DOM Element -> Future e Bool
 */
const _hasClass = curry(
  (classname, el) =>
    isElmNode(el)
      ? of(el.classList.contains(classname))
      : reject({
          error: `${el} is not a DOM Element so it does not have a classList method.`,
        })
);

export default _hasClass;
