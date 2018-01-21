import { curry } from 'ramda';
import _classList from '_classList';

function classList(method, className, el) {
  return branch(_classList(method, className))(el);
}

export default curry(classList);
