import { curry } from 'ramda';
import _hasClass from './_hasClass';
import branch from 'saladbar.utils/branch';

// _hasClass :: String -> DOM Element -> Bool
function hasClass(className, el) {
  return branch(_hasClass(className))(el);
}

export default curry(hasClass);
