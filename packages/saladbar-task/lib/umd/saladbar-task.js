(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.saladbarTask = {})));
}(this, (function (exports) { 'use strict';

function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
var _isPlaceholder_1 = _isPlaceholder;

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder_1(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
var _curry1_1 = _curry1;

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
var _arity_1 = _arity;

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder_1(a) ? f2 : _curry1_1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f2 : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
var _curry2_1 = _curry2;

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder_1(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder_1(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity_1(left, _curryN(length, combined, fn));
  };
}
var _curryN_1 = _curryN;

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curryN = /*#__PURE__*/_curry2_1(function curryN(length, fn) {
  if (length === 1) {
    return _curry1_1(fn);
  }
  return _arity_1(length, _curryN_1(length, [], fn));
});
var curryN_1 = curryN;

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curry = /*#__PURE__*/_curry1_1(function curry(fn) {
  return curryN_1(fn.length, fn);
});
var curry_1 = curry;

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}
var _isTransformer_1 = _isTransformer;

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer_1(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
var _dispatchable_1 = _dispatchable;

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
var _isString_1 = _isString;

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

var _isArrayLike = /*#__PURE__*/_curry1_1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString_1(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
var _isArrayLike_1 = _isArrayLike;

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike_1(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}
var _makeFlat_1 = _makeFlat;

function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
var _forceReduced_1 = _forceReduced;

var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
var _xwrap_1 = _xwrap;

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind = /*#__PURE__*/_curry2_1(function bind(fn, thisObj) {
  return _arity_1(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
var bind_1 = bind;

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind_1(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap_1(fn);
  }
  if (_isArrayLike_1(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
var _reduce_1 = _reduce;

var _xfBase = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced_1(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !_isArrayLike_1(input) ? _reduce_1(rxf, result, [input]) : _reduce_1(rxf, result, input);
    }
  };
};

var _flatCat_1 = _flatCat;

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
var _map_1 = _map;

var XMap = /*#__PURE__*/function () {

  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2_1(function _xmap(f, xf) {
  return new XMap(f, xf);
});
var _xmap_1 = _xmap;

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var _has_1 = _has;

var toString = Object.prototype.toString;
var _isArguments = function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has_1('callee', x);
  };
};

var _isArguments_1 = _isArguments;

// cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments_1(obj);
  for (prop in obj) {
    if (_has_1(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has_1(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/_curry1_1(_keys);
var keys_1 = keys;

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map = /*#__PURE__*/_curry2_1( /*#__PURE__*/_dispatchable_1(['fantasy-land/map', 'map'], _xmap_1, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN_1(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce_1(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys_1(functor));
    default:
      return _map_1(fn, functor);
  }
}));
var map_1 = map;

var _xchain = /*#__PURE__*/_curry2_1(function _xchain(f, xf) {
  return map_1(f, _flatCat_1(xf));
});
var _xchain_1 = _xchain;

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */

var chain = /*#__PURE__*/_curry2_1( /*#__PURE__*/_dispatchable_1(['fantasy-land/chain', 'chain'], _xchain_1, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }
  return _makeFlat_1(false)(map_1(fn, monad));
}));
var chain_1 = chain;

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
var _pipe_1 = _pipe;

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder_1(a) ? f3 : _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f3 : _isPlaceholder_1(a) ? _curry2_1(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder_1(b) ? _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1_1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) && _isPlaceholder_1(c) ? f3 : _isPlaceholder_1(a) && _isPlaceholder_1(b) ? _curry2_1(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder_1(a) && _isPlaceholder_1(c) ? _curry2_1(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder_1(b) && _isPlaceholder_1(c) ? _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder_1(c) ? _curry1_1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
var _curry3_1 = _curry3;

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce = /*#__PURE__*/_curry3_1(_reduce_1);
var reduce_1 = reduce;

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
var _checkForMethod_1 = _checkForMethod;

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice = /*#__PURE__*/_curry3_1( /*#__PURE__*/_checkForMethod_1('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
var slice_1 = slice;

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail = /*#__PURE__*/_curry1_1( /*#__PURE__*/_checkForMethod_1('tail', /*#__PURE__*/slice_1(1, Infinity)));
var tail_1 = tail;

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity_1(arguments[0].length, reduce_1(_pipe_1, arguments[0], tail_1(arguments)));
}
var pipe_1 = pipe;

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse = /*#__PURE__*/_curry1_1(function reverse(list) {
  return _isString_1(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
var reverse_1 = reverse;

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */

function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe_1.apply(this, reverse_1(arguments));
}
var compose_1 = compose;

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
var _reduced_1 = _reduced;

var XAll = /*#__PURE__*/function () {

  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced_1(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2_1(function _xall(f, xf) {
  return new XAll(f, xf);
});
var _xall_1 = _xall;

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */

var all = /*#__PURE__*/_curry2_1( /*#__PURE__*/_dispatchable_1(['all'], _xall_1, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
var all_1 = all;

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */

var ifElse = /*#__PURE__*/_curry3_1(function ifElse(condition, onTrue, onFalse) {
  return curryN_1(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
var ifElse_1 = ifElse;

/**
 * A helper for delaying the execution of a function.
 * @private
 * @summary (Any... -> Any) -> Void
 */

var delayed = typeof setImmediate !== 'undefined' ? setImmediate : typeof process !== 'undefined' ? process.nextTick : /* otherwise */setTimeout;

/**
 * @module lib/task
 */
var task = Task;

// -- Implementation ---------------------------------------------------

/**
 * The `Task[α, β]` structure represents values that depend on time. This
 * allows one to model time-based effects explicitly, such that one can have
 * full knowledge of when they're dealing with delayed computations, latency,
 * or anything that can not be computed immediately.
 *
 * A common use for this structure is to replace the usual Continuation-Passing
 * Style form of programming, in order to be able to compose and sequence
 * time-dependent effects using the generic and powerful monadic operations.
 *
 * @class
 * @summary
 * ((α → Void), (β → Void) → Void), (Void → Void) → Task[α, β]
 *
 * Task[α, β] <: Chain[β]
 *               , Monad[β]
 *               , Functor[β]
 *               , Applicative[β]
 *               , Semigroup[β]
 *               , Monoid[β]
 *               , Show
 */
function Task(computation, cleanup) {
  this.fork = computation;

  this.cleanup = cleanup || function () {};
}

/**
 * Constructs a new `Task[α, β]` containing the single value `β`.
 *
 * `β` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary β → Task[α, β]
 */
Task.prototype.of = function _of(b) {
  return new Task(function (_, resolve) {
    return resolve(b);
  });
};

Task.of = Task.prototype.of;

/**
 * Constructs a new `Task[α, β]` containing the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary α → Task[α, β]
 */
Task.prototype.rejected = function _rejected(a) {
  return new Task(function (reject) {
    return reject(a);
  });
};

Task.rejected = Task.prototype.rejected;

// -- Functor ----------------------------------------------------------

/**
 * Transforms the successful value of the `Task[α, β]` using a regular unary
 * function.
 *
 * @summary @Task[α, β] => (β → γ) → Task[α, γ]
 */
Task.prototype.map = function _map(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(a);
    }, function (b) {
      return resolve(f(b));
    });
  }, cleanup);
};

// -- Chain ------------------------------------------------------------

/**
 * Transforms the succesful value of the `Task[α, β]` using a function to a
 * monad.
 *
 * @summary @Task[α, β] => (β → Task[α, γ]) → Task[α, γ]
 */
Task.prototype.chain = function _chain(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(a);
    }, function (b) {
      return f(b).fork(reject, resolve);
    });
  }, cleanup);
};

// -- Apply ------------------------------------------------------------

/**
 * Applys the successful value of the `Task[α, (β → γ)]` to the successful
 * value of the `Task[α, β]`
 *
 * @summary @Task[α, (β → γ)] => Task[α, β] → Task[α, γ]
 */

Task.prototype.ap = function _ap(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task(function (reject, resolve) {
    var func,
        funcLoaded = false;
    var val,
        valLoaded = false;
    var rejected = false;
    var allState;

    var thisState = forkThis(guardReject, guardResolve(function (x) {
      funcLoaded = true;
      func = x;
    }));

    var thatState = forkThat(guardReject, guardResolve(function (x) {
      valLoaded = true;
      val = x;
    }));

    function guardResolve(setter) {
      return function (x) {
        if (rejected) {
          return;
        }

        setter(x);
        if (funcLoaded && valLoaded) {
          delayed(function () {
            cleanupBoth(allState);
          });
          return resolve(func(val));
        } else {
          return x;
        }
      };
    }

    function guardReject(x) {
      if (!rejected) {
        rejected = true;
        return reject(x);
      }
    }

    return allState = [thisState, thatState];
  }, cleanupBoth);
};

// -- Semigroup ------------------------------------------------------------

/**
 * Selects the earlier of the two tasks `Task[α, β]`
 *
 * @summary @Task[α, β] => Task[α, β] → Task[α, β]
 */

Task.prototype.concat = function _concat(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task(function (reject, resolve) {
    var done = false;
    var allState;
    var thisState = forkThis(guard(reject), guard(resolve));
    var thatState = forkThat(guard(reject), guard(resolve));

    return allState = [thisState, thatState];

    function guard(f) {
      return function (x) {
        if (!done) {
          done = true;
          delayed(function () {
            cleanupBoth(allState);
          });
          return f(x);
        }
      };
    }
  }, cleanupBoth);
};

// -- Monoid ------------------------------------------------------------

/**
 * Returns a Task that will never resolve
 *
 * @summary Void → Task[α, _]
 */
Task.empty = function _empty() {
  return new Task(function () {});
};

Task.prototype.empty = Task.empty;

// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Task[α, β]`
 *
 * @summary @Task[α, β] => Void → String
 */
Task.prototype.toString = function _toString() {
  return 'Task';
};

// -- Extracting and recovering ----------------------------------------

/**
 * Transforms a failure value into a new `Task[α, β]`. Does nothing if the
 * structure already contains a successful value.
 *
 * @summary @Task[α, β] => (α → Task[γ, β]) → Task[γ, β]
 */
Task.prototype.orElse = function _orElse(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return f(a).fork(reject, resolve);
    }, function (b) {
      return resolve(b);
    });
  }, cleanup);
};

// -- Folds and extended transformations -------------------------------

/**
 * Catamorphism. Takes two functions, applies the leftmost one to the failure
 * value, and the rightmost one to the successful value, depending on which one
 * is present.
 *
 * @summary @Task[α, β] => (α → γ), (β → γ) → Task[δ, γ]
 */
Task.prototype.fold = function _fold(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return resolve(f(a));
    }, function (b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Catamorphism.
 *
 * @summary @Task[α, β] => { Rejected: α → γ, Resolved: β → γ } → Task[δ, γ]
 */
Task.prototype.cata = function _cata(pattern) {
  return this.fold(pattern.Rejected, pattern.Resolved);
};

/**
 * Swaps the disjunction values.
 *
 * @summary @Task[α, β] => Void → Task[β, α]
 */
Task.prototype.swap = function _swap() {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return resolve(a);
    }, function (b) {
      return reject(b);
    });
  }, cleanup);
};

/**
 * Maps both sides of the disjunction.
 *
 * @summary @Task[α, β] => (α → γ), (β → δ) → Task[γ, δ]
 */
Task.prototype.bimap = function _bimap(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(f(a));
    }, function (b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Maps the left side of the disjunction (failure).
 *
 * @summary @Task[α, β] => (α → γ) → Task[γ, β]
 */
Task.prototype.rejectedMap = function _rejectedMap(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(f(a));
    }, function (b) {
      return resolve(b);
    });
  }, cleanup);
};

var lib = task;

var isArray = function isArray(arr) {
  return Array.isArray(arr);
};

var isElmNode = function isElmNode(el) {
  return el && el.nodeType === 1;
};

var guaranteeDomEl = function guaranteeDomEl(el) {
  if (isArray(el)) {
    return ifElse_1(all_1(isElmNode), lib.of, function () {
      return lib.rejected({
        error: 'The one or more values in the array you passed in is not a valid DOM Element.'
      });
    })(el);
  }
  return ifElse_1(isElmNode, lib.of, function () {
    return lib.rejected({
      error: 'The value you passed in is not a valid DOM Element.'
    });
  })(el);
};

var isTask = function isTask(val) {
  return val.constructor === lib;
};

var isArray$2 = function isArray(arr) {
  return Array.isArray(arr);
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

// _classList :: String -> String | [String] -> DOM Element -> DOM Element
var _classList = function _classList(method, cn, dom) {
  var _dom$classList;

  isArray$2(cn) ? (_dom$classList = dom.classList)[method].apply(_dom$classList, _toConsumableArray(cn)) : dom.classList[method](cn);
  return dom;
};

var classList = curry_1(_classList);

// _addClass :: String | [String] -> DOM Element -> DOM Element
var _addClass = classList('add');

var isElmNode$2 = function isElmNode(el) {
  return el && el.nodeType === 1;
};

// _dom :: (CSS Selector, DOM Element) -> DOM Element | Null
var _dom = function _dom(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isElmNode$2(root) ? root.querySelector(cs) : document.querySelector(cs);
};

// _domAll :: (CSS Selector, DOM Element) -> [DOM Element] | Null
var _domAll = function _domAll(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var dom = isElmNode$2(root) ? root.querySelectorAll(cs) : document.querySelectorAll(cs);
  return dom.length > 0 ? Array.from(dom) : null;
};

// _findParent :: DOM -> Bool -> DOM Element -> DOM Element

var _findParent = function _findParent() {
  var global = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var pred = arguments[1];
  var dom = arguments[2];

  var doc = global ? global : window.document;

  if (dom === doc.body) {
    return dom;
  }

  return pred(dom.parentElement) ? dom.parentElement : _findParent(doc, pred, dom.parentElement);
};

var findParent = curry_1(_findParent);

// _getAttr :: String -> DOM Element -> String | null

var _getAttr = function _getAttr(attr, dom) {
  return dom.hasAttribute(attr) ? dom.getAttribute(attr) : null;
};

var getAttr = curry_1(_getAttr);

// _getClass :: Int -> DOM Element -> String | Null

var _getClass = function _getClass(index, dom) {
  return dom.classList.item(index);
};

var getClass = curry_1(_getClass);

// _getClasses :: DOM Element -> {k: v} | Null
var _getClasses = function _getClasses(dom) {
  return dom.classList.length > 0 ? dom.classList : null;
};

// _getData :: String -> DOM Element -> String | Null

var _getData = function _getData(prop, dom) {
  return dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] : null;
};

var getData = curry_1(_getData);

// _getData :: String -> DOM Element -> String | Null

var _getPosition = function _getPosition(dom) {
    var _dom$getBoundingClien = dom.getBoundingClientRect(),
        top = _dom$getBoundingClien.top,
        right = _dom$getBoundingClien.right,
        bottom = _dom$getBoundingClien.bottom,
        left = _dom$getBoundingClien.left;

    return top && right && bottom && left ? { top: top, right: right, bottom: bottom, left: left } : null;
};

curry_1(_getPosition);

// _getProp :: String -> DOM Element -> String | Null

var _getProp = function _getProp(prop, dom) {
  return dom[prop] || null;
};

var getProp = curry_1(_getProp);

// _getStyle :: String -> DOM Element -> String

var _getStyle = function _getStyle(prop, dom) {
  return window.getComputedStyles(dom, null)[prop] || null;
};

var getStyle = curry_1(_getStyle);

// _hasAttr :: String -> DOM Element -> Bool

var _hasAttr = function _hasAttr(attr, dom) {
  return dom.hasAttribute(attr);
};

var hasAttr = curry_1(_hasAttr);

// _hasClass :: String -> DOM Element -> Bool

var _hasClass = function _hasClass(cn, dom) {
  return dom.classList.contains(cn);
};

var hasClass = curry_1(_hasClass);

var hasData = function hasData(prop, dom) {
  return dom.dataset.hasOwnProperty(prop);
};

var hasData$1 = curry_1(hasData);

/* 
 * @sig String -> DOM Element -> Bool
 */

var hasProp = function hasProp(prop, dom) {
  return prop in dom;
};

var hasProp$1 = curry_1(hasProp);

var _hasStyle = function _hasStyle(prop, dom) {
  return window.getComputedStyle(dom, null).hasOwnProperty(prop);
};

var hasStyle = curry_1(_hasStyle);

// _isAttr :: String -> String -> DOM Element -> Bool

var _isAttr = function _isAttr(attr, val, dom) {
  return dom.hasAttribute(attr) ? dom.getAttribute(attr) === val : null;
};

var isAttr = curry_1(_isAttr);

// _isData :: String -> String -> DOM Element -> Bool

var _isData = function _isData(prop, val, dom) {
  return dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] === val : null;
};

var isData = curry_1(_isData);

// _isProp :: String -> String -> DOM Element -> Bool

var _isProp = function _isProp(prop, val, dom) {
  return dom[prop] ? dom[prop] === val : null;
};

var isProp = curry_1(_isProp);

// _isStyle :: String -> String -> DOM Element -> Bool

var _isStyle = function _isStyle(prop, val, dom) {
  var domStyles = window.getComputedStyle(dom, null);
  return domStyles.hasOwnProperty(prop) ? domStyles[prop] === val : null;
};

var isStyle = curry_1(_isStyle);

// _on :: String -> (a -> b) -> DOM Element -> DOM Element

var _on = function _on(event, handler, dom) {
  dom.addEventListener(event, handler, dom);
  return dom;
};

var on = curry_1(_on);

// _removeAttr :: String -> DOM Element -> DOM Element

var _removeAttr = function _removeAttr(attr, dom) {
  dom.removeAttribute(attr);
  return dom;
};

var removeAttr = curry_1(_removeAttr);

// _removeClass :: String | [String] -> DOM Element -> DOM Element
var _removeClass = classList('remove');

// _replaceClass :: String -> String -> DOM Element -> DOM Element

var _replaceClass = function _replaceClass(ocn, ncn, dom) {
  dom.classList.replace(ocn, ncn);
  return dom;
};

var replaceClass = curry_1(_replaceClass);

var isFormNode = function isFormNode(el) {
  return el && el.nodeType === 1 && el.nodeName === 'FORM';
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function _toConsumableArray$1(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

// prop :: k -> {k: v} -> v
var prop = curry_1(function (p, obj) {
  return obj[p];
});
// fromPairs :: [[k, v]] -> {k: v}
var fromPairs = function fromPairs(pairs) {
  return pairs.reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return Object.assign(acc, _defineProperty({}, key, val));
  }, {});
};
// toArray :: Iter -> [*]
var toArray = function toArray(iter) {
  return Array.from(iter);
};
// notSubmit :: DOM Element -> Bool
var notSubmit = function notSubmit(el) {
  return el.type !== 'submit';
};
// hasName :: DOM Element -> Bool
var hasName = function hasName(obj) {
  return obj.name && obj.name.length > 0 || false;
};
// isValidInput :: DOM Element -> Bool
var isValidInput = function isValidInput(dom) {
  return notSubmit(dom) && hasName(dom);
};

// ([], DOM Element) -> [[Input Name, Input Value]]
var formReducer = function formReducer(acc, dom) {
  if (isValidInput(dom)) {
    return [].concat(_toConsumableArray$1(acc), [[dom.name, dom.value]]);
  }
  return acc;
};
// Form Element -> [Input Elements]
var inputsToArray = function inputsToArray(dom) {
  return toArray(prop('elements', dom));
};
// (([], DOM Element) → [[Input Name, Input Value]]) → [] → [Input Elements] → [[Input Name, Input Value]]
var buildFormObject = function buildFormObject(arr) {
  return arr.reduce(formReducer, []);
};

// Form Element -> {Input Name: Input Value} | Null
var _serialize = function _serialize(form) {
  if (isFormNode(form)) {
    return fromPairs(buildFormObject(inputsToArray(form)));
  }
  return null;
};

// _setAttr :: String -> String -> DOM Element -> DOM Element

var _setAttr = function _setAttr(attr, val, dom) {
  dom.setAttribute(attr, val);
  return dom;
};

var setAttr = curry_1(_setAttr);

// This regex checks the string passed in has the following qualities:
// 1. Has no spaces.
// 2. Starts and ends with a letter or number (case-insensitive)
// 3. If longer than three characters the characters in between are only
//    letters, numbers, an underscore, a semicolon, or a period.

var validDataRegex = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/;
// String -> Bool
var isValidDataProp = function isValidDataProp(prop) {
  var isMatch = prop.match(validDataRegex);
  return isMatch && isMatch.length === 1;
};

// _setData :: String -> String -> DOM Element -> DOM Element | Null
var _setData = function _setData(prop, val, dom) {
  if (isValidDataProp(prop)) {
    dom.dataset[prop] = val;
    return dom;
  }

  return null;
};

var setData = curry_1(_setData);

// _setProp :: String -> String -> DOM Element -> DOM Element

var _setProp = function _setProp(attr, val, dom) {
  dom[attr] = val;
  return dom;
};

var setProp = curry_1(_setProp);

// _setStyle :: String -> String -> DOM Element -> DOM Element

var _setStyle = function _setStyle(prop, val, dom) {
  dom.style[prop] = val;
  return dom;
};

var setStyle = curry_1(_setStyle);

// toggleClass :: String -> DOM Element -> DOM Element
var toggleClass = classList('toggle');

// _dom :: String -> DOM Element -> Future Error DOM Element
var _dom$1 = function _dom$$1(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var getDom = function getDom(parent) {
    return new lib(function (rej, res) {
      var elm = _dom(cs, parent);
      return elm ? res(elm) : rej({
        error: 'An element with the following selector was not found: ' + cs
      });
    });
  };

  var withTask = function withTask(parent) {
    return parent.chain(function (el) {
      return getDom(el);
    }).rejectedMap(function () {
      return {
        error: 'An element with the following selector was not found: ' + cs
      };
    });
  };

  return isTask(root) ? withTask(root) : getDom(root);
};

var guaranteeTask = function guaranteeTask(el) {
  if (isTask(el)) {
    return el;
  } else if (isElmNode(el) || isArray(el) && all_1(isElmNode, el)) {
    return lib.of(el);
  } else if (typeof el === 'string') {
    return _dom$1(el);
  }
  return lib.rejected({
    error: 'Argument ' + el + ' is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string'
  });
};

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}
var _concat_1 = _concat;

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */

