import branch from '../utils/branch';
import _getClasses from './_getClasses';

const getClasses = el => branch(_getClasses)(el);

export default getClasses;
