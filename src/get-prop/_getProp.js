import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasProp from '../has-prop';

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = curry((prop, el) => {
  if (hasProp(prop, el)) {
    return of(el[prop]);
  }

  return reject({ error: `Sorry, ${prop} was not found.` });
});

export default _getAttr;
