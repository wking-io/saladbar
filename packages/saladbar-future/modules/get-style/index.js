import { curry } from 'ramda';
import branch from '../utils/branch';
import _getStyle from './_getStyle';

// getStyle :: String -> DOM Element -> Future Error String
const getStyle = (prop, dom) => branch(_getStyle(prop))(dom);

export default curry(getStyle);
