import { curry } from 'ramda';
import branch from '../utils/branch';
import _getAttr from './_getAttr';

const getAttr = curry((attr, el) => branch(_getAttr(attr))(el));

export default getAttr;
