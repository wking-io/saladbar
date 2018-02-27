import { ifElse, traverse } from 'ramda';
import { of } from 'fluture';
import isArray from '../is-array';

const _branch = fn => ifElse(isArray, traverse(of, fn), fn);

export default _branch;
