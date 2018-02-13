import { curry } from 'ramda';
import branch from '../utils/branch';
import _setData from './_setData';

const setData = (prop, val, el) => branch(_setData(prop, val))(el);

export default curry(setData);
