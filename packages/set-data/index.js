import _setData from './_setData';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

const setData = curry((prop, val, el) => branch(_setData(prop, val))(el));

export default setData;
