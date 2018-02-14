import { curry } from 'ramda';
import branch from '../utils/branch';
import _findParent from './_findParent';

const findParent = (dom, pred, el) => branch(_findParent(pred, dom))(el);
const curriedFindParent = curry(findParent);
const findParentWrapped = (dom = false) => curriedFindParent(dom);

export default findParentWrapped;
