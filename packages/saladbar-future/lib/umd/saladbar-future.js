(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.saladbarFuture = {})));
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sanctuaryTypeIdentifiers = createCommonjsModule(function (module) {
/*
        @@@@@@@            @@@@@@@         @@
      @@       @@        @@       @@      @@@
    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
      @@                 @@                           @@  @@
        @@@@@@@            @@@@@@@               @@@@@    @@
                                                          */
//. # sanctuary-type-identifiers
//.
//. A type is a set of values. Boolean, for example, is the type comprising
//. `true` and `false`. A value may be a member of multiple types (`42` is a
//. member of Number, PositiveNumber, Integer, and many other types).
//.
//. In certain situations it is useful to divide JavaScript values into
//. non-overlapping types. The language provides two constructs for this
//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
//. Each has pros and cons, but neither supports user-defined types.
//.
//. sanctuary-type-identifiers comprises:
//.
//.   - an npm and browser -compatible package for deriving the
//.     _type identifier_ of a JavaScript value; and
//.   - a specification which authors may follow to specify type
//.     identifiers for their types.
//.
//. ### Specification
//.
//. For a type to be compatible with the algorithm:
//.
//.   - every member of the type MUST have a `constructor` property
//.     pointing to an object known as the _type representative_;
//.
//.   - the type representative MUST have a `@@type` property
//.     (the _type identifier_); and
//.
//.   - the type identifier MUST be a string primitive and SHOULD have
//.     format `'<namespace>/<name>[@<version>]'`, where:
//.
//.       - `<namespace>` MUST consist of one or more characters, and
//.         SHOULD equal the name of the npm package which defines the
//.         type (including [scope][3] where appropriate);
//.
//.       - `<name>` MUST consist of one or more characters, and SHOULD
//.         be the unique name of the type; and
//.
//.       - `<version>` MUST consist of one or more digits, and SHOULD
//.         represent the version of the type.
//.
//. If the type identifier does not conform to the format specified above,
//. it is assumed that the entire string represents the _name_ of the type;
//. _namespace_ will be `null` and _version_ will be `0`.
//.
//. If the _version_ is not given, it is assumed to be `0`.
//.
//. For example:
//.
//. ```javascript
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   if (!(this instanceof Identity)) return new Identity(x);
//.   this.value = x;
//. }
//.
//. Identity['@@type'] = 'my-package/Identity';
//. ```
//.
//. Note that by using a constructor function the `constructor` property is set
//. implicitly for each value created. Constructor functions are convenient for
//. this reason, but are not required. This definition is also valid:
//.
//. ```javascript
//. //  IdentityTypeRep :: TypeRep Identity
//. var IdentityTypeRep = {
//.   '@@type': 'my-package/Identity'
//. };
//.
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   return {constructor: IdentityTypeRep, value: x};
//. }
//. ```

(function (f) {

  {
    module.exports = f();
  }
})(function () {

  //  $$type :: String

  var $$type = '@@type';

  //  pattern :: RegExp
  var pattern = new RegExp('^' + '([\\s\\S]+)' //  <namespace>
  + '/' //  SOLIDUS (U+002F)
  + '([\\s\\S]+?)' //  <name>
  + '(?:' //  optional non-capturing group {
  + '@' //    COMMERCIAL AT (U+0040)
  + '([0-9]+)' //    <version>
  + ')?' //  }
  + '$');

  //. ### Usage
  //.
  //. ```javascript
  //. const type = require('sanctuary-type-identifiers');
  //. ```
  //.
  //. ```javascript
  //. > function Identity(x) {
  //. .   if (!(this instanceof Identity)) return new Identity(x);
  //. .   this.value = x;
  //. . }
  //. . Identity['@@type'] = 'my-package/Identity@1';
  //.
  //. > type.parse(type(Identity(0)))
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  //.
  //. ### API
  //.
  //# type :: Any -> String
  //.
  //. Takes any value and returns a string which identifies its type. If the
  //. value conforms to the [specification][4], the custom type identifier is
  //. returned.
  //.
  //. ```javascript
  //. > type(null)
  //. 'Null'
  //.
  //. > type(true)
  //. 'Boolean'
  //.
  //. > type(Identity(0))
  //. 'my-package/Identity@1'
  //. ```
  function type(x) {
    return x != null && x.constructor != null && x.constructor.prototype !== x && typeof x.constructor[$$type] === 'string' ? x.constructor[$$type] : Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
  }

  //# type.parse :: String -> { namespace :: Nullable String, name :: String, version :: Number }
  //.
  //. Takes any string and parses it according to the [specification][4],
  //. returning an object with `namespace`, `name`, and `version` fields.
  //.
  //. ```javascript
  //. > type.parse('my-package/List@2')
  //. {namespace: 'my-package', name: 'List', version: 2}
  //.
  //. > type.parse('nonsense!')
  //. {namespace: null, name: 'nonsense!', version: 0}
  //.
  //. > type.parse(Identity['@@type'])
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  type.parse = function parse(s) {
    var groups = pattern.exec(s);
    return {
      namespace: groups == null || groups[1] == null ? null : groups[1],
      name: groups == null ? s : groups[2],
      version: groups == null || groups[3] == null ? 0 : Number(groups[3])
    };
  };

  return type;
});

//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//. [3]: https://docs.npmjs.com/misc/scope
//. [4]: #specification
});

