import { of, isFuture, reject } from 'fluture';
import { all } from 'ramda';
import { isArray, isElmNode } from 'saladbar-utils';
import dom from '../../dom';

const guaranteeFuture = el => {
  if (isFuture(el)) {
    return el;
  } else if (isElmNode(el) || (isArray(el) && all(isElmNode, el))) {
    return of(el);
  } else if (typeof el === 'string') {
    return dom(el);
  }
  return reject({
    error: `Argument ${el} is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string`,
  });
};

export default guaranteeFuture;
