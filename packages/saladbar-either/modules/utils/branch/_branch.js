import { ifElse, traverse } from 'ramda';
import Result from 'folktale/result';
import isArray from '../is-array';

const _branch = fn => ifElse(isArray, traverse(Result.of, fn), fn);

export default _branch;
