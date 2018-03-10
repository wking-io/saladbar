import { curry } from 'ramda';
import branch from '../utils/branch';
import _getPosition from './_getPosition';

// getPosition :: String -> DOM Element -> Future Error String
const getPosition = (prop, dom) => branch(_getPosition(prop))(dom);

export default curry(getPosition);
