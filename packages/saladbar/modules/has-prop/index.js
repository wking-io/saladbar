import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasProp from './_hasProp';

// hasProp :: String -> DOM Element -> Future Error Bool
const hasProp = (prop, dom) => branch(_hasProp(prop))(dom);

export default curry(hasProp);
