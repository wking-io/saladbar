import { curry } from 'ramda';
import Task from 'data.task';
import isTask from '../is-task';

const branchAgain = (fn, errFn, prop, val, dom) => {
  const fromNullable = (res, err) =>
    res !== null ? Task.of(res) : Task.rejected(err);

  return isTask(val)
    ? val.chain(v => fromNullable(fn(prop, v, dom), errFn(prop)))
    : fromNullable(fn(prop, val, dom), errFn(prop));
};
export default curry(branchAgain);
