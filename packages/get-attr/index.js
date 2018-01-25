import _getAttr from './_getAttr';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

const getAttr = curry((attr, el) => branch(_getAttr(attr))(el));

export default getAttr;
