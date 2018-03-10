import Either from 'data.either';
import { all } from 'ramda';
import isArray from '../is-array';
import isElmNode from '../is-elm-node';
import isEither from '../is-either';
import dom from '../../dom';

const guaranteeEither = el => {
  if (isEither(el)) {
    return el;
  } else if (isElmNode(el) || (isArray(el) && all(isElmNode, el))) {
    if (el.toString() === '[object NodeList]') {
      return Either.of(Array.from(el));
    } else {
      return Either.of(el);
    }
  } else if (typeof el === 'string') {
    return dom(el);
  }
  return Either.Left({
    error: `Argument ${el} is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string`,
  });
};

export default guaranteeEither;
