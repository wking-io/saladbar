import { curry } from 'ramda';
import branch from '../utils/branch';
import _findParent from './_findParent';

const findParent = curry((pred, el) => branch(_findParent(pred))(el));

export default findParent;
