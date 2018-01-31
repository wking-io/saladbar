import _getProp from './_getProp';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

const getProp = curry((prop, el) => branch(_getProp(prop))(el));

export default getProp;
