import { curry } from 'ramda';

// _getData :: String -> DOM Element -> String | Null
const _getData = (prop, dom) =>
  dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] : null;

export default curry(_getData);
