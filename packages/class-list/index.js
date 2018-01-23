import { curry } from 'ramda';
import _classList from './_classList';
import branch from 'saladbar.utils/branch';

import createElement from 'saladbar.utils/element';
import { of } from 'fluture';

function classList(method, className, el) {
  return branch(_classList(method, className))(el);
}

export default curry(classList);
