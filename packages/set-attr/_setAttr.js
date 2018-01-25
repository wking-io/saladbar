import { curry } from 'ramda';
import { of } from 'fluture';

// _setAttr :: String -> DOM Element -> Future Error String
const _setAttr = curry((attr, val, el) => {
  el.setAttribute(attr, val);
  return of(el);
});

export default _setAttr;
