import { ifElse, traverse } from 'ramda';
import Either from 'data.either';
import isArray from '../is-array';

const _branch = fn => ifElse(isArray, traverse(Either.of, fn), fn);

export default _branch;
