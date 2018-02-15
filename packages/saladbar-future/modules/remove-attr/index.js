import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeAttr from './_removeAttr';

// removeAttr :: String -> DOM Element -> Future Error DOM Element
const removeAttr = (attr, dom) => branch(_removeAttr(attr))(dom);

export default curry(removeAttr);