var ap = /*#__PURE__*/_curry2_1(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } :
  // else
  _reduce_1(function (acc, f) {
    return _concat_1(acc, map_1(f, applyX));
  }, [], applyF);
});
var ap_1 = ap;

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */

var prepend = /*#__PURE__*/_curry2_1(function prepend(el, list) {
  return _concat_1([el], list);
});
var prepend_1 = prepend;

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */

var reduceRight = /*#__PURE__*/_curry3_1(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});
var reduceRight_1 = reduceRight;

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */

var sequence = /*#__PURE__*/_curry2_1(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight_1(function (x, acc) {
    return ap_1(map_1(prepend_1, x), acc);
  }, of([]), traversable);
});
var sequence_1 = sequence;

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */

var traverse = /*#__PURE__*/_curry3_1(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence_1(of, map_1(f, traversable));
});
var traverse_1 = traverse;

var _branch = function _branch(fn) {
  return ifElse_1(isArray, traverse_1(lib.of, fn), fn);
};

var branch = function branch(fn, el) {
  return compose_1(chain_1(_branch(fn)), chain_1(guaranteeDomEl), guaranteeTask)(el);
};

var branch$1 = curry_1(branch);

// _addClass :: String -> DOM Element -> Future Error DOM Element
var _addClass$1 = function _addClass$$1(cn, dom) {
  return lib.of(_addClass(cn, dom));
};

