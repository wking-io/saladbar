import { curry } from 'ramda';
import branch from '../utils/branch';
import _setData from './_setData';

// setData:: String -> String -> DOM Element -> Future Error DOM Element
const setData = (prop, val, dom) => branch(_setData(prop, val))(dom);

export default curry(setData);
