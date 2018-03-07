import { curry } from 'ramda';
import branch from '../utils/branch';
import _getProp from './_getProp';

// getProp :: String -> DOM Element -> Future Error String
const getProp = (prop, dom) => branch(_getProp(prop))(dom);

export default curry(getProp);
