import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeClass from './_removeClass';

// removeClass :: String -> String -> DOM Element -> Future Error DOM Element
const removeClass = (cn, dom) => branch(_removeClass(cn))(dom);

export default curry(removeClass);
