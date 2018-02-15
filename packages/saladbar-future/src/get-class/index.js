import { curry } from 'ramda';
import branch from '../utils/branch';
import _getClass from './_getClass';

// getClass :: Int -> DOM Element -> Future Error String
const getClass = (idx, dom) => branch(_getClass(idx))(dom);

export default curry(getClass);
