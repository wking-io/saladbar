import { curry } from 'ramda';
import branch from '../utils/branch';
import _findParent from './_findParent';

// findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
const findParent = (global, pred, dom) =>
  branch(_findParent(global, pred))(dom);

export default curry(findParent);
