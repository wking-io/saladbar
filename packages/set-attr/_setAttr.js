import { of, reject } from 'fluture';
import { curry } from 'ramda';

// _setAttr :: String -> DOM Element -> Future Error String
const _setAttr = curry((attr, val, el) => {
  if (el.hasAttribute(attr)) {
    el.setAttribute(attr, val);
    return of(el);
  }
  return reject(new ReferenceError(`Sorry, ${attr} was not found.`));
});

export default _setAttr;
