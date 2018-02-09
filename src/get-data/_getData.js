import { of, reject } from 'fluture';
import { curry } from 'ramda';
import hasData from '../has-data';

// _getAttr :: String -> DOM Element -> Future Error String
const _getData = (prop, el) =>
  hasData(prop, el).chain(
    propExists =>
      propExists
        ? of(el.dataset[prop])
        : reject({ error: `Sorry, data-attribute ${prop} was not found.` })
  );

export default curry(_getData);
