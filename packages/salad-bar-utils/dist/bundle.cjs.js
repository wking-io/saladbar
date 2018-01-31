'use strict';

var ramda = require('ramda');
var fluture = require('fluture');

const isArray = arr => Array.isArray(arr);

const _branch = fn => ramda.ifElse(isArray, ramda.traverse(fluture.of, fn), fn);

const branch = ramda.curry((fn, el) => {
  if (fluture.isFuture(el)) {
    return ramda.chain(_branch(fn))(el);
  }
  let result = el;
  _branch(fn)(el).fork(err => (result = err), val => (result = val));
  return result;
});

const elNodeType = 1;
const isElmNode = el => el && el.nodeType === elNodeType;

var index = {
  branch,
  isArray,
  isElmNode,
};

module.exports = index;
