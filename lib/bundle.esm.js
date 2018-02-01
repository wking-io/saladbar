import { ifElse, traverse, chain, curry, compose } from 'ramda';
import future, { of, isFuture, reject } from 'fluture';

const isArray = function isArray(arr) {
  return Array.isArray(arr);
};

const _branch = function _branch(fn) {
  return ifElse(isArray, traverse(of, fn), fn);
};

const branch = curry((fn, el) => {
  if (isFuture(el)) {
    return chain(_branch(fn))(el);
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
const _classList = curry((method, classname, el) => {
  let _el$classList;

  isArray(classname)
    ? (_el$classList = el.classList)[method].apply(
        _el$classList,
        toConsumableArray(classname)
      )
    : el.classList[method](classname);

  return of(el);
});

const classList = curry((method, classname, el) => branch(_classList(method, classname))(el));

const addClass = classList('add');

const elNodeType = 1;
const isElmNode = function isElmNode(el) {
  return el && el.nodeType === elNodeType;
};

const dom = function dom(selector) {
  const root =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return future((rej, res) => {
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
  return future((rej, res) => {
    const elms = isElmNode(root)
      ? root.querySelectorAll(selector)
      : document.querySelectorAll(selector);
    elms.length > emptyArray
      ? res(Array.from(elms))
      : rej({ error: `Elements with selector ${  selector  } not found.` });
  });
};

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr = curry((attr, el) => {
  if (el.hasAttribute(attr)) {
    return of(el.getAttribute(attr));
  }

  return reject({ error: `Sorry, ${  attr  } was not found.` });
});

const getAttr = curry((attr, el) => branch(_getAttr(attr))(el));

/* 
 * @sig String -> DOM Element -> Future Bool
 */
const _hasProp = curry((prop, el) => of(prop in el));

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasProp = curry((prop, el) => branch(_hasProp(prop))(el));

// _getAttr :: String -> DOM Element -> Future Error String
const _getAttr$2 = curry((prop, el) => {
  if (hasProp(prop, el)) {
    return of(el[prop]);
  }

  return reject({ error: `Sorry, ${  prop  } was not found.` });
});

const getProp = curry((prop, el) => branch(_getAttr$2(prop))(el));

const getData = curry((prop, el) => compose(getProp(prop), getProp('dataset'))(el));

// _hasClass :: String -> DOM Element -> Future Bool
const _hasAttr = curry((attr, el) => of(el.hasAttribute(attr)));

// _hasClass :: String -> DOM Element -> Bool
const hasAttr = curry((attr, el) => branch(_hasAttr(attr))(el));

/*
 * @sig String -> DOM Element -> Future Bool
 */
const _hasClass = curry((classname, el) => of(el.classList.contains(classname)));

/* 
 * @sig String -> DOM Element -> Bool
 */
const hasClass = curry((className, el) => branch(_hasClass(className))(el));

const hasData = curry((prop, el) => compose(hasProp(prop), getProp('dataset'))(el));

/*
 * @sig String -> DOM Element -> Future Error String
 */
const _removeAttr = curry((attr, el) => {
  el.removeAttribute(attr);
  return of(el);
});

const removeAttr = curry((attr, el) => branch(_removeAttr(attr))(el));

const removeClass = classList('remove');

// _getAttr :: String -> DOM Element -> Future Error String
const _removeData = curry((prop, el) => {
  if (hasData(prop, el)) {
    const result = delete el.dataset[prop];
    if (!result)
      return reject({ error: `Property ${  prop  } is non-configurable.` });
  }
  return of(el);
});

const removeData = curry((prop, el) => branch(_removeData(prop))(el));

// _getAttr :: String -> DOM Element -> Future Error String
const _removeProp = curry((prop, el) => {
  if (hasProp(prop, el)) {
    const result = delete el[prop];
    if (!result)
      return reject({ error: `Property ${  prop  } is non-configurable.` });
  }
  return of(el);
});

const removeProp = curry((prop, el) => branch(_removeProp(prop))(el));

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setAttr = curry((attr, val, el) => {
  el.setAttribute(attr, val);
  return of(el);
});

const setAttr = curry((attr, val, el) => branch(_setAttr(attr, val))(el));

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
const _setData = curry((prop, val, el) => {
  if (isValidDataProp(prop)) {
    el.dataset[prop] = val;
    return of(el);
  }

  return reject({
    error: `Data property ${  prop  } is not a valid property name`,
  });
});

const setData = curry((prop, val, el) => branch(_setData(prop, val))(el));

/*
 * @sig String -> DOM Element -> Future DOM Element
 */
const _setProp = curry((attr, val, el) => {
  el[attr] = val;
  return of(el);
});

const setAttr$2 = curry((prop, val, el) => branch(_setProp(prop, val))(el));

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

export default index;