var sanctuaryTypeClasses = createCommonjsModule(function (module) {
/*
             ############                  #
            ############                  ###
                  #####                  #####
                #####      ####################
              #####       ######################
            #####                     ###########
          #####         ######################
        #####          ####################
      #####                        #####
     ############                 ###
    ############                 */

//. # sanctuary-type-classes
//.
//. The [Fantasy Land Specification][FL] "specifies interoperability of common
//. algebraic structures" by defining a number of type classes. For each type
//. class, it states laws which every member of a type must obey in order for
//. the type to be a member of the type class. In order for the Maybe type to
//. be considered a [Functor][], for example, every `Maybe a` value must have
//. a `fantasy-land/map` method which obeys the identity and composition laws.
//.
//. This project provides:
//.
//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
//.   - one `TypeClass` value for each Fantasy Land type class;
//.   - lawful Fantasy Land methods for JavaScript's built-in types;
//.   - one function for each Fantasy Land method; and
//.   - several functions derived from these functions.
//.
//. ## Type-class hierarchy
//.
/* eslint-disable max-len */
//. <pre>
//.  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
//. (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
//.     |           |           |           \         / | | | | \
//.     |           |           |            \       /  | | | |  \
//.     |           |           |             \     /   | | | |   \
//.     |           |           |              \   /    | | | |    \
//.     |           |           |               \ /     | | | |     \
//.    Ord      Category     Monoid         Traversable | | | |      \
//.   (lte)       (id)       (empty)        (traverse)  / | | \       \
//.                             |                      /  | |  \       \
//.                             |                     /   / \   \       \
//.                             |             Profunctor /   \ Bifunctor \
//.                             |              (promap) /     \ (bimap)   \
//.                             |                      /       \           \
//.                           Group                   /         \           \
//.                          (invert)               Alt        Apply      Extend
//.                                                (alt)        (ap)     (extend)
//.                                                 /           / \           \
//.                                                /           /   \           \
//.                                               /           /     \           \
//.                                              /           /       \           \
//.                                             /           /         \           \
//.                                           Plus    Applicative    Chain      Comonad
//.                                          (zero)       (of)      (chain)    (extract)
//.                                             \         / \         / \
//.                                              \       /   \       /   \
//.                                               \     /     \     /     \
//.                                                \   /       \   /       \
//.                                                 \ /         \ /         \
//.                                             Alternative    Monad     ChainRec
//.                                                                     (chainRec)
//. </pre>
/* eslint-enable max-len */
//.
//. ## API

(function (f) {

  /* istanbul ignore else */

  {
    module.exports = f(sanctuaryTypeIdentifiers);
  }
})(function (type) {

  /* istanbul ignore if */

  if (typeof __doctest !== 'undefined') {
    /* global __doctest:false */
    /* eslint-disable no-unused-vars */
    var Identity = __doctest.require('./test/Identity');
    var List = __doctest.require('./test/List');
    var Maybe = __doctest.require('./test/Maybe');
    var Sum = __doctest.require('./test/Sum');
    var Tuple = __doctest.require('./test/Tuple');

    var Nil = List.Nil,
        Cons = List.Cons;
    var Nothing = Maybe.Nothing,
        Just = Maybe.Just;
    /* eslint-enable no-unused-vars */
  }

  //  concat_ :: Array a -> Array a -> Array a
  function concat_(xs) {
    return function (ys) {
      return xs.concat(ys);
    };
  }

  //  constant :: a -> b -> a
  function constant(x) {
    return function (y) {
      return x;
    };
  }

  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
  function forEachKey(strMap, f) {
    Object.keys(strMap).forEach(f, strMap);
  }

  //  has :: (String, Object) -> Boolean
  function has(k, o) {
    return Object.prototype.hasOwnProperty.call(o, k);
  }

  //  identity :: a -> a
  function identity(x) {
    return x;
  }

  //  pair :: a -> b -> Pair a b
  function pair(x) {
    return function (y) {
      return [x, y];
    };
  }

  //  sameType :: (a, b) -> Boolean
  function sameType(x, y) {
    return typeof x === typeof y && type(x) === type(y);
  }

  //  type Iteration a = { value :: a, done :: Boolean }

  //  iterationNext :: a -> Iteration a
  function iterationNext(x) {
    return { value: x, done: false };
  }

  //  iterationDone :: a -> Iteration a
  function iterationDone(x) {
    return { value: x, done: true };
  }

  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
  //.
  //. The arguments are:
  //.
  //.   - the name of the type class, prefixed by its npm package name;
  //.   - the documentation URL of the type class;
  //.   - an array of dependencies; and
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if the value satisfies the requirements of the type class; `false`
  //.     otherwise.
  //.
  //. Example:
  //.
  //. ```javascript
  //. //    hasMethod :: String -> a -> Boolean
  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
  //.
  //. //    Foo :: TypeClass
  //. const Foo = Z.TypeClass(
  //.   'my-package/Foo',
  //.   'http://example.com/my-package#Foo',
  //.   [],
  //.   hasMethod('foo')
  //. );
  //.
  //. //    Bar :: TypeClass
  //. const Bar = Z.TypeClass(
  //.   'my-package/Bar',
  //.   'http://example.com/my-package#Bar',
  //.   [Foo],
  //.   hasMethod('bar')
  //. );
  //. ```
  //.
  //. Types whose values have a `foo` method are members of the Foo type class.
  //. Members of the Foo type class whose values have a `bar` method are also
  //. members of the Bar type class.
  //.
  //. Each `TypeClass` value has a `test` field: a function which accepts
  //. any JavaScript value and returns `true` if the value satisfies the
  //. type class's predicate and the predicates of all the type class's
  //. dependencies; `false` otherwise.
  //.
  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
  //. to define parametrically polymorphic functions which verify their
  //. type-class constraints at run time.
  function TypeClass(name, url, dependencies, test) {
    if (!(this instanceof TypeClass)) {
      return new TypeClass(name, url, dependencies, test);
    }
    this.name = name;
    this.url = url;
    this.test = function (x) {
      return dependencies.every(function (d) {
        return d.test(x);
      }) && test(x);
    };
  }

  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass';

  //  data Location = Constructor | Value

  //  Constructor :: Location
  var Constructor = 'Constructor';

  //  Value :: Location
  var Value = 'Value';

  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
  function _funcPath(allowInheritedProps, path, _x) {
    var x = _x;
    for (var idx = 0; idx < path.length; idx += 1) {
      var k = path[idx];
      if (x == null || !(allowInheritedProps || has(k, x))) return null;
      x = x[k];
    }
    return typeof x === 'function' ? x : null;
  }

  //  funcPath :: (Array String, a) -> Nullable Function
  function funcPath(path, x) {
    return _funcPath(true, path, x);
  }

  //  implPath :: Array String -> Nullable Function
  function implPath(path) {
    return _funcPath(false, path, implementations);
  }

  //  functionName :: Function -> String
  var functionName = has('name', function f() {}) ? function functionName(f) {
    return f.name;
  } :
  /* istanbul ignore next */
  function functionName(f) {
    var match = /function (\w*)/.exec(f);
    return match == null ? '' : match[1];
  };

  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
  function $(_name, dependencies, requirements) {
    function getBoundMethod(_name) {
      var name = 'fantasy-land/' + _name;
      return requirements[_name] === Constructor ? function (typeRep) {
        var f = funcPath([name], typeRep);
        return f == null && typeof typeRep === 'function' ? implPath([functionName(typeRep), name]) : f;
      } : function (x) {
        var isPrototype = x != null && x.constructor != null && x.constructor.prototype === x;
        var m = null;
        if (!isPrototype) m = funcPath([name], x);
        if (m == null) m = implPath([type(x), 'prototype', name]);
        return m && m.bind(x);
      };
    }

    var version = '8.1.0'; // updated programmatically
    var keys = Object.keys(requirements);

    var typeClass = TypeClass('sanctuary-type-classes/' + _name, 'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version + '#' + _name, dependencies, function (x) {
      return keys.every(function (_name) {
        var arg = requirements[_name] === Constructor ? x.constructor : x;
        return getBoundMethod(_name)(arg) != null;
      });
    });

    typeClass.methods = keys.reduce(function (methods, _name) {
      methods[_name] = getBoundMethod(_name);
      return methods;
    }, {});

    return typeClass;
  }

  //# Setoid :: TypeClass
  //.
  //. `TypeClass` value for [Setoid][].
  //.
  //. ```javascript
  //. > Setoid.test(null)
  //. true
  //. ```
  var Setoid = $('Setoid', [], { equals: Value });

  //# Ord :: TypeClass
  //.
  //. `TypeClass` value for [Ord][].
  //.
  //. ```javascript
  //. > Ord.test(0)
  //. true
  //.
  //. > Ord.test(Math.sqrt)
  //. false
  //. ```
  var Ord = $('Ord', [Setoid], { lte: Value });

  //# Semigroupoid :: TypeClass
  //.
  //. `TypeClass` value for [Semigroupoid][].
  //.
  //. ```javascript
  //. > Semigroupoid.test(Math.sqrt)
  //. true
  //.
  //. > Semigroupoid.test(0)
  //. false
  //. ```
  var Semigroupoid = $('Semigroupoid', [], { compose: Value });

  //# Category :: TypeClass
  //.
  //. `TypeClass` value for [Category][].
  //.
  //. ```javascript
  //. > Category.test(Math.sqrt)
  //. true
  //.
  //. > Category.test(0)
  //. false
  //. ```
  var Category = $('Category', [Semigroupoid], { id: Constructor });

  //# Semigroup :: TypeClass
  //.
  //. `TypeClass` value for [Semigroup][].
  //.
  //. ```javascript
  //. > Semigroup.test('')
  //. true
  //.
  //. > Semigroup.test(0)
  //. false
  //. ```
  var Semigroup = $('Semigroup', [], { concat: Value });

  //# Monoid :: TypeClass
  //.
  //. `TypeClass` value for [Monoid][].
  //.
  //. ```javascript
  //. > Monoid.test('')
  //. true
  //.
  //. > Monoid.test(0)
  //. false
  //. ```
  var Monoid = $('Monoid', [Semigroup], { empty: Constructor });

  //# Group :: TypeClass
  //.
  //. `TypeClass` value for [Group][].
  //.
  //. ```javascript
  //. > Group.test(Sum(0))
  //. true
  //.
  //. > Group.test('')
  //. false
  //. ```
  var Group = $('Group', [Monoid], { invert: Value });

  //# Filterable :: TypeClass
  //.
  //. `TypeClass` value for [Filterable][].
  //.
  //. ```javascript
  //. > Filterable.test({})
  //. true
  //.
  //. > Filterable.test('')
  //. false
  //. ```
  var Filterable = $('Filterable', [], { filter: Value });

  //# Functor :: TypeClass
  //.
  //. `TypeClass` value for [Functor][].
  //.
  //. ```javascript
  //. > Functor.test([])
  //. true
  //.
  //. > Functor.test('')
  //. false
  //. ```
  var Functor = $('Functor', [], { map: Value });

  //# Bifunctor :: TypeClass
  //.
  //. `TypeClass` value for [Bifunctor][].
  //.
  //. ```javascript
  //. > Bifunctor.test(Tuple('foo', 64))
  //. true
  //.
  //. > Bifunctor.test([])
  //. false
  //. ```
  var Bifunctor = $('Bifunctor', [Functor], { bimap: Value });

  //# Profunctor :: TypeClass
  //.
  //. `TypeClass` value for [Profunctor][].
  //.
  //. ```javascript
  //. > Profunctor.test(Math.sqrt)
  //. true
  //.
  //. > Profunctor.test([])
  //. false
  //. ```
  var Profunctor = $('Profunctor', [Functor], { promap: Value });

  //# Apply :: TypeClass
  //.
  //. `TypeClass` value for [Apply][].
  //.
  //. ```javascript
  //. > Apply.test([])
  //. true
  //.
  //. > Apply.test('')
  //. false
  //. ```
  var Apply = $('Apply', [Functor], { ap: Value });

  //# Applicative :: TypeClass
  //.
  //. `TypeClass` value for [Applicative][].
  //.
  //. ```javascript
  //. > Applicative.test([])
  //. true
  //.
  //. > Applicative.test({})
  //. false
  //. ```
  var Applicative = $('Applicative', [Apply], { of: Constructor });

  //# Chain :: TypeClass
  //.
  //. `TypeClass` value for [Chain][].
  //.
  //. ```javascript
  //. > Chain.test([])
  //. true
  //.
  //. > Chain.test({})
  //. false
  //. ```
  var Chain = $('Chain', [Apply], { chain: Value });

  //# ChainRec :: TypeClass
  //.
  //. `TypeClass` value for [ChainRec][].
  //.
  //. ```javascript
  //. > ChainRec.test([])
  //. true
  //.
  //. > ChainRec.test({})
  //. false
  //. ```
  var ChainRec = $('ChainRec', [Chain], { chainRec: Constructor });

  //# Monad :: TypeClass
  //.
  //. `TypeClass` value for [Monad][].
  //.
  //. ```javascript
  //. > Monad.test([])
  //. true
  //.
  //. > Monad.test({})
  //. false
  //. ```
  var Monad = $('Monad', [Applicative, Chain], {});

  //# Alt :: TypeClass
  //.
  //. `TypeClass` value for [Alt][].
  //.
  //. ```javascript
  //. > Alt.test({})
  //. true
  //.
  //. > Alt.test('')
  //. false
  //. ```
  var Alt = $('Alt', [Functor], { alt: Value });

  //# Plus :: TypeClass
  //.
  //. `TypeClass` value for [Plus][].
  //.
  //. ```javascript
  //. > Plus.test({})
  //. true
  //.
  //. > Plus.test('')
  //. false
  //. ```
  var Plus = $('Plus', [Alt], { zero: Constructor });

  //# Alternative :: TypeClass
  //.
  //. `TypeClass` value for [Alternative][].
  //.
  //. ```javascript
  //. > Alternative.test([])
  //. true
  //.
  //. > Alternative.test({})
  //. false
  //. ```
  var Alternative = $('Alternative', [Applicative, Plus], {});

  //# Foldable :: TypeClass
  //.
  //. `TypeClass` value for [Foldable][].
  //.
  //. ```javascript
  //. > Foldable.test({})
  //. true
  //.
  //. > Foldable.test('')
  //. false
  //. ```
  var Foldable = $('Foldable', [], { reduce: Value });

  //# Traversable :: TypeClass
  //.
  //. `TypeClass` value for [Traversable][].
  //.
  //. ```javascript
  //. > Traversable.test([])
  //. true
  //.
  //. > Traversable.test('')
  //. false
  //. ```
  var Traversable = $('Traversable', [Functor, Foldable], { traverse: Value });

  //# Extend :: TypeClass
  //.
  //. `TypeClass` value for [Extend][].
  //.
  //. ```javascript
  //. > Extend.test([])
  //. true
  //.
  //. > Extend.test({})
  //. false
  //. ```
  var Extend = $('Extend', [Functor], { extend: Value });

  //# Comonad :: TypeClass
  //.
  //. `TypeClass` value for [Comonad][].
  //.
  //. ```javascript
  //. > Comonad.test(Identity(0))
  //. true
  //.
  //. > Comonad.test([])
  //. false
  //. ```
  var Comonad = $('Comonad', [Extend], { extract: Value });

  //# Contravariant :: TypeClass
  //.
  //. `TypeClass` value for [Contravariant][].
  //.
  //. ```javascript
  //. > Contravariant.test(Math.sqrt)
  //. true
  //.
  //. > Contravariant.test([])
  //. false
  //. ```
  var Contravariant = $('Contravariant', [], { contramap: Value });

  //  Null$prototype$toString :: Null ~> () -> String
  function Null$prototype$toString() {
    return 'null';
  }

  //  Null$prototype$equals :: Null ~> Null -> Boolean
  function Null$prototype$equals(other) {
    return true;
  }

  //  Null$prototype$lte :: Null ~> Null -> Boolean
  function Null$prototype$lte(other) {
    return true;
  }

  //  Undefined$prototype$toString :: Undefined ~> () -> String
  function Undefined$prototype$toString() {
    return 'undefined';
  }

  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$equals(other) {
    return true;
  }

  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$lte(other) {
    return true;
  }

  //  Boolean$prototype$toString :: Boolean ~> () -> String
  function Boolean$prototype$toString() {
    return typeof this === 'object' ? 'new Boolean(' + toString(this.valueOf()) + ')' : this.toString();
  }

  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$equals(other) {
    return typeof this === 'object' ? equals(this.valueOf(), other.valueOf()) : this === other;
  }

  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$lte(other) {
    return typeof this === 'object' ? lte(this.valueOf(), other.valueOf()) : this === false || other === true;
  }

  //  Number$prototype$toString :: Number ~> () -> String
  function Number$prototype$toString() {
    return typeof this === 'object' ? 'new Number(' + toString(this.valueOf()) + ')' : 1 / this === -Infinity ? '-0' : this.toString(10);
  }

  //  Number$prototype$equals :: Number ~> Number -> Boolean
  function Number$prototype$equals(other) {
    return typeof this === 'object' ? equals(this.valueOf(), other.valueOf()) : isNaN(this) && isNaN(other) || this === other;
  }

  //  Number$prototype$lte :: Number ~> Number -> Boolean
  function Number$prototype$lte(other) {
    return typeof this === 'object' ? lte(this.valueOf(), other.valueOf()) : isNaN(this) && isNaN(other) || this <= other;
  }

  //  Date$prototype$toString :: Date ~> () -> String
  function Date$prototype$toString() {
    var x = isNaN(this.valueOf()) ? NaN : this.toISOString();
    return 'new Date(' + toString(x) + ')';
  }

  //  Date$prototype$equals :: Date ~> Date -> Boolean
  function Date$prototype$equals(other) {
    return equals(this.valueOf(), other.valueOf());
  }

  //  Date$prototype$lte :: Date ~> Date -> Boolean
  function Date$prototype$lte(other) {
    return lte(this.valueOf(), other.valueOf());
  }

  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
  function RegExp$prototype$equals(other) {
    return other.source === this.source && other.global === this.global && other.ignoreCase === this.ignoreCase && other.multiline === this.multiline && other.sticky === this.sticky && other.unicode === this.unicode;
  }

  //  String$empty :: () -> String
  function String$empty() {
    return '';
  }

  //  String$prototype$toString :: String ~> () -> String
  function String$prototype$toString() {
    return typeof this === 'object' ? 'new String(' + toString(this.valueOf()) + ')' : JSON.stringify(this);
  }

  //  String$prototype$equals :: String ~> String -> Boolean
  function String$prototype$equals(other) {
    return typeof this === 'object' ? equals(this.valueOf(), other.valueOf()) : this === other;
  }

  //  String$prototype$lte :: String ~> String -> Boolean
  function String$prototype$lte(other) {
    return typeof this === 'object' ? lte(this.valueOf(), other.valueOf()) : this <= other;
  }

  //  String$prototype$concat :: String ~> String -> String
  function String$prototype$concat(other) {
    return this + other;
  }

  //  Array$empty :: () -> Array a
  function Array$empty() {
    return [];
  }

  //  Array$of :: a -> Array a
  function Array$of(x) {
    return [x];
  }

  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
  function Array$chainRec(f, x) {
    var $todo = [x];
    var $done = [];
    while ($todo.length > 0) {
      var xs = f(iterationNext, iterationDone, $todo.shift());
      var $more = [];
      for (var idx = 0; idx < xs.length; idx += 1) {
        (xs[idx].done ? $done : $more).push(xs[idx].value);
      }
      Array.prototype.unshift.apply($todo, $more);
    }
    return $done;
  }

  //  Array$zero :: () -> Array a
  function Array$zero() {
    return [];
  }

  //  Array$prototype$toString :: Array a ~> () -> String
  function Array$prototype$toString() {
    var reprs = this.map(toString);
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      if (!/^\d+$/.test(k)) {
        reprs.push(toString(k) + ': ' + toString(this[k]));
      }
    }
    return '[' + reprs.join(', ') + ']';
  }

  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
  function Array$prototype$equals(other) {
    if (other.length !== this.length) return false;
    for (var idx = 0; idx < this.length; idx += 1) {
      if (!equals(this[idx], other[idx])) return false;
    }
    return true;
  }

  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
  function Array$prototype$lte(other) {
    for (var idx = 0; true; idx += 1) {
      if (idx === this.length) return true;
      if (idx === other.length) return false;
      if (!equals(this[idx], other[idx])) return lte(this[idx], other[idx]);
    }
  }

  //  Array$prototype$concat :: Array a ~> Array a -> Array a
  function Array$prototype$concat(other) {
    return this.concat(other);
  }

  //  Array$prototype$filter :: Array a ~> (a -> Boolean) -> Array a
  function Array$prototype$filter(pred) {
    return this.filter(function (x) {
      return pred(x);
    });
  }

  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
  function Array$prototype$map(f) {
    return this.map(function (x) {
      return f(x);
    });
  }

  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
  function Array$prototype$ap(fs) {
    var result = [];
    for (var idx = 0; idx < fs.length; idx += 1) {
      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
        result.push(fs[idx](this[idx2]));
      }
    }
    return result;
  }

  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
  function Array$prototype$chain(f) {
    var result = [];
    this.forEach(function (x) {
      Array.prototype.push.apply(result, f(x));
    });
    return result;
  }

  //  Array$prototype$alt :: Array a ~> Array a -> Array a
  var Array$prototype$alt = Array$prototype$concat;

  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
  function Array$prototype$reduce(f, initial) {
    return this.reduce(function (acc, x) {
      return f(acc, x);
    }, initial);
  }

  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
  function Array$prototype$traverse(typeRep, f) {
    var xs = this;
    function go(idx, n) {
      switch (n) {
        case 0:
          return of(typeRep, []);
        case 2:
          return lift2(pair, f(xs[idx]), f(xs[idx + 1]));
        default:
          var m = Math.floor(n / 4) * 2;
          return lift2(concat_, go(idx, m), go(idx + m, n - m));
      }
    }
    return this.length % 2 === 1 ? lift2(concat_, map(Array$of, f(this[0])), go(1, this.length - 1)) : go(0, this.length);
  }

  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
  function Array$prototype$extend(f) {
    return this.map(function (_, idx, xs) {
      return f(xs.slice(idx));
    });
  }

  //  Arguments$prototype$toString :: Arguments ~> String
  function Arguments$prototype$toString() {
    var args = Array.prototype.map.call(this, toString).join(', ');
    return '(function () { return arguments; }(' + args + '))';
  }

  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$equals(other) {
    return Array$prototype$equals.call(this, other);
  }

  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$lte(other) {
    return Array$prototype$lte.call(this, other);
  }

  //  Error$prototype$toString :: Error ~> () -> String
  function Error$prototype$toString() {
    return 'new ' + this.name + '(' + toString(this.message) + ')';
  }

  //  Error$prototype$equals :: Error ~> Error -> Boolean
  function Error$prototype$equals(other) {
    return equals(this.name, other.name) && equals(this.message, other.message);
  }

  //  Object$empty :: () -> StrMap a
  function Object$empty() {
    return {};
  }

  //  Object$zero :: () -> StrMap a
  function Object$zero() {
    return {};
  }

  //  Object$prototype$toString :: StrMap a ~> () -> String
  function Object$prototype$toString() {
    var reprs = [];
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      reprs.push(toString(k) + ': ' + toString(this[k]));
    }
    return '{' + reprs.join(', ') + '}';
  }

  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$equals(other) {
    var self = this;
    var keys = Object.keys(this).sort();
    return equals(keys, Object.keys(other).sort()) && keys.every(function (k) {
      return equals(self[k], other[k]);
    });
  }

  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$lte(other) {
    var theseKeys = Object.keys(this).sort();
    var otherKeys = Object.keys(other).sort();
    while (true) {
      if (theseKeys.length === 0) return true;
      if (otherKeys.length === 0) return false;
      var k = theseKeys.shift();
      var z = otherKeys.shift();
      if (k < z) return true;
      if (k > z) return false;
      if (!equals(this[k], other[k])) return lte(this[k], other[k]);
    }
  }

  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
  function Object$prototype$concat(other) {
    var result = {};
    function assign(k) {
      result[k] = this[k];
    }
    forEachKey(this, assign);
    forEachKey(other, assign);
    return result;
  }

  //  Object$prototype$filter :: StrMap a ~> (a -> Boolean) -> StrMap a
  function Object$prototype$filter(pred) {
    var result = {};
    forEachKey(this, function (k) {
      if (pred(this[k])) result[k] = this[k];
    });
    return result;
  }

  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
  function Object$prototype$map(f) {
    var result = {};
    forEachKey(this, function (k) {
      result[k] = f(this[k]);
    });
    return result;
  }

  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
  function Object$prototype$ap(other) {
    var result = {};
    forEachKey(this, function (k) {
      if (has(k, other)) result[k] = other[k](this[k]);
    });
    return result;
  }

  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
  var Object$prototype$alt = Object$prototype$concat;

  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
  function Object$prototype$reduce(f, initial) {
    var self = this;
    function reducer(acc, k) {
      return f(acc, self[k]);
    }
    return Object.keys(this).sort().reduce(reducer, initial);
  }

  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
  function Object$prototype$traverse(typeRep, f) {
    var self = this;
    return Object.keys(this).reduce(function (applicative, k) {
      function set(o) {
        return function (v) {
          var singleton = {};singleton[k] = v;
          return Object$prototype$concat.call(o, singleton);
        };
      }
      return lift2(set, applicative, f(self[k]));
    }, of(typeRep, {}));
  }

  //  Function$id :: () -> a -> a
  function Function$id() {
    return identity;
  }

  //  Function$of :: b -> (a -> b)
  function Function$of(x) {
    return function (_) {
      return x;
    };
  }

  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
  function Function$chainRec(f, x) {
    return function (a) {
      var step = iterationNext(x);
      while (!step.done) {
        step = f(iterationNext, iterationDone, step.value)(a);
      }
      return step.value;
    };
  }

  //  Function$prototype$equals :: Function ~> Function -> Boolean
  function Function$prototype$equals(other) {
    return other === this;
  }

  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$compose(other) {
    var semigroupoid = this;
    return function (x) {
      return other(semigroupoid(x));
    };
  }

  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$map(f) {
    var functor = this;
    return function (x) {
      return f(functor(x));
    };
  }

  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
  function Function$prototype$promap(f, g) {
    var profunctor = this;
    return function (x) {
      return g(profunctor(f(x)));
    };
  }

  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
  function Function$prototype$ap(f) {
    var apply = this;
    return function (x) {
      return f(x)(apply(x));
    };
  }

  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
  function Function$prototype$chain(f) {
    var chain = this;
    return function (x) {
      return f(chain(x))(x);
    };
  }

  //  Function$prototype$extend :: Semigroup a => (a -> b) ~> ((a -> b) -> c) -> (a -> c)
  function Function$prototype$extend(f) {
    var extend = this;
    return function (x) {
      return f(function (y) {
        return extend(concat(x, y));
      });
    };
  }

  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
  function Function$prototype$contramap(f) {
    var contravariant = this;
    return function (x) {
      return contravariant(f(x));
    };
  }

  /* eslint-disable key-spacing */
  var implementations = {
    Null: {
      prototype: {
        toString: Null$prototype$toString,
        'fantasy-land/equals': Null$prototype$equals,
        'fantasy-land/lte': Null$prototype$lte
      }
    },
    Undefined: {
      prototype: {
        toString: Undefined$prototype$toString,
        'fantasy-land/equals': Undefined$prototype$equals,
        'fantasy-land/lte': Undefined$prototype$lte
      }
    },
    Boolean: {
      prototype: {
        toString: Boolean$prototype$toString,
        'fantasy-land/equals': Boolean$prototype$equals,
        'fantasy-land/lte': Boolean$prototype$lte
      }
    },
    Number: {
      prototype: {
        toString: Number$prototype$toString,
        'fantasy-land/equals': Number$prototype$equals,
        'fantasy-land/lte': Number$prototype$lte
      }
    },
    Date: {
      prototype: {
        toString: Date$prototype$toString,
        'fantasy-land/equals': Date$prototype$equals,
        'fantasy-land/lte': Date$prototype$lte
      }
    },
    RegExp: {
      prototype: {
        'fantasy-land/equals': RegExp$prototype$equals
      }
    },
    String: {
      'fantasy-land/empty': String$empty,
      prototype: {
        toString: String$prototype$toString,
        'fantasy-land/equals': String$prototype$equals,
        'fantasy-land/lte': String$prototype$lte,
        'fantasy-land/concat': String$prototype$concat
      }
    },
    Array: {
      'fantasy-land/empty': Array$empty,
      'fantasy-land/of': Array$of,
      'fantasy-land/chainRec': Array$chainRec,
      'fantasy-land/zero': Array$zero,
      prototype: {
        toString: Array$prototype$toString,
        'fantasy-land/equals': Array$prototype$equals,
        'fantasy-land/lte': Array$prototype$lte,
        'fantasy-land/concat': Array$prototype$concat,
        'fantasy-land/filter': Array$prototype$filter,
        'fantasy-land/map': Array$prototype$map,
        'fantasy-land/ap': Array$prototype$ap,
        'fantasy-land/chain': Array$prototype$chain,
        'fantasy-land/alt': Array$prototype$alt,
        'fantasy-land/reduce': Array$prototype$reduce,
        'fantasy-land/traverse': Array$prototype$traverse,
        'fantasy-land/extend': Array$prototype$extend
      }
    },
    Arguments: {
      prototype: {
        toString: Arguments$prototype$toString,
        'fantasy-land/equals': Arguments$prototype$equals,
        'fantasy-land/lte': Arguments$prototype$lte
      }
    },
    Error: {
      prototype: {
        toString: Error$prototype$toString,
        'fantasy-land/equals': Error$prototype$equals
      }
    },
    Object: {
      'fantasy-land/empty': Object$empty,
      'fantasy-land/zero': Object$zero,
      prototype: {
        toString: Object$prototype$toString,
        'fantasy-land/equals': Object$prototype$equals,
        'fantasy-land/lte': Object$prototype$lte,
        'fantasy-land/concat': Object$prototype$concat,
        'fantasy-land/filter': Object$prototype$filter,
        'fantasy-land/map': Object$prototype$map,
        'fantasy-land/ap': Object$prototype$ap,
        'fantasy-land/alt': Object$prototype$alt,
        'fantasy-land/reduce': Object$prototype$reduce,
        'fantasy-land/traverse': Object$prototype$traverse
      }
    },
    Function: {
      'fantasy-land/id': Function$id,
      'fantasy-land/of': Function$of,
      'fantasy-land/chainRec': Function$chainRec,
      prototype: {
        'fantasy-land/equals': Function$prototype$equals,
        'fantasy-land/compose': Function$prototype$compose,
        'fantasy-land/map': Function$prototype$map,
        'fantasy-land/promap': Function$prototype$promap,
        'fantasy-land/ap': Function$prototype$ap,
        'fantasy-land/chain': Function$prototype$chain,
        'fantasy-land/extend': Function$prototype$extend,
        'fantasy-land/contramap': Function$prototype$contramap
      }
    }
  };
  /* eslint-enable key-spacing */

  //# toString :: a -> String
  //.
  //. Returns a useful string representation of its argument.
  //.
  //. Dispatches to the argument's `toString` method if appropriate.
  //.
  //. Where practical, `equals(eval(toString(x)), x) = true`.
  //.
  //. `toString` implementations are provided for the following built-in types:
  //. Null, Undefined, Boolean, Number, Date, String, Array, Arguments, Error,
  //. and Object.
  //.
  //. ```javascript
  //. > toString(-0)
  //. '-0'
  //.
  //. > toString(['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > toString({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > toString(Cons(1, Cons(2, Cons(3, Nil))))
  //. 'Cons(1, Cons(2, Cons(3, Nil)))'
  //. ```
  var toString = function () {
    //  $seen :: Array Any
    var $seen = [];

    function call(method, x) {
      $seen.push(x);
      try {
        return method.call(x);
      } finally {
        $seen.pop();
      }
    }

    return function toString(x) {
      if ($seen.indexOf(x) >= 0) return '<Circular>';

      var xType = type(x);
      if (xType === 'Object') {
        var result;
        try {
          result = call(x.toString, x);
        } catch (err) {}
        if (result != null && result !== '[object Object]') return result;
      }

      return call(implPath([xType, 'prototype', 'toString']) || x.toString, x);
    };
  }();

  //# equals :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and equal according
  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
  //.
  //. `fantasy-land/equals` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
  //. Array, Arguments, Error, Object, and Function.
  //.
  //. The algorithm supports circular data structures. Two arrays are equal
  //. if they have the same index paths and for each path have equal values.
  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
  //. are equal even if their internal structures differ. Two objects are equal
  //. if they have the same property paths and for each path have equal values.
  //.
  //. ```javascript
  //. > equals(0, -0)
  //. true
  //.
  //. > equals(NaN, NaN)
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('foo', Cons('bar', Nil)))
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('bar', Cons('foo', Nil)))
  //. false
  //. ```
  var equals = function () {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function equals(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function (p) {
        return p[0] === x && p[1] === y;
      })) {
        return true;
      }

      $pairs.push([x, y]);
      try {
        return Setoid.test(x) && Setoid.test(y) && Setoid.methods.equals(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }();

  //# lt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. less than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`gt`](#gt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lt(0, 0)
  //. false
  //.
  //. > lt(0, 1)
  //. true
  //.
  //. > lt(1, 0)
  //. false
  //. ```
  function lt(x, y) {
    return sameType(x, y) && !lte(y, x);
  }

  //# lte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is less than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. `fantasy-land/lte` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
  //. Arguments, and Object.
  //.
  //. The algorithm supports circular data structures in the same manner as
  //. [`equals`](#equals).
  //.
  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lte(0, 0)
  //. true
  //.
  //. > lte(0, 1)
  //. true
  //.
  //. > lte(1, 0)
  //. false
  //. ```
  var lte = function () {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function lte(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function (p) {
        return p[0] === x && p[1] === y;
      })) {
        return equals(x, y);
      }

      $pairs.push([x, y]);
      try {
        return Ord.test(x) && Ord.test(y) && Ord.methods.lte(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }();

  //# gt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. greater than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > gt(0, 0)
  //. false
  //.
  //. > gt(0, 1)
  //. false
  //.
  //. > gt(1, 0)
  //. true
  //. ```
  function gt(x, y) {
    return lt(y, x);
  }

  //# gte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is greater than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gt`](#gt).
  //.
  //. ```javascript
  //. > gte(0, 0)
  //. true
  //.
  //. > gte(0, 1)
  //. false
  //.
  //. > gte(1, 0)
  //. true
  //. ```
  function gte(x, y) {
    return lte(y, x);
  }

  //# min :: Ord a => (a, a) -> a
  //.
  //. Returns the smaller of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > min(10, 2)
  //. 2
  //.
  //. > min(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('1999-12-31')
  //.
  //. > min('10', '2')
  //. '10'
  //. ```
  function min(x, y) {
    return lte(x, y) ? x : y;
  }

  //# max :: Ord a => (a, a) -> a
  //.
  //. Returns the larger of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > max(10, 2)
  //. 10
  //.
  //. > max(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('2000-01-01')
  //.
  //. > max('10', '2')
  //. '2'
  //. ```
  function max(x, y) {
    return lte(x, y) ? y : x;
  }

  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
  //.
  //. Function wrapper for [`fantasy-land/compose`][].
  //.
  //. `fantasy-land/compose` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > compose(Math.sqrt, x => x + 1)(99)
  //. 10
  //. ```
  function compose(x, y) {
    return Semigroupoid.methods.compose(y)(x);
  }

  //# id :: Category c => TypeRep c -> c
  //.
  //. Function wrapper for [`fantasy-land/id`][].
  //.
  //. `fantasy-land/id` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > id(Function)('foo')
  //. 'foo'
  //. ```
  function id(typeRep) {
    return Category.methods.id(typeRep)();
  }

  //# concat :: Semigroup a => (a, a) -> a
  //.
  //. Function wrapper for [`fantasy-land/concat`][].
  //.
  //. `fantasy-land/concat` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > concat('abc', 'def')
  //. 'abcdef'
  //.
  //. > concat([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > concat({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > concat(Cons('foo', Cons('bar', Cons('baz', Nil))), Cons('quux', Nil))
  //. Cons('foo', Cons('bar', Cons('baz', Cons('quux', Nil))))
  //. ```
  function concat(x, y) {
    return Semigroup.methods.concat(x)(y);
  }

  //# empty :: Monoid m => TypeRep m -> m
  //.
  //. Function wrapper for [`fantasy-land/empty`][].
  //.
  //. `fantasy-land/empty` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > empty(String)
  //. ''
  //.
  //. > empty(Array)
  //. []
  //.
  //. > empty(Object)
  //. {}
  //.
  //. > empty(List)
  //. Nil
  //. ```
  function empty(typeRep) {
    return Monoid.methods.empty(typeRep)();
  }

  //# invert :: Group g => g -> g
  //.
  //. Function wrapper for [`fantasy-land/invert`][].
  //.
  //. ```javascript
  //. > invert(Sum(5))
  //. Sum(-5)
  //. ```
  function invert(group) {
    return Group.methods.invert(group)();
  }

  //# filter :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/filter`][]. Discards every element
  //. which does not satisfy the predicate.
  //.
  //. `fantasy-land/filter` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`reject`](#reject).
  //.
  //. ```javascript
  //. > filter(x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filter(x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {x: 1, z: 3}
  //.
  //. > filter(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > filter(x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > filter(x => x % 2 == 1, Just(0))
  //. Nothing
  //.
  //. > filter(x => x % 2 == 1, Just(1))
  //. Just(1)
  //. ```
  function filter(pred, filterable) {
    return Filterable.methods.filter(filterable)(pred);
  }

  //# reject :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Discards every element which satisfies the predicate.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. ```javascript
  //. > reject(x => x % 2 == 1, [1, 2, 3])
  //. [2]
  //.
  //. > reject(x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {y: 2}
  //.
  //. > reject(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(2, Nil)
  //.
  //. > reject(x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > reject(x => x % 2 == 1, Just(0))
  //. Just(0)
  //.
  //. > reject(x => x % 2 == 1, Just(1))
  //. Nothing
  //. ```
  function reject(pred, filterable) {
    return filter(function (x) {
      return !pred(x);
    }, filterable);
  }

  //# takeWhile :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Discards the first element which does not satisfy the predicate, and all
  //. subsequent elements.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > takeWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx']
  //.
  //. > takeWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy']
  //.
  //. > takeWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. []
  //. ```
  function takeWhile(pred, filterable) {
    var take = true;
    return filter(function (x) {
      return take = take && pred(x);
    }, filterable);
  }

  //# dropWhile :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Retains the first element which does not satisfy the predicate, and all
  //. subsequent elements.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > dropWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xz', 'yx', 'yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx', 'yz', 'zx', 'zy']
  //. ```
  function dropWhile(pred, filterable) {
    var take = false;
    return filter(function (x) {
      return take = take || !pred(x);
    }, filterable);
  }

  //# map :: Functor f => (a -> b, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/map`][].
  //.
  //. `fantasy-land/map` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > map(Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > map(Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > map(Math.sqrt, s => s.length)('Sanctuary')
  //. 3
  //.
  //. > map(Math.sqrt, Tuple('foo', 64))
  //. Tuple('foo', 8)
  //.
  //. > map(Math.sqrt, Nil)
  //. Nil
  //.
  //. > map(Math.sqrt, Cons(1, Cons(4, Cons(9, Nil))))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function map(f, functor) {
    return Functor.methods.map(functor)(f);
  }

  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
  //.
  //. Function wrapper for [`fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > bimap(s => s.toUpperCase(), Math.sqrt, Tuple('foo', 64))
  //. Tuple('FOO', 8)
  //. ```
  function bimap(f, g, bifunctor) {
    return Bifunctor.methods.bimap(bifunctor)(f, g);
  }

  //# mapLeft :: Bifunctor f => (a -> b, f a c) -> f b c
  //.
  //. Maps the given function over the left side of a Bifunctor.
  //.
  //. ```javascript
  //. > mapLeft(Math.sqrt, Tuple(64, 9))
  //. Tuple(8, 9)
  //. ```
  function mapLeft(f, bifunctor) {
    return bimap(f, identity, bifunctor);
  }

  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
  //.
  //. Function wrapper for [`fantasy-land/promap`][].
  //.
  //. `fantasy-land/promap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > promap(Math.abs, x => x + 1, Math.sqrt)(-100)
  //. 11
  //. ```
  function promap(f, g, profunctor) {
    return Profunctor.methods.promap(profunctor)(f, g);
  }

  //# ap :: Apply f => (f (a -> b), f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/ap`][].
  //.
  //. `fantasy-land/ap` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > ap([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > ap({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
  //. {a: 4, b: 100}
  //.
  //. > ap(s => n => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //.
  //. > ap(Identity(Math.sqrt), Identity(64))
  //. Identity(8)
  //.
  //. > ap(Cons(Math.sqrt, Cons(x => x * x, Nil)), Cons(16, Cons(100, Nil)))
  //. Cons(4, Cons(10, Cons(256, Cons(10000, Nil))))
  //. ```
  function ap(applyF, applyX) {
    return Apply.methods.ap(applyX)(applyF);
  }

  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
  //.
  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
  //. result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift3`](#lift3).
  //.
  //. ```javascript
  //. > lift2(x => y => Math.pow(x, y), [10], [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > lift2(x => y => Math.pow(x, y), Identity(10), Identity(3))
  //. Identity(1000)
  //. ```
  function lift2(f, x, y) {
    return ap(map(f, x), y);
  }

  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
  //.
  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
  //. returns the result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift2`](#lift2).
  //.
  //. ```javascript
  //. > lift3(x => y => z => x + z + y, ['<'], ['>'], ['foo', 'bar', 'baz'])
  //. ['<foo>', '<bar>', '<baz>']
  //.
  //. > lift3(x => y => z => x + z + y, Identity('<'), Identity('>'), Identity('baz'))
  //. Identity('<baz>')
  //. ```
  function lift3(f, x, y, z) {
    return ap(ap(map(f, x), y), z);
  }

  //# apFirst :: Apply f => (f a, f b) -> f a
  //.
  //. Combines two effectful actions, keeping only the result of the first.
  //. Equivalent to Haskell's `(<*)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > apFirst([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > apFirst(Identity(1), Identity(2))
  //. Identity(1)
  //. ```
  function apFirst(x, y) {
    return lift2(constant, x, y);
  }

  //# apSecond :: Apply f => (f a, f b) -> f b
  //.
  //. Combines two effectful actions, keeping only the result of the second.
  //. Equivalent to Haskell's `(*>)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > apSecond([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > apSecond(Identity(1), Identity(2))
  //. Identity(2)
  //. ```
  function apSecond(x, y) {
    return lift2(constant(identity), x, y);
  }

  //# of :: Applicative f => (TypeRep f, a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/of`][].
  //.
  //. `fantasy-land/of` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > of(Array, 42)
  //. [42]
  //.
  //. > of(Function, 42)(null)
  //. 42
  //.
  //. > of(List, 42)
  //. Cons(42, Nil)
  //. ```
  function of(typeRep, x) {
    return Applicative.methods.of(typeRep)(x);
  }

  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > append(3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > append(3, Cons(1, Cons(2, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function append(x, xs) {
    return concat(xs, of(xs.constructor, x));
  }

  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > prepend(1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > prepend(1, Cons(2, Cons(3, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function prepend(x, xs) {
    return concat(of(xs.constructor, x), xs);
  }

  //# chain :: Chain m => (a -> m b, m a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chain`][].
  //.
  //. `fantasy-land/chain` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > chain(x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > chain(x => x % 2 == 1 ? of(List, x) : Nil, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > chain(n => s => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //. ```
  function chain(f, chain_) {
    return Chain.methods.chain(chain_)(f);
  }

  //# join :: Chain m => m (m a) -> m a
  //.
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. This function is derived from [`chain`](#chain).
  //.
  //. ```javascript
  //. > join([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > join([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > join(Identity(Identity(1)))
  //. Identity(1)
  //. ```
  function join(chain_) {
    return chain(identity, chain_);
  }

  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chainRec`][].
  //.
  //. `fantasy-land/chainRec` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > chainRec(
  //. .   Array,
  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map(done)
  //. .                                    : [s + 'o', s + 'n'].map(next),
  //. .   ''
  //. . )
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    return ChainRec.methods.chainRec(typeRep)(f, x);
  }

  //# alt :: Alt f => (f a, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/alt`][].
  //.
  //. `fantasy-land/alt` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > alt([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > alt(Nothing, Nothing)
  //. Nothing
  //.
  //. > alt(Nothing, Just(1))
  //. Just(1)
  //.
  //. > alt(Just(2), Just(3))
  //. Just(2)
  //. ```
  function alt(x, y) {
    return Alt.methods.alt(x)(y);
  }

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. Function wrapper for [`fantasy-land/zero`][].
  //.
  //. `fantasy-land/zero` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > zero(Array)
  //. []
  //.
  //. > zero(Object)
  //. {}
  //.
  //. > zero(Maybe)
  //. Nothing
  //. ```
  function zero(typeRep) {
    return Plus.methods.zero(typeRep)();
  }

  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
  //.
  //. Function wrapper for [`fantasy-land/reduce`][].
  //.
  //. `fantasy-land/reduce` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > reduce((xs, x) => [x].concat(xs), [], [1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reduce(concat, '', Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 'foobarbaz'
  //. ```
  function reduce(f, x, foldable) {
    return Foldable.methods.reduce(foldable)(f, x);
  }

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > size([])
  //. 0
  //.
  //. > size(['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > size(Nil)
  //. 0
  //.
  //. > size(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 3
  //. ```
  function size(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.length;
    return reduce(function (n, _) {
      return n + 1;
    }, 0, foldable);
  }

  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
  //.
  //. Takes a value and a structure and returns `true` if the
  //. value is an element of the structure; `false` otherwise.
  //.
  //. This function is derived from [`equals`](#equals) and
  //. [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > elem('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > elem('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > elem(3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > elem(8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > elem(0, Just(0))
  //. true
  //.
  //. > elem(0, Just(1))
  //. false
  //.
  //. > elem(0, Nothing)
  //. false
  //. ```
  function elem(x, foldable) {
    return reduce(function (b, y) {
      return b || equals(x, y);
    }, false, foldable);
  }

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > reverse([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reverse(Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(3, Cons(2, Cons(1, Nil)))
  //. ```
  function reverse(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.slice().reverse();
    var F = foldable.constructor;
    return reduce(function (xs, x) {
      return concat(of(F, x), xs);
    }, empty(F), foldable);
  }

  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) for comparisons.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > sort(['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > sort([Just(2), Nothing, Just(1)])
  //. [Nothing, Just(1), Just(2)]
  //.
  //. > sort(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. Cons('bar', Cons('baz', Cons('foo', Nil)))
  //. ```
  function sort(foldable) {
    return sortBy(identity, foldable);
  }

  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) to compare the values produced by applying the
  //. given function to each element of the structure.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > sortBy(s => s.length, ['red', 'green', 'blue'])
  //. ['red', 'blue', 'green']
  //.
  //. > sortBy(s => s.length, ['black', 'white'])
  //. ['black', 'white']
  //.
  //. > sortBy(s => s.length, ['white', 'black'])
  //. ['white', 'black']
  //.
  //. > sortBy(s => s.length, Cons('red', Cons('green', Cons('blue', Nil))))
  //. Cons('red', Cons('blue', Cons('green', Nil)))
  //. ```
  function sortBy(f, foldable) {
    var rs = reduce(function (xs, x) {
      var fx = f(x);
      var lower = 0;
      var upper = xs.length;
      while (lower < upper) {
        var idx = Math.floor((lower + upper) / 2);
        if (lte(xs[idx].fx, fx)) lower = idx + 1;else upper = idx;
      }
      xs.splice(lower, 0, { x: x, fx: fx });
      return xs;
    }, [], foldable);

    var F = foldable.constructor;
    var result = empty(F);
    for (var idx = 0; idx < rs.length; idx += 1) {
      result = concat(result, of(F, rs[idx].x));
    }
    return result;
  }

  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
  //.
  //. Function wrapper for [`fantasy-land/traverse`][].
  //.
  //. `fantasy-land/traverse` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`sequence`](#sequence).
  //.
  //. ```javascript
  //. > traverse(Array, x => x, [[1, 2, 3], [4, 5]])
  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  //.
  //. > traverse(Identity, x => Identity(x + 1), [1, 2, 3])
  //. Identity([2, 3, 4])
  //. ```
  function traverse(typeRep, f, traversable) {
    return Traversable.methods.traverse(traversable)(typeRep, f);
  }

  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
  //.
  //. Inverts the given `t (f a)` to produce an `f (t a)`.
  //.
  //. This function is derived from [`traverse`](#traverse).
  //.
  //. ```javascript
  //. > sequence(Array, Identity([1, 2, 3]))
  //. [Identity(1), Identity(2), Identity(3)]
  //.
  //. > sequence(Identity, [Identity(1), Identity(2), Identity(3)])
  //. Identity([1, 2, 3])
  //. ```
  function sequence(typeRep, traversable) {
    return traverse(typeRep, identity, traversable);
  }

  //# extend :: Extend w => (w a -> b, w a) -> w b
  //.
  //. Function wrapper for [`fantasy-land/extend`][].
  //.
  //. `fantasy-land/extend` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > extend(ss => ss.join(''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //.
  //. > extend(f => f([3, 4]), reverse)([1, 2])
  //. [4, 3, 2, 1]
  //. ```
  function extend(f, extend_) {
    return Extend.methods.extend(extend_)(f);
  }

  //# duplicate :: Extend w => w a -> w (w a)
  //.
  //. Adds one level of nesting to a comonadic structure.
  //.
  //. This function is derived from [`extend`](#extend).
  //.
  //. ```javascript
  //. > duplicate(Identity(1))
  //. Identity(Identity(1))
  //.
  //. > duplicate([1])
  //. [[1]]
  //.
  //. > duplicate([1, 2, 3])
  //. [[1, 2, 3], [2, 3], [3]]
  //.
  //. > duplicate(reverse)([1, 2])([3, 4])
  //. [4, 3, 2, 1]
  //. ```
  function duplicate(extend_) {
    return extend(identity, extend_);
  }

  //# extract :: Comonad w => w a -> a
  //.
  //. Function wrapper for [`fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > extract(Identity(42))
  //. 42
  //. ```
  function extract(comonad) {
    return Comonad.methods.extract(comonad)();
  }

  //# contramap :: Contravariant f => (b -> a, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/contramap`][].
  //.
  //. `fantasy-land/contramap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > contramap(s => s.length, Math.sqrt)('Sanctuary')
  //. 3
  //. ```
  function contramap(f, contravariant) {
    return Contravariant.methods.contramap(contravariant)(f);
  }

  return {
    TypeClass: TypeClass,
    Setoid: Setoid,
    Ord: Ord,
    Semigroupoid: Semigroupoid,
    Category: Category,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Group: Group,
    Filterable: Filterable,
    Functor: Functor,
    Bifunctor: Bifunctor,
    Profunctor: Profunctor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    ChainRec: ChainRec,
    Monad: Monad,
    Alt: Alt,
    Plus: Plus,
    Alternative: Alternative,
    Foldable: Foldable,
    Traversable: Traversable,
    Extend: Extend,
    Comonad: Comonad,
    Contravariant: Contravariant,
    toString: toString,
    equals: equals,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    min: min,
    max: max,
    compose: compose,
    id: id,
    concat: concat,
    empty: empty,
    invert: invert,
    filter: filter,
    reject: reject,
    map: map,
    bimap: bimap,
    mapLeft: mapLeft,
    promap: promap,
    ap: ap,
    lift2: lift2,
    lift3: lift3,
    apFirst: apFirst,
    apSecond: apSecond,
    of: of,
    append: append,
    prepend: prepend,
    chain: chain,
    join: join,
    chainRec: chainRec,
    alt: alt,
    zero: zero,
    reduce: reduce,
    size: size,
    elem: elem,
    reverse: reverse,
    sort: sort,
    sortBy: sortBy,
    takeWhile: takeWhile,
    dropWhile: dropWhile,
    traverse: traverse,
    sequence: sequence,
    extend: extend,
    duplicate: duplicate,
    extract: extract,
    contramap: contramap
  };
});

//. [Alt]:                      v:fantasyland/fantasy-land#alt
//. [Alternative]:              v:fantasyland/fantasy-land#alternative
//. [Applicative]:              v:fantasyland/fantasy-land#applicative
//. [Apply]:                    v:fantasyland/fantasy-land#apply
//. [Bifunctor]:                v:fantasyland/fantasy-land#bifunctor
//. [Category]:                 v:fantasyland/fantasy-land#category
//. [Chain]:                    v:fantasyland/fantasy-land#chain
//. [ChainRec]:                 v:fantasyland/fantasy-land#chainrec
//. [Comonad]:                  v:fantasyland/fantasy-land#comonad
//. [Contravariant]:            v:fantasyland/fantasy-land#contravariant
//. [Extend]:                   v:fantasyland/fantasy-land#extend
//. [FL]:                       v:fantasyland/fantasy-land
//. [Filterable]:               v:fantasyland/fantasy-land#filterable
//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
//. [Functor]:                  v:fantasyland/fantasy-land#functor
//. [Group]:                    v:fantasyland/fantasy-land#group
//. [Monad]:                    v:fantasyland/fantasy-land#monad
//. [Monoid]:                   v:fantasyland/fantasy-land#monoid
//. [Ord]:                      v:fantasyland/fantasy-land#ord
//. [Plus]:                     v:fantasyland/fantasy-land#plus
//. [Profunctor]:               v:fantasyland/fantasy-land#profunctor
//. [Semigroup]:                v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:                   v:fantasyland/fantasy-land#setoid
//. [Traversable]:              v:fantasyland/fantasy-land#traversable
//. [`fantasy-land/alt`]:       v:fantasyland/fantasy-land#alt-method
//. [`fantasy-land/ap`]:        v:fantasyland/fantasy-land#ap-method
//. [`fantasy-land/bimap`]:     v:fantasyland/fantasy-land#bimap-method
//. [`fantasy-land/chain`]:     v:fantasyland/fantasy-land#chain-method
//. [`fantasy-land/chainRec`]:  v:fantasyland/fantasy-land#chainrec-method
//. [`fantasy-land/compose`]:   v:fantasyland/fantasy-land#compose-method
//. [`fantasy-land/concat`]:    v:fantasyland/fantasy-land#concat-method
//. [`fantasy-land/contramap`]: v:fantasyland/fantasy-land#contramap-method
//. [`fantasy-land/empty`]:     v:fantasyland/fantasy-land#empty-method
//. [`fantasy-land/equals`]:    v:fantasyland/fantasy-land#equals-method
//. [`fantasy-land/extend`]:    v:fantasyland/fantasy-land#extend-method
//. [`fantasy-land/extract`]:   v:fantasyland/fantasy-land#extract-method
//. [`fantasy-land/filter`]:    v:fantasyland/fantasy-land#filter-method
//. [`fantasy-land/id`]:        v:fantasyland/fantasy-land#id-method
//. [`fantasy-land/invert`]:    v:fantasyland/fantasy-land#invert-method
//. [`fantasy-land/lte`]:       v:fantasyland/fantasy-land#lte-method
//. [`fantasy-land/map`]:       v:fantasyland/fantasy-land#map-method
//. [`fantasy-land/of`]:        v:fantasyland/fantasy-land#of-method
//. [`fantasy-land/promap`]:    v:fantasyland/fantasy-land#promap-method
//. [`fantasy-land/reduce`]:    v:fantasyland/fantasy-land#reduce-method
//. [`fantasy-land/traverse`]:  v:fantasyland/fantasy-land#traverse-method
//. [`fantasy-land/zero`]:      v:fantasyland/fantasy-land#zero-method
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes
});

var inspectF = createCommonjsModule(function (module) {
(function (f) {

  /*istanbul ignore next*/

  {
    module.exports = f();
  }
})(function () {

  function checkn(n) {
    if (typeof n !== 'number') {
      throw new TypeError('inspectf expects its first argument to be a number');
    }
  }

  function checkf(f) {
    if (typeof f !== 'function') {
      throw new TypeError('inspectf expects its second argument to be a function');
    }
  }

  var RSPACE = /^ */;
  var RCODE = /\s*[^\s]/;
  var RTABS = /\t/g;
  var REOL = /\n\r?/;

  function isCode(line) {
    return RCODE.test(line);
  }

  function getPadding(line) {
    return line.match(RSPACE)[0].length;
  }

  function guessIndentation(lines) {
    var filtered = lines.filter(isCode);
    var paddings = filtered.map(getPadding);
    var depth = paddings.reduce(Math.min, Infinity);
    var tabsize = paddings.map(function (x) {
      return x - depth;
    }).find(function (x) {
      return x > 1;
    }) || 2;
    return { depth: depth, tabsize: tabsize };
  }

  function pad(n) {
    return new Array(n + 1).join(' ');
  }

  function show(f, indentation) {
    return f.toString().replace(RTABS, indentation);
  }

  function toLines(s) {
    return s.split(REOL);
  }

  function fixIndentation(lines, indentation) {
    var info = guessIndentation(lines.slice(1));
    var RPAD = new RegExp(pad(info.tabsize), 'g');
    return lines.map(function (line) {
      return line.slice(Math.min(info.depth, getPadding(line))).replace(RPAD, '\t').replace(RTABS, indentation);
    }).join('\n');
  }

  return function inspectf(n, f) {
    checkn(n);

    if (arguments.length < 2) {
      return function inspectf$partial(f) {
        return inspectf(n, f);
      };
    }

    checkf(f);
    if (f.toString !== Function.prototype.toString) {
      return f.toString();
    }
    var i = pad(n),
        shown = show(f, i),
        lines = toLines(shown, i);
    if (lines.length < 2) {
      return shown;
    }
    return fixIndentation(lines, i);
  };
});
});

var concurrify = createCommonjsModule(function (module) {
(function (f) {

  /*istanbul ignore next*/

  {
    module.exports = f(sanctuaryTypeClasses, sanctuaryTypeIdentifiers);
  }
})(function (Z, type) {

  var $alt = 'fantasy-land/alt';
  var $ap = 'fantasy-land/ap';
  var $map = 'fantasy-land/map';
  var $of = 'fantasy-land/of';
  var $zero = 'fantasy-land/zero';
  var $$type = '@@type';
  var ordinal = ['first', 'second', 'third', 'fourth', 'fifth'];

  function isFunction(f) {
    return typeof f === 'function';
  }

  function isBinary(f) {
    return f.length >= 2;
  }

  function isApplicativeRepr(Repr) {
    try {
      return Z.Applicative.test(Z.of(Repr));
    } catch (_) {
      return false;
    }
  }

  function invalidArgument(it, at, expected, actual) {
    throw new TypeError(it + ' expects its ' + ordinal[at] + ' argument to ' + expected + '\n  Actual: ' + Z.toString(actual));
  }

  function invalidContext(it, actual, an) {
    throw new TypeError(it + ' was invoked outside the context of a ' + an + '. \n  Called on: ' + Z.toString(actual));
  }

  //       getTypeIdentifier :: TypeRepresentative -> TypeIdentifier
  function getTypeIdentifier(Repr) {
    return Repr[$$type] || Repr.name || 'Anonymous';
  }

  //       generateTypeIdentifier :: TypeIdentifier -> TypeIdentifier
  function generateTypeIdentifier(identifier) {
    var o = type.parse(identifier);
    return (o.namespace || 'concurrify') + '/Concurrent' + o.name + '@' + o.version;
  }

  //concurrify :: Applicative m
  //           => (TypeRep m, m a, (m a, m a) -> m a, (m a, m (a -> b)) -> m b)
  //           -> Concurrently m
  return function concurrify(Repr, zero, alt, ap) {

    var INNERTYPE = getTypeIdentifier(Repr);
    var OUTERTYPE = generateTypeIdentifier(INNERTYPE);
    var INNERNAME = type.parse(INNERTYPE).name;
    var OUTERNAME = type.parse(OUTERTYPE).name;

    function Concurrently(sequential) {
      this.sequential = sequential;
    }

    function isInner(x) {
      return x instanceof Repr || Boolean(x) && x.constructor === Repr || type(x) === Repr[$$type];
    }

    function isOuter(x) {
      return x instanceof Concurrently || Boolean(x) && x.constructor === Concurrently || type(x) === OUTERTYPE;
    }

    function construct(x) {
      if (!isInner(x)) invalidArgument(OUTERNAME, 0, 'be of type "' + INNERNAME + '"', x);
      return new Concurrently(x);
    }

    if (!isApplicativeRepr(Repr)) invalidArgument('concurrify', 0, 'represent an Applicative', Repr);
    if (!isInner(zero)) invalidArgument('concurrify', 1, 'be of type "' + INNERNAME + '"', zero);
    if (!isFunction(alt)) invalidArgument('concurrify', 2, 'be a function', alt);
    if (!isBinary(alt)) invalidArgument('concurrify', 2, 'be binary', alt);
    if (!isFunction(ap)) invalidArgument('concurrify', 3, 'be a function', ap);
    if (!isBinary(ap)) invalidArgument('concurrify', 3, 'be binary', ap);

    var proto = Concurrently.prototype = construct.prototype = { constructor: construct };

    construct[$$type] = OUTERTYPE;

    var mzero = new Concurrently(zero);

    construct[$zero] = function Concurrently$zero() {
      return mzero;
    };

    construct[$of] = function Concurrently$of(value) {
      return new Concurrently(Z.of(Repr, value));
    };

    proto[$map] = function Concurrently$map(mapper) {
      if (!isOuter(this)) invalidContext(OUTERNAME + '#map', this, OUTERNAME);
      if (!isFunction(mapper)) invalidArgument(OUTERNAME + '#map', 0, 'be a function', mapper);
      return new Concurrently(Z.map(mapper, this.sequential));
    };

    proto[$ap] = function Concurrently$ap(m) {
      if (!isOuter(this)) invalidContext(OUTERNAME + '#ap', this, OUTERNAME);
      if (!isOuter(m)) invalidArgument(OUTERNAME + '#ap', 0, 'be a ' + OUTERNAME, m);
      return new Concurrently(ap(this.sequential, m.sequential));
    };

    proto[$alt] = function Concurrently$alt(m) {
      if (!isOuter(this)) invalidContext(OUTERNAME + '#alt', this, OUTERNAME);
      if (!isOuter(m)) invalidArgument(OUTERNAME + '#alt', 0, 'be a ' + OUTERNAME, m);
      return new Concurrently(alt(this.sequential, m.sequential));
    };

    proto.toString = function Concurrently$toString() {
      if (!isOuter(this)) invalidContext(OUTERNAME + '#toString', this, OUTERNAME);
      return OUTERNAME + '(' + Z.toString(this.sequential) + ')';
    };

    return construct;
  };
});
});

/**
 * Custom implementation of a double ended queue.
 */

function Denque(array) {
  this._head = 0;
  this._tail = 0;
  this._capacityMask = 0x3;
  this._list = new Array(4);
  if (Array.isArray(array)) {
    this._fromArray(array);
  }
}

/**
 * -------------
 *  PUBLIC API
 * -------------
 */

/**
 * Returns the item at the specified index from the list.
 * 0 is the first element, 1 is the second, and so on...
 * Elements at negative values are that many from the end: -1 is one before the end
 * (the last element), -2 is two before the end (one before last), etc.
 * @param index
 * @returns {*}
 */
Denque.prototype.peekAt = function peekAt(index) {
  var i = index;
  // expect a number or return undefined
  if (i !== (i | 0)) {
    return void 0;
  }
  var len = this.size();
  if (i >= len || i < -len) return undefined;
  if (i < 0) i += len;
  i = this._head + i & this._capacityMask;
  return this._list[i];
};

/**
 * Alias for peakAt()
 * @param i
 * @returns {*}
 */
Denque.prototype.get = function get(i) {
  return this.peekAt(i);
};

/**
 * Returns the first item in the list without removing it.
 * @returns {*}
 */
Denque.prototype.peek = function peek() {
  if (this._head === this._tail) return undefined;
  return this._list[this._head];
};

/**
 * Alias for peek()
 * @returns {*}
 */
Denque.prototype.peekFront = function peekFront() {
  return this.peek();
};

/**
 * Returns the item that is at the back of the queue without removing it.
 * Uses peekAt(-1)
 */
Denque.prototype.peekBack = function peekBack() {
  return this.peekAt(-1);
};

/**
 * Returns the current length of the queue
 * @return {Number}
 */
Object.defineProperty(Denque.prototype, 'length', {
  get: function length() {
    return this.size();
  }
});

/**
 * Return the number of items on the list, or 0 if empty.
 * @returns {number}
 */
Denque.prototype.size = function size() {
  if (this._head === this._tail) return 0;
  if (this._head < this._tail) return this._tail - this._head;else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Add an item at the beginning of the list.
 * @param item
 */
Denque.prototype.unshift = function unshift(item) {
  if (item === undefined) return this.size();
  var len = this._list.length;
  this._head = this._head - 1 + len & this._capacityMask;
  this._list[this._head] = item;
  if (this._tail === this._head) this._growArray();
  if (this._head < this._tail) return this._tail - this._head;else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Remove and return the first item on the list,
 * Returns undefined if the list is empty.
 * @returns {*}
 */
Denque.prototype.shift = function shift() {
  var head = this._head;
  if (head === this._tail) return undefined;
  var item = this._list[head];
  this._list[head] = undefined;
  this._head = head + 1 & this._capacityMask;
  if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();
  return item;
};

/**
 * Add an item to the bottom of the list.
 * @param item
 */
Denque.prototype.push = function push(item) {
  if (item === undefined) return this.size();
  var tail = this._tail;
  this._list[tail] = item;
  this._tail = tail + 1 & this._capacityMask;
  if (this._tail === this._head) {
    this._growArray();
  }

  if (this._head < this._tail) return this._tail - this._head;else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Remove and return the last item on the list.
 * Returns undefined if the list is empty.
 * @returns {*}
 */
Denque.prototype.pop = function pop() {
  var tail = this._tail;
  if (tail === this._head) return undefined;
  var len = this._list.length;
  this._tail = tail - 1 + len & this._capacityMask;
  var item = this._list[this._tail];
  this._list[this._tail] = undefined;
  if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();
  return item;
};

/**
 * Remove and return the item at the specified index from the list.
 * Returns undefined if the list is empty.
 * @param index
 * @returns {*}
 */
Denque.prototype.removeOne = function removeOne(index) {
  var i = index;
  // expect a number or return undefined
  if (i !== (i | 0)) {
    return void 0;
  }
  if (this._head === this._tail) return void 0;
  var size = this.size();
  var len = this._list.length;
  if (i >= size || i < -size) return void 0;
  if (i < 0) i += size;
  i = this._head + i & this._capacityMask;
  var item = this._list[i];
  var k;
  if (index < size / 2) {
    for (k = index; k > 0; k--) {
      this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
    }
    this._list[i] = void 0;
    this._head = this._head + 1 + len & this._capacityMask;
  } else {
    for (k = size - 1 - index; k > 0; k--) {
      this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
    }
    this._list[i] = void 0;
    this._tail = this._tail - 1 + len & this._capacityMask;
  }
  return item;
};

/**
 * Remove number of items from the specified index from the list.
 * Returns array of removed items.
 * Returns undefined if the list is empty.
 * @param index
 * @param count
 * @returns {array}
 */
Denque.prototype.remove = function remove(index, count) {
  var i = index;
  var removed;
  var del_count = count;
  // expect a number or return undefined
  if (i !== (i | 0)) {
    return void 0;
  }
  if (this._head === this._tail) return void 0;
  var size = this.size();
  var len = this._list.length;
  if (i >= size || i < -size || count < 1) return void 0;
  if (i < 0) i += size;
  if (count === 1 || !count) {
    removed = new Array(1);
    removed[0] = this.removeOne(i);
    return removed;
  }
  if (i === 0 && i + count >= size) {
    removed = this.toArray();
    this.clear();
    return removed;
  }
  if (i + count > size) count = size - i;
  var k;
  removed = new Array(count);
  for (k = 0; k < count; k++) {
    removed[k] = this._list[this._head + i + k & this._capacityMask];
  }
  i = this._head + i & this._capacityMask;
  if (index + count === size) {
    this._tail = this._tail - count + len & this._capacityMask;
    for (k = count; k > 0; k--) {
      this._list[i = i + 1 + len & this._capacityMask] = void 0;
    }
    return removed;
  }
  if (index === 0) {
    this._head = this._head + count + len & this._capacityMask;
    for (k = count - 1; k > 0; k--) {
      this._list[i = i + 1 + len & this._capacityMask] = void 0;
    }
    return removed;
  }
  if (index < size / 2) {
    this._head = this._head + index + count + len & this._capacityMask;
    for (k = index; k > 0; k--) {
      this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
    }
    i = this._head - 1 + len & this._capacityMask;
    while (del_count > 0) {
      this._list[i = i - 1 + len & this._capacityMask] = void 0;
      del_count--;
    }
  } else {
    this._tail = i;
    i = i + count + len & this._capacityMask;
    for (k = size - (count + index); k > 0; k--) {
      this.push(this._list[i++]);
    }
    i = this._tail;
    while (del_count > 0) {
      this._list[i = i + 1 + len & this._capacityMask] = void 0;
      del_count--;
    }
  }
  if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();
  return removed;
};

/**
 * Native splice implementation.
 * Remove number of items from the specified index from the list and/or add new elements.
 * Returns array of removed items or empty array if count == 0.
 * Returns undefined if the list is empty.
 *
 * @param index
 * @param count
 * @param {...*} [elements]
 * @returns {array}
 */
Denque.prototype.splice = function splice(index, count) {
  var i = index;
  // expect a number or return undefined
  if (i !== (i | 0)) {
    return void 0;
  }
  var size = this.size();
  if (i < 0) i += size;
  if (i > size) return void 0;
  if (arguments.length > 2) {
    var k;
    var temp;
    var removed;
    var arg_len = arguments.length;
    var len = this._list.length;
    var arguments_index = 2;
    if (!size || i < size / 2) {
      temp = new Array(i);
      for (k = 0; k < i; k++) {
        temp[k] = this._list[this._head + k & this._capacityMask];
      }
      if (count === 0) {
        removed = [];
        if (i > 0) {
          this._head = this._head + i + len & this._capacityMask;
        }
      } else {
        removed = this.remove(i, count);
        this._head = this._head + i + len & this._capacityMask;
      }
      while (arg_len > arguments_index) {
        this.unshift(arguments[--arg_len]);
      }
      for (k = i; k > 0; k--) {
        this.unshift(temp[k - 1]);
      }
    } else {
      temp = new Array(size - (i + count));
      var leng = temp.length;
      for (k = 0; k < leng; k++) {
        temp[k] = this._list[this._head + i + count + k & this._capacityMask];
      }
      if (count === 0) {
        removed = [];
        if (i != size) {
          this._tail = this._head + i + len & this._capacityMask;
        }
      } else {
        removed = this.remove(i, count);
        this._tail = this._tail - leng + len & this._capacityMask;
      }
      while (arguments_index < arg_len) {
        this.push(arguments[arguments_index++]);
      }
      for (k = 0; k < leng; k++) {
        this.push(temp[k]);
      }
    }
    return removed;
  } else {
    return this.remove(i, count);
  }
};

/**
 * Soft clear - does not reset capacity.
 */
Denque.prototype.clear = function clear() {
  this._head = 0;
  this._tail = 0;
};

/**
 * Returns true or false whether the list is empty.
 * @returns {boolean}
 */
Denque.prototype.isEmpty = function isEmpty() {
  return this._head === this._tail;
};

/**
 * Returns an array of all queue items.
 * @returns {Array}
 */
Denque.prototype.toArray = function toArray() {
  return this._copyArray(false);
};

/**
 * -------------
 *   INTERNALS
 * -------------
 */

/**
 * Fills the queue with items from an array
 * For use in the constructor
 * @param array
 * @private
 */
Denque.prototype._fromArray = function _fromArray(array) {
  for (var i = 0; i < array.length; i++) this.push(array[i]);
};

/**
 *
 * @param fullCopy
 * @returns {Array}
 * @private
 */
Denque.prototype._copyArray = function _copyArray(fullCopy) {
  var newArray = [];
  var list = this._list;
  var len = list.length;
  var i;
  if (fullCopy || this._head > this._tail) {
    for (i = this._head; i < len; i++) newArray.push(list[i]);
    for (i = 0; i < this._tail; i++) newArray.push(list[i]);
  } else {
    for (i = this._head; i < this._tail; i++) newArray.push(list[i]);
  }
  return newArray;
};

/**
 * Grows the internal list array.
 * @private
 */
Denque.prototype._growArray = function _growArray() {
  if (this._head) {
    // copy existing data, head to end, then beginning to tail.
    this._list = this._copyArray(true);
    this._head = 0;
  }

  // head is at 0 and array is now full, safe to extend
  this._tail = this._list.length;

  this._list.length *= 2;
  this._capacityMask = this._capacityMask << 1 | 1;
};

/**
 * Shrinks the internal list array.
 * @private
 */
Denque.prototype._shrinkArray = function _shrinkArray() {
  this._list.length >>>= 1;
  this._capacityMask >>>= 1;
};

var denque = Denque;

var fluture = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory(sanctuaryTypeClasses, inspectF, sanctuaryTypeIdentifiers, concurrify, denque);
})(commonjsGlobal, function (Z, inspectf, type, concurrify$$1, Denque) {

  Z = Z && Z.hasOwnProperty('default') ? Z['default'] : Z;
  inspectf = inspectf && inspectf.hasOwnProperty('default') ? inspectf['default'] : inspectf;
  type = type && type.hasOwnProperty('default') ? type['default'] : type;
  concurrify$$1 = concurrify$$1 && concurrify$$1.hasOwnProperty('default') ? concurrify$$1['default'] : concurrify$$1;
  Denque = Denque && Denque.hasOwnProperty('default') ? Denque['default'] : Denque;

  /* istanbul ignore file: environment-specific */

  /* eslint-disable no-undef */
  const scope = typeof self === 'object' ? self : typeof commonjsGlobal === 'object' ? commonjsGlobal : typeof window === 'object' ? window : {};
  /* eslint-enable no-undef */

  const setImmediate = typeof scope.setImmediate === 'function' ? scope.setImmediate : function setImmediate(f, x) {
    return setTimeout(f, 0, x);
  };

  function noop() {}
  function moop() {
    return this;
  }
  var show = Z.toString;
  function padf(sf, s) {
    return s.replace(/^/gm, sf).replace(sf, '');
  }
  function showf(f) {
    return padf('  ', inspectf(2, f));
  }

  function mapArray(xs, f) {
    var l = xs.length,
        ys = new Array(l);
    for (var i = 0; i < l; i++) ys[i] = f(xs[i], i, xs);
    return ys;
  }

  function partial1(f, a) {
    return function bound1(b, c, d) {
      switch (arguments.length) {
        case 1:
          return f(a, b);
        case 2:
          return f(a, b, c);
        default:
          return f(a, b, c, d);
      }
    };
  }

  function partial2(f, a, b) {
    return function bound2(c, d) {
      return arguments.length === 1 ? f(a, b, c) : f(a, b, c, d);
    };
  }

  function partial3(f, a, b, c) {
    return function bound3(d) {
      return f(a, b, c, d);
    };
  }

  function immediately(f) {
    return function immediate(x) {
      return setImmediate(f, x);
    };
  }

  var FL = {
    map: 'fantasy-land/map',
    bimap: 'fantasy-land/bimap',
    chain: 'fantasy-land/chain',
    chainRec: 'fantasy-land/chainRec',
    ap: 'fantasy-land/ap',
    of: 'fantasy-land/of',
    zero: 'fantasy-land/zero'
  };

  var ordinal = ['first', 'second', 'third', 'fourth', 'fifth'];

  var namespace = 'fluture';
  var name = 'Future';
  var version = 3;

  var $$type = namespace + '/' + name + '@' + version;

  function error(message) {
    throw new Error(message);
  }

  function typeError(message) {
    throw new TypeError(message);
  }

  function invalidArgument(it, at, expected, actual) {
    typeError(it + ' expects its ' + ordinal[at] + ' argument to ' + expected + '\n  Actual: ' + show(actual));
  }

  function invalidContext(it, actual) {
    typeError(it + ' was invoked outside the context of a Future. You might want to use' + ' a dispatcher instead\n  Called on: ' + show(actual));
  }

  function invalidNamespace(m, x) {
    return 'The Future was not created by ' + namespace + '. ' + 'Make sure you transform other Futures to ' + namespace + ' Futures. ' + 'Got ' + (x ? 'a Future from ' + x : 'an unscoped Future') + '.' + '\n  See: https://github.com/fluture-js/Fluture#casting-futures';
  }

  function invalidVersion(m, x) {
    return 'The Future was created by ' + (x < version ? 'an older' : 'a newer') + ' version of ' + namespace + '. ' + 'This means that one of the sources which creates Futures is outdated. ' + 'Update this source, or transform its created Futures to be compatible.' + '\n  See: https://github.com/fluture-js/Fluture#casting-futures';
  }

  function invalidFuture(it, at, m, s) {
    var id = type.parse(type(m));
    var info = id.name === name ? '\n' + (id.namespace !== namespace ? invalidNamespace(m, id.namespace) : id.version !== version ? invalidVersion(m, id.version) : 'Nothing seems wrong. Contact the Fluture maintainers.') : '';
    typeError(it + ' expects ' + (ordinal[at] ? 'its ' + ordinal[at] + ' argument to be a valid Future' : at) + '.' + info + '\n  Actual: ' + show(m) + ' :: ' + id.name + (s || ''));
  }

  function isFunction(f) {
    return typeof f === 'function';
  }

  function isThenable(m) {
    return m instanceof Promise || Boolean(m) && isFunction(m.then);
  }

  function isBoolean(f) {
    return typeof f === 'boolean';
  }

  function isNumber(f) {
    return typeof f === 'number';
  }

  function isUnsigned(n) {
    return n === Infinity || isNumber(n) && n > 0 && n % 1 === 0;
  }

  function isObject(o) {
    return o !== null && typeof o === 'object';
  }

  function isIterator(i) {
    return isObject(i) && isFunction(i.next);
  }

  function isArray(x) {
    return Array.isArray(x);
  }

  /*eslint no-cond-assign:0, no-constant-condition:0 */

  function interpreter(rej, res) {

    //This is the primary queue of actions. All actions in here will be "cold",
    //meaning they haven't had the chance yet to run concurrent computations.
    var cold = new Denque(this._actions.size);

    //This is the secondary queue of actions. All actions in here will be "hot",
    //meaning they have already had a chance to run a concurrent computation.
    var queue = new Denque(this._actions.size);

    //These combined variables define our current state.
    // future  = the future we are currently forking
    // action  = the action to be informed when the future settles
    // cancel  = the cancel function of the current future
    // settled = a boolean indicating whether a new tick should start
    // async   = a boolean indicating whether we are awaiting a result asynchronously
    var future,
        action,
        cancel = noop,
        settled,
        async = true,
        it;

    //This function is called with a future to use in the next tick.
    //Here we "flatten" the actions of another Sequence into our own actions,
    //this is the magic that allows for infinitely stack safe recursion because
    //actions like ChainAction will return a new Sequence.
    //If we settled asynchronously, we call drain() directly to run the next tick.
    function settle(m) {
      settled = true;
      future = m;

      if (future._spawn) {
        var tail = future._actions;

        while (!tail.isEmpty) {
          cold.unshift(tail.head);
          tail = tail.tail;
        }

        future = future._spawn;
      }

      if (async) drain();
    }

    //This function serves as a rejection handler for our current future.
    //It will tell the current action that the future rejected, and it will
    //settle the current tick with the action's answer to that.
    function rejected(x) {
      settle(action.rejected(x));
    }

    //This function serves as a resolution handler for our current future.
    //It will tell the current action that the future resolved, and it will
    //settle the current tick with the action's answer to that.
    function resolved(x) {
      settle(action.resolved(x));
    }

    //This function is passed into actions when they are "warmed up".
    //If the action decides that it has its result, without the need to await
    //anything else, then it can call this function to force "early termination".
    //When early termination occurs, all actions which were queued prior to the
    //terminator will be skipped. If they were already hot, they will also receive
    //a cancel signal so they can cancel their own concurrent computations, as
    //their results are no longer needed.
    function early(m, terminator) {
      cancel();
      cold.clear();

      if (async && action !== terminator) {
        action.cancel();
        while ((it = queue.shift()) && it !== terminator) it.cancel();
      }

      settle(m);
    }

    //This function serves to kickstart concurrent computations.
    //Takes all actions from the cold queue *back-to-front*, and calls run() on
    //each of them, passing them the "early" function. If any of them settles (by
    //calling early()), we abort. After warming up all actions in the cold queue,
    //we warm up the current action as well.
    function warmupActions() {
      while (it = cold.pop()) {
        it = it.run(early);
        if (settled) return;
        queue.unshift(it);
      }

      action = action.run(early);
    }

    //This function represents our main execution loop.
    //When we refer to a "tick", we mean the execution of the body inside the
    //primary while-loop of this function.
    //Every tick follows the following algorithm:
    // 1. We try to take an action from the cold queue, if we fail, go to step 2.
    //      1a. We fork the future.
    //      1b. We warmupActions() if the we haven't settled yet.
    // 2. We try to take an action from the hot queue, if we fail, go to step 3.
    //      2a. We fork the Future, if settles, we continue to the next tick.
    // 3. If we couldn't take actions from either queues, we fork the Future into
    //    the user provided continuations. This is the end of the interpretation.
    // 4. If we did take an action from one of queues, but none of the steps
    //    caused a settle(), it means we are asynchronously waiting for something
    //    to settle and start the next tick, so we return from the function.
    function drain() {
      async = false;

      while (true) {
        settled = false;
        if (action = cold.shift()) {
          cancel = future._fork(rejected, resolved);
          if (!settled) warmupActions();
        } else if (action = queue.shift()) {
          cancel = future._fork(rejected, resolved);
        } else break;
        if (settled) continue;
        async = true;
        return;
      }

      cancel = future._fork(rej, res);
    }

    //Start the execution loop.
    settle(this);

    //Return a cancellation function. It will cancel the current Future, the
    //current action, and all queued hot actions.
    return function Sequence$cancel() {
      cancel();
      action && action.cancel();
      while (it = queue.shift()) it.cancel();
    };
  }

  var empty = { isEmpty: true, size: 0, head: null, tail: null };

  function cons(head, tail) {
    return { isEmpty: false, size: tail.size + 1, head: head, tail: tail };
  }

  function throwRejection(x) {
    error('Future#value was called on a rejected Future\n  Actual: Future.reject(' + show(x) + ')');
  }

  function Future(computation) {
    if (!isFunction(computation)) invalidArgument('Future', 0, 'be a Function', computation);
    return new Computation(computation);
  }

  function isFuture(x) {
    return x instanceof Future || type(x) === $$type;
  }

  Future['@@type'] = $$type;

  Future.prototype[FL.ap] = function Future$FL$ap(other) {
    return other._ap(this);
  };

  Future.prototype[FL.map] = function Future$FL$map(mapper) {
    return this._map(mapper);
  };

  Future.prototype[FL.bimap] = function Future$FL$bimap(lmapper, rmapper) {
    return this._bimap(lmapper, rmapper);
  };

  Future.prototype[FL.chain] = function Future$FL$chain(mapper) {
    return this._chain(mapper);
  };

  Future.prototype.ap = function Future$ap(other) {
    if (!isFuture(this)) invalidContext('Future#ap', this);
    if (!isFuture(other)) invalidFuture('Future#ap', 0, other);
    return this._ap(other);
  };

  Future.prototype.map = function Future$map(mapper) {
    if (!isFuture(this)) invalidContext('Future#map', this);
    if (!isFunction(mapper)) invalidArgument('Future#map', 0, 'to be a Function', mapper);
    return this._map(mapper);
  };

  Future.prototype.bimap = function Future$bimap(lmapper, rmapper) {
    if (!isFuture(this)) invalidContext('Future#bimap', this);
    if (!isFunction(lmapper)) invalidArgument('Future#bimap', 0, 'to be a Function', lmapper);
    if (!isFunction(rmapper)) invalidArgument('Future#bimap', 1, 'to be a Function', rmapper);
    return this._bimap(lmapper, rmapper);
  };

  Future.prototype.chain = function Future$chain(mapper) {
    if (!isFuture(this)) invalidContext('Future#chain', this);
    if (!isFunction(mapper)) invalidArgument('Future#chain', 0, 'to be a Function', mapper);
    return this._chain(mapper);
  };

  Future.prototype.mapRej = function Future$mapRej(mapper) {
    if (!isFuture(this)) invalidContext('Future#mapRej', this);
    if (!isFunction(mapper)) invalidArgument('Future#mapRej', 0, 'to be a Function', mapper);
    return this._mapRej(mapper);
  };

  Future.prototype.chainRej = function Future$chainRej(mapper) {
    if (!isFuture(this)) invalidContext('Future#chainRej', this);
    if (!isFunction(mapper)) invalidArgument('Future#chainRej', 0, 'to be a Function', mapper);
    return this._chainRej(mapper);
  };

  Future.prototype.race = function Future$race(other) {
    if (!isFuture(this)) invalidContext('Future#race', this);
    if (!isFuture(other)) invalidFuture('Future#race', 0, other);
    return this._race(other);
  };

  Future.prototype.both = function Future$both(other) {
    if (!isFuture(this)) invalidContext('Future#both', this);
    if (!isFuture(other)) invalidFuture('Future#both', 0, other);
    return this._both(other);
  };

  Future.prototype.and = function Future$and(other) {
    if (!isFuture(this)) invalidContext('Future#and', this);
    if (!isFuture(other)) invalidFuture('Future#and', 0, other);
    return this._and(other);
  };

  Future.prototype.or = function Future$or(other) {
    if (!isFuture(this)) invalidContext('Future#or', this);
    if (!isFuture(other)) invalidFuture('Future#or', 0, other);
    return this._or(other);
  };

  Future.prototype.swap = function Future$swap() {
    if (!isFuture(this)) invalidContext('Future#ap', this);
    return this._swap();
  };

  Future.prototype.fold = function Future$fold(lmapper, rmapper) {
    if (!isFuture(this)) invalidContext('Future#ap', this);
    if (!isFunction(lmapper)) invalidArgument('Future#fold', 0, 'to be a Function', lmapper);
    if (!isFunction(rmapper)) invalidArgument('Future#fold', 1, 'to be a Function', rmapper);
    return this._fold(lmapper, rmapper);
  };

  Future.prototype.finally = function Future$finally(other) {
    if (!isFuture(this)) invalidContext('Future#finally', this);
    if (!isFuture(other)) invalidFuture('Future#finally', 0, other);
    return this._finally(other);
  };

  Future.prototype.lastly = function Future$lastly(other) {
    if (!isFuture(this)) invalidContext('Future#lastly', this);
    if (!isFuture(other)) invalidFuture('Future#lastly', 0, other);
    return this._finally(other);
  };

  Future.prototype.fork = function Future$fork(rej, res) {
    if (!isFuture(this)) invalidContext('Future#fork', this);
    if (!isFunction(rej)) invalidArgument('Future#fork', 0, 'to be a Function', rej);
    if (!isFunction(res)) invalidArgument('Future#fork', 0, 'to be a Function', res);
    return this._fork(rej, res);
  };

  Future.prototype.value = function Future$value(res) {
    if (!isFuture(this)) invalidContext('Future#value', this);
    if (!isFunction(res)) invalidArgument('Future#value', 0, 'to be a Function', res);
    return this._fork(throwRejection, res);
  };

  Future.prototype.done = function Future$done(callback) {
    if (!isFuture(this)) invalidContext('Future#done', this);
    if (!isFunction(callback)) invalidArgument('Future#done', 0, 'to be a Function', callback);
    return this._fork(function Future$done$rej(x) {
      callback(x);
    }, function Future$done$res(x) {
      callback(null, x);
    });
  };

  Future.prototype.promise = function Future$promise() {
    var _this = this;
    return new Promise(function Future$promise$computation(res, rej) {
      _this._fork(rej, res);
    });
  };

  Future.prototype.isRejected = function Future$isRejected() {
    return false;
  };

  Future.prototype.isResolved = function Future$isResolved() {
    return false;
  };

  Future.prototype.isSettled = function Future$isSettled() {
    return this.isRejected() || this.isResolved();
  };

  Future.prototype.extractLeft = function Future$extractLeft() {
    return [];
  };

  Future.prototype.extractRight = function Future$extractRight() {
    return [];
  };

  var Core = Object.create(Future.prototype);

  Core._ap = function Core$ap(other) {
    return new Sequence(this)._ap(other);
  };

  Core._map = function Core$map(mapper) {
    return new Sequence(this)._map(mapper);
  };

  Core._bimap = function Core$bimap(lmapper, rmapper) {
    return new Sequence(this)._bimap(lmapper, rmapper);
  };

  Core._chain = function Core$chain(mapper) {
    return new Sequence(this)._chain(mapper);
  };

  Core._mapRej = function Core$mapRej(mapper) {
    return new Sequence(this)._mapRej(mapper);
  };

  Core._chainRej = function Core$chainRej(mapper) {
    return new Sequence(this)._chainRej(mapper);
  };

  Core._race = function Core$race(other) {
    return new Sequence(this)._race(other);
  };

  Core._both = function Core$both(other) {
    return new Sequence(this)._both(other);
  };

  Core._and = function Core$and(other) {
    return new Sequence(this)._and(other);
  };

  Core._or = function Core$or(other) {
    return new Sequence(this)._or(other);
  };

  Core._swap = function Core$swap() {
    return new Sequence(this)._swap();
  };

  Core._fold = function Core$fold(lmapper, rmapper) {
    return new Sequence(this)._fold(lmapper, rmapper);
  };

  Core._finally = function Core$finally(other) {
    return new Sequence(this)._finally(other);
  };

  function check$fork(f, c) {
    if (!(f === undefined || isFunction(f) && f.length === 0)) typeError('Future expected its computation to return a nullary function or void' + '\n  Actual: ' + show(f) + '\n  From calling: ' + showf(c));
  }

  function Computation(computation) {
    this._computation = computation;
  }

  Computation.prototype = Object.create(Core);

  Computation.prototype._fork = function Computation$_fork(rej, res) {
    var open = true;
    var f = this._computation(function Computation$rej(x) {
      if (open) {
        open = false;
        rej(x);
      }
    }, function Computation$res(x) {
      if (open) {
        open = false;
        res(x);
      }
    });
    check$fork(f, this._computation);

    return function Computation$cancel() {
      open && f && f();
      open = false;
    };
  };

  Computation.prototype.toString = function Computation$toString() {
    return 'Future(' + showf(this._computation) + ')';
  };

  function Rejected(value) {
    this._value = value;
  }

  Rejected.prototype = Object.create(Core);

  Rejected.prototype._ap = moop;
  Rejected.prototype._map = moop;
  Rejected.prototype._chain = moop;
  Rejected.prototype._race = moop;
  Rejected.prototype._both = moop;
  Rejected.prototype._and = moop;

  Rejected.prototype._or = function Rejected$or(other) {
    return other;
  };

  Rejected.prototype._finally = function Rejected$finally(other) {
    return other._and(this);
  };

  Rejected.prototype._swap = function Rejected$swap() {
    return new Resolved(this._value);
  };

  Rejected.prototype._fork = function Rejected$_fork(rej) {
    rej(this._value);
    return noop;
  };

  Rejected.prototype.isRejected = function Rejected$isRejected() {
    return true;
  };

  Rejected.prototype.extractLeft = function Rejected$extractLeft() {
    return [this._value];
  };

  Rejected.prototype.toString = function Rejected$toString() {
    return 'Future.reject(' + show(this._value) + ')';
  };

  function reject(x) {
    return new Rejected(x);
  }

  function Resolved(value) {
    this._value = value;
  }

  Resolved.prototype = Object.create(Core);

  Resolved.prototype._race = moop;
  Resolved.prototype._mapRej = moop;
  Resolved.prototype._or = moop;

  Resolved.prototype._and = function Resolved$and(other) {
    return other;
  };

  Resolved.prototype._both = function Resolved$both(other) {
    var left = this._value;
    return other._map(function Resolved$both$mapper(right) {
      return [left, right];
    });
  };

  Resolved.prototype._swap = function Resolved$swap() {
    return new Rejected(this._value);
  };

  Resolved.prototype._finally = function Resolved$finally(other) {
    var value = this._value;
    return other._map(function Resolved$finally$mapper() {
      return value;
    });
  };

  Resolved.prototype._fork = function _fork(rej, res) {
    res(this._value);
    return noop;
  };

  Resolved.prototype.isResolved = function Resolved$isResolved() {
    return true;
  };

  Resolved.prototype.extractRight = function Resolved$extractRight() {
    return [this._value];
  };

  Resolved.prototype.toString = function Resolved$toString() {
    return 'Future.of(' + show(this._value) + ')';
  };

  function of(x) {
    return new Resolved(x);
  }

  function Never() {
    this._isNever = true;
  }

  Never.prototype = Object.create(Future.prototype);

  Never.prototype._ap = moop;
  Never.prototype._map = moop;
  Never.prototype._bimap = moop;
  Never.prototype._chain = moop;
  Never.prototype._mapRej = moop;
  Never.prototype._chainRej = moop;
  Never.prototype._both = moop;
  Never.prototype._or = moop;
  Never.prototype._swap = moop;
  Never.prototype._fold = moop;
  Never.prototype._finally = moop;

  Never.prototype._race = function Never$race(other) {
    return other;
  };

  Never.prototype._fork = function Never$_fork() {
    return noop;
  };

  Never.prototype.toString = function Never$toString() {
    return 'Future.never';
  };

  var never = new Never();

  function isNever(x) {
    return isFuture(x) && x._isNever === true;
  }

  function Eager(future) {
    var _this = this;
    _this.rej = noop;
    _this.res = noop;
    _this.rejected = false;
    _this.resolved = false;
    _this.value = null;
    _this.cancel = future._fork(function Eager$reject(x) {
      _this.value = x;
      _this.rejected = true;
      _this.cancel = noop;
      _this.rej(x);
    }, function Eager$resolve(x) {
      _this.value = x;
      _this.resolved = true;
      _this.cancel = noop;
      _this.res(x);
    });
  }

  Eager.prototype = Object.create(Core);

  Eager.prototype._fork = function Eager$_fork(rej, res) {
    if (this.rejected) rej(this.value);else if (this.resolved) res(this.value);else {
      this.rej = rej;
      this.res = res;
    }
    return this.cancel;
  };

  function check$ap(f) {
    return isFunction(f) ? f : typeError('Future#ap expects its first argument to be a Future of a Function' + '\n  Actual: Future.of(' + show(f) + ')');
  }

  function check$chain(m, f, x) {
    return isFuture(m) ? m : invalidFuture('Future#chain', 'the function it\'s given to return a Future', m, '\n  From calling: ' + showf(f) + '\n  With: ' + show(x));
  }

  function check$chainRej(m, f, x) {
    return isFuture(m) ? m : invalidFuture('Future#chainRej', 'the function it\'s given to return a Future', m, '\n  From calling: ' + showf(f) + '\n  With: ' + show(x));
  }

  var Action = {
    rejected: function Action$rejected(x) {
      this.cancel();return new Rejected(x);
    },
    resolved: function Action$resolved(x) {
      this.cancel();return new Resolved(x);
    },
    run: function Action$run() {
      return this;
    },
    cancel: function Action$cancel() {}
  };

  function ApAction(other) {
    this.other = other;
  }
  ApAction.prototype = Object.create(Action);

  ApAction.prototype.resolved = function ApAction$resolved(f) {
    check$ap(f);
    return this.other._map(function ApAction$resolved$mapper(x) {
      return f(x);
    });
  };

  ApAction.prototype.toString = function ApAction$toString() {
    return 'ap(' + this.other.toString() + ')';
  };

  function MapAction(mapper) {
    this.mapper = mapper;
  }
  MapAction.prototype = Object.create(Action);

  MapAction.prototype.resolved = function MapAction$resolved(x) {
    return new Resolved(this.mapper(x));
  };

  MapAction.prototype.toString = function MapAction$toString() {
    return 'map(' + showf(this.mapper) + ')';
  };

  function BimapAction(lmapper, rmapper) {
    this.lmapper = lmapper;this.rmapper = rmapper;
  }
  BimapAction.prototype = Object.create(Action);

  BimapAction.prototype.rejected = function BimapAction$rejected(x) {
    return new Rejected(this.lmapper(x));
  };

  BimapAction.prototype.resolved = function BimapAction$resolved(x) {
    return new Resolved(this.rmapper(x));
  };

  BimapAction.prototype.toString = function BimapAction$toString() {
    return 'bimap(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
  };

  function ChainAction(mapper) {
    this.mapper = mapper;
  }
  ChainAction.prototype = Object.create(Action);

  ChainAction.prototype.resolved = function ChainAction$resolved(x) {
    return check$chain(this.mapper(x), this.mapper, x);
  };

  ChainAction.prototype.toString = function ChainAction$toString() {
    return 'chain(' + showf(this.mapper) + ')';
  };

  function MapRejAction(mapper) {
    this.mapper = mapper;
  }
  MapRejAction.prototype = Object.create(Action);

  MapRejAction.prototype.rejected = function MapRejAction$rejected(x) {
    return new Rejected(this.mapper(x));
  };

  MapRejAction.prototype.toString = function MapRejAction$toString() {
    return 'mapRej(' + showf(this.mapper) + ')';
  };

  function ChainRejAction(mapper) {
    this.mapper = mapper;
  }
  ChainRejAction.prototype = Object.create(Action);

  ChainRejAction.prototype.rejected = function ChainRejAction$rejected(x) {
    return check$chainRej(this.mapper(x), this.mapper, x);
  };

  ChainRejAction.prototype.toString = function ChainRejAction$toString() {
    return 'chainRej(' + showf(this.mapper) + ')';
  };

  function SwapAction() {}
  SwapAction.prototype = Object.create(Action);

  SwapAction.prototype.rejected = function SwapAction$rejected(x) {
    return new Resolved(x);
  };

  SwapAction.prototype.resolved = function SwapAction$resolved(x) {
    return new Rejected(x);
  };

  SwapAction.prototype.toString = function SwapAction$toString() {
    return 'swap()';
  };

  function FoldAction(lmapper, rmapper) {
    this.lmapper = lmapper;this.rmapper = rmapper;
  }
  FoldAction.prototype = Object.create(Action);

  FoldAction.prototype.rejected = function FoldAction$rejected(x) {
    return new Resolved(this.lmapper(x));
  };

  FoldAction.prototype.resolved = function FoldAction$resolved(x) {
    return new Resolved(this.rmapper(x));
  };

  FoldAction.prototype.toString = function FoldAction$toString() {
    return 'fold(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
  };

  function FinallyAction(other) {
    this.other = other;
  }
  FinallyAction.prototype = Object.create(Action);

  FinallyAction.prototype.rejected = function FinallyAction$rejected(x) {
    return this.other._and(new Rejected(x));
  };

  FinallyAction.prototype.resolved = function FinallyAction$resolved(x) {
    return this.other._map(function FoldAction$resolved$mapper() {
      return x;
    });
  };

  FinallyAction.prototype.cancel = function FinallyAction$cancel() {
    this.other._fork(noop, noop)();
  };

  FinallyAction.prototype.toString = function FinallyAction$toString() {
    return 'finally(' + this.other.toString() + ')';
  };

  function AndAction(other) {
    this.other = other;
  }
  AndAction.prototype = Object.create(Action);

  AndAction.prototype.resolved = function AndAction$resolved() {
    return this.other;
  };

  AndAction.prototype.toString = function AndAction$toString() {
    return 'and(' + this.other.toString() + ')';
  };

  function OrAction(other) {
    this.other = other;
  }
  OrAction.prototype = Object.create(Action);

  OrAction.prototype.rejected = function OrAction$rejected() {
    return this.other;
  };

  OrAction.prototype.toString = function OrAction$toString() {
    return 'or(' + this.other.toString() + ')';
  };

  function RaceAction(other) {
    this.other = other;
  }
  RaceAction.prototype = Object.create(Action);

  RaceAction.prototype.run = function RaceAction$run(early) {
    return new RaceActionState(early, new Eager(this.other));
  };

  RaceAction.prototype.toString = function RaceAction$toString() {
    return 'race(' + this.other.toString() + ')';
  };

  function BothAction(other) {
    this.other = other;
  }
  BothAction.prototype = Object.create(Action);

  BothAction.prototype.resolved = function BothAction$resolved(x) {
    return this.other._map(function BothAction$resolved$mapper(y) {
      return [x, y];
    });
  };

  BothAction.prototype.run = function BothAction$run(early) {
    return new BothActionState(early, new Eager(this.other));
  };

  BothAction.prototype.toString = function BothAction$toString() {
    return 'both(' + this.other.toString() + ')';
  };

  function RaceActionState(early, other) {
    var _this = this;
    _this.other = other;
    _this.cancel = other._fork(function RaceActionState$rej(x) {
      early(new Rejected(x), _this);
    }, function RaceActionState$res(x) {
      early(new Resolved(x), _this);
    });
  }

  RaceActionState.prototype = Object.create(RaceAction.prototype);

  function BothActionState(early, other) {
    var _this = this;
    _this.other = other;
    _this.cancel = other._fork(function BothActionState$rej(x) {
      early(new Rejected(x), _this);
    }, noop);
  }

  BothActionState.prototype = Object.create(BothAction.prototype);

  function Sequence(spawn, actions) {
    this._spawn = spawn;
    this._actions = actions || empty;
  }

  Sequence.prototype = Object.create(Future.prototype);

  Sequence.prototype._transform = function Sequence$_transform(action) {
    return new Sequence(this._spawn, cons(action, this._actions));
  };

  Sequence.prototype._ap = function Sequence$ap(other) {
    return this._transform(new ApAction(other));
  };

  Sequence.prototype._map = function Sequence$map(mapper) {
    return this._transform(new MapAction(mapper));
  };

  Sequence.prototype._bimap = function Sequence$bimap(lmapper, rmapper) {
    return this._transform(new BimapAction(lmapper, rmapper));
  };

  Sequence.prototype._chain = function Sequence$chain(mapper) {
    return this._transform(new ChainAction(mapper));
  };

  Sequence.prototype._mapRej = function Sequence$mapRej(mapper) {
    return this._transform(new MapRejAction(mapper));
  };

  Sequence.prototype._chainRej = function Sequence$chainRej(mapper) {
    return this._transform(new ChainRejAction(mapper));
  };

  Sequence.prototype._race = function Sequence$race(other) {
    return isNever(other) ? this : this._transform(new RaceAction(other));
  };

  Sequence.prototype._both = function Sequence$both(other) {
    return this._transform(new BothAction(other));
  };

  Sequence.prototype._and = function Sequence$and(other) {
    return this._transform(new AndAction(other));
  };

  Sequence.prototype._or = function Sequence$or(other) {
    return this._transform(new OrAction(other));
  };

  Sequence.prototype._swap = function Sequence$swap() {
    return this._transform(new SwapAction());
  };

  Sequence.prototype._fold = function Sequence$fold(lmapper, rmapper) {
    return this._transform(new FoldAction(lmapper, rmapper));
  };

  Sequence.prototype._finally = function Sequence$finally(other) {
    return this._transform(new FinallyAction(other));
  };

  Sequence.prototype._fork = interpreter;

  Sequence.prototype.toString = function Sequence$toString() {
    var str = '',
        tail = this._actions;

    while (!tail.isEmpty) {
      str = '.' + tail.head.toString() + str;
      tail = tail.tail;
    }

    return this._spawn.toString() + str;
  };

  function Next(x) {
    return { done: false, value: x };
  }

  function Done(x) {
    return { done: true, value: x };
  }

  function isIteration(x) {
    return isObject(x) && isBoolean(x.done);
  }

  var Undetermined = 0;
  var Synchronous = 1;
  var Asynchronous = 2;

  function ChainRec(step, init) {
    this._step = step;
    this._init = init;
  }

  ChainRec.prototype = Object.create(Core);

  ChainRec.prototype._fork = function ChainRec$_fork(rej, res) {

    var _step = this._step;
    var _init = this._init;
    var timing = Undetermined,
        cancel = noop,
        state = Next(_init);

    function resolved(it) {
      state = it;
      timing = timing === Undetermined ? Synchronous : drain();
    }

    function drain() {
      while (!state.done) {
        timing = Undetermined;
        var m = _step(Next, Done, state.value);
        cancel = m._fork(rej, resolved);

        if (timing !== Synchronous) {
          timing = Asynchronous;
          return;
        }
      }

      res(state.value);
    }

    drain();

    return function Future$chainRec$cancel() {
      cancel();
    };
  };

  ChainRec.prototype.toString = function ChainRec$toString() {
    return 'Future.chainRec(' + showf(this._step) + ', ' + show(this._init) + ')';
  };

  function chainRec(step, init) {
    return new ChainRec(step, init);
  }

  function ap$mval(mval, mfunc) {
    if (!Z.Apply.test(mfunc)) invalidArgument('Future.ap', 1, 'be an Apply', mfunc);
    return Z.ap(mval, mfunc);
  }

  function ap(mval, mfunc) {
    if (!Z.Apply.test(mval)) invalidArgument('Future.ap', 0, 'be an Apply', mval);
    if (arguments.length === 1) return partial1(ap$mval, mval);
    return ap$mval(mval, mfunc);
  }

  function alt$left(left, right) {
    if (!Z.Alt.test(right)) invalidArgument('alt', 1, 'be an Alt', right);
    return Z.alt(left, right);
  }

  function alt(left, right) {
    if (!Z.Alt.test(left)) invalidArgument('alt', 0, 'be an Alt', left);
    if (arguments.length === 1) return partial1(alt$left, left);
    return alt$left(left, right);
  }

  function map$mapper(mapper, m) {
    if (!Z.Functor.test(m)) invalidArgument('Future.map', 1, 'be a Functor', m);
    return Z.map(mapper, m);
  }

  function map(mapper, m) {
    if (!isFunction(mapper)) invalidArgument('Future.map', 0, 'be a Function', mapper);
    if (arguments.length === 1) return partial1(map$mapper, mapper);
    return map$mapper(mapper, m);
  }

  function bimap$lmapper$rmapper(lmapper, rmapper, m) {
    if (!Z.Bifunctor.test(m)) invalidArgument('Future.bimap', 2, 'be a Bifunctor', m);
    return Z.bimap(lmapper, rmapper, m);
  }

  function bimap$lmapper(lmapper, rmapper, m) {
    if (!isFunction(rmapper)) invalidArgument('Future.bimap', 1, 'be a Function', rmapper);
    if (arguments.length === 2) return partial2(bimap$lmapper$rmapper, lmapper, rmapper);
    return bimap$lmapper$rmapper(lmapper, rmapper, m);
  }

  function bimap(lmapper, rmapper, m) {
    if (!isFunction(lmapper)) invalidArgument('Future.bimap', 0, 'be a Function', lmapper);
    if (arguments.length === 1) return partial1(bimap$lmapper, lmapper);
    if (arguments.length === 2) return bimap$lmapper(lmapper, rmapper);
    return bimap$lmapper(lmapper, rmapper, m);
  }

  function chain$chainer(chainer, m) {
    if (!Z.Chain.test(m)) invalidArgument('Future.chain', 1, 'be a Chain', m);
    return Z.chain(chainer, m);
  }

  function chain(chainer, m) {
    if (!isFunction(chainer)) invalidArgument('Future.chain', 0, 'be a Function', chainer);
    if (arguments.length === 1) return partial1(chain$chainer, chainer);
    return chain$chainer(chainer, m);
  }

  function mapRej$mapper(mapper, m) {
    if (!isFuture(m)) invalidFuture('Future.mapRej', 1, m);
    return m.mapRej(mapper);
  }

  function mapRej(mapper, m) {
    if (!isFunction(mapper)) invalidArgument('Future.mapRej', 0, 'be a Function', mapper);
    if (arguments.length === 1) return partial1(mapRej$mapper, mapper);
    return mapRej$mapper(mapper, m);
  }

  function chainRej$chainer(chainer, m) {
    if (!isFuture(m)) invalidFuture('Future.chainRej', 1, m);
    return m.chainRej(chainer);
  }

  function chainRej(chainer, m) {
    if (!isFunction(chainer)) invalidArgument('Future.chainRej', 0, 'be a Function', chainer);
    if (arguments.length === 1) return partial1(chainRej$chainer, chainer);
    return chainRej$chainer(chainer, m);
  }

  function lastly$right(right, left) {
    if (!isFuture(left)) invalidFuture('Future.finally', 1, left);
    return left.finally(right);
  }

  function lastly(right, left) {
    if (!isFuture(right)) invalidFuture('Future.finally', 0, right);
    if (arguments.length === 1) return partial1(lastly$right, right);
    return lastly$right(right, left);
  }

  function and$left(left, right) {
    if (!isFuture(right)) invalidFuture('Future.and', 1, right);
    return left.and(right);
  }

  function and(left, right) {
    if (!isFuture(left)) invalidFuture('Future.and', 0, left);
    if (arguments.length === 1) return partial1(and$left, left);
    return and$left(left, right);
  }

  function both$left(left, right) {
    if (!isFuture(right)) invalidFuture('Future.both', 1, right);
    return left.both(right);
  }

  function both(left, right) {
    if (!isFuture(left)) invalidFuture('Future.both', 0, left);
    if (arguments.length === 1) return partial1(both$left, left);
    return both$left(left, right);
  }

  function or$left(left, right) {
    if (!isFuture(right)) invalidFuture('Future.or', 1, right);
    return left.or(right);
  }

  function or(left, right) {
    if (!isFuture(left)) invalidFuture('Future.or', 0, left);
    if (arguments.length === 1) return partial1(or$left, left);
    return or$left(left, right);
  }

  function race$right(right, left) {
    if (!isFuture(left)) invalidFuture('Future.race', 1, left);
    return left.race(right);
  }

  function race(right, left) {
    if (!isFuture(right)) invalidFuture('Future.race', 0, right);
    if (arguments.length === 1) return partial1(race$right, right);
    return race$right(right, left);
  }

  function swap(m) {
    if (!isFuture(m)) invalidFuture('Future.swap', 0, m);
    return m.swap();
  }

  function fold$f$g(f, g, m) {
    if (!isFuture(m)) invalidFuture('Future.fold', 2, m);
    return m.fold(f, g);
  }

  function fold$f(f, g, m) {
    if (!isFunction(g)) invalidArgument('Future.fold', 1, 'be a function', g);
    if (arguments.length === 2) return partial2(fold$f$g, f, g);
    return fold$f$g(f, g, m);
  }

  function fold(f, g, m) {
    if (!isFunction(f)) invalidArgument('Future.fold', 0, 'be a function', f);
    if (arguments.length === 1) return partial1(fold$f, f);
    if (arguments.length === 2) return fold$f(f, g);
    return fold$f(f, g, m);
  }

  function done$callback(callback, m) {
    if (!isFuture(m)) invalidFuture('Future.done', 1, m);
    return m.done(callback);
  }

  function done(callback, m) {
    if (!isFunction(callback)) invalidArgument('Future.done', 0, 'be a Function', callback);
    if (arguments.length === 1) return partial1(done$callback, callback);
    return done$callback(callback, m);
  }

  function fork$f$g(f, g, m) {
    if (!isFuture(m)) invalidFuture('Future.fork', 2, m);
    return m._fork(f, g);
  }

  function fork$f(f, g, m) {
    if (!isFunction(g)) invalidArgument('Future.fork', 1, 'be a function', g);
    if (arguments.length === 2) return partial2(fork$f$g, f, g);
    return fork$f$g(f, g, m);
  }

  function fork(f, g, m) {
    if (!isFunction(f)) invalidArgument('Future.fork', 0, 'be a function', f);
    if (arguments.length === 1) return partial1(fork$f, f);
    if (arguments.length === 2) return fork$f(f, g);
    return fork$f(f, g, m);
  }

  function promise(m) {
    if (!isFuture(m)) invalidFuture('Future.promise', 0, m);
    return m.promise();
  }

  function value$cont(cont, m) {
    if (!isFuture(m)) invalidFuture('Future.value', 1, m);
    return m.value(cont);
  }

  function value(cont, m) {
    if (!isFunction(cont)) invalidArgument('Future.value', 0, 'be a Function', cont);
    if (arguments.length === 1) return partial1(value$cont, cont);
    return value$cont(cont, m);
  }

  function extractLeft(m) {
    if (!isFuture(m)) invalidFuture('Future.extractLeft', 0, m);
    return m.extractLeft();
  }

  function extractRight(m) {
    if (!isFuture(m)) invalidFuture('Future.extractRight', 0, m);
    return m.extractRight();
  }

  function check$ap$f(f) {
    if (!isFunction(f)) typeError('Future#ap expects its first argument to be a Future of a Function' + '\n  Actual: Future.of(' + show(f) + ')');
  }

  function ParallelAp(mval, mfunc) {
    this._mval = mval;
    this._mfunc = mfunc;
  }

  ParallelAp.prototype = Object.create(Core);

  ParallelAp.prototype._fork = function ParallelAp$fork(rej, res) {
    var func,
        val,
        okval = false,
        okfunc = false,
        rejected = false,
        c1,
        c2;

    function ParallelAp$rej(x) {
      if (!rejected) {
        rejected = true;
        rej(x);
      }
    }

    c1 = this._mval._fork(ParallelAp$rej, function ParallelAp$fork$resVal(x) {
      c1 = noop;
      if (!okval) return void (okfunc = true, val = x);
      res(func(x));
    });
    c2 = this._mfunc._fork(ParallelAp$rej, function ParallelAp$fork$resFunc(f) {
      c2 = noop;
      check$ap$f(f);
      if (!okfunc) return void (okval = true, func = f);
      res(f(val));
    });

    return function ParallelAp$fork$cancel() {
      c1();
      c2();
    };
  };

  ParallelAp.prototype.toString = function ParallelAp$toString() {
    return 'new ParallelAp(' + this._mval.toString() + ', ' + this._mfunc.toString() + ')';
  };

  function parallelAp(mval, mfunc) {
    return new ParallelAp(mval, mfunc);
  }

  function After$race(other) {
    return other.isSettled() ? other : isNever(other) ? this : typeof other._time === 'number' ? other._time < this._time ? other : this : Core._race.call(this, other);
  }

  function After(time, value) {
    this._time = time;
    this._value = value;
  }

  After.prototype = Object.create(Core);

  After.prototype._race = After$race;

  After.prototype._swap = function After$swap() {
    return new RejectAfter(this._time, this._value);
  };

  After.prototype._fork = function After$_fork(rej, res) {
    var id = setTimeout(res, this._time, this._value);
    return function After$cancel() {
      clearTimeout(id);
    };
  };

  After.prototype.extractRight = function After$extractRight() {
    return [this._value];
  };

  After.prototype.toString = function After$toString() {
    return 'Future.after(' + show(this._time) + ', ' + show(this._value) + ')';
  };

  function RejectAfter(time, value) {
    this._time = time;
    this._value = value;
  }

  RejectAfter.prototype = Object.create(Core);

  RejectAfter.prototype._race = After$race;

  RejectAfter.prototype._swap = function RejectAfter$swap() {
    return new After(this._time, this._value);
  };

  RejectAfter.prototype._fork = function RejectAfter$_fork(rej) {
    var id = setTimeout(rej, this._time, this._value);
    return function RejectAfter$cancel() {
      clearTimeout(id);
    };
  };

  RejectAfter.prototype.extractLeft = function RejectAfter$extractLeft() {
    return [this._value];
  };

  RejectAfter.prototype.toString = function RejectAfter$toString() {
    return 'Future.rejectAfter(' + show(this._time) + ', ' + show(this._value) + ')';
  };

  function after$time(time, value) {
    return time === Infinity ? never : new After(time, value);
  }

  function after(time, value) {
    if (!isUnsigned(time)) invalidArgument('Future.after', 0, 'be a positive integer', time);
    if (arguments.length === 1) return partial1(after$time, time);
    return after$time(time, value);
  }

  function rejectAfter$time(time, reason) {
    return time === Infinity ? never : new RejectAfter(time, reason);
  }

  function rejectAfter(time, reason) {
    if (!isUnsigned(time)) invalidArgument('Future.rejectAfter', 0, 'be a positive integer', time);
    if (arguments.length === 1) return partial1(rejectAfter$time, time);
    return rejectAfter$time(time, reason);
  }

  function Attempt(fn) {
    this._fn = fn;
  }

  Attempt.prototype = Object.create(Core);

  Attempt.prototype._fork = function Attempt$fork(rej, res) {
    var r;
    try {
      r = this._fn();
    } catch (e) {
      rej(e);return noop;
    }
    res(r);
    return noop;
  };

  Attempt.prototype.toString = function Attempt$toString() {
    return 'Future.try(' + showf(this._fn) + ')';
  };

  function attempt(f) {
    if (!isFunction(f)) invalidArgument('Future.try', 0, 'be a function', f);
    return new Attempt(f);
  }

  var Cold = Cached.Cold = 0;
  var Pending = Cached.Pending = 1;
  var Rejected$1 = Cached.Rejected = 2;
  var Resolved$1 = Cached.Resolved = 3;

  function Queued(rej, res) {
    this[Rejected$1] = rej;
    this[Resolved$1] = res;
  }

  function Cached(pure) {
    this._pure = pure;
    this.reset();
  }

  Cached.prototype = Object.create(Core);

  Cached.prototype.isRejected = function Cached$isRejected() {
    return this._state === Rejected$1;
  };

  Cached.prototype.isResolved = function Cached$isResolved() {
    return this._state === Resolved$1;
  };

  Cached.prototype.extractLeft = function Cached$extractLeft() {
    return this.isRejected() ? [this._value] : [];
  };

  Cached.prototype.extractRight = function Cached$extractRight() {
    return this.isResolved() ? [this._value] : [];
  };

  Cached.prototype._addToQueue = function Cached$addToQueue(rej, res) {
    var _this = this;
    if (_this._state > Pending) return noop;
    var i = _this._queue.push(new Queued(rej, res)) - 1;
    _this._queued = _this._queued + 1;

    return function Cached$removeFromQueue() {
      if (_this._state > Pending) return;
      _this._queue[i] = undefined;
      _this._queued = _this._queued - 1;
      if (_this._queued === 0) _this.reset();
    };
  };

  Cached.prototype._drainQueue = function Cached$drainQueue() {
    if (this._state <= Pending) return;
    if (this._queued === 0) return;
    var queue = this._queue;
    var length = queue.length;
    var state = this._state;
    var value = this._value;

    for (var i = 0; i < length; i++) {
      queue[i] && queue[i][state](value);
      queue[i] = undefined;
    }

    this._queue = undefined;
    this._queued = 0;
  };

  Cached.prototype.reject = function Cached$reject(reason) {
    if (this._state > Pending) return;
    this._value = reason;
    this._state = Rejected$1;
    this._drainQueue();
  };

  Cached.prototype.resolve = function Cached$resolve(value) {
    if (this._state > Pending) return;
    this._value = value;
    this._state = Resolved$1;
    this._drainQueue();
  };

  Cached.prototype.run = function Cached$run() {
    var _this = this;
    if (_this._state > Cold) return;
    _this._state = Pending;
    _this._cancel = _this._pure._fork(function Cached$fork$rej(x) {
      _this.reject(x);
    }, function Cached$fork$res(x) {
      _this.resolve(x);
    });
  };

  Cached.prototype.reset = function Cached$reset() {
    if (this._state === Cold) return;
    if (this._state > Pending) this._cancel();
    this._cancel = noop;
    this._queue = [];
    this._queued = 0;
    this._value = undefined;
    this._state = Cold;
  };

  Cached.prototype._fork = function Cached$_fork(rej, res) {
    var cancel = noop;

    switch (this._state) {
      case Pending:
        cancel = this._addToQueue(rej, res);break;
      case Rejected$1:
        rej(this._value);break;
      case Resolved$1:
        res(this._value);break;
      default:
        cancel = this._addToQueue(rej, res);this.run();
    }

    return cancel;
  };

  Cached.prototype.toString = function Cached$toString() {
    return 'Future.cache(' + this._pure.toString() + ')';
  };

  function cache(m) {
    if (!isFuture(m)) invalidFuture('Future.cache', 0, m);
    return new Cached(m);
  }

  function Encase(fn, a) {
    this._fn = fn;
    this._a = a;
  }

  Encase.prototype = Object.create(Core);

  Encase.prototype._fork = function Encase$fork(rej, res) {
    var r;
    try {
      r = this._fn(this._a);
    } catch (e) {
      rej(e);return noop;
    }
    res(r);
    return noop;
  };

  Encase.prototype.toString = function Encase$toString() {
    return 'Future.encase(' + showf(this._fn) + ', ' + show(this._a) + ')';
  };

  function encase(f, x) {
    if (!isFunction(f)) invalidArgument('Future.encase', 0, 'be a function', f);
    if (arguments.length === 1) return partial1(encase, f);
    return new Encase(f, x);
  }

  function Encase2(fn, a, b) {
    this._fn = fn;
    this._a = a;
    this._b = b;
  }

  Encase2.prototype = Object.create(Core);

  Encase2.prototype._fork = function Encase2$fork(rej, res) {
    var r;
    try {
      r = this._fn(this._a, this._b);
    } catch (e) {
      rej(e);return noop;
    }
    res(r);
    return noop;
  };

  Encase2.prototype.toString = function Encase2$toString() {
    return 'Future.encase2(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ')';
  };

  function encase2(f, x, y) {
    if (!isFunction(f)) invalidArgument('Future.encase2', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encase2, f);
      case 2:
        return partial2(encase2, f, x);
      default:
        return new Encase2(f, x, y);
    }
  }

  function Encase3(fn, a, b, c) {
    this._fn = fn;
    this._a = a;
    this._b = b;
    this._c = c;
  }

  Encase3.prototype = Object.create(Core);

  Encase3.prototype._fork = function Encase3$fork(rej, res) {
    var r;
    try {
      r = this._fn(this._a, this._b, this._c);
    } catch (e) {
      rej(e);return noop;
    }
    res(r);
    return noop;
  };

  Encase3.prototype.toString = function Encase3$toString() {
    return 'Future.encase3(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ', ' + show(this._c) + ')';
  };

  function encase3(f, x, y, z) {
    if (!isFunction(f)) invalidArgument('Future.encase3', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encase3, f);
      case 2:
        return partial2(encase3, f, x);
      case 3:
        return partial3(encase3, f, x, y);
      default:
        return new Encase3(f, x, y, z);
    }
  }

  function EncaseN(fn, a) {
    this._fn = fn;
    this._a = a;
  }

  EncaseN.prototype = Object.create(Core);

  EncaseN.prototype._fork = function EncaseN$fork(rej, res) {
    var open = true;
    this._fn(this._a, function EncaseN$done(err, val) {
      if (open) {
        open = false;
        err ? rej(err) : res(val);
      }
    });
    return function EncaseN$cancel() {
      open = false;
    };
  };

  EncaseN.prototype.toString = function EncaseN$toString() {
    return 'Future.encaseN(' + showf(this._fn) + ', ' + show(this._a) + ')';
  };

  function encaseN(f, x) {
    if (!isFunction(f)) invalidArgument('Future.encaseN', 0, 'be a function', f);
    if (arguments.length === 1) return partial1(encaseN, f);
    return new EncaseN(f, x);
  }

  function EncaseN2(fn, a, b) {
    this._fn = fn;
    this._a = a;
    this._b = b;
  }

  EncaseN2.prototype = Object.create(Core);

  EncaseN2.prototype._fork = function EncaseN2$fork(rej, res) {
    var open = true;
    this._fn(this._a, this._b, function EncaseN2$done(err, val) {
      if (open) {
        open = false;
        err ? rej(err) : res(val);
      }
    });
    return function EncaseN2$cancel() {
      open = false;
    };
  };

  EncaseN2.prototype.toString = function EncaseN2$toString() {
    return 'Future.encaseN2(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ')';
  };

  function encaseN2(f, x, y) {
    if (!isFunction(f)) invalidArgument('Future.encaseN2', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encaseN2, f);
      case 2:
        return partial2(encaseN2, f, x);
      default:
        return new EncaseN2(f, x, y);
    }
  }

  function EncaseN$1(fn, a, b, c) {
    this._fn = fn;
    this._a = a;
    this._b = b;
    this._c = c;
  }

  EncaseN$1.prototype = Object.create(Core);

  EncaseN$1.prototype._fork = function EncaseN$3$fork(rej, res) {
    var open = true;
    this._fn(this._a, this._b, this._c, function EncaseN$3$done(err, val) {
      if (open) {
        open = false;
        err ? rej(err) : res(val);
      }
    });
    return function EncaseN$3$cancel() {
      open = false;
    };
  };

  EncaseN$1.prototype.toString = function EncaseN$3$toString() {
    return 'Future.encaseN3(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ', ' + show(this._c) + ')';
  };

  function encaseN3(f, x, y, z) {
    if (!isFunction(f)) invalidArgument('Future.encaseN3', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encaseN3, f);
      case 2:
        return partial2(encaseN3, f, x);
      case 3:
        return partial3(encaseN3, f, x, y);
      default:
        return new EncaseN$1(f, x, y, z);
    }
  }

  function check$promise(p, f, a) {
    return isThenable(p) ? p : typeError('Future.encaseP expects the function it\'s given to return a Promise/Thenable' + '\n  Actual: ' + show(p) + '\n  From calling: ' + showf(f) + '\n  With: ' + show(a));
  }

  function EncaseP(fn, a) {
    this._fn = fn;
    this._a = a;
  }

  EncaseP.prototype = Object.create(Core);

  EncaseP.prototype._fork = function EncaseP$fork(rej, res) {
    var _fn = this._fn;
    var _a = this._a;
    var open = true;
    check$promise(_fn(_a), _fn, _a).then(immediately(function EncaseP$res(x) {
      if (open) {
        open = false;
        res(x);
      }
    }), immediately(function EncaseP$rej(x) {
      if (open) {
        open = false;
        rej(x);
      }
    }));
    return function EncaseP$cancel() {
      open = false;
    };
  };

  EncaseP.prototype.toString = function EncaseP$toString() {
    return 'Future.encaseP(' + showf(this._fn) + ', ' + show(this._a) + ')';
  };

  function encaseP(f, x) {
    if (!isFunction(f)) invalidArgument('Future.encaseP', 0, 'be a function', f);
    if (arguments.length === 1) return partial1(encaseP, f);
    return new EncaseP(f, x);
  }

  function check$promise$1(p, f, a, b) {
    return isThenable(p) ? p : typeError('Future.encaseP2 expects the function it\'s given to return a Promise/Thenable' + '\n  Actual: ' + show(p) + '\n  From calling: ' + showf(f) + '\n  With 1: ' + show(a) + '\n  With 2: ' + show(b));
  }

  function EncaseP2(fn, a, b) {
    this._fn = fn;
    this._a = a;
    this._b = b;
  }

  EncaseP2.prototype = Object.create(Core);

  EncaseP2.prototype._fork = function EncaseP2$fork(rej, res) {
    var _fn = this._fn;
    var _a = this._a;
    var _b = this._b;
    var open = true;
    check$promise$1(_fn(_a, _b), _fn, _a, _b).then(immediately(function EncaseP2$res(x) {
      if (open) {
        open = false;
        res(x);
      }
    }), immediately(function EncaseP2$rej(x) {
      if (open) {
        open = false;
        rej(x);
      }
    }));
    return function EncaseP2$cancel() {
      open = false;
    };
  };

  EncaseP2.prototype.toString = function EncaseP2$toString() {
    return 'Future.encaseP2(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ')';
  };

  function encaseP2(f, x, y) {
    if (!isFunction(f)) invalidArgument('Future.encaseP2', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encaseP2, f);
      case 2:
        return partial2(encaseP2, f, x);
      default:
        return new EncaseP2(f, x, y);
    }
  }

  function check$promise$2(p, f, a, b, c) {
    return isThenable(p) ? p : typeError('Future.encaseP3 expects the function it\'s given to return a Promise/Thenable' + '\n  Actual: ' + show(p) + '\n  From calling: ' + showf(f) + '\n  With 1: ' + show(a) + '\n  With 2: ' + show(b) + '\n  With 3: ' + show(c));
  }

  function EncaseP3(fn, a, b, c) {
    this._fn = fn;
    this._a = a;
    this._b = b;
    this._c = c;
  }

  EncaseP3.prototype = Object.create(Core);

  EncaseP3.prototype._fork = function EncaseP3$fork(rej, res) {
    var _fn = this._fn;
    var _a = this._a;
    var _b = this._b;
    var _c = this._c;
    var open = true;
    check$promise$2(_fn(_a, _b, _c), _fn, _a, _b, _c).then(immediately(function EncaseP3$res(x) {
      if (open) {
        open = false;
        res(x);
      }
    }), immediately(function EncaseP3$rej(x) {
      if (open) {
        open = false;
        rej(x);
      }
    }));
    return function EncaseP3$cancel() {
      open = false;
    };
  };

  EncaseP3.prototype.toString = function EncaseP3$toString() {
    return 'Future.encaseP3(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ', ' + show(this._c) + ')';
  };

  function encaseP3(f, x, y, z) {
    if (!isFunction(f)) invalidArgument('Future.encaseP3', 0, 'be a function', f);

    switch (arguments.length) {
      case 1:
        return partial1(encaseP3, f);
      case 2:
        return partial2(encaseP3, f, x);
      case 3:
        return partial3(encaseP3, f, x, y);
      default:
        return new EncaseP3(f, x, y, z);
    }
  }

  /*eslint consistent-return: 0*/

  function check$iterator(g) {
    return isIterator(g) ? g : invalidArgument('Future.do', 0, 'return an iterator, maybe you forgot the "*"', g);
  }

  function check$iteration(o) {
    if (!isIteration(o)) typeError('Future.do was given an invalid generator:' + ' Its iterator did not return a valid iteration from iterator.next()' + '\n  Actual: ' + show(o));
    if (o.done || isFuture(o.value)) return o;
    return invalidFuture('Future.do', 'the iterator to produce only valid Futures', o.value, '\n  Tip: If you\'re using a generator, make sure you always yield a Future');
  }

  function Go(generator) {
    this._generator = generator;
  }

  Go.prototype = Object.create(Core);

  Go.prototype._fork = function Go$_fork(rej, res) {

    var iterator = check$iterator(this._generator());

    var timing = Undetermined,
        cancel = noop,
        state,
        value;

    function resolved(x) {
      value = x;
      if (timing === Asynchronous) return drain();
      timing = Synchronous;
      state = check$iteration(iterator.next(value));
    }

    function drain() {
      state = check$iteration(iterator.next(value));

      while (!state.done) {
        timing = Undetermined;
        cancel = state.value._fork(rej, resolved);

        if (timing !== Synchronous) {
          timing = Asynchronous;
          return;
        }
      }

      res(state.value);
    }

    drain();

    return function Go$cancel() {
      cancel();
    };
  };

  Go.prototype.toString = function Go$toString() {
    return 'Future.do(' + showf(this._generator) + ')';
  };

  function go(generator) {
    if (!isFunction(generator)) invalidArgument('Future.do', 0, 'be a Function', generator);
    return new Go(generator);
  }

  function check$dispose(m, f, x) {
    if (!isFuture(m)) invalidFuture('Future.hook', 'the first function it\'s given to return a Future', m, '\n  From calling: ' + showf(f) + '\n  With: ' + show(x));
  }

  function check$consume(m, f, x) {
    if (!isFuture(m)) invalidFuture('Future.hook', 'the second function it\'s given to return a Future', m, '\n  From calling: ' + showf(f) + '\n  With: ' + show(x));
  }

  function Hook(acquire, dispose, consume) {
    this._acquire = acquire;
    this._dispose = dispose;
    this._consume = consume;
  }

  Hook.prototype = Object.create(Core);

  Hook.prototype._fork = function Hook$fork(rej, res) {

    var _acquire = this._acquire,
        _dispose = this._dispose,
        _consume = this._consume;
    var cancel,
        cancelAcquire = noop,
        cancelConsume = noop,
        resource,
        value,
        cont = noop;

    function Hook$done() {
      cont(value);
    }

    function Hook$dispose() {
      var disposal = _dispose(resource);
      check$dispose(disposal, _dispose, resource);
      cancel = disposal._fork(rej, Hook$done);
      return cancel;
    }

    function Hook$cancelConsuption() {
      cancelConsume();
      Hook$dispose()();
    }

    function Hook$consumptionRejected(x) {
      cont = rej;
      value = x;
      Hook$dispose();
    }

    function Hook$consumptionResolved(x) {
      cont = res;
      value = x;
      Hook$dispose();
    }

    function Hook$acquireResolved(x) {
      resource = x;
      var consumption = _consume(resource);
      check$consume(consumption, _consume, resource);
      cancel = Hook$cancelConsuption;
      cancelConsume = consumption._fork(Hook$consumptionRejected, Hook$consumptionResolved);
    }

    cancelAcquire = _acquire._fork(rej, Hook$acquireResolved);

    cancel = cancel || cancelAcquire;

    return function Hook$fork$cancel() {
      cancel();
    };
  };

  Hook.prototype.toString = function Hook$toString() {
    return 'Future.hook(' + this._acquire.toString() + ', ' + showf(this._dispose) + ', ' + showf(this._consume) + ')';
  };

  function hook$acquire$cleanup(acquire, cleanup, consume) {
    if (!isFunction(consume)) invalidArgument('Future.hook', 2, 'be a Future', consume);
    return new Hook(acquire, cleanup, consume);
  }

  function hook$acquire(acquire, cleanup, consume) {
    if (!isFunction(cleanup)) invalidArgument('Future.hook', 1, 'be a function', cleanup);
    if (arguments.length === 2) return partial2(hook$acquire$cleanup, acquire, cleanup);
    return hook$acquire$cleanup(acquire, cleanup, consume);
  }

  function hook(acquire, cleanup, consume) {
    if (!isFuture(acquire)) invalidFuture('Future.hook', 0, acquire);
    if (arguments.length === 1) return partial1(hook$acquire, acquire);
    if (arguments.length === 2) return hook$acquire(acquire, cleanup);
    return hook$acquire(acquire, cleanup, consume);
  }

  function Node(fn) {
    this._fn = fn;
  }

  Node.prototype = Object.create(Core);

  Node.prototype._fork = function Node$fork(rej, res) {
    var open = true;
    this._fn(function Node$done(err, val) {
      if (open) {
        open = false;
        err ? rej(err) : res(val);
      }
    });
    return function Node$cancel() {
      open = false;
    };
  };

  Node.prototype.toString = function Node$toString() {
    return 'Future.node(' + showf(this._fn) + ')';
  };

  function node(f) {
    if (!isFunction(f)) invalidArgument('Future.node', 0, 'be a function', f);
    return new Node(f);
  }

  function check$parallel(m, i) {
    return isFuture(m) ? m : invalidFuture('Future.parallel', 'its second argument to be an array of valid Futures. ' + 'The value at position ' + i + ' in the array is not a Future', m);
  }

  function Parallel(max, futures) {
    this._futures = futures;
    this._length = futures.length;
    this._max = Math.min(this._length, max);
  }

  Parallel.prototype = Object.create(Core);

  Parallel.prototype._fork = function Parallel$_fork(rej, res) {

    var _futures = this._futures,
        _length = this._length,
        _max = this._max;
    var cancels = new Array(_length),
        out = new Array(_length);
    var cursor = 0,
        running = 0,
        blocked = false;

    function Parallel$cancel() {
      for (var n = 0; n < _length; n++) cancels[n] && cancels[n]();
    }

    function Parallel$run(idx) {
      running++;
      cancels[idx] = _futures[idx]._fork(function Parallel$rej(reason) {
        cancels[idx] = noop;
        Parallel$cancel();
        rej(reason);
      }, function Parallel$res(value) {
        cancels[idx] = noop;
        out[idx] = value;
        running--;
        if (cursor === _length && running === 0) res(out);else if (blocked) Parallel$drain();
      });
    }

    function Parallel$drain() {
      blocked = false;
      while (cursor < _length && running < _max) Parallel$run(cursor++);
      blocked = true;
    }

    Parallel$drain();

    return Parallel$cancel;
  };

  Parallel.prototype.toString = function Parallel$toString() {
    return 'Future.parallel(' + this._max + ', ' + show(this._futures) + ')';
  };

  var emptyArray = new Resolved([]);

  function parallel$max(max, xs) {
    if (!isArray(xs)) invalidArgument('Future.parallel', 1, 'be an array', xs);
    var futures = mapArray(xs, check$parallel);
    return futures.length === 0 ? emptyArray : new Parallel(max, futures);
  }

  function parallel(max, xs) {
    if (!isUnsigned(max)) invalidArgument('Future.parallel', 0, 'be a positive integer', max);
    if (arguments.length === 1) return partial1(parallel$max, max);
    return parallel$max(max, xs);
  }

  function check$promise$3(p, f) {
    return isThenable(p) ? p : typeError('Future.tryP expects the function it\'s given to return a Promise/Thenable' + '\n  Actual: ' + show(p) + '\n  From calling: ' + showf(f));
  }

  function TryP(fn) {
    this._fn = fn;
  }

  TryP.prototype = Object.create(Core);

  TryP.prototype._fork = function TryP$fork(rej, res) {
    var open = true;
    check$promise$3(this._fn(), this._fn).then(immediately(function TryP$res(x) {
      if (open) {
        open = false;
        res(x);
      }
    }), immediately(function TryP$rej(x) {
      if (open) {
        open = false;
        rej(x);
      }
    }));
    return function TryP$cancel() {
      open = false;
    };
  };

  TryP.prototype.toString = function TryP$toString() {
    return 'Future.tryP(' + show(this._fn) + ')';
  };

  function tryP(f) {
    if (!isFunction(f)) invalidArgument('Future.tryP', 0, 'be a function', f);
    return new TryP(f);
  }

  if (typeof Object.create !== 'function') error('Please polyfill Object.create to use Fluture');
  if (typeof Object.assign !== 'function') error('Please polyfill Object.assign to use Fluture');
  if (typeof Array.isArray !== 'function') error('Please polyfill Array.isArray to use Fluture');

  Future.of = Future[FL.of] = of;
  Future.chainRec = Future[FL.chainRec] = chainRec;
  Future.reject = reject;
  Future.ap = ap;
  Future.map = map;
  Future.bimap = bimap;
  Future.chain = chain;

  var Par = concurrify$$1(Future, never, race, parallelAp);
  Par.of = Par[FL.of];
  Par.zero = Par[FL.zero];
  Par.map = map;
  Par.ap = ap;
  Par.alt = alt;

  function isParallel(x) {
    return x instanceof Par || type(x) === Par['@@type'];
  }

  function seq(par) {
    if (!isParallel(par)) invalidArgument('Future.seq', 0, 'to be a Par', par);
    return par.sequential;
  }

  var Fluture = Object.freeze({
    Future: Future,
    default: Future,
    Par: Par,
    isParallel: isParallel,
    seq: seq,
    isFuture: isFuture,
    reject: reject,
    of: of,
    never: never,
    isNever: isNever,
    after: after,
    rejectAfter: rejectAfter,
    attempt: attempt,
    try: attempt,
    cache: cache,
    encase: encase,
    encase2: encase2,
    encase3: encase3,
    encaseN: encaseN,
    encaseN2: encaseN2,
    encaseN3: encaseN3,
    encaseP: encaseP,
    encaseP2: encaseP2,
    encaseP3: encaseP3,
    go: go,
    do: go,
    hook: hook,
    node: node,
    parallel: parallel,
    tryP: tryP,
    ap: ap,
    alt: alt,
    map: map,
    bimap: bimap,
    chain: chain,
    mapRej: mapRej,
    chainRej: chainRej,
    lastly: lastly,
    finally: lastly,
    and: and,
    both: both,
    or: or,
    race: race,
    swap: swap,
    fold: fold,
    done: done,
    fork: fork,
    promise: promise,
    value: value,
    extractLeft: extractLeft,
    extractRight: extractRight
  });

  var index_cjs = Object.assign(Future, Fluture);

  return index_cjs;
});
});
var fluture_1 = fluture.isFuture;
var fluture_2 = fluture.of;
var fluture_3 = fluture.reject;
var fluture_4 = fluture.Future;

