import _removeProp from './_removeProp';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

const removeProp = curry((prop, el) => branch(_removeProp(prop))(el));

export default removeProp;
