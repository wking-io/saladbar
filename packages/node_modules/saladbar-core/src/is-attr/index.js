import { curry } from 'ramda';

// _isAttr :: String -> String -> DOM Element -> Bool
const _isAttr = (prop, val, dom) =>
  dom.hasAttribute(prop) ? dom.getAttribute(prop) === val : null;

export default curry(_isAttr);
