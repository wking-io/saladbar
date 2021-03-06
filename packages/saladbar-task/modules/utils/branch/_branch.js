import { ifElse, traverse } from 'ramda';
import Task from 'data.task';
import isArray from '../is-array';

const _branch = fn => ifElse(isArray, traverse(Task.of, fn), fn);

export default _branch;
