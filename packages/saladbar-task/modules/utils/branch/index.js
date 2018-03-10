import { chain, compose, curry } from 'ramda';
import guaranteeDomEl from '../guaranteeDomEl';
import guaranteeTask from '../guaranteeTask';
import _branch from './_branch';

const branch = (fn, el) =>
  compose(chain(_branch(fn)), chain(guaranteeDomEl), guaranteeTask)(el);

export default curry(branch);
