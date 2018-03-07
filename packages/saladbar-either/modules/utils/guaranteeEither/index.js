import Result from 'folktale/result';
import { all } from 'ramda';
import isArray from '../is-array';
import isElmNode from '../is-elm-node';
import dom from '../../dom';

const guaranteeEither = el => {
  if (Result.hasInstance(el)) {
    return el;
  } else if (isElmNode(el) || (isArray(el) && all(isElmNode, el))) {
    return Result.of(el);
  } else if (typeof el === 'string') {
    return dom(el);
  }
  return Result.Error({
    error: `Argument ${el} is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string`,
  });
};

export default guaranteeEither;
