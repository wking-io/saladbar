(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['saladbar-either'] = {})));
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

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var BLAME_FUNCTION_INDEX = 3; // [current, parent, *error*, caller to blame, …]

function warnDeprecation(reason) {
  // eslint-disable-line max-statements
  if (process.env.FOLKTALE_ASSERTIONS !== 'none') {
    var stack = new Error('').stack;
    var offender = void 0;
    if (stack) {
      var lines = stack.split('\n');
      offender = lines[BLAME_FUNCTION_INDEX];
    }

    if (offender) {
      console.warn(reason + '\n    Blame: ' + offender.trim());
    } else {
      console.warn(reason);
    }
  }
}

var warnDeprecation_1 = warnDeprecation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var keys$2 = Object.keys;
var symbols = Object.getOwnPropertySymbols;
var defineProperty = Object.defineProperty;
var property = Object.getOwnPropertyDescriptor;

/*
 * Extends an objects with own enumerable key/value pairs from other sources.
 *
 * This is used to define objects for the ADTs througout this file, and there
 * are some important differences from Object.assign:
 *
 *   - This code is only concerned with own enumerable property *names*.
 *   - Additionally this code copies all own symbols (important for tags).
 *
 * When copying, this function copies **whole property descriptors**, which
 * means getters/setters are not executed during the copying. The only
 * exception is when the property name is `prototype`, which is not
 * configurable in functions by default.
 *
 * This code only special cases `prototype` because any other non-configurable
 * property is considered an error, and should crash the program so it can be
 * fixed.
 */
function extend(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    keys$2(source).forEach(function (key) {
      if (key === 'prototype') {
        target[key] = source[key];
      } else {
        defineProperty(target, key, property(source, key));
      }
    });
    symbols(source).forEach(function (symbol) {
      defineProperty(target, symbol, property(source, symbol));
    });
  });
  return target;
}

var extend_1 = extend;

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];desc.configurable = desc.enumerable = true;if ("value" in desc) desc.writable = true;Object.defineProperty(obj, key, desc);
  }return obj;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------



// --[ Constants and Aliases ]------------------------------------------
var TYPE = Symbol.for('@@folktale:adt:type');
var TAG = Symbol.for('@@folktale:adt:tag');
var META = Symbol.for('@@meta:magical');

var keys$3 = Object.keys;

// --[ Helpers ]--------------------------------------------------------

//
// Returns an array of own enumerable values in an object.
//
function values(object) {
  return keys$3(object).map(function (key) {
    return object[key];
  });
}

//
// Transforms own enumerable key/value pairs.
//
function mapObject(object, transform) {
  return keys$3(object).reduce(function (result, key) {
    result[key] = transform(key, object[key]);
    return result;
  }, {});
}

// --[ Variant implementation ]-----------------------------------------

//
// Defines the variants given a set of patterns and an ADT namespace.
//
function defineVariants(typeId, patterns, adt) {
  return mapObject(patterns, function (name, constructor) {
    var _constructor, _ref, _extend, _mutatorMap, _tag, _type, _constructor2, _extend2, _mutatorMap2;

    // ---[ Variant Internals ]-----------------------------------------
    function InternalConstructor() {}
    InternalConstructor.prototype = Object.create(adt);

    extend_1(InternalConstructor.prototype, (_extend = {}, _defineProperty(_extend, TAG, name), _constructor = 'constructor', _mutatorMap = {}, _mutatorMap[_constructor] = _mutatorMap[_constructor] || {}, _mutatorMap[_constructor].get = function () {
      return constructor;
    }, _ref = 'is' + name, _mutatorMap[_ref] = _mutatorMap[_ref] || {}, _mutatorMap[_ref].get = function () {
      warnDeprecation_1('.is' + name + ' is deprecated. Use ' + name + '.hasInstance(value)\ninstead to check if a value belongs to the ADT variant.');
      return true;
    }, _defineProperty(_extend, 'matchWith', function matchWith(pattern) {
      return pattern[name](this);
    }), _defineEnumerableProperties(_extend, _mutatorMap), _extend));

    function makeInstance() {
      var result = new InternalConstructor(); // eslint-disable-line prefer-const
      extend_1(result, constructor.apply(undefined, arguments) || {});
      return result;
    }

    extend_1(makeInstance, (_extend2 = {}, _defineProperty(_extend2, META, constructor[META]), _tag = 'tag', _mutatorMap2 = {}, _mutatorMap2[_tag] = _mutatorMap2[_tag] || {}, _mutatorMap2[_tag].get = function () {
      return name;
    }, _type = 'type', _mutatorMap2[_type] = _mutatorMap2[_type] || {}, _mutatorMap2[_type].get = function () {
      return typeId;
    }, _constructor2 = 'constructor', _mutatorMap2[_constructor2] = _mutatorMap2[_constructor2] || {}, _mutatorMap2[_constructor2].get = function () {
      return constructor;
    }, _defineProperty(_extend2, 'prototype', InternalConstructor.prototype), _defineProperty(_extend2, 'hasInstance', function hasInstance(value) {
      return Boolean(value) && adt.hasInstance(value) && value[TAG] === name;
    }), _defineEnumerableProperties(_extend2, _mutatorMap2), _extend2));

    return makeInstance;
  });
}

// --[ ADT Implementation ]--------------------------------------------

/*~
 * authors:
 *   - Quildreen Motta
 * 
 * stability: experimental
 * type: |
 *   (String, Object (Array String)) => Union
 */
var union = function union(typeId, patterns) {
  var _extend3;

  var UnionNamespace = Object.create(Union);
  var variants = defineVariants(typeId, patterns, UnionNamespace);

  extend_1(UnionNamespace, variants, (_extend3 = {}, _defineProperty(_extend3, TYPE, typeId), _defineProperty(_extend3, 'variants', values(variants)), _defineProperty(_extend3, 'hasInstance', function hasInstance(value) {
    return Boolean(value) && value[TYPE] === this[TYPE];
  }), _extend3));

  return UnionNamespace;
};

/*~ ~belongsTo : union */
var Union = {
  /*~
   * type: |
   *   Union . (...(Variant, Union) => Any) => Union
   */
  derive: function derive() {
    var _this = this;

    for (var _len = arguments.length, derivations = Array(_len), _key = 0; _key < _len; _key++) {
      derivations[_key] = arguments[_key];
    }

    derivations.forEach(function (derivation) {
      _this.variants.forEach(function (variant) {
        return derivation(variant, _this);
      });
    });
    return this;
  }
};

// --[ Exports ]--------------------------------------------------------
union.Union = Union;
union.typeSymbol = TYPE;
union.tagSymbol = TAG;

var union_1 = union;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var typeSymbol = union_1.typeSymbol;

