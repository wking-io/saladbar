import { curry } from 'ramda';

// _hasClass :: String -> DOM Element -> Bool
const _hasClass = (cn, dom) => dom.classList.contains(cn);

export default curry(_hasClass);
