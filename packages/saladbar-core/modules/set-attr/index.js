import { curry } from 'ramda';

// _setAttr :: String -> String -> DOM Element -> DOM Element
const _setAttr = (attr, val, dom) => {
  dom.setAttribute(attr, val);
  return dom;
};

export default curry(_setAttr);