var assertType = function (type) {
  return function (method, value) {
    var typeName = type[typeSymbol];
    if (process.env.FOLKTALE_ASSERTIONS !== 'none' && !type.isPrototypeOf(value)) {
      console.warn(typeName + '.' + method + ' expects a value of the same type, but was given ' + value + '.');

      if (process.env.FOLKTALE_ASSERTIONS !== 'minimal') {
        console.warn('\nThis could mean that you\'ve provided the wrong value to the method, in\nwhich case this is a bug in your program, and you should try to track\ndown why the wrong value is getting here.\n\nBut this could also mean that you have more than one ' + typeName + ' library\ninstantiated in your program. This is not **necessarily** a bug, it\ncould happen for several reasons:\n\n 1) You\'re loading the library in Node, and Node\'s cache didn\'t give\n    you back the same instance you had previously requested.\n\n 2) You have more than one Code Realm in your program, and objects\n    created from the same library, in different realms, are interacting.\n\n 3) You have a version conflict of folktale libraries, and objects\n    created from different versions of the library are interacting.\n\nIf your situation fits the cases (1) or (2), you are okay, as long as\nthe objects originate from the same version of the library. Folktale\ndoes not rely on reference checking, only structural checking. However\nyou\'ll want to watch out if you\'re modifying the ' + typeName + '\'s prototype,\nbecause you\'ll have more than one of them, and you\'ll want to make\nsure you do the same change in all of them \u2014 ideally you shouldn\'t\nbe modifying the object, though.\n\nIf your situation fits the case (3), you are *probably* okay if the\nversion difference isn\'t a major one. However, at this point the\nbehaviour of your program using ' + typeName + ' is undefined, and you should\ntry looking into why the version conflict is happening.\n\nParametric modules can help ensuring your program only has a single\ninstance of the folktale library. Check out the Folktale Architecture\ndocumentation for more information.\n      ');
      }
    }
  };
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertFunction = function (method, transformation) {
  if (typeof transformation !== 'function') {
    throw new TypeError(method + ' expects a function, but was given ' + transformation + '.');
  }
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a, ('a) => 'b) => Object 'b
 */

var mapValues = function mapValues(object, transformation) {
  var keys = Object.keys(object);
  var result = {};

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    result[key] = transformation(object[key]);
  }

  return result;
};

// --[ Convenience ]---------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 * 
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) . (('a) => 'b) => Object 'b
 */
mapValues.infix = function (transformation) {
  return mapValues(this, transformation);
};

// --[ Exports ]-------------------------------------------------------
var mapValues_1 = mapValues;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability : stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) => Array 'a
 */

var values$1 = function values(object) {
  return Object.keys(object).map(function (k) {
    return object[k];
  });
};

// --[ Exports ]-------------------------------------------------------
var values_1 = values$1;

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var tagSymbol = union_1.tagSymbol,
    typeSymbol$1 = union_1.typeSymbol;





// --[ Constants ]------------------------------------------------------
var typeJsonKey = '@@type';
var tagJsonKey = '@@tag';
var valueJsonKey = '@@value';

// --[ Helpers ]--------------------------------------------------------

/*~
 * type: ((Object 'a) => 'b) => ([Object 'a]) => Object 'b  
 */
var arrayToObject = function arrayToObject(extractKey) {
  return function (array) {
    return array.reduce(function (object, element) {
      object[extractKey(element)] = element;
      return object;
    }, {});
  };
};

/*~
 * type: (String) => (Object 'a) => 'a | None 
 */
var property$1 = function property(propertyName) {
  return function (object) {
    return object[propertyName];
  };
};

/*~
 * type: ([Object 'a]) => Object 'a 
 */
var indexByType = arrayToObject(property$1(typeSymbol$1));

/*~
 * type: (String, String) => Bool
 */
var assertType$2 = function assertType(given, expected) {
  if (expected !== given) {
    throw new TypeError('\n       The JSON structure was generated from ' + expected + '.\n       You are trying to parse it as ' + given + '. \n    ');
  }
};

/*~
 * type: |
 *   type JSONSerialisation = {
 *     "@@type":  String,
 *     "@@tag":   String,
 *     "@@value": Object Any
 *   }
 *   type JSONParser = {
 *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
 *   }
 * 
 *   (Object JSONParser) => (JSONSerialisation) => Any
 */
var parseValue = function parseValue(parsers) {
  return function (value) {
    if (value !== null && typeof value[typeJsonKey] === 'string') {
      var type = value[typeJsonKey];
      if (parsers[type]) {
        return parsers[type].fromJSON(value, parsers, true);
      } else {
        return value;
      }
    } else {
      return value;
    }
  };
};

/*~
 * type: ('a) => JSON
 */
var serializeValue = function serializeValue(value) {
  return value === undefined ? null : value !== null && typeof value.toJSON === 'function' ? value.toJSON() : /* otherwise */value;
};

// --[ Implementation ]-------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, ADT) => Void 
 */
var serialization = function serialization(variant, adt) {
  var typeName = adt[typeSymbol$1];
  var tagName = variant.prototype[tagSymbol];

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   * 
   *   Variant . () => JSONSerialisation
   */
  variant.prototype.toJSON = function () {
    var _ref;

    return _ref = {}, _defineProperty$1(_ref, typeJsonKey, typeName), _defineProperty$1(_ref, tagJsonKey, tagName), _defineProperty$1(_ref, valueJsonKey, mapValues_1(this, serializeValue)), _ref;
  };

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   *   type JSONParser = {
   *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
   *   }
   * 
   *   (JSONSerialisation, Array JSONParser) => Variant
   */
  adt.fromJSON = function (value) {
    var parsers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty$1({}, typeName, adt);
    var keysIndicateType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var valueTypeName = value[typeJsonKey];
    var valueTagName = value[tagJsonKey];
    var valueContents = value[valueJsonKey];
    assertType$2(typeName, valueTypeName);
    var parsersByType = keysIndicateType ? parsers : /*otherwise*/indexByType(values_1(parsers));

    var parsedValue = mapValues_1(valueContents, parseValue(parsersByType));
    return extend_1(Object.create(adt[valueTagName].prototype), parsedValue);
  };
};

