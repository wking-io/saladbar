import { ifElse, traverse, chain, curry, compose } from 'ramda';
import future, { of, isFuture, reject } from 'fluture';

let isArray = function(r) {
    return Array.isArray(r);
  },
  _branch = function(r) {
    return ifElse(isArray, traverse(of, r), r);
  },
  branch = curry((r, t) => {
    if (isFuture(t)) return chain(_branch(r))(t);
    let e = t;
    return (
      _branch(r)(t).fork(
        (r) => (e = r),
        (r) => (e = r)
      ),
      e
    );
  }),
  toConsumableArray = function(r) {
    if (Array.isArray(r)) {
      for (var t = 0, e = Array(r.length); t < r.length; t++) e[t] = r[t];
      return e;
    }
    return Array.from(r);
  },
  _classList = curry((r, t, e) => {
    let n;
    return (
      isArray(t)
        ? (n = e.classList)[r].apply(n, toConsumableArray(t))
        : e.classList[r](t),
      of(e)
    );
  }),
  classList = curry((r, t, e) => branch(_classList(r, t))(e)),
  index = classList('add'),
  elNodeType = 1,
  isElmNode = function(r) {
    return r && r.nodeType === elNodeType;
  },
  dom = function(r) {
    const t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return future((e, n) => {
      const o = isElmNode(t) ? t.querySelector(r) : document.querySelector(r);
      o ? n(o) : e({ error: `Element with selector ${  r  } not found.` });
    });
  },
  emptyArray = 0,
  domAll = function(r) {
    const t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return future((e, n) => {
      const o = isElmNode(t)
        ? t.querySelectorAll(r)
        : document.querySelectorAll(r);
      o.length > emptyArray
        ? n(Array.from(o))
        : e({ error: `Elements with selector ${  r  } not found.` });
    });
  },
  _getAttr = curry((r, t) => t.hasAttribute(r)
      ? of(t.getAttribute(r))
      : reject({ error: `Sorry, ${  r  } was not found.` })),
  getAttr = curry((r, t) => branch(_getAttr(r))(t)),
  _hasProp = curry((r, t) => of(r in t)),
  hasProp = curry((r, t) => branch(_hasProp(r))(t)),
  _getAttr$2 = curry((r, t) => hasProp(r, t)
      ? of(t[r])
      : reject({ error: `Sorry, ${  r  } was not found.` })),
  getProp = curry((r, t) => branch(_getAttr$2(r))(t)),
  getData = curry((r, t) => compose(getProp(r), getProp('dataset'))(t)),
  _hasAttr = curry((r, t) => of(t.hasAttribute(r))),
  hasAttr = curry((r, t) => branch(_hasAttr(r))(t)),
  _hasClass = curry((r, t) => of(t.classList.contains(r))),
  hasClass = curry((r, t) => branch(_hasClass(r))(t)),
  hasData = curry((r, t) => compose(hasProp(r), getProp('dataset'))(t)),
  _removeAttr = curry((r, t) => t.removeAttribute(r), of(t)),
  removeAttr = curry((r, t) => branch(_removeAttr(r))(t)),
  index$1 = classList('remove'),
  _removeData = curry((r, t) => {
    if (hasData(r, t) && !delete t.dataset[r])
      return reject({ error: `Property ${  r  } is non-configurable.` });
    return of(t);
  }),
  removeData = curry((r, t) => branch(_removeData(r))(t)),
  _removeProp = curry((r, t) => {
    if (hasProp(r, t) && !delete t[r])
      return reject({ error: `Property ${  r  } is non-configurable.` });
    return of(t);
  }),
  removeProp = curry((r, t) => branch(_removeProp(r))(t)),
  _setAttr = curry((r, t, e) => e.setAttribute(r, t), of(e)),
  setAttr = curry((r, t, e) => branch(_setAttr(r, t))(e)),
  validDataRegex = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/,
  onlyOne = 1,
  isValidDataProp = function(r) {
    const t = r.match(validDataRegex);
    return t && t.length === onlyOne;
  },
  _setData = curry((r, t, e) => isValidDataProp(r)
      ? ((e.dataset[r] = t), of(e))
      : reject({
          error: `Data property ${  r  } is not a valid property name`,
        })),
  setData = curry((r, t, e) => branch(_setData(r, t))(e)),
  _setProp = curry((r, t, e) => (e[r] = t), of(e)),
  setAttr$2 = curry((r, t, e) => branch(_setProp(r, t))(e)),
  index$2 = classList('toggle');
export {
  index as addClass,
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
  index$1 as removeClass,
  removeData,
  removeProp,
  setAttr,
  setData,
  setAttr$2 as setProp,
  index$2 as toggleClass,
};
