import branch from '../utils/branch';
import _getPosition from './_getPosition';

// getData :: String -> DOM Element -> Future Error String
const getPosition = dom => branch(_getPosition)(dom);

export default getPosition;
