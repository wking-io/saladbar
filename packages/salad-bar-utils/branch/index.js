import { ifElse, map } from 'ramda';
import { isFuture } from 'fluture';
import _branch from './_branch';
import isArray from '../is-array';

export default function branch(fn) {
  return _branch(isFuture, _branch(isArray, fn));
}
