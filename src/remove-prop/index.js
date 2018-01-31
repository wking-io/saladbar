import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeProp from './_removeProp';

const removeProp = curry((prop, el) => branch(_removeProp(prop))(el));

export default removeProp;
