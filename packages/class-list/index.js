import _classList from './_classList';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

const classList = curry((method, className, el) =>
  branch(_classList(method, className))(el)
);

export default classList;
