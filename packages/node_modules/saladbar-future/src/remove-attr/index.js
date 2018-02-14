import { curry } from 'ramda';
import branch from '../utils/branch';
import _removeAttr from './_removeAttr';

const removeAttr = (attr, el) => branch(_removeAttr(attr))(el);

export default curry(removeAttr);
