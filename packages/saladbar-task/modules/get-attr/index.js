import { curry } from 'ramda';
import branch from '../utils/branch';
import _getAttr from './_getAttr';

// getAttr :: String -> DOM Element -> Future Error String
const getAttr = (attr, dom) => branch(_getAttr(attr))(dom);

export default curry(getAttr);
