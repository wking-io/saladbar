import { curry } from 'ramda';
import branch from '../utils/branch';
import _toggleClass from './_toggleClass';

// toggleClass :: String -> DOM Element -> Future Error DOM Element
const toggleClass = (cn, dom) => branch(_toggleClass(cn))(dom);

export default curry(toggleClass);
