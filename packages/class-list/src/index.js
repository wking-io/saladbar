import _classList from './_classList';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

const classList = curry((method, classname, el) =>
  branch(_classList(method, classname))(el)
);

export default classList;
