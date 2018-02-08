import { curry } from 'ramda';
import branch from '../utils/branch';
import _findParent from './_findParent';

const findParent = (dom = document) =>
  curry((pred, el) => branch(_findParent(pred, dom))(el));

export default findParent;