var _addClass$2 = curry_1(_addClass$1);

// addClass :: String -> DOM Element -> Future Error DOM Element
var addClass$1 = function addClass(cn, dom) {
  return branch$1(_addClass$2(cn))(dom);
};

var index$1 = curry_1(addClass$1);

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
var _classList$1 = function _classList(method, cn, dom) {
  return lib.of(classList(method, cn, dom));
};

var _classList$2 = curry_1(_classList$1);

// classList :: String -> String -> DOM Element -> Future Error DOM Element
var classList$1 = function classList(method, cn, dom) {
  return branch$1(_classList$2(method, cn))(dom);
};

var index$2 = curry_1(classList$1);

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
var _domAll$1 = function _domAll$$1(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var getDomAll = function getDomAll(parent) {
    return new lib(function (rej, res) {
      var elms = _domAll(cs, parent);
      return elms ? res(elms) : rej({
        error: 'An element with the following selector was not found: ' + cs
      });
    });
  };

  var withTask = function withTask(parent) {
    return parent.chain(function (el) {
      return getDomAll(el);
    }).rejectedMap(function () {
      return {
        error: 'An element with the following selector was not found: ' + cs
      };
    });
  };

  return isTask(root) ? withTask(root) : getDomAll(root);
};

// taskFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
var taskFindParent = curry_1(function (global, pred, dom) {
  var doc = global ? global : window.document;

  if (dom === doc.body) {
    return lib.of(dom);
  }

  return pred(dom.parentElement).chain(function (res) {
    return res ? lib.of(dom.parentElement) : taskFindParent(global, pred, dom.parentElement);
  });
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var _findParent$1 = function _findParent(global, pred, dom) {
  return isTask(pred(dom)) ? taskFindParent(global, pred, dom) : lib.of(findParent(global, pred, dom));
};

var _findParent$2 = curry_1(_findParent$1);

// findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var findParent$1 = function findParent(global, pred, dom) {
  return branch$1(_findParent$2(global, pred))(dom);
};

var findParent$2 = curry_1(findParent$1);

// _getAttr :: String -> DOM Element -> Future Error String
var _getAttr$1 = function _getAttr(attr, dom) {
  var result = getAttr(attr, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No attribute was found with the following name: ' + attr
  });
};

