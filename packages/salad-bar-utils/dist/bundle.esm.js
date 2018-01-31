import { ifElse, traverse, chain, curry } from 'ramda';
import { of, isFuture } from 'fluture';

const isArray = arr => Array.isArray(arr);

const _branch = fn => ifElse(isArray, traverse(of, fn), fn);

const branch = curry((fn, el) => {
  if (isFuture(el)) {
    return chain(_branch(fn))(el);
  }
  let result = el;
  _branch(fn)(el).fork(err => (result = err), val => (result = val));
  return result;
});

const elNodeType = 1;
const isElmNode = el => el && el.nodeType === elNodeType;

var index = {
  branch,
  isArray,
  isElmNode,
};

export default index;
