import { curry } from 'ramda';
import branch from '../utils/branch';
import _setProp from './_setProp';

// setProp :: String -> String -> DOM Element -> Future Error DOM Element
const setProp = (prop, val, dom) => branch(_setProp(prop, val))(dom);

export default curry(setProp);
