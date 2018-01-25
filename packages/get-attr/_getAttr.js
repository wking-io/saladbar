import { curry } from 'ramda';
import { of, reject } from 'fluture';

// _getAttr :: String -> DOM Element -> Future Error String
function _getAttr(attr, el) {
  if (el.hasAttribute(attr)) {
    return of(el.getAttribute(attr));
  }

  return reject(new ReferenceError(`Sorry, ${attr} was not found.`));
}

export default curry(_getAttr);
