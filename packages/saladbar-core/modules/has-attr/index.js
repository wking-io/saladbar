import { curry } from 'ramda';

// _hasAttr :: String -> DOM Element -> Bool
const _hasAttr = (attr, dom) => dom.hasAttribute(attr);

export default curry(_hasAttr);
