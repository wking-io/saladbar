import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeData from './_removeData';

const removeData = (prop, el) => branch(_removeData(prop))(el);

export default curry(removeData);