var _getAttr$2 = curry_1(_getAttr$1);

// getAttr :: String -> DOM Element -> Future Error String
var getAttr$1 = function getAttr(attr, dom) {
  return branch$1(_getAttr$2(attr))(dom);
};

var index$3 = curry_1(getAttr$1);

// _getClass :: Int -> DOM Element -> Future Error String
var _getClass$1 = function _getClass(idx, dom) {
  var result = getClass(idx, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No class was found with the following index: ' + idx
  });
};

var _getClass$2 = curry_1(_getClass$1);

// getClass :: Int -> DOM Element -> Future Error String
var getClass$1 = function getClass(idx, dom) {
  return branch$1(_getClass$2(idx))(dom);
};

var index$4 = curry_1(getClass$1);

// _getClasses :: DOM Element -> Future Error String
var _getClasses$1 = function _getClasses$$1(dom) {
  var result = _getClasses(dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No classes were found on this element.'
  });
};

// getClasses :: DOM Element -> Future Error String
var getClasses$1 = function getClasses(dom) {
  return branch$1(_getClasses$1)(dom);
};

// _getData :: String -> DOM Element -> Future Error String
var _getData$1 = function _getData(prop, dom) {
  var result = getData(prop, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No attribute was found with the following name: ' + prop
  });
};