// --[ Exports ]--------------------------------------------------------
var serialization_1 = serialization;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var fantasyLand = {
  equals: 'fantasy-land/equals',
  concat: 'fantasy-land/concat',
  empty: 'fantasy-land/empty',
  map: 'fantasy-land/map',
  ap: 'fantasy-land/ap',
  of: 'fantasy-land/of',
  reduce: 'fantasy-land/reduce',
  traverse: 'fantasy-land/traverse',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  extend: 'fantasy-land/extend',
  extract: 'fantasy-land/extract',
  bimap: 'fantasy-land/bimap',
  promap: 'fantasy-land/promap'
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

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any...) => 'a) => Any... => 'a or ((Any...) => 'a)
 */
var curry$2 = function curry(arity, fn) {
  var curried = function curried(oldArgs) {
    return function () {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      var allArgs = oldArgs.concat(newArgs);
      var argCount = allArgs.length;

      return argCount < arity ? curried(allArgs) : /* otherwise */fn.apply(undefined, _toConsumableArray(allArgs));
    };
  };

  return curried([]);
};

// --[ Exports ]-------------------------------------------------------
var curry_1$1 = curry$2;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------



var warnDeprecatedMethod = function (methodName) {
  return function (result) {
    warnDeprecation_1('Type.' + methodName + '() is being deprecated in favour of Type[\'fantasy-land/' + methodName + '\'](). \n    Your data structure is using the old-style fantasy-land methods,\n    and these won\'t be supported in Folktale 3');
    return result;
  };
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var unsupportedMethod = function (methodName) {
  return function (object) {
    throw new TypeError(object + " does not have a method '" + methodName + "'.");
  };
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var flEquals = fantasyLand.equals;


var warn = warnDeprecatedMethod('equals');
var unsupported = unsupportedMethod('equals');

var isNew = function isNew(a) {
  return typeof a[flEquals] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.equals === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => Boolean
 *   where S is Setoid
 */
var equals = function equals(setoidLeft, setoidRight) {
  return isNew(setoidLeft) ? setoidLeft[flEquals](setoidRight) : isOld(setoidLeft) ? warn(setoidLeft.equals(setoidRight)) : /*otherwise*/unsupported(setoidLeft);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => Boolean
 *   where S is Setoid
 */
equals.curried = curry_1$1(2, function (setoidRight, setoidLeft) {
  return (// eslint-disable-line no-magic-numbers
    equals(setoidLeft, setoidRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => Boolean
 *   where S is Setoid
 */
equals.infix = function (aSetoid) {
  return equals(this, aSetoid);
};

var equals_1 = equals;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var aliases = {
  equals: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => Boolean
     *   where 'S is Setoid
     */
    'fantasy-land/equals': function fantasyLandEquals(that) {
      return this.equals(that);
    }
  },

  concat: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => 'S 'a
     *   where 'S is Semigroup
     */
    'fantasy-land/concat': function fantasyLandConcat(that) {
      return this.concat(that);
    }
  },

  empty: {
    /*~
     * module: null
     * type: |
     *   ('M).() => 'M a
     *   where 'M is Monoid
     */
    'fantasy-land/empty': function fantasyLandEmpty() {
      return this.empty();
    }
  },

  map: {
    /*~
     * module: null
     * type: |
     *   ('F 'a).(('a) => 'b) => 'F 'b
     *   where 'F is Functor
     */
    'fantasy-land/map': function fantasyLandMap(transformation) {
      return this.map(transformation);
    }
  },

  apply: {
    /*~
     * module: null
     * type: |
     *   ('F ('a) => b).('F 'a) => 'F 'b
     *   where 'F is Apply
     */
    ap: function ap(that) {
      return this.apply(that);
    },

    /*~
     * module: null
     * type: |
     *   ('F 'a).('F ('a) => 'b) => 'F 'b
     *   where 'F is Apply
     */
    'fantasy-land/ap': function fantasyLandAp(that) {
      return that.apply(this);
    }
  },

  of: {
    /*~
     * module: null
     * type: |
     *   forall F, a:
     *     (F).(a) => F a
     *   where F is Applicative 
     */
    'fantasy-land/of': function fantasyLandOf(value) {
      return this.of(value);
    }
  },

  reduce: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b:
     *     (F a).((b, a) => b, b) => b
     *   where F is Foldable  
     */
    'fantasy-land/reduce': function fantasyLandReduce(combinator, initial) {
      return this.reduce(combinator, initial);
    }
  },

  traverse: {
    /*~
     * module: null
     * type: |
     *   forall F, T, a, b:
     *     (T a).((a) => F b, (c) => F c) => F (T b)
     *   where F is Apply, T is Traversable
     */
    'fantasy-land/traverse': function fantasyLandTraverse(transformation, lift) {
      return this.traverse(transformation, lift);
    }
  },

  chain: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b:
     *     (M a).((a) => M b) => M b
     *   where M is Chain
     */
    'fantasy-land/chain': function fantasyLandChain(transformation) {
      return this.chain(transformation);
    }
  },

  chainRecursively: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec 
     */
    chainRec: function chainRec(step, initial) {
      return this.chainRecursively(step, initial);
    },

    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec 
     */
    'fantasy-land/chainRec': function fantasyLandChainRec(step, initial) {
      return this.chainRecursively(step, initial);
    }
  },

  extend: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).((W a) => b) => W b
     *   where W is Extend
     */
    'fantasy-land/extend': function fantasyLandExtend(transformation) {
      return this.extend(transformation);
    }
  },

  extract: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).() => a
     *   where W is Comonad
     */
    'fantasy-land/extract': function fantasyLandExtract() {
      return this.extract();
    }
  },

  bimap: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b, c, d:
     *     (F a b).((a) => c, (b) => d) => F c d
     *   where F is Bifunctor
     */
    'fantasy-land/bimap': function fantasyLandBimap(f, g) {
      return this.bimap(f, g);
    }
  },

  promap: {
    /*~
     * module: null
     * type: |
     *   forall P, a, b, c, d:
     *     (P a b).((c) => a, (b) => d) => P c d
     */
    'fantasy-land/promap': function fantasyLandPromap(f, g) {
      return this.promap(f, g);
    }
  }
};

var provideAliases = function provideAliases(structure) {
  Object.keys(aliases).forEach(function (method) {
    if (typeof structure[method] === 'function') {
      Object.keys(aliases[method]).forEach(function (alias) {
        structure[alias] = aliases[method][alias];
      });
    }
  });
};

var provideFantasyLandAliases = provideAliases;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var mm = Symbol.for('@@meta:magical');

var copyDocumentation = function copyDocumentation(source, target) {
  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (process.env.FOLKTALE_DOCS !== 'false') {
    target[mm] = Object.assign({}, source[mm] || {}, extensions);
  }
};

var copyDocumentation_1 = copyDocumentation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------







var tagSymbol$1 = union_1.tagSymbol,
    typeSymbol$2 = union_1.typeSymbol;

var toString$1 = Object.prototype.toString;
var prototypeOf = Object.getPrototypeOf;

// --[ Helpers ]--------------------------------------------------------

/*~
 * type: (Any) => Boolean
 */
var isSetoid = function isSetoid(value) {
  return value != null && (typeof value[fantasyLand.equals] === 'function' || typeof value.equals === 'function');
};

/*~
 * type: (Variant, Variant) => Boolean
 */
var sameType = function sameType(a, b) {
  return a[typeSymbol$2] === b[typeSymbol$2] && a[tagSymbol$1] === b[tagSymbol$1];
};

var isPlainObject = function isPlainObject(object) {
  if (Object(object) !== object) return false;

  return !prototypeOf(object) || !object.toString || toString$1.call(object) === object.toString();
};

var deepEquals = function deepEquals(a, b) {
  if (a === b) return true;

  var leftSetoid = isSetoid(a);
  var rightSetoid = isSetoid(b);
  if (leftSetoid) {
    if (rightSetoid) return equals_1(a, b);else return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every(function (x, i) {
      return deepEquals(x, b[i]);
    });
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    var setB = new Set(keysB);
    return keysA.length === keysB.length && prototypeOf(a) === prototypeOf(b) && keysA.every(function (k) {
      return setB.has(k) && a[k] === b[k];
    });
  }

  return false;
};

// --[ Implementation ]------------------------------------------------
/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (('a, 'a) => Boolean) => (Variant, Union) => Void
 */
var createDerivation = function createDerivation(valuesEqual) {
  /*~
   * type: ('a, 'a) => Boolean
   */
  var equals = function equals(a, b) {
    // identical objects must be equal
    if (a === b) return true;

    // we require both values to be setoids if one of them is
    var leftSetoid = isSetoid(a);
    var rightSetoid = isSetoid(b);
    if (leftSetoid) {
      if (rightSetoid) return equals_1(a, b);else return false;
    }

    // fall back to the provided equality
    return valuesEqual(a, b);
  };

  /*~
   * type: (Object Any, Object Any, Array String) => Boolean
   */
  var compositesEqual = function compositesEqual(a, b, keys) {
    for (var i = 0; i < keys.length; ++i) {
      var keyA = a[keys[i]];
      var keyB = b[keys[i]];
      if (!equals(keyA, keyB)) {
        return false;
      }
    }
    return true;
  };

  var derivation = function derivation(variant, adt) {
    /*~
     * stability: experimental
     * module: null
     * authors:
     *   - "@boris-marinov"
     *   - Quildreen Motta
     * 
     * type: |
     *   forall S, a:
     *     (S a).(S a) => Boolean
     *   where S is Setoid
     */
    variant.prototype.equals = function (value) {
      assertType(adt)(this[tagSymbol$1] + '#equals', value);
      return sameType(this, value) && compositesEqual(this, value, Object.keys(this));
    };
    provideFantasyLandAliases(variant.prototype);
    return variant;
  };
  copyDocumentation_1(createDerivation, derivation, {
    type: '(Variant, Union) => Void'
  });

  return derivation;
};

// --[ Exports ]-------------------------------------------------------

/*~~inheritsMeta: createDerivation */
var equality = createDerivation(deepEquals);

var withCustomComparison = createDerivation;
equality.withCustomComparison = withCustomComparison;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var tagSymbol$2 = union_1.tagSymbol,
    typeSymbol$3 = union_1.typeSymbol;

