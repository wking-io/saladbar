import { of, reject } from 'fluture';
import { curry } from 'ramda';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = curry((attr, el) => {
  if (el.hasAttribute(attr)) {
    return of(el.getAttribute(attr));
  }

  return reject({ error: `Sorry, ${attr} was not found.` });
});

export default _getAttr;
