import { curry } from 'ramda';
import branch from '../utils/branch';
import _isAttr from './_isAttr';

// isAttr :: String -> String -> DOM Element -> Future Error Bool
const isAttr = (attr, val, dom) => branch(_isAttr(attr, val))(dom);

export default curry(isAttr);
