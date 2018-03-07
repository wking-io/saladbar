import { chain, compose, curry } from 'ramda';
import guaranteeDomEl from '../guaranteeDomEl';
import guaranteeEither from '../guaranteeEither';
import _branch from './_branch';

const branch = (fn, el) =>
  compose(chain(_branch(fn)), chain(guaranteeDomEl), guaranteeEither)(el);

export default curry(branch);
