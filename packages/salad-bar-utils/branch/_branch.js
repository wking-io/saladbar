import { ifElse, traverse } from 'ramda';
import { of } from 'fluture';
import isArray from '../is-array';

export default function _branch(fn) {
  return ifElse(isArray, traverse(of, fn), fn);
}
