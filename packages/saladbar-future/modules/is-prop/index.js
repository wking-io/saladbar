import { curry } from 'ramda';
import branch from '../utils/branch';
import _isProp from './_isProp';

// isProp :: String -> String -> DOM Element -> Future Error Bool
const isProp = (prop, val, dom) => branch(_isProp(prop, val))(dom);

export default curry(isProp);
