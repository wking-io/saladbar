import { isFuture } from 'fluture';
import { chain, curry } from 'ramda';
import _branch from './_branch';

function branch(fn, el) {
  if (isFuture(el)) {
    return chain(_branch(fn))(el);
  } else {
    let result;
    _branch(fn)(el).fork(err => (result = err), val => (result = val));
    return result;
  }
}

export default curry(branch);