var _getData$2 = curry_1(_getData$1);

// getData :: String -> DOM Element -> Future Error String
var getData$1 = function getData(prop, dom) {
  return branch$1(_getData$2(prop))(dom);
};

var index$5 = curry_1(getData$1);

// _getProp :: String -> DOM Element -> Future Error String
var _getProp$1 = function _getProp(prop, dom) {
  var result = getProp(prop, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No property was found with the following name: ' + prop
  });
};

var _getProp$2 = curry_1(_getProp$1);

// getProp :: String -> DOM Element -> Future Error String
var getProp$1 = function getProp(prop, dom) {
  return branch$1(_getProp$2(prop))(dom);
};

var index$6 = curry_1(getProp$1);

// _getStyle :: String -> DOM Element -> Future Error String
var _getStyle$1 = function _getStyle(prop, dom) {
  var result = getStyle(prop, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'No style property was found with the following name: ' + prop
  });
};

var _getStyle$2 = curry_1(_getStyle$1);

// getStyle :: String -> DOM Element -> Future Error String
var getStyle$1 = function getStyle(prop, dom) {
  return branch$1(_getStyle$2(prop))(dom);
};

var index$7 = curry_1(getStyle$1);

// _hasAttr :: String -> DOM Element -> Future Error Bool
var _hasAttr$1 = function _hasAttr(attr, dom) {
  return lib.of(hasAttr(attr, dom));
};

