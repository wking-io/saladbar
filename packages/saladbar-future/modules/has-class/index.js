import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasClass from './_hasClass';

// hasClass :: String -> DOM Element -> Future Error DOM Element
const hasClass = (cn, dom) => branch(_hasClass(cn))(dom);

export default curry(hasClass);