// --[ Helpers ]--------------------------------------------------------
/*~
 * type: (Object Any) => String
 */

var objectToKeyValuePairs = function objectToKeyValuePairs(object) {
  return Object.keys(object).map(function (key) {
    return key + ': ' + showValue(object[key]);
  }).join(', ');
};

/*~
 * type: (Object Any).() => String
 */
var plainObjectToString = function plainObjectToString() {
  return '{ ' + objectToKeyValuePairs(this) + ' }';
};

/*~
 * type: (Array Any).() => String
 */
var arrayToString = function arrayToString() {
  return '[' + this.map(showValue).join(', ') + ']';
};

/*~
 * type: (Function) => String
 */
var functionNameToString = function functionNameToString(fn) {
  return fn.name !== '' ? ': ' + fn.name : '';
};

/*~
 * type: (Function) => String
 */
var functionToString = function functionToString(fn) {
  return '[Function' + functionNameToString(fn) + ']';
};

/*~
 * type: () => String
 */
var nullToString = function nullToString() {
  return 'null';
};

/*~
 * type: (Any) => Bool
 */
var isPlainObject$1 = function isPlainObject(object) {
  return !object.toString || object.toString === Object.prototype.toString;
};

/*~
 * type: (Null | Object Any) => String
 */
var objectToString = function objectToString(object) {
  return object === null ? nullToString : Array.isArray(object) ? arrayToString : isPlainObject$1(object) ? plainObjectToString : /* otherwise */object.toString;
};

/*~
 * type: (Any) => String
 */
var showValue = function showValue(value) {
  return typeof value === 'undefined' ? 'undefined' : typeof value === 'function' ? functionToString(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' ? value.toString() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? objectToString(value).call(value) : /* otherwise */JSON.stringify(value);
};

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, Union) => Void
 */
var debugRepresentation = function debugRepresentation(variant, adt) {
  // eslint-disable-line max-statements
  var typeName = adt[typeSymbol$3];
  var variantName = adt[typeSymbol$3] + '.' + variant.prototype[tagSymbol$2];

  // (for Object.prototype.toString)
  adt[Symbol.toStringTag] = typeName;
  variant.prototype[Symbol.toStringTag] = variantName;

  // (regular JavaScript representations)
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  adt.toString = function () {
    return typeName;
  };

  /*~
   * stability: experimental
   * mmodule: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  variant.toString = function () {
    return variantName;
  };

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   (Union).() => String
   */
  variant.prototype.toString = function () {
    return variantName + '(' + plainObjectToString.call(this) + ')';
  };

  // (Node REPL representations)
  adt.inspect = adt.toString;
  variant.inspect = variant.toString;
  variant.prototype.inspect = variant.prototype.toString;

  return variant;
};

// --[ Exports ]-------------------------------------------------------
var debugRepresentation_1 = debugRepresentation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union/derivations
 */

var derivations = {
  serialization: serialization_1,
  equality: equality,
  debugRepresentation: debugRepresentation_1
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union
 */

var union$1 = {
  union: union_1,
  derivations: derivations
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------



var defineAdtMethod = function defineAdtMethod(adt, definitions) {
  Object.keys(definitions).forEach(function (name) {
    var methods = definitions[name];
    adt.variants.forEach(function (variant) {
      var method = methods[variant.tag];
      if (!method) {
        throw new TypeError('Method ' + name + ' not defined for ' + variant.tag);
      }
      copyDocumentation_1(methods, method);
      variant.prototype[name] = method;
    });
  });
};

var defineAdtMethods = defineAdtMethod;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Error$1 = result.Error,
    Ok = result.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *      (Validation a b) => Result a b
 */

var validationToResult = function validationToResult(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure(_ref) {
      var value = _ref.value;
      return Error$1(value);
    },
    Success: function Success(_ref2) {
      var value = _ref2.value;
      return Ok(value);
    }
  });
};

var validationToResult_1 = validationToResult;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Error$2 = result.Error,
    Ok$1 = result.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Result b a
 */

var maybeToResult = function maybeToResult(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Error$2(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Ok$1(value);
    }
  });
};

var maybeToResult_1 = maybeToResult;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Success = validation.Success,
    Failure = validation.Failure;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Validation b a
 */

var maybeToValidation = function maybeToValidation(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Failure(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Success(value);
    }
  });
};

var maybeToValidation_1 = maybeToValidation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------




var union$3 = union$1.union,
    derivations$2 = union$1.derivations;






var equality$2 = derivations$2.equality,
    debugRepresentation$1 = derivations$2.debugRepresentation,
    serialization$1 = derivations$2.serialization;

/*~ stability: stable */

var Maybe = union$3('folktale:Maybe', {
  /*~
   * type: |
   *   forall a: () => Maybe a
   */
  Nothing: function Nothing() {},

  /*~
   * type: |
   *   forall a: (a) => Maybe a
   */
  Just: function Just(value) {
    return { value: value };
  }
}).derive(equality$2, debugRepresentation$1, serialization$1);

var Nothing = Maybe.Nothing,
    _Just = Maybe.Just;

var assertMaybe = assertType(Maybe);

extend_1(_Just.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a: get (Maybe a) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Maybe.Just');
  }
});

