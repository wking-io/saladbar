import { curry } from 'ramda';

// _isAttr :: String -> String -> DOM Element -> Bool
const _isAttr = (attr, val, dom) => {
  return dom.hasAttribute(attr) ? dom.getAttribute(attr) === val : null;
};

export default curry(_isAttr);
