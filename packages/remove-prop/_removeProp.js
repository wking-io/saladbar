import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasProp from 'saladbar.hasprop';

// _getAttr :: String -> DOM Element -> Future Error String
const _removeProp = curry((prop, el) => {
  if (hasProp(prop, el)) {
    const result = delete el[prop];
    if (!result)
      return reject({ error: `Property ${prop} is non-configurable.` });
  }
  return of(el);
});

export default _removeProp;
