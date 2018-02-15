import { curry } from 'ramda';
import branch from '../utils/branch';
import _addClass from './_addClass';

// addClass :: String -> DOM Element -> Future Error DOM Element
const addClass = (cn, dom) => branch(_addClass(cn))(dom);

export default curry(addClass);
