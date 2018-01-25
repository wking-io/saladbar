import { ifElse, traverse } from 'ramda';
import isArray from '../is-array';
import { of } from 'fluture';

const _branch = fn => ifElse(isArray, traverse(of, fn), fn);

export default _branch;
