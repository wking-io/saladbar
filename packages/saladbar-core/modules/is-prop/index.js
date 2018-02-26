import { curry } from 'ramda';

// _isProp :: String -> String -> DOM Element -> Bool
const _isProp = (prop, val, dom) => (dom[prop] ? dom[prop] === val : null);

export default curry(_isProp);
