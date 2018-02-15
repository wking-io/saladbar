import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasAttr from './_hasAttr';

// hasAttr :: String -> DOM Element -> Bool
const hasAttr = (attr, dom) => branch(_hasAttr(attr))(dom);

export default curry(hasAttr);