var _hasAttr$2 = curry_1(_hasAttr$1);

// hasAttr :: String -> DOM Element -> Bool
var hasAttr$1 = function hasAttr(attr, dom) {
  return branch$1(_hasAttr$2(attr))(dom);
};

var index$8 = curry_1(hasAttr$1);

// _hasClass :: String -> DOM Element -> Future Error DOM Element
var _hasClass$1 = function _hasClass(cn, dom) {
  return lib.of(hasClass(cn, dom));
};

var _hasClass$2 = curry_1(_hasClass$1);

// hasClass :: String -> DOM Element -> Future Error DOM Element
var hasClass$1 = function hasClass(cn, dom) {
  return branch$1(_hasClass$2(cn))(dom);
};

var index$9 = curry_1(hasClass$1);

// _hasData :: String -> DOM Element -> Future Error Bool
var _hasData = function _hasData(prop, dom) {
  return lib.of(hasData$1(prop, dom));
};

var _hasData$1 = curry_1(_hasData);

// hasData :: String -> DOM Element -> Future Error Bool
var hasData$2 = function hasData(prop, dom) {
  return branch$1(_hasData$1(prop))(dom);
};

var index$10 = curry_1(hasData$2);

// _hasProp :: String -> DOM Element -> Future Error Bool
var _hasProp = function _hasProp(prop, dom) {
  return lib.of(hasProp$1(prop, dom));
};

