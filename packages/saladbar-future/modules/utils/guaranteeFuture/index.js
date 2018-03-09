import Task from 'data.task';
import { all } from 'ramda';
import isArray from '../is-array';
import isElmNode from '../is-elm-node';
import dom from '../../dom';

const guaranteeFuture = el => {
  if (isFuture(el)) {
    return el;
  } else if (isElmNode(el) || (isArray(el) && all(isElmNode, el))) {
    return Task.of(el);
  } else if (typeof el === 'string') {
    return dom(el);
  }
  return Task.rejected({
    error: `Argument ${el} is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string`,
  });
};

export default guaranteeFuture;
