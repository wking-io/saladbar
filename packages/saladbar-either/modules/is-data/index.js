import { curry } from 'ramda';
import branch from '../utils/branch';
import _isData from './_isData';

// isData :: String -> String -> DOM Element -> Future Error Bool
const isData = (prop, val, dom) => branch(_isData(prop, val))(dom);

export default curry(isData);
