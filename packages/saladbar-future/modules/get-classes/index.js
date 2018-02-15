import branch from '../utils/branch';
import _getClasses from './_getClasses';

// getClasses :: DOM Element -> Future Error String
const getClasses = dom => branch(_getClasses)(dom);

export default getClasses;
