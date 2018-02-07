import { curry } from 'ramda';
import branch from '../utils/branch';
import _getData from './_getData';

const getData = curry((prop, el) => branch(_getData(prop))(el));

export default getData;
