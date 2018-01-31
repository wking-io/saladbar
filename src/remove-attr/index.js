import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeAttr from './_removeAttr';

const removeAttr = curry((attr, el) => branch(_removeAttr(attr))(el));

export default removeAttr;