var _hasProp$1 = curry_1(_hasProp);

// hasProp :: String -> DOM Element -> Future Error Bool
var hasProp$2 = function hasProp(prop, dom) {
  return branch$1(_hasProp$1(prop))(dom);
};

var index$11 = curry_1(hasProp$2);

// _hasStyle :: String -> DOM Element -> Future Error Bool
var _hasStyle$1 = function _hasStyle(prop, dom) {
  return lib.of(hasStyle(prop, dom));
};

var _hasProp$2 = curry_1(_hasStyle$1);

// hasStyle :: String -> DOM Element -> Future Error Bool
var hasStyle$1 = function hasStyle(prop, dom) {
  return branch$1(_hasProp$2(prop))(dom);
};

var index$12 = curry_1(hasStyle$1);

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
var _isAttr$1 = function _isAttr(attr, val, dom) {
  var result = isAttr(attr, val, dom);

  return result !== null ? lib.of(result) : lib.rejected({
    error: 'There is not an attribute with the following name on this element: ' + attr
  });
};

var _isAttr$2 = curry_1(_isAttr$1);

// isAttr :: String -> String -> DOM Element -> Future Error Bool
var isAttr$1 = function isAttr(attr, val, dom) {
  return branch$1(_isAttr$2(attr, val))(dom);
};

var index$13 = curry_1(isAttr$1);

// _isData :: String -> String -> DOM Element -> Future Error Bool
var _isData$1 = function _isData(prop, val, dom) {
  var result = isData(prop, val, dom);

  return result !== null ? lib.of(result) : lib.rejected({
    error: 'There is not a data-attribute with the following name on this element: ' + prop
  });
};

var _isData$2 = curry_1(_isData$1);

// isData :: String -> String -> DOM Element -> Future Error Bool
var isData$1 = function isData(prop, val, dom) {
  return branch$1(_isData$2(prop, val))(dom);
};

var index$14 = curry_1(isData$1);

// _isProp :: String -> String -> DOM Element -> Future Error Bool
var _isProp$1 = function _isProp(prop, val, dom) {
  var result = isProp(prop, val, dom);

  return result !== null ? lib.of(result) : lib.rejected({
    error: 'There is not a property with the following name on this element: ' + prop
  });
};

var _isProp$2 = curry_1(_isProp$1);

// isProp :: String -> String -> DOM Element -> Future Error Bool
var isProp$1 = function isProp(prop, val, dom) {
  return branch$1(_isProp$2(prop, val))(dom);
};

var index$15 = curry_1(isProp$1);

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
var _isStyle$1 = function _isStyle(prop, val, dom) {
  var result = isStyle(prop, val, dom);

  return result !== null ? lib.of(result) : lib.rejected({
    error: 'There is not a style property with the following name on this element: ' + prop
  });
};

var _isStyle$2 = curry_1(_isStyle$1);

// isStyle :: String -> String -> DOM Element -> Future Error Bool
var isStyle$1 = function isStyle(prop, val, dom) {
  return branch$1(_isStyle$2(prop, val))(dom);
};

var index$16 = curry_1(isStyle$1);

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
var _on$1 = function _on(event, handler, dom) {
  return lib.of(on(event, handler, dom));
};

var _on$2 = curry_1(_on$1);

// _replaceClass :: String -> Future Error a -> DOM Element -> Future Error DOM Element
var _removeClass$1 = function _removeClass(event, handler, dom) {
  return branch$1(_on$2(event, handler))(dom);
};

var index$17 = curry_1(_removeClass$1);

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
var _removeAttr$1 = function _removeAttr(attr, dom) {
  return lib.of(removeAttr(attr, dom));
};

var _removeAttr$2 = curry_1(_removeAttr$1);

// removeAttr :: String -> DOM Element -> Future Error DOM Element
var removeAttr$1 = function removeAttr(attr, dom) {
  return branch$1(_removeAttr$2(attr))(dom);
};

var index$18 = curry_1(removeAttr$1);

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$2 = function _removeClass$$1(cn, dom) {
  return lib.of(_removeClass(cn, dom));
};

