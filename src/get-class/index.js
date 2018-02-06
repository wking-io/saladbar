import { curry } from 'ramda';
import branch from '../utils/branch';
import _getClass from './_getClass';

const getClass = curry((prop, el) => branch(_getClass(prop))(el));

export default getClass;
