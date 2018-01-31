import _setProp from './_setProp';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

const setAttr = curry((prop, val, el) => branch(_setProp(prop, val))(el));

export default setAttr;
