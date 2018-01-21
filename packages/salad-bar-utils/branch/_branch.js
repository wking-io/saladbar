import { ifElse, map } from 'ramda';

export default function _branch(cond, fn) {
  return ifElse(cond, map(fn), fn);
}