var isArray = function isArray(arr) {
  return Array.isArray(arr);
};

var isElmNode = function isElmNode(el) {
  return el && el.nodeType === 1;
};

var guaranteeDomEl = function guaranteeDomEl(el) {
  if (isArray(el)) {
    return ifElse_1(all_1(isElmNode), fluture_2, function () {
      return fluture_3({
        error: 'The one or more values in the array you passed in is not a valid DOM Element.'
      });
    })(el);
  }
  return ifElse_1(isElmNode, fluture_2, function () {
    return fluture_3({ error: 'The value you passed in is not a valid DOM Element.' });
  })(el);
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

// _getProp :: String -> DOM Element -> String | Null

var _getProp = function _getProp(prop, dom) {
  return dom[prop] || null;
};

var getProp = curry_1(_getProp);

// _getStyle :: String -> DOM Element -> String

var _getStyle = function _getStyle(prop, dom) {
  return window.getComputedStyles(dom, null)[prop] || null;
};

curry_1(_getStyle);

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

curry_1(_hasStyle);

// _isAttr :: String -> String -> DOM Element -> Bool

var _isAttr = function _isAttr(attr, val, dom) {
  return dom.hasAttribute(attr) ? dom.getAttribute(attr) === val : null;
};

curry_1(_isAttr);

// _isData :: String -> String -> DOM Element -> Bool

var _isData = function _isData(prop, val, dom) {
  return dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] === val : null;
};

