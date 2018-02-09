import { curry } from 'ramda';
import branch from '../utils/branch';
import _setProp from './_setProp';

const setAttr = (prop, val, el) => branch(_setProp(prop, val))(el);

export default curry(setAttr);
