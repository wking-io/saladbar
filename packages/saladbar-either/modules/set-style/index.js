import { curry } from 'ramda';
import branch from '../utils/branch';
import _setStyle from './_setStyle';

// setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const setStyle = (prop, val, dom) => branch(_setStyle(prop, val))(dom);

export default curry(setStyle);
