import { of, reject } from 'fluture';
import { curry } from 'ramda';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = (attr, el) => {
  if (el.hasAttribute(attr)) {
    return of(el.getAttribute(attr));
  }

  return reject({ error: `Sorry, attribute ${attr} was not found.` });
};

export default curry(_getAttr);
