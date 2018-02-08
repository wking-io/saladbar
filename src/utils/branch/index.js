import { chain, compose, curry } from 'ramda';
import guaranteeDomEl from '../guaranteeDomEl';
import guaranteeFuture from '../guaranteeFuture';
import _branch from './_branch';

const branch = curry((fn, el) =>
  compose(chain(_branch(fn)), chain(guaranteeDomEl), guaranteeFuture)(el)
);

export default branch;