/*~~belongsTo: Maybe */
defineAdtMethods(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => b) => Maybe b
   */
  map: {
    /*~*/
    Nothing: function map(transformation) {
      assertFunction('Maybe.Nothing#map', transformation);
      return this;
    },

    /*~*/
    Just: function map(transformation) {
      assertFunction('Maybe.Just#map', transformation);
      return _Just(transformation(this.value));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe (a) => b).(Maybe a) => Maybe b
   */
  apply: {
    /*~*/
    Nothing: function apply(aMaybe) {
      assertMaybe('Maybe.Nothing#apply', aMaybe);
      return this;
    },

    /*~*/
    Just: function apply(aMaybe) {
      assertMaybe('Maybe.Just#apply', aMaybe);
      return aMaybe.map(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => Maybe b) => Maybe b
   */
  chain: {
    /*~*/
    Nothing: function chain(transformation) {
      assertFunction('Maybe.Nothing#chain', transformation);
      return this;
    },

    /*~*/
    Just: function chain(transformation) {
      assertFunction('Maybe.Just#chain', transformation);
      return transformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  unsafeGet: {
    /*~*/
    Nothing: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Nothing.\n\n    Since Nothing holds no values, it\'s not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Just: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).(a) => a
   */
  getOrElse: {
    /*~*/
    Nothing: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Just: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).((a) => Maybe a) => Maybe a
   */
  orElse: {
    /*~*/
    Nothing: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Just: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return this;
    }
  },

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: (Maybe a).(Maybe a) => Maybe a
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Nothing: function concat(aMaybe) {
      assertMaybe('Maybe.Nothing#concat', aMaybe);
      return aMaybe;
    },

    /*~*/
    Just: function concat(aMaybe) {
      var _this = this;

      assertMaybe('Maybe.Just#concat', aMaybe);
      return aMaybe.matchWith({
        Nothing: function Nothing() {
          return _Just(_this.value);
        },
        Just: function Just(a) {
          return _Just(_this.value.concat(a.value));
        }
      });
    }
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .matchWith(pattern)
   * 
   * type: |
   *   forall a, b:
   *     (Maybe a).({
   *       Nothing: () => b,
   *       Just: (a) => b
   *     }) => b
   */
  cata: {
    /*~*/
    Nothing: function cata(pattern) {
      warnDeprecation_1('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Nothing();
    },

    /*~*/
    Just: function cata(pattern) {
      warnDeprecation_1('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Just(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Maybe a).(() => b, (a) => b) => b
   */
  fold: {
    /*~*/
    Nothing: function Nothing(transformNothing, transformJust) {
      assertFunction('Maybe.Nothing#fold', transformNothing);
      assertFunction('Maybe.Nothing#fold', transformJust);
      return transformNothing();
    },

    /*~*/
    Just: function Just(transformNothing, transformJust) {
      assertFunction('Maybe.Just#fold', transformNothing);
      assertFunction('Maybe.Just#fold', transformJust);
      return transformJust(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Nothing: function filter(predicate) {
      assertFunction('Maybe.Nothing#filter', predicate);
      return this;
    },

    /*~*/
    Just: function filter(predicate) {
      assertFunction('Maybe.Just#filter', predicate);
      return predicate(this.value) ? this : Nothing();
    }
  }
});

Object.assign(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a: (a) => Maybe a
   */
  of: function of(value) {
    return _Just(value);
  },

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: () => Maybe a
   */
  empty: function empty() {
    return Nothing();
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation_1('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toResult: function toResult(fallbackValue) {
    return maybeToResult_1(this, fallbackValue);
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toValidation: function toValidation(fallbackValue) {
    return maybeToValidation_1(this, fallbackValue);
  }
});

provideFantasyLandAliases(_Just.prototype);
provideFantasyLandAliases(Nothing.prototype);
provideFantasyLandAliases(Maybe);

var maybe = Maybe;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Just = maybe.Just,
    Nothing$1 = maybe.Nothing;

/*~
 * stability: stable
 * authors: 
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Validation a b) => Maybe b
 */

var validationToMaybe = function validationToMaybe(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure() {
      return Nothing$1();
    },
    Success: function Success(_ref) {
      var value = _ref.value;
      return Just(value);
    }
  });
};

var validationToMaybe_1 = validationToMaybe;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------




var union$4 = union$1.union,
    derivations$3 = union$1.derivations;






var equality$3 = derivations$3.equality,
    debugRepresentation$2 = derivations$3.debugRepresentation,
    serialization$2 = derivations$3.serialization;

/*~ stability: experimental */

var Validation = union$4('folktale:Validation', {
  /*~
   * type: |
   *   forall a, b: (a) => Validation a b
   */
  Failure: function Failure(value) {
    return { value: value };
  },

  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  Success: function Success(value) {
    return { value: value };
  }
}).derive(equality$3, debugRepresentation$2, serialization$2);

var Success$1 = Validation.Success,
    Failure$1 = Validation.Failure;

var assertValidation = assertType(Validation);

extend_1(Failure$1.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Failure');
  }
});

extend_1(Success$1.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Success');
  }
});

/*~~belongsTo: Validation */
defineAdtMethods(Validation, {
  /*~
   * type: |
   *   forall a, b, c: (Validation a b).((b) => c) => Validation a c
   */
  map: {
    /*~*/
    Failure: function map(transformation) {
      assertFunction('Validation.Failure#map', transformation);
      return this;
    },

    /*~*/
    Success: function map(transformation) {
      assertFunction('Validation.Success#map', transformation);
      return Success$1(transformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c: (Validation (b) => c).(Validation a b) => Validation a c
   */
  apply: {
    /*~*/
    Failure: function apply(aValidation) {
      assertValidation('Failure#apply', aValidation);
      return Failure$1.hasInstance(aValidation) ? Failure$1(this.value.concat(aValidation.value)) : /* otherwise */this;
    },

    /*~*/
    Success: function apply(aValidation) {
      assertValidation('Success#apply', aValidation);
      return Failure$1.hasInstance(aValidation) ? aValidation : /* otherwise */aValidation.map(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Failure: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Failure.\n\n    Failure does not contain a normal value - it contains an error.\n    You might consider switching from Validation#get to Validation#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Success: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Failure: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Success: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => Validation c b) => Validation c b
   */
  orElse: {
    /*~*/
    Failure: function orElse(handler) {
      assertFunction('Validation.Failure#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Success: function orElse(handler) {
      assertFunction('Validation.Success#orElse', handler);
      return this;
    }
  },

  /*~
   * type: |
   *   forall a, b:
   *     (Validation a b).(Validation a b) => Validation a b
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Failure: function concat(aValidation) {
      assertValidation('Validation.Failure#concat', aValidation);
      if (Failure$1.hasInstance(aValidation)) {
        return Failure$1(this.value.concat(aValidation.value));
      } else {
        return this;
      }
    },

    /*~*/
    Success: function concat(aValidation) {
      assertValidation('Validation.Success#concat', aValidation);
      return aValidation;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Failure: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return failureTransformation(this.value);
    },

    /*~*/
    Success: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return successTransformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Validation b a
   */
  swap: {
    /*~*/
    Failure: function swap() {
      return Success$1(this.value);
    },

    /*~*/
    Success: function swap() {
      return Failure$1(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b, c, d:
   *     (Validation a b).((a) => c, (b) => d) => Validation c d
   */
  bimap: {
    /*~*/
    Failure: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return Failure$1(failureTransformation(this.value));
    },

    /*~*/
    Success: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return Success$1(successTransformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c) Validation c b
   */
  mapFailure: {
    /*~*/
    Failure: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return Failure$1(transformation(this.value));
    },

    /*~*/
    Success: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return this;
    }
  }
});

Object.assign(Validation, {
  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  of: function of(value) {
    return Success$1(value);
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  'get': function get() {
    warnDeprecation_1('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Result a b
   */
  toResult: function toResult() {
    return validationToResult_1(this);
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return validationToMaybe_1(this);
  }
});

provideFantasyLandAliases(Success$1.prototype);
provideFantasyLandAliases(Failure$1.prototype);
provideFantasyLandAliases(Validation);

var validation = Validation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Success$2 = validation.Success,
    Failure$2 = validation.Failure;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Result a b) => Validation a b
 */

var resultToValidation = function resultToValidation(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var value = _ref.value;
      return Failure$2(value);
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Success$2(value);
    }
  });
};

var resultToValidation_1 = resultToValidation;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Just$1 = maybe.Just,
    Nothing$2 = maybe.Nothing;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *
 * type: |
 *   forall a, b:
 *     (Result a b) => Maybe b
 */

var resultToMaybe = function resultToMaybe(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var _ = _ref.value;
      return Nothing$2();
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Just$1(value);
    }
  });
};

var resultToMaybe_1 = resultToMaybe;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------




var union$5 = union$1.union,
    derivations$4 = union$1.derivations;






var equality$4 = derivations$4.equality,
    debugRepresentation$3 = derivations$4.debugRepresentation,
    serialization$3 = derivations$4.serialization;

/*~ stability: experimental */

var Result = union$5('folktale:Result', {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (a) => Result a b
   */
  Error: function Error(value) {
    return { value: value };
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  Ok: function Ok(value) {
    return { value: value };
  }
}).derive(equality$4, debugRepresentation$3, serialization$3);

var Error$3 = Result.Error,
    Ok$2 = Result.Ok;

var assertResult = assertType(Result);

extend_1(Error$3.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Error');
  }
});

extend_1(Ok$2.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Ok');
  }
});

/*~
 * ~belongsTo: Result
 */
defineAdtMethods(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => c) => Result a c
   */
  map: {
    /*~*/
    Error: function map(f) {
      assertFunction('Result.Error#map', f);
      return this;
    },

    /*~*/
    Ok: function map(f) {
      assertFunction('Result.Ok#map', f);
      return Ok$2(f(this.value));
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a ((b) => c)).(Result a b) => Result a c
   */
  apply: {
    /*~*/
    Error: function apply(anResult) {
      assertResult('Result.Error#apply', anResult);
      return this;
    },

    /*~*/
    Ok: function apply(anResult) {
      assertResult('Result.Ok#apply', anResult);
      return anResult.map(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => Result a c) => Result a c
   */
  chain: {
    /*~*/
    Error: function chain(f) {
      assertFunction('Result.Error#chain', f);
      return this;
    },

    /*~*/
    Ok: function chain(f) {
      assertFunction('Result.Ok#chain', f);
      return f(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Error: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of an Error.\n\nError does not contain a normal value - it contains an error.\nYou might consider switching from Result#unsafeGet to Result#getOrElse,\nor some other method that is not partial.\n      ');
    },

    /*~*/
    Ok: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Error: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Ok: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => Result c b) => Result c b
   */
  orElse: {
    /*~*/
    Error: function orElse(handler) {
      assertFunction('Result.Error#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Ok: function orElse(handler) {
      assertFunction('Result.Ok#orElse', handler);
      return this;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).(Result a b) => Result a b
   *   where b is Semigroup
   */
  concat: {
    /*~*/
    Error: function concat(aResult) {
      assertResult('Result.Error#concat', aResult);
      return this;
    },

    /*~*/
    Ok: function concat(aResult) {
      var _this = this;

      assertResult('Result.Ok#concat', aResult);
      return aResult.map(function (xs) {
        return _this.value.concat(xs);
      });
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Error: function fold(f, g) {
      assertFunction('Result.Error#fold', f);
      assertFunction('Result.Error#fold', g);
      return f(this.value);
    },

    /*~*/
    Ok: function fold(f, g) {
      assertFunction('Result.Ok#fold', f);
      assertFunction('Result.Ok#fold', g);
      return g(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Result b a
   */
  swap: {
    /*~*/
    Error: function swap() {
      return Ok$2(this.value);
    },

    /*~*/
    Ok: function swap() {
      return Error$3(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   (Result a b).((a) => c, (b) => d) => Result c d
   */
  bimap: {
    /*~*/
    Error: function bimap(f, g) {
      assertFunction('Result.Error#bimap', f);
      assertFunction('Result.Error#bimap', g);
      return Error$3(f(this.value));
    },

    /*~*/
    Ok: function bimap(f, g) {
      assertFunction('Result.Ok#bimap', f);
      assertFunction('Result.Ok#bimap', g);
      return Ok$2(g(this.value));
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c) => Result c b
   */
  mapError: {
    /*~*/
    Error: function mapError(f) {
      assertFunction('Result.Error#mapError', f);
      return Error$3(f(this.value));
    },

    /*~*/
    Ok: function mapError(f) {
      assertFunction('Result.Ok#mapError', f);
      return this;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Error: function filter(predicate) {
      assertFunction('Result.Error#filter', predicate);
      return this;
    },

    /*~*/
    Ok: function filter(predicate) {
      assertFunction('Result.Ok#filter', predicate);
      return predicate(this.value) ? this : Error$3();
    }
  }
});

Object.assign(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  of: function of(value) {
    return Ok$2(value);
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a, b: (Result a b).() => b :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation_1('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Validation a b
   */
  toValidation: function toValidation() {
    return resultToValidation_1(this);
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return resultToMaybe_1(this);
  }
});

provideFantasyLandAliases(Error$3.prototype);
provideFantasyLandAliases(Ok$2.prototype);
provideFantasyLandAliases(Result);

var result = Result;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Error$4 = result.Error,
    Ok$3 = result.Ok;

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b: (() => b :: throws a) => Result a b
 */

var _try = function _try(f) {
  try {
    return Ok$3(f());
  } catch (e) {
    return Error$4(e);
  }
};

var _try_1 = _try;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Error$5 = result.Error,
    Ok$4 = result.Ok;



/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (a or None, b) => Result b a
 *   & (a or None) => Result None a
 */
var nullableToResult = function nullableToResult(a, givenFallback) {
  var oldBehaviour = arguments.length < 2; // eslint-disable-line prefer-rest-params
  if (oldBehaviour) {
    warnDeprecation_1('nullableToResult(value) is being deprecated in favour of providing an explicit fallback value.\nnullableToResult(value, fallback) is the new preferred form of this function.\n');
  }

  var fallback = oldBehaviour ? a : givenFallback;
  return a != null ? Ok$4(a) : /* else */Error$5(fallback);
};

var nullableToResult_1 = nullableToResult;

var _module$exports;

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------



var typeSymbol$4 = union_1.typeSymbol;

/*~
 * stability: stable
 * name: module folktale/result
 */

var result$2 = (_module$exports = {
  Error: result.Error,
  Ok: result.Ok,
  hasInstance: result.hasInstance,
  of: result.of,
  fromJSON: result.fromJSON
}, _defineProperty$2(_module$exports, typeSymbol$4, result[typeSymbol$4]), _defineProperty$2(_module$exports, 'try', _try_1), _defineProperty$2(_module$exports, 'fromNullable', function fromNullable(aNullable, fallbackValue) {
  var nullableToResult = nullableToResult_1;

  if (arguments.length > 1) {
    // eslint-disable-line prefer-rest-params 
    return nullableToResult(aNullable, fallbackValue);
  } else {
    return nullableToResult(aNullable);
  }
}), _defineProperty$2(_module$exports, 'fromValidation', function fromValidation(aValidation) {
  return validationToResult_1(aValidation);
}), _defineProperty$2(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, failureValue) {
  return maybeToResult_1(aMaybe, failureValue);
}), _module$exports);

var isArray = function isArray(arr) {
  return Array.isArray(arr);
};

var isElmNode = function isElmNode(el) {
  return el && el.nodeType === 1;
};

var guaranteeDomEl = function guaranteeDomEl(el) {
  if (isArray(el)) {
    return ifElse_1(all_1(isElmNode), result$2.Ok, function () {
      return result$2.Error({
        error: 'The one or more values in the array you passed in is not a valid DOM Element.'
      });
    })(el);
  }
  return ifElse_1(isElmNode, result$2.Ok, function () {
    return result$2.Error({
      error: 'The value you passed in is not a valid DOM Element.'
    });
  })(el);
};

var isArray$2 = function isArray(arr) {
  return Array.isArray(arr);
};

function _toConsumableArray$1(arr) {
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

  isArray$2(cn) ? (_dom$classList = dom.classList)[method].apply(_dom$classList, _toConsumableArray$1(cn)) : dom.classList[method](cn);
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

function _toConsumableArray$2(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _defineProperty$3(obj, key, value) {
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

    return Object.assign(acc, _defineProperty$3({}, key, val));
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
    return [].concat(_toConsumableArray$2(acc), [[dom.name, dom.value]]);
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
    return result$2.fromNullable(_dom(cs, parent), {
      error: 'An element with the following selector was not found: ' + cs
    });
  };

  var withFuture = function withFuture(parent) {
    return parent.chain(function (el) {
      return getDom(el);
    });
  };

  return result$2.hasInstance(root) ? withFuture(root) : getDom(root);
};

var guaranteeEither = function guaranteeEither(el) {
  if (result$2.hasInstance(el)) {
    return el;
  } else if (isElmNode(el) || isArray(el) && all_1(isElmNode, el)) {
    return result$2.of(el);
  } else if (typeof el === 'string') {
    return _dom$1(el);
  }
  return result$2.Error({
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
  return ifElse_1(isArray, traverse_1(result$2.of, fn), fn);
};

var branch = function branch(fn, el) {
  return compose_1(chain_1(_branch(fn)), chain_1(guaranteeDomEl), guaranteeEither)(el);
};

var branch$1 = curry_1(branch);

// _addClass :: String -> DOM Element -> Future Error DOM Element
var _addClass$1 = function _addClass$$1(cn, dom) {
  return result$2.fromNullable(_addClass(cn, dom), {
    error: 'Error while running addClass function.'
  });
};

var _addClass$2 = curry_1(_addClass$1);

// addClass :: String -> DOM Element -> Future Error DOM Element
var addClass$1 = function addClass(cn, dom) {
  return branch$1(_addClass$2(cn))(dom);
};

var index = curry_1(addClass$1);

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
var _classList$1 = function _classList(method, cn, dom) {
  return result$2.fromNullable(classList(method, cn, dom), {
    error: 'Error running classList function.'
  });
};

var _classList$2 = curry_1(_classList$1);

// classList :: String -> String -> DOM Element -> Future Error DOM Element
var classList$1 = function classList(method, classname, dom) {
  return branch$1(_classList$2(method, classname))(dom);
};

var index$1 = curry_1(classList$1);

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
var _domAll$1 = function _domAll$$1(cs) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var getDomAll = function getDomAll(parent) {
    return result$2.fromNullable(_domAll(cs, parent), {
      error: 'An element with the following selector was not found: ' + cs
    });
  };

  var withFuture = function withFuture(parent) {
    return parent.chain(function (el) {
      return getDomAll(el);
    });
  };

  return result$2.hasInstance(root) ? withFuture(root) : getDomAll(root);
};

// futureFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
var eitherFindParent = curry_1(function (global, pred, dom) {
  var doc = global ? global : window.document;

  if (dom === doc.body) {
    return result$2.Ok(dom);
  }

  return pred(dom.parentElement).chain(function (res) {
    return res ? result$2.Ok(dom.parentElement) : eitherFindParent(global, pred, dom.parentElement);
  });
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var _findParent$1 = function _findParent(global, pred, dom) {
  return result$2.hasInstance(pred(dom)) ? eitherFindParent(global, pred, dom) : result$2.Ok(findParent(global, pred, dom));
};

var _findParent$2 = curry_1(_findParent$1);

// findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
var findParent$1 = function findParent(global, pred, dom) {
  return branch$1(_findParent$2(global, pred))(dom);
};

var findParent$2 = curry_1(findParent$1);

// _getAttr :: String -> DOM Element -> Future Error String
var _getAttr$1 = function _getAttr(attr, dom) {
  return result$2.fromNullable(getAttr(attr, dom), {
    error: 'No attribute was found with the following name: ' + attr
  });
};

var _getAttr$2 = curry_1(_getAttr$1);

// getAttr :: String -> DOM Element -> Future Error String
var getAttr$1 = function getAttr(attr, dom) {
  return branch$1(_getAttr$2(attr))(dom);
};

var index$2 = curry_1(getAttr$1);

// _getClass :: Int -> DOM Element -> Future Error String
var _getClass$1 = function _getClass(idx, dom) {
  return result$2.fromNullable(getClass(idx, dom), {
    error: 'No class was found with the following index: ' + idx
  });
};

var _getClass$2 = curry_1(_getClass$1);

// getClass :: Int -> DOM Element -> Future Error String
var getClass$1 = function getClass(idx, dom) {
  return branch$1(_getClass$2(idx))(dom);
};

var index$3 = curry_1(getClass$1);

// _getClasses :: DOM Element -> Future Error String
var _getClasses$1 = function _getClasses$$1(dom) {
  return result$2.fromNullable(_getClasses(dom), {
    error: 'No classes were found on this element.'
  });
};

// getClasses :: DOM Element -> Future Error String
var getClasses$1 = function getClasses(dom) {
  return branch$1(_getClasses$1)(dom);
};

// _getData :: String -> DOM Element -> Future Error String
var _getData$1 = function _getData(prop, dom) {
  return result$2.fromNullable(getData(prop, dom), {
    error: 'No attribute was found with the following name: ' + prop
  });
};

var _getData$2 = curry_1(_getData$1);

// getData :: String -> DOM Element -> Future Error String
var getData$1 = function getData(prop, dom) {
  return branch$1(_getData$2(prop))(dom);
};

var index$4 = curry_1(getData$1);

// _getProp :: String -> DOM Element -> Future Error String
var _getProp$1 = function _getProp(prop, dom) {
  return result$2.fromNullable(getProp(prop, dom), {
    error: 'No property was found with the following name: ' + prop
  });
};

var _getProp$2 = curry_1(_getProp$1);

// getProp :: String -> DOM Element -> Future Error String
var getProp$1 = function getProp(prop, dom) {
  return branch$1(_getProp$2(prop))(dom);
};

var index$5 = curry_1(getProp$1);

// _getStyle :: String -> DOM Element -> Future Error String
var _getStyle$1 = function _getStyle(prop, dom) {
  return result$2.fromNullable(getStyle(prop, dom), {
    error: 'No style property was found with the following name: ' + prop
  });
};

var _getStyle$2 = curry_1(_getStyle$1);

// getStyle :: String -> DOM Element -> Future Error String
var getStyle$1 = function getStyle(prop, dom) {
  return branch$1(_getStyle$2(prop))(dom);
};

var index$6 = curry_1(getStyle$1);

// _hasAttr :: String -> DOM Element -> Future Error Bool
var _hasAttr$1 = function _hasAttr(attr, dom) {
  return result$2.fromNullable(hasAttr(attr, dom), {
    error: 'Error running hasAttr function.'
  });
};

var _hasAttr$2 = curry_1(_hasAttr$1);

// hasAttr :: String -> DOM Element -> Bool
var hasAttr$1 = function hasAttr(attr, dom) {
  return branch$1(_hasAttr$2(attr))(dom);
};

var index$7 = curry_1(hasAttr$1);

// _hasClass :: String -> DOM Element -> Future Error DOM Element
var _hasClass$1 = function _hasClass(cn, dom) {
  return result$2.fromNullable(hasClass(cn, dom), {
    error: 'Error running hasClass function.'
  });
};

var _hasClass$2 = curry_1(_hasClass$1);

// hasClass :: String -> DOM Element -> Future Error DOM Element
var hasClass$1 = function hasClass(cn, dom) {
  return branch$1(_hasClass$2(cn))(dom);
};

var index$8 = curry_1(hasClass$1);

// _hasData :: String -> DOM Element -> Future Error Bool
var _hasData = function _hasData(prop, dom) {
  return result$2.fromNullable(hasData$1(prop, dom), {
    error: 'Error running hasData function.'
  });
};

var _hasData$1 = curry_1(_hasData);

// hasData :: String -> DOM Element -> Future Error Bool
var hasData$2 = function hasData(prop, dom) {
  return branch$1(_hasData$1(prop))(dom);
};

var index$9 = curry_1(hasData$2);

// _hasProp :: String -> DOM Element -> Future Error Bool
var _hasProp = function _hasProp(prop, dom) {
  return result$2.fromNullable(hasProp$1(prop, dom), {
    error: 'Error running hasProp function.'
  });
};

var _hasProp$1 = curry_1(_hasProp);

// hasProp :: String -> DOM Element -> Future Error Bool
var hasProp$2 = function hasProp(prop, dom) {
  return branch$1(_hasProp$1(prop))(dom);
};

var index$10 = curry_1(hasProp$2);

// _hasStyle :: String -> DOM Element -> Future Error Bool
var _hasStyle$1 = function _hasStyle(prop, dom) {
  return result$2.fromNullable(hasStyle(prop, dom), {
    error: 'Error running hasStyle function.'
  });
};

var _hasProp$2 = curry_1(_hasStyle$1);

// hasStyle :: String -> DOM Element -> Future Error Bool
var hasStyle$1 = function hasStyle(prop, dom) {
  return branch$1(_hasProp$2(prop))(dom);
};

var index$11 = curry_1(hasStyle$1);

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
var _isAttr$1 = function _isAttr(attr, val, dom) {
  return result$2.fromNullable(isAttr(attr, val, dom), {
    error: 'There is not an attribute with the following name on this element: ' + attr
  });
};

var _isAttr$2 = curry_1(_isAttr$1);

// isAttr :: String -> String -> DOM Element -> Future Error Bool
var isAttr$1 = function isAttr(attr, val, dom) {
  return branch$1(_isAttr$2(attr, val))(dom);
};

var index$12 = curry_1(isAttr$1);

// _isData :: String -> String -> DOM Element -> Future Error Bool
var _isData$1 = function _isData(prop, val, dom) {
  return result$2.fromNullable(isData(prop, val, dom), {
    error: 'There is not a data-attribute with the following name on this element: ' + prop
  });
};

var _isData$2 = curry_1(_isData$1);

// isData :: String -> String -> DOM Element -> Future Error Bool
var isData$1 = function isData(prop, val, dom) {
  return branch$1(_isData$2(prop, val))(dom);
};

var index$13 = curry_1(isData$1);

// _isProp :: String -> String -> DOM Element -> Future Error Bool
var _isProp$1 = function _isProp(prop, val, dom) {
  return result$2.fromNullable(isProp(prop, val, dom), {
    error: 'There is not a property with the following name on this element: ' + prop
  });
};

var _isProp$2 = curry_1(_isProp$1);

// isProp :: String -> String -> DOM Element -> Future Error Bool
var isProp$1 = function isProp(prop, val, dom) {
  return branch$1(_isProp$2(prop, val))(dom);
};

var index$14 = curry_1(isProp$1);

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
var _isStyle$1 = function _isStyle(prop, val, dom) {
  return result$2.fromNullable(isStyle(prop, val, dom), {
    error: 'There is not a style property with the following name on this element: ' + prop
  });
};

var _isStyle$2 = curry_1(_isStyle$1);

// isStyle :: String -> String -> DOM Element -> Future Error Bool
var isStyle$1 = function isStyle(prop, val, dom) {
  return branch$1(_isStyle$2(prop, val))(dom);
};

var index$15 = curry_1(isStyle$1);

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
var _on$1 = function _on(event, handler, dom) {
  return result$2.fromNullable(on(event, handler, dom), {
    error: 'Error running on function.'
  });
};

var _on$2 = curry_1(_on$1);

// _replaceClass :: String -> Future Error a -> DOM Element -> Future Error DOM Element
var _removeClass$1 = function _removeClass(event, handler, dom) {
  return branch$1(_on$2(event, handler))(dom);
};

var index$16 = curry_1(_removeClass$1);

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
var _removeAttr$1 = function _removeAttr(attr, dom) {
  return result$2.fromNullable(removeAttr(attr, dom), {
    error: 'Error running removeAttr function.'
  });
};

var _removeAttr$2 = curry_1(_removeAttr$1);

// removeAttr :: String -> DOM Element -> Future Error DOM Element
var removeAttr$1 = function removeAttr(attr, dom) {
  return branch$1(_removeAttr$2(attr))(dom);
};

var index$17 = curry_1(removeAttr$1);

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$2 = function _removeClass$$1(cn, dom) {
  return result$2.fromNullable(_removeClass(cn, dom), {
    error: 'Error running removeClass function.'
  });
};

var _removeClass$3 = curry_1(_removeClass$2);

// removeClass :: String -> String -> DOM Element -> Future Error DOM Element
var removeClass$1 = function removeClass(cn, dom) {
  return branch$1(_removeClass$3(cn))(dom);
};

var index$18 = curry_1(removeClass$1);

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
var _replaceClass$1 = function _replaceClass(ocn, ncn, dom) {
  return result$2.fromNullable(replaceClass(ocn, ncn, dom), {
    error: 'Error running replaceClass'
  });
};

var _replaceClass$2 = curry_1(_replaceClass$1);

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
var _removeClass$4 = function _removeClass(ocn, ncn, dom) {
  return branch$1(_replaceClass$2(ocn, ncn))(dom);
};

var index$19 = curry_1(_removeClass$4);

// _serialize :: Form Element -> Future e {Input Name: Input Value}
var _serialize$1 = function _serialize$$1(form) {
  return result$2.fromNullable(_serialize(form), {
    error: 'Element supplied is not a valid DOM Form Element.'
  });
};

// serialize :: Form Element -> Future e {Input Name: Input Value}
var serialize$1 = function serialize(form) {
  return branch$1(_serialize$1)(form);
};

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var _setAttr$1 = function _setAttr(attr, val, dom) {
  return result$2.fromNullable(setAttr(attr, val, dom), {
    error: 'Error running setAttr function.'
  });
};

var _setAttr$2 = curry_1(_setAttr$1);

// setAttr :: String -> String -> DOM Element -> Future Error DOM Element
var setAttr$1 = function setAttr(attr, val, dom) {
  return branch$1(_setAttr$2(attr, val))(dom);
};

var index$20 = curry_1(setAttr$1);

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
var _setData$1 = function _setData(prop, val, dom) {
  return result$2.fromNullable(setData(prop, val, dom), {
    error: 'The following data attribute you passed in is not valid: ' + prop
  });
};

var _setData$2 = curry_1(_setData$1);

// setData:: String -> String -> DOM Element -> Future Error DOM Element
var setData$1 = function setData(prop, val, dom) {
  return branch$1(_setData$2(prop, val))(dom);
};

var index$21 = curry_1(setData$1);

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
var _setProp$1 = function _setProp(prop, val, dom) {
  return result$2.fromNullable(setProp(prop, val, dom), {
    error: 'Error running setProp function.'
  });
};

var _setProp$2 = curry_1(_setProp$1);

// setProp :: String -> String -> DOM Element -> Future Error DOM Element
var setProp$1 = function setProp(prop, val, dom) {
  return branch$1(_setProp$2(prop, val))(dom);
};

var index$22 = curry_1(setProp$1);

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
var _setStyle$1 = function _setStyle(prop, val, dom) {
  return result$2.fromNullable(setStyle(prop, val, dom), {
    error: 'Error running setStyle function.'
  });
};

var _setStyle$2 = curry_1(_setStyle$1);

// setStyle :: String -> String -> DOM Element -> Future Error DOM Element
var setStyle$1 = function setStyle(prop, val, dom) {
  return branch$1(_setStyle$2(prop, val))(dom);
};

var index$23 = curry_1(setStyle$1);

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
var _toggleClass = function _toggleClass(cn, dom) {
  return result$2.fromNullable(toggleClass(cn, dom), {
    error: 'Error running toggleClass.'
  });
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
var globalFindParent = findParent$2(false);

exports.addClass = index;
exports.classList = index$1;
exports.dom = _dom$1;
exports.domAll = _domAll$1;
exports.findParent = globalFindParent;
exports.getAttr = index$2;
exports.getClass = index$3;
exports.getClasses = getClasses$1;
exports.getData = index$4;
exports.getProp = index$5;
exports.getStyle = index$6;
exports.hasAttr = index$7;
exports.hasClass = index$8;
exports.hasData = index$9;
exports.hasProp = index$10;
exports.hasStyle = index$11;
exports.isAttr = index$12;
exports.isData = index$13;
exports.isProp = index$14;
exports.isStyle = index$15;
exports.identity = identity;
exports.on = index$16;
exports.removeAttr = index$17;
exports.removeClass = index$18;
exports.replaceClass = index$19;
exports.serialize = serialize$1;
exports.setAttr = index$20;
exports.setData = index$21;
exports.setProp = index$22;
exports.setStyle = index$23;
exports.toggleClass = index$24;

Object.defineProperty(exports, '__esModule', { value: true });

})));
