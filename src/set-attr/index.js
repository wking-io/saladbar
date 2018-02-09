import { curry } from 'ramda';
import branch from '../utils/branch';
import _setAttr from './_setAttr';

const setAttr = (attr, val, el) => branch(_setAttr(attr, val))(el);

export default curry(setAttr);
