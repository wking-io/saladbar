(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.saladbarCore = {}));
})(this, (exports) => {
  'use strict';

  function _isPlaceholder(a) {
    return (
      a != null &&
      typeof a === 'object' &&
      a['@@functional/placeholder'] === true
    );
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
        return function() {
          return fn.apply(this, arguments);
        };
      case 1:
        return function(a0) {
          return fn.apply(this, arguments);
        };
      case 2:
        return function(a0, a1) {
          return fn.apply(this, arguments);
        };
      case 3:
        return function(a0, a1, a2) {
          return fn.apply(this, arguments);
        };
      case 4:
        return function(a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };
      case 5:
        return function(a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };
      case 6:
        return function(a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };
      case 7:
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };
      case 8:
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };
      case 9:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };
      case 10:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };
      default:
        throw new Error(
          'First argument to _arity must be a non-negative integer no greater than ten'
        );
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
          return _isPlaceholder_1(a)
            ? f2
            : _curry1_1((_b) => {
                return fn(a, _b);
              });
        default:
          return _isPlaceholder_1(a) && _isPlaceholder_1(b)
            ? f2
            : _isPlaceholder_1(a)
              ? _curry1_1((_a) => {
                  return fn(_a, b);
                })
              : _isPlaceholder_1(b)
                ? _curry1_1((_b) => {
                    return fn(a, _b);
                  })
                : fn(a, b);
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
    return function() {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (
          combinedIdx < received.length &&
          (!_isPlaceholder_1(received[combinedIdx]) ||
            argsIdx >= arguments.length)
        ) {
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
      return left <= 0
        ? fn.apply(this, combined)
        : _arity_1(left, _curryN(length, combined, fn));
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

  var curryN = /*#__PURE__*/ _curry2_1((length, fn) => {
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

  var curry = /*#__PURE__*/ _curry1_1((fn) => {
    return curryN_1(fn.length, fn);
  });
  var curry_1 = curry;

  var isArray = function isArray(arr) {
    return Array.isArray(arr);
  };

  var defineProperty = function(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var slicedToArray = (function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (
          var _i = arr[Symbol.iterator](), _s;
          !(_n = (_s = _i.next()).done);
          _n = true
        ) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        );
      }
    };
  })();

  var toConsumableArray = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  // _classList :: String -> String | [String] -> DOM Element -> DOM Element
  var _classList = function _classList(method, cn, dom) {
    var _dom$classList;

    isArray(cn)
      ? (_dom$classList = dom.classList)[method].apply(
          _dom$classList,
          toConsumableArray(cn)
        )
      : dom.classList[method](cn);
    return dom;
  };

  var classList = curry_1(_classList);

  // _addClass :: String | [String] -> DOM Element -> DOM Element
  var _addClass = classList('add');

  var isElmNode = function isElmNode(el) {
    return el && el.nodeType === 1;
  };

  // _dom :: (CSS Selector, DOM Element) -> DOM Element | Null
  var _dom = function _dom(cs) {
    var root =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return isElmNode(root)
      ? root.querySelector(cs)
      : document.querySelector(cs);
  };

  // _domAll :: (CSS Selector, DOM Element) -> [DOM Element] | Null
  var _domAll = function _domAll(cs) {
    var root =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var dom = isElmNode(root)
      ? root.querySelectorAll(cs)
      : document.querySelectorAll(cs);
    return dom.length > 0 ? Array.from(dom) : null;
  };

  // _findParent :: DOM -> Bool -> DOM Element -> DOM Element

  var _findParent = function _findParent() {
    var global =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var pred = arguments[1];
    var dom = arguments[2];

    var doc = global ? global : window.document;

    if (dom === doc.body) {
      return dom;
    }

    return pred(dom.parentElement)
      ? dom.parentElement
      : _findParent(doc, pred, dom.parentElement);
  };

  var index = curry_1(_findParent);

  // _getAttr :: String -> DOM Element -> String | null

  var _getAttr = function _getAttr(attr, dom) {
    return dom.hasAttribute(attr) ? dom.getAttribute(attr) : null;
  };

  var index$1 = curry_1(_getAttr);

  // _getClass :: Int -> DOM Element -> String | Null

  var _getClass = function _getClass(index, dom) {
    return dom.classList.item(index);
  };

  var index$2 = curry_1(_getClass);

  // _getClasses :: DOM Element -> {k: v} | Null
  var _getClasses = function _getClasses(dom) {
    return dom.classList.length > 0 ? dom.classList : null;
  };

  // _getData :: String -> DOM Element -> String | Null

  var _getData = function _getData(prop, dom) {
    return dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] : null;
  };

  var index$3 = curry_1(_getData);

  // _getProp :: String -> DOM Element -> String | Null

  var _getProp = function _getProp(prop, dom) {
    return dom[prop] || null;
  };

  var index$4 = curry_1(_getProp);

  // _getStyle :: String -> DOM Element -> String

  var _getStyle = function _getStyle(prop, dom) {
    return window.getComputedStyles(dom, null)[prop] || null;
  };

  var index$5 = curry_1(_getStyle);

  // _hasAttr :: String -> DOM Element -> Bool

  var _hasAttr = function _hasAttr(attr, dom) {
    return dom.hasAttribute(attr);
  };

  var index$6 = curry_1(_hasAttr);

  // _hasClass :: String -> DOM Element -> Bool

  var _hasClass = function _hasClass(cn, dom) {
    return dom.classList.contains(cn);
  };

  var index$7 = curry_1(_hasClass);

  var hasData = function hasData(prop, dom) {
    return dom.dataset.hasOwnProperty(prop);
  };

  var index$8 = curry_1(hasData);

  /* 
 * @sig String -> DOM Element -> Bool
 */

  var hasProp = function hasProp(prop, dom) {
    return prop in dom;
  };

  var index$9 = curry_1(hasProp);

  var _hasStyle = function _hasStyle(prop, dom) {
    return window.getComputedStyle(dom, null).hasOwnProperty(prop);
  };

  var index$10 = curry_1(_hasStyle);

  // _isAttr :: String -> String -> DOM Element -> Bool

  var _isAttr = function _isAttr(attr, val, dom) {
    return dom.hasAttribute(attr) ? dom.getAttribute(attr) === val : null;
  };

  var index$11 = curry_1(_isAttr);

  // _isData :: String -> String -> DOM Element -> Bool

  var _isData = function _isData(prop, val, dom) {
    return dom.dataset.hasOwnProperty(prop) ? dom.dataset[prop] === val : null;
  };

  var index$12 = curry_1(_isData);

  // _isProp :: String -> String -> DOM Element -> Bool

  var _isProp = function _isProp(prop, val, dom) {
    return dom[prop] ? dom[prop] === val : null;
  };

  var index$13 = curry_1(_isProp);

  // _isStyle :: String -> String -> DOM Element -> Bool

  var _isStyle = function _isStyle(prop, val, dom) {
    var domStyles = window.getComputedStyle(dom, null);
    return domStyles.hasOwnProperty(prop) ? domStyles[prop] === val : null;
  };

  var index$14 = curry_1(_isStyle);

  // _removeAttr :: String -> DOM Element -> DOM Element

  var _removeAttr = function _removeAttr(attr, dom) {
    dom.removeAttribute(attr);
    return dom;
  };

  var index$15 = curry_1(_removeAttr);

  // _removeClass :: String | [String] -> DOM Element -> DOM Element
  var _removeClass = classList('remove');

  // _replaceClass :: String -> String -> DOM Element -> DOM Element

  var _replaceClass = function _replaceClass(ocn, ncn, dom) {
    dom.classList.replace(ocn, ncn);
    return dom;
  };

  var index$16 = curry_1(_replaceClass);

  var isFormNode = function isFormNode(el) {
    return el && el.nodeType === 1 && el.nodeName === 'FORM';
  };

  // prop :: k -> {k: v} -> v
  var prop = curry_1((p, obj) => {
    return obj[p];
  });
  // fromPairs :: [[k, v]] -> {k: v}
  var fromPairs = function fromPairs(pairs) {
    return pairs.reduce((acc, _ref) => {
      var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

      return Object.assign(acc, defineProperty({}, key, val));
    }, {});
  };
  // toArray :: Iter -> [*]
  var toArray$1 = function toArray$$1(iter) {
    return Array.from(iter);
  };
  // notSubmit :: DOM Element -> Bool
  var notSubmit = function notSubmit(el) {
    return el.type !== 'submit';
  };
  // hasName :: DOM Element -> Bool
  var hasName = function hasName(obj) {
    return (obj.name && obj.name.length > 0) || false;
  };
  // isValidInput :: DOM Element -> Bool
  var isValidInput = function isValidInput(dom) {
    return notSubmit(dom) && hasName(dom);
  };

  // ([], DOM Element) -> [[Input Name, Input Value]]
  var formReducer = function formReducer(acc, dom) {
    if (isValidInput(dom)) {
      return [].concat(toConsumableArray(acc), [[dom.name, dom.value]]);
    }
    return acc;
  };
  // Form Element -> [Input Elements]
  var inputsToArray = function inputsToArray(dom) {
    return toArray$1(prop('elements', dom));
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

  var index$17 = curry_1(_setAttr);

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

  var index$18 = curry_1(_setData);

  // _setProp :: String -> String -> DOM Element -> DOM Element

  var _setProp = function _setProp(attr, val, dom) {
    dom[attr] = val;
    return dom;
  };

  var index$19 = curry_1(_setProp);

  // _setStyle :: String -> String -> DOM Element -> DOM Element

  var _setStyle = function _setStyle(prop, val, dom) {
    dom.style[prop] = val;
    return dom;
  };

  var index$20 = curry_1(_setStyle);

  // toggleClass :: String -> DOM Element -> DOM Element
  var toggleClass = classList('toggle');

  exports.addClass = _addClass;
  exports.classList = classList;
  exports.dom = _dom;
  exports.domAll = _domAll;
  exports.findParent = index;
  exports.getAttr = index$1;
  exports.getClass = index$2;
  exports.getClasses = _getClasses;
  exports.getData = index$3;
  exports.getProp = index$4;
  exports.getStyle = index$5;
  exports.hasAttr = index$6;
  exports.hasClass = index$7;
  exports.hasData = index$8;
  exports.hasProp = index$9;
  exports.hasStyle = index$10;
  exports.isAttr = index$11;
  exports.isData = index$12;
  exports.isProp = index$13;
  exports.isStyle = index$14;
  exports.removeAttr = index$15;
  exports.removeClass = _removeClass;
  exports.replaceClass = index$16;
  exports.serialize = _serialize;
  exports.setAttr = index$17;
  exports.setData = index$18;
  exports.setProp = index$19;
  exports.setStyle = index$20;
  exports.toggleClass = toggleClass;

  Object.defineProperty(exports, '__esModule', { value: true });
});
