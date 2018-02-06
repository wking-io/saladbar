import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasProp from '../has-prop';

// _getAttr :: String -> DOM Element -> Future Error String
const _getProp = curry((prop, el) =>
  hasProp(prop, el).chain(
    propExists =>
      propExists
        ? of(el[prop])
        : reject({ error: `Sorry, ${prop} was not found.` })
  )
);

export default _getProp;
