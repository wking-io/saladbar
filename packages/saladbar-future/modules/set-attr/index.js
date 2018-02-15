import { curry } from 'ramda';
import branch from '../utils/branch';
import _setAttr from './_setAttr';

// setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const setAttr = (attr, val, dom) => branch(_setAttr(attr, val))(dom);

export default curry(setAttr);
