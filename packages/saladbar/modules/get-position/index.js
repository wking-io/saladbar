import branch from '../utils/branch';
import _getData from './_getPosition';

// getData :: String -> DOM Element -> Future Error String
const getPosition = dom => branch(_getData)(dom);

export default getPosition;
