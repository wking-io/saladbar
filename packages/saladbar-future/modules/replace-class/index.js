import { curry } from 'ramda';
import branch from '../utils/branch';
import _replaceClass from './_replaceClass';

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
const _removeClass = (ocn, ncn, dom) => branch(_replaceClass(ocn, ncn))(dom);

export default curry(_removeClass);
