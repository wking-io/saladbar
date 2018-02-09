import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasData from '../has-data';

// _getAttr :: String -> DOM Element -> Future Error String
const _removeData = (prop, el) => {
  if (hasData(prop, el)) {
    const result = delete el.dataset[prop];
    if (!result)
      return reject({ error: `Property ${prop} is non-configurable.` });
  }
  return of(el);
};

export default curry(_removeData);
