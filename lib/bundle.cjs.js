

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex;
}

const ramda = require('ramda');
const future = require('fluture');

const future__default = _interopDefault(future);

const isArray = function isArray(arr) {
  return Array.isArray(arr);
};

const _branch = function _branch(fn) {
  return ramda.ifElse(isArray, ramda.traverse(future.of, fn), fn);
};

const branch = ramda.curry((fn, el) => {
  if (future.isFuture(el)) {
    return ramda.chain(_branch(fn))(el);
  }
  let result = el;
  _branch(fn)(el).fork(
    (err) => (result = err),
    (val) => (result = val)
  );
  return result;
});

const toConsumableArray = function(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];

    return arr2;
  } 
    return Array.from(arr);
  
};

/*
 * @sig String -> String -> DOM Element -> Future DOM Element
 * @sig String -> [String] -> DOM Element -> Future DOM Element
 */
const _classList = ramda.curry((method, classname, el) => {
  let _el$classList;

  isArray(classname)
    ? (_el$classList = el.classList)[method].apply(
        _el$classList,
        toConsumableArray(classname)
      )
    : el.classList[method](classname);

  return future.of(el);
});

const classList = ramda.curry((method, classname, el) => branch(_classList(method, classname))(el));

const addClass = classList('add');

const elNodeType = 1;
const isElmNode = function isElmNode(el) {
  return el && el.nodeType === elNodeType;
};

const dom = function dom(selector) {
  const root =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return future__default((rej, res) => {
    const el = isElmNode(root)
      ? root.querySelector(selector)
      : document.querySelector(selector);
    el
      ? res(el)
      : rej({ error: `Element with selector ${  selector  } not found.` });
  });
};

const emptyArray = 0;
const domAll = function domAll(selector) {
  const root =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return future__default((rej, res) => {
    const elms = isElmNode(root)
      ? root.querySelectorAll(selector)
      : document.querySelectorAll(selector);
    elms.length > emptyArray
      ? res(Array.from(elms))
      : rej({ error: `Elements with selector ${  selector  } not found.` });
  });
};

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = ramda.curry((attr, el) => {
  if (el.hasAttribute(attr)) {
    return future.of(el.getAttribute(attr));
  }

  return future.reject({ error: `Sorry, ${  attr  } was not found.` });
});

const getAttr = ramda.curry((attr, el) => branch(_getAttr(attr))(el));

/* 
 * @sig String -> DOM Element -> Future Bool
 */
const _hasProp = ramda.curry((prop, el) => future.of(prop in el));

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasProp = ramda.curry((prop, el) => branch(_hasProp(prop))(el));

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr$2 = ramda.curry((prop, el) => {
  if (hasProp(prop, el)) {
    return future.of(el[prop]);
  }

  return future.reject({ error: `Sorry, ${  prop  } was not found.` });
});

const getProp = ramda.curry((prop, el) => branch(_getAttr$2(prop))(el));

const getData = ramda.curry((prop, el) => ramda.compose(getProp(prop), getProp('dataset'))(el));

// _hasClass :: String -> DOM Element -> Future Bool
const _hasAttr = ramda.curry((attr, el) => future.of(el.hasAttribute(attr)));

// _hasClass :: String -> DOM Element -> Bool
const hasAttr = ramda.curry((attr, el) => branch(_hasAttr(attr))(el));

/*
 * @sig String -> DOM Element -> Future Bool
 */
const _hasClass = ramda.curry((classname, el) => future.of(el.classList.contains(classname)));

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasClass = ramda.curry((className, el) => branch(_hasClass(className))(el));

const hasData = ramda.curry((prop, el) => ramda.compose(hasProp(prop), getProp('dataset'))(el));

/*
 * @sig String -> DOM Element -> Future Error String
 */
const _removeAttr = ramda.curry((attr, el) => {
  el.removeAttribute(attr);
  return future.of(el);
});

const removeAttr = ramda.curry((attr, el) => branch(_removeAttr(attr))(el));

const removeClass = classList('remove');

// _getAttr :: String -> DOM Element -> Future Error String
const _removeData = ramda.curry((prop, el) => {
  if (hasData(prop, el)) {
    const result = delete el.dataset[prop];
    if (!result)
      return future.reject({
        error: `Property ${  prop  } is non-configurable.`,
      });
  }
  return future.of(el);
});

const removeData = ramda.curry((prop, el) => branch(_removeData(prop))(el));

// _getAttr :: String -> DOM Element -> Future Error String
const _removeProp = ramda.curry((prop, el) => {
  if (hasProp(prop, el)) {
    const result = delete el[prop];
    if (!result)
      return future.reject({
        error: `Property ${  prop  } is non-configurable.`,
      });
  }
  return future.of(el);
});

const removeProp = ramda.curry((prop, el) => branch(_removeProp(prop))(el));

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setAttr = ramda.curry((attr, val, el) => {
  el.setAttribute(attr, val);
  return future.of(el);
});

const setAttr = ramda.curry((attr, val, el) => branch(_setAttr(attr, val))(el));

/**
 * This regex checks the string passed in has the following qualities:
 * 1. Has no spaces.
 * 2. Starts and ends with a letter or number (case-insensitive)
 * 3. If longer than three characters the characters in between are only
 *    letters, numbers, an underscore, a semicolon, or a period.
 */
const validDataRegex = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/;
const onlyOne = 1;
const isValidDataProp = function isValidDataProp(prop) {
  const isMatch = prop.match(validDataRegex);
  return isMatch && isMatch.length === onlyOne;
};
const _setData = ramda.curry((prop, val, el) => {
  if (isValidDataProp(prop)) {
    el.dataset[prop] = val;
    return future.of(el);
  }

  return future.reject({
    error: `Data property ${  prop  } is not a valid property name`,
  });
});

const setData = ramda.curry((prop, val, el) => branch(_setData(prop, val))(el));

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setProp = ramda.curry((attr, val, el) => {
  el[attr] = val;
  return future.of(el);
});

const setAttr$2 = ramda.curry((prop, val, el) => branch(_setProp(prop, val))(el));

const toggleClass = classList('toggle');

const index = {
  addClass,
  classList,
  dom,
  domAll,
  getAttr,
  getData,
  getProp,
  hasAttr,
  hasClass,
  hasData,
  hasProp,
  removeAttr,
  removeClass,
  removeData,
  removeProp,
  setAttr,
  setData,
  setProp: setAttr$2,
  toggleClass,
};

module.exports = index;
