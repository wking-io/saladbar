import { curry } from 'ramda';

// _getAttr :: String -> DOM Element -> String | null
const _getAttr = (attr, dom) =>
  dom.hasAttribute(attr) ? dom.getAttribute(attr) : null;

export default curry(_getAttr);
