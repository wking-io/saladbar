import { curry } from 'ramda';

// _hasClass :: String -> DOM Element -> Bool
function _hasClass(classname, el) {
  return el.classList.contains(classname);
}

export default curry(_hasClass);
