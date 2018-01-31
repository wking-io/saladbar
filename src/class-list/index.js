import { curry } from 'ramda';
import branch from '../utils/branch';
import _classList from './_classList';

const classList = curry((method, classname, el) =>
  branch(_classList(method, classname))(el)
);

export default classList;
