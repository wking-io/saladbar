import { curry } from 'ramda';
import branch from '../utils/branch';
import _classList from './_classList';

// classList :: String -> String -> DOM Element -> Future Error DOM Element
const classList = (method, classname, dom) =>
  branch(_classList(method, classname))(dom);

export default curry(classList);