curry_1(_isData);

// _isProp :: String -> String -> DOM Element -> Bool

var _isProp = function _isProp(prop, val, dom) {
  return dom[prop] ? dom[prop] === val : null;
};

curry_1(_isProp);

// _isStyle :: String -> String -> DOM Element -> Bool

var _isStyle = function _isStyle(prop, val, dom) {
  var domStyles = window.getComputedStyle(dom, null);
  return domStyles.hasOwnProperty(prop) ? domStyles[prop] === val : null;
};

curry_1(_isStyle);

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

curry_1(_replaceClass);

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

curry_1(_setStyle);

// toggleClass :: String -> DOM Element -> DOM Element
var toggleClass = classList('toggle');

// _dom :: String -> DOM Element -> Future Error DOM Element
var _dom$1 = function _dom$$1(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return fluture_4(function (rej, res) {
    var elm = _dom(cs, root);
    return elm ? res(elm) : rej({
      error: 'An element with the following selector was not found: ' + cs
    });
  });
};

var guaranteeFuture = function guaranteeFuture(el) {
  if (fluture_1(el)) {
    return el;
  } else if (isElmNode(el) || isArray(el) && all_1(isElmNode, el)) {
    return fluture_2(el);
  } else if (typeof el === 'string') {
    return _dom$1(el);
  }
  return fluture_3({
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
  return ifElse_1(isArray, traverse_1(fluture_2, fn), fn);
};

var branch = function branch(fn, el) {
  return compose_1(chain_1(_branch(fn)), chain_1(guaranteeDomEl), guaranteeFuture)(el);
};

var branch$1 = curry_1(branch);

// _addClass :: String -> DOM Element -> Future Error DOM Element
var _addClass$1 = function _addClass$$1(cn, dom) {
  return fluture_2(_addClass(cn, dom));
};

var _addClass$2 = curry_1(_addClass$1);

// addClass :: String -> DOM Element -> Future Error DOM Element
var addClass$1 = function addClass(cn, dom) {
  return branch$1(_addClass$2(cn))(dom);
};

var index$8 = curry_1(addClass$1);

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
var _classList$1 = function _classList(method, cn, dom) {
  return fluture_2(classList(method, cn, dom));
};

var _classList$2 = curry_1(_classList$1);

// classList :: String -> String -> DOM Element -> Future Error DOM Element
var classList$1 = function classList(method, classname, dom) {
  return branch$1(_classList$2(method, classname))(dom);
};

var index$9 = curry_1(classList$1);

// domAll :: String -> DOM Element -> Future Error [DOM Element]
var _domAll$1 = function _domAll$$1(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return fluture_4(function (rej, res) {
    var elms = _domAll(cs, root);
    return elms ? res(elms) : rej({
      error: 'An element with the following selector was not found: ' + cs
    });
  });
};

// futureFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
var futureFindParent = curry_1(function (global, pred, dom) {
  var doc = global ? global : window.document;

  if (dom === doc.body) {
    return fluture_2(dom);
  }

  return pred(dom.parentElement).chain(function (res) {
    return res ? fluture_2(dom.parentElement) : futureFindParent(global, pred, dom.parentElement);
  });
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var _findParent$1 = function _findParent(global, pred, dom) {
  return fluture_1(pred(dom)) ? futureFindParent(global, pred, dom) : fluture_2(findParent(global, pred, dom));
};

var _findParent$2 = curry_1(_findParent$1);

// findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var findParent$1 = function findParent(global, pred, dom) {
  return branch$1(_findParent$2(global, pred))(dom);
};

var findParent$2 = curry_1(findParent$1);

var fork = function fork(rej, res, future) {
  return future.fork(rej, res);
};

var index$10 = curry_1(fork);

// _getAttr :: String -> DOM Element -> Future Error String
var _getAttr$1 = function _getAttr(attr, dom) {
  var result = getAttr(attr, dom);

  return result ? fluture_2(result) : fluture_3({
    error: 'No attribute was found with the following name: ' + attr
  });
};

var _getAttr$2 = curry_1(_getAttr$1);

// getAttr :: String -> DOM Element -> Future Error String
var getAttr$1 = function getAttr(attr, dom) {
  return branch$1(_getAttr$2(attr))(dom);
};

var index$11 = curry_1(getAttr$1);

// _getClass :: Int -> DOM Element -> Future Error String
var _getClass$1 = function _getClass(idx, dom) {
  var result = getClass(idx, dom);

  return result ? fluture_2(result) : fluture_3({
    error: 'No class was found with the following index: ' + idx
  });
};

var _getClass$2 = curry_1(_getClass$1);

// getClass :: Int -> DOM Element -> Future Error String
var getClass$1 = function getClass(idx, dom) {
  return branch$1(_getClass$2(idx))(dom);
};

var index$12 = curry_1(getClass$1);

// _getClasses :: DOM Element -> Future Error String
var _getClasses$1 = function _getClasses$$1(dom) {
  var result = _getClasses(dom);

  return result ? fluture_2(result) : fluture_3({
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

  return result ? fluture_2(result) : fluture_3({
    error: 'No attribute was found with the following name: ' + prop
  });
};

var _getData$2 = curry_1(_getData$1);

// getData :: String -> DOM Element -> Future Error String
var getData$1 = function getData(prop, dom) {
  return branch$1(_getData$2(prop))(dom);
};

var index$13 = curry_1(getData$1);

// _getProp :: String -> DOM Element -> Future Error String
var _getProp$1 = function _getProp(prop, dom) {
  var result = getProp(prop, dom);

  return result ? fluture_2(result) : fluture_3({
    error: 'No property was found with the following name: ' + prop
  });
};

var _getProp$2 = curry_1(_getProp$1);

// getProp :: String -> DOM Element -> Future Error String
var getProp$1 = function getProp(prop, dom) {
  return branch$1(_getProp$2(prop))(dom);
};

var index$14 = curry_1(getProp$1);

// _hasAttr :: String -> DOM Element -> Future Error Bool
var _hasAttr$1 = function _hasAttr(attr, dom) {
  return fluture_2(hasAttr(attr, dom));
};

var _hasAttr$2 = curry_1(_hasAttr$1);

// hasAttr :: String -> DOM Element -> Bool
var hasAttr$1 = function hasAttr(attr, dom) {
  return branch$1(_hasAttr$2(attr))(dom);
};

var index$15 = curry_1(hasAttr$1);

// _hasClass :: String -> DOM Element -> Future Error DOM Element
var _hasClass$1 = function _hasClass(cn, dom) {
  return fluture_2(hasClass(cn, dom));
};

var _hasClass$2 = curry_1(_hasClass$1);

// hasClass :: String -> DOM Element -> Future Error DOM Element
var hasClass$1 = function hasClass(cn, dom) {
  return branch$1(_hasClass$2(cn))(dom);
};

var index$16 = curry_1(hasClass$1);

// _hasData :: String -> DOM Element -> Future Error Bool
var _hasData = function _hasData(prop, dom) {
  return fluture_2(hasData$1(prop, dom));
};

var _hasData$1 = curry_1(_hasData);

// hasData :: String -> DOM Element -> Future Error Bool
var hasData$2 = function hasData(prop, dom) {
  return branch$1(_hasData$1(prop))(dom);
};

var index$17 = curry_1(hasData$2);

// _hasProp :: String -> DOM Element -> Future Error Bool
var _hasProp = function _hasProp(prop, dom) {
  return fluture_2(hasProp$1(prop, dom));
};

var _hasProp$1 = curry_1(_hasProp);

// hasProp :: String -> DOM Element -> Future Error Bool
var hasProp$2 = function hasProp(prop, dom) {
  return branch$1(_hasProp$1(prop))(dom);
};

var index$18 = curry_1(hasProp$2);

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
var _removeAttr$1 = function _removeAttr(attr, dom) {
  return fluture_2(removeAttr(attr, dom));
};

var _removeAttr$2 = curry_1(_removeAttr$1);

// removeAttr :: String -> DOM Element -> Future Error DOM Element
var removeAttr$1 = function removeAttr(attr, dom) {
  return branch$1(_removeAttr$2(attr))(dom);
};

var index$19 = curry_1(removeAttr$1);

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$1 = function _removeClass$$1(cn, dom) {
  return fluture_2(_removeClass(cn, dom));
};

var _removeClass$2 = curry_1(_removeClass$1);

// removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var removeClass$1 = function removeClass(cn, dom) {
  return branch$1(_removeClass$2(cn))(dom);
};

var index$20 = curry_1(removeClass$1);

// _serialize :: Form Element -> Future e {Input Name: Input Value}
var _serialize$1 = function _serialize$$1(form) {
  var result = _serialize(form);

  return result ? fluture_2(result) : fluture_3({ error: 'Element supplied is not a valid DOM Form Element.' });
};

// serialize :: Form Element -> Future e {Input Name: Input Value}
var serialize$1 = function serialize(form) {
  return branch$1(_serialize$1)(form);
};

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var _setAttr$1 = function _setAttr(attr, val, dom) {
  return fluture_2(setAttr(attr, val, dom));
};

var _setAttr$2 = curry_1(_setAttr$1);

// setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var setAttr$1 = function setAttr(attr, val, dom) {
  return branch$1(_setAttr$2(attr, val))(dom);
};

var index$21 = curry_1(setAttr$1);

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
var _setData$1 = function _setData(prop, val, dom) {
  var result = setData(prop, val, dom);

  return result ? fluture_2(result) : fluture_3({
    error: 'The following data attribute you passed in is not valid: ' + prop
  });
};

var _setData$2 = curry_1(_setData$1);

// setData:: String -> String -> DOM Element -> Future Error DOM Element
var setData$1 = function setData(prop, val, dom) {
  return branch$1(_setData$2(prop, val))(dom);
};

var index$22 = curry_1(setData$1);

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
var _setProp$1 = function _setProp(prop, val, dom) {
  return fluture_2(setProp(prop, val, dom));
};

var _setProp$2 = curry_1(_setProp$1);

// setProp :: String -> String -> DOM Element -> Future Error DOM Element
var setProp$1 = function setProp(prop, val, dom) {
  return branch$1(_setProp$2(prop, val))(dom);
};

var index$23 = curry_1(setProp$1);

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
var _toggleClass = function _toggleClass(cn, dom) {
  return fluture_2(toggleClass(cn, dom));
};

var _toggleClass$1 = curry_1(_toggleClass);

// toggleClass :: String -> DOM Element -> Future Error DOM Element
var toggleClass$2 = function toggleClass(cn, dom) {
  return branch$1(_toggleClass$1(cn))(dom);
};

var index$24 = curry_1(toggleClass$2);

var identity = function identity(a) {
  return a;
}; // eslint-disable-line no-empty-function
var globalFindParent = findParent$2();

exports.addClass = index$8;
exports.classList = index$9;
exports.dom = _dom$1;
exports.domAll = _domAll$1;
exports.findParent = globalFindParent;
exports.fork = index$10;
exports.getAttr = index$11;
exports.getClass = index$12;
exports.getClasses = getClasses$1;
exports.getData = index$13;
exports.getProp = index$14;
exports.hasAttr = index$15;
exports.hasClass = index$16;
exports.hasData = index$17;
exports.hasProp = index$18;
exports.identity = identity;
exports.removeAttr = index$19;
exports.removeClass = index$20;
exports.serialize = serialize$1;
exports.setAttr = index$21;
exports.setData = index$22;
exports.setProp = index$23;
exports.toggleClass = index$24;

Object.defineProperty(exports, '__esModule', { value: true });

})));
