import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasData from './_hasData';

const hasData = (prop, el) => branch(_hasData(prop))(el);

export default curry(hasData);
