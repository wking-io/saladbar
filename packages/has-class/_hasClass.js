import { curry } from 'ramda';
import { of } from 'fluture';

// _hasClass :: String -> DOM Element -> Future Bool
function _hasClass(classname, el) {
  return of(el.classList.contains(classname));
}

export default curry(_hasClass);
