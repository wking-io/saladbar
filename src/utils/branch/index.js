import { chain, compose, curry } from 'ramda';
import guaranteeFuture from '../guaranteeFuture';
import _branch from './_branch';

const branch = curry((fn, el) =>
  compose(chain(_branch(fn)), guaranteeFuture)(el)
);

export default branch;
