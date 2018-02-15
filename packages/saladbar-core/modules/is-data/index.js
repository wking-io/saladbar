import { curry } from 'ramda';

// _isData :: String -> String -> DOM Element -> Bool
const _isData = (prop, val, dom) =>
  dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] === val : null;

export default curry(_isData);
