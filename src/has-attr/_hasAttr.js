import { of, reject } from 'fluture';
import { curry } from 'ramda';
import isElmNode from '../utils/is-elm-node';

// _hasAttr :: String -> DOM Element -> Future e Bool
const _hasAttr = curry(
  (attr, el) =>
    isElmNode(el)
      ? of(el.hasAttribute(attr))
      : reject({
          error: `${el} is not a DOM Element so it does not have a hasAttribute method.`,
        })
);

export default _hasAttr;
