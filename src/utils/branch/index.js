import { chain, curry } from 'ramda';
import { isFuture, of } from 'fluture';
import _branch from './_branch';

const branch = curry((fn, el) => {
  if (isFuture(el)) {
    return chain(_branch(fn))(el);
  }
  return chain(_branch(fn))(of(el));
});

export default branch;
