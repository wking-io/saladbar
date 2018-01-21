import { curry } from 'ramda';

// _classlist :: String -> String -> DOM Element -> DOM Element
//            :: String -> [String] -> DOM Element -> DOM Element
function _classList(method, classname, el) {
  el.classList[method](classname);
}

export default curry(_classList);
