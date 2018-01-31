import _removeAttr from './_removeAttr';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

const removeAttr = curry((attr, el) => branch(_removeAttr(attr))(el));

export default removeAttr;
