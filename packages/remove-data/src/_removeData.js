import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasData from 'saladbar.hasdata';

// _getAttr :: String -> DOM Element -> Future Error String
const _removeData = curry((prop, el) => {
  if (hasData(prop, el)) {
    const result = delete el.dataset[prop];
    if (!result)
      return reject({ error: `Property ${prop} is non-configurable.` });
  }
  return of(el);
});

export default _removeData;
