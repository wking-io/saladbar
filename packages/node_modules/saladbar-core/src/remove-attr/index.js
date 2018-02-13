import { curry } from 'ramda';

// _removeAttr :: String -> DOM Element -> DOM Element
const _removeAttr = (attr, dom) => {
  dom.removeAttribute(attr);
  return dom;
};

export default curry(_removeAttr);
