import { curry } from 'ramda';
import branch from '../utils/branch';
import _getProp from './_getProp';

const getProp = (prop, el) => branch(_getProp(prop))(el);

export default curry(getProp);
