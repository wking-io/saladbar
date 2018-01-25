import { curry } from 'ramda';
import { of } from 'fluture';

// _classlist :: String -> String -> DOM Element -> Future DOM Element
//            :: String -> [String] -> DOM Element -> Future DOM Element
function _classList(method, classname, el) {
  el.classList[method](classname);
  return of(el);
}

export default curry(_classList);
