import { curry } from 'ramda';
import branch from '../utils/branch';
import _getClasses from './_getClasses';

const getProp = curry(el => branch(_getClasses)(el));

export default getProp;
