import _removeData from './_removeData';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

const removeData = curry((prop, el) => branch(_removeData(prop))(el));

export default removeData;
