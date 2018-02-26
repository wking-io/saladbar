import { curry } from 'ramda';
import branch from '../utils/branch';
import _isStyle from './_isStyle';

// isStyle :: String -> String -> DOM Element -> Future Error Bool
const isStyle = (prop, val, dom) => branch(_isStyle(prop, val))(dom);

export default curry(isStyle);
