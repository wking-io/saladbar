import { curry, has } from 'ramda';
import { of, reject } from 'fluture';
import isElmNode from '../utils/is-elm-node';

const _hasData = curry(
  (prop, el) =>
    isElmNode(el)
      ? of(has(prop, el.dataset))
      : reject({
          error: `${el} is not a DOM Element so it does not have a dataset property.`,
        })
);

export default _hasData;
