import _removeProp from './_removeProp';
import utils from 'saladbar.utils';
import { curry } from 'ramda';

const removeProp = curry((prop, el) => utils.branch(_removeProp(prop))(el));

export default removeProp;
