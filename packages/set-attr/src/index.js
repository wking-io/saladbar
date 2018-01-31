import _setAttr from './_setAttr';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

const setAttr = curry((attr, val, el) => branch(_setAttr(attr, val))(el));

export default setAttr;