var _removeClass$3 = curry_1(_removeClass$2);

// removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var removeClass$1 = function removeClass(cn, dom) {
  return branch$1(_removeClass$3(cn))(dom);
};

var index$19 = curry_1(removeClass$1);

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$4 = function _removeClass$$1(ocn, ncn, dom) {
  return lib.of(replaceClass(ocn, ncn, dom));
};

var _replaceClass$1 = curry_1(_removeClass$4);

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$5 = function _removeClass(ocn, ncn, dom) {
  return branch$1(_replaceClass$1(ocn, ncn))(dom);
};

var index$20 = curry_1(_removeClass$5);

var fork = function fork(rej, res, task) {
  return task.fork(rej, res);
};

var fork$1 = curry_1(fork);

// runOnEvent :: (Error -> c) -> (a -> b) -> (Event -> Future Error a) -> (Event -> Cancel)
var runOnEvent = function runOnEvent(rej, res, fn) {
  return compose_1(fork$1(rej, res), fn);
};

var index$21 = curry_1(runOnEvent);

// _serialize :: Form Element -> Future e {Input Name: Input Value}
var _serialize$1 = function _serialize$$1(form) {
  var result = _serialize(form);

  return result ? lib.of(result) : lib.rejected({
    error: 'Element supplied is not a valid DOM Form Element.'
  });
};

// serialize :: Form Element -> Future e {Input Name: Input Value}
var serialize$1 = function serialize(form) {
  return branch$1(_serialize$1)(form);
};

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var _setAttr$1 = function _setAttr(attr, val, dom) {
  return lib.of(setAttr(attr, val, dom));
};

var _setAttr$2 = curry_1(_setAttr$1);

// setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var setAttr$1 = function setAttr(attr, val, dom) {
  return branch$1(_setAttr$2(attr, val))(dom);
};

var index$22 = curry_1(setAttr$1);

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
var _setData$1 = function _setData(prop, val, dom) {
  var result = setData(prop, val, dom);

  return result ? lib.of(result) : lib.rejected({
    error: 'The following data attribute you passed in is not valid: ' + prop
  });
};

var _setData$2 = curry_1(_setData$1);

// setData:: String -> String -> DOM Element -> Future Error DOM Element
var setData$1 = function setData(prop, val, dom) {
  return branch$1(_setData$2(prop, val))(dom);
};

var index$23 = curry_1(setData$1);

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
var _setProp$1 = function _setProp(prop, val, dom) {
  return lib.of(setProp(prop, val, dom));
};

var _setProp$2 = curry_1(_setProp$1);

// setProp :: String -> String -> DOM Element -> Future Error DOM Element
var setProp$1 = function setProp(prop, val, dom) {
  return branch$1(_setProp$2(prop, val))(dom);
};

var index$24 = curry_1(setProp$1);

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
var _setStyle$1 = function _setStyle(prop, val, dom) {
  return lib.of(setStyle(prop, val, dom));
};

var _setStyle$2 = curry_1(_setStyle$1);

// setStyle :: String -> String -> DOM Element -> Future Error DOM Element
var setStyle$1 = function setStyle(prop, val, dom) {
  return branch$1(_setStyle$2(prop, val))(dom);
};

var index$25 = curry_1(setStyle$1);

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
var _toggleClass = function _toggleClass(cn, dom) {
  return lib.of(toggleClass(cn, dom));
};

var _toggleClass$1 = curry_1(_toggleClass);

// toggleClass :: String -> DOM Element -> Future Error DOM Element
var toggleClass$2 = function toggleClass(cn, dom) {
  return branch$1(_toggleClass$1(cn))(dom);
};

var index$26 = curry_1(toggleClass$2);

var identity = function identity(a) {
  return a;
}; // eslint-disable-line no-empty-function
var globalFindParent = findParent$2(false);

exports.addClass = index$1;
exports.classList = index$2;
exports.dom = _dom$1;
exports.domAll = _domAll$1;
exports.findParent = globalFindParent;
exports.forkOnEvent = index$21;
exports.getAttr = index$3;
exports.getClass = index$4;
exports.getClasses = getClasses$1;
exports.getData = index$5;
exports.getProp = index$6;
exports.getStyle = index$7;
exports.hasAttr = index$8;
exports.hasClass = index$9;
exports.hasData = index$10;
exports.hasProp = index$11;
exports.hasStyle = index$12;
exports.isAttr = index$13;
exports.isData = index$14;
exports.isProp = index$15;
exports.isStyle = index$16;
exports.identity = identity;
exports.on = index$17;
exports.removeAttr = index$18;
exports.removeClass = index$19;
exports.replaceClass = index$20;
exports.serialize = serialize$1;
exports.setAttr = index$22;
exports.setData = index$23;
exports.setProp = index$24;
exports.setStyle = index$25;
exports.toggleClass = index$26;

Object.defineProperty(exports, '__esModule', { value: true });

})));
