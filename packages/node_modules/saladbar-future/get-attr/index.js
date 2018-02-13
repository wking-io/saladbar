import { curry } from 'ramda';
import branch from '../utils/branch';
import _getAttr from './_getAttr';

const getAttr = (attr, el) => branch(_getAttr(attr))(el);

export default curry(getAttr);
