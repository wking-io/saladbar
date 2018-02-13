import { curry } from 'ramda';

// _getProp :: String -> DOM Element -> String | Null
const _getProp = (prop, dom) => dom[prop] || null;

export default curry(_getProp);
