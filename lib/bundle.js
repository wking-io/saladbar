const saladbar = (function() {
  
  function t(t) {
    return (
      t != null && typeof t === 'object' && !0 === t['@@functional/placeholder']
    );
  }
  function n(n) {
    return function e(r) {
      return arguments.length === 0 || t(r) ? e : n.apply(this, arguments);
    };
  }
  const e = { '@@functional/placeholder': !0 };
  function r(e) {
    return function r(u, o) {
      switch (arguments.length) {
        case 0:
          return r;
        case 1:
          return t(u)
            ? r
            : n((t) => e(u, t));
        default:
          return t(u) && t(o)
            ? r
            : t(u)
              ? n((t) => e(t, o))
              : t(o)
                ? n((t) => e(u, t))
                : e(u, o);
      }
    };
  }
  function u(t, n) {
    let e;
    (t = t || []), (n = n || []);
    let r = t.length,
      u = n.length,
      o = [];
    for (e = 0; e < r; ) (o[o.length] = t[e]), (e += 1);
    for (e = 0; e < u; ) (o[o.length] = n[e]), (e += 1);
    return o;
  }
  function o(t, n) {
    switch (t) {
      case 0:
        return function() {
          return n.apply(this, arguments);
        };
      case 1:
        return function(t) {
          return n.apply(this, arguments);
        };
      case 2:
        return function(t, e) {
          return n.apply(this, arguments);
        };
      case 3:
        return function(t, e, r) {
          return n.apply(this, arguments);
        };
      case 4:
        return function(t, e, r, u) {
          return n.apply(this, arguments);
        };
      case 5:
        return function(t, e, r, u, o) {
          return n.apply(this, arguments);
        };
      case 6:
        return function(t, e, r, u, o, i) {
          return n.apply(this, arguments);
        };
      case 7:
        return function(t, e, r, u, o, i, a) {
          return n.apply(this, arguments);
        };
      case 8:
        return function(t, e, r, u, o, i, a, c) {
          return n.apply(this, arguments);
        };
      case 9:
        return function(t, e, r, u, o, i, a, c, s) {
          return n.apply(this, arguments);
        };
      case 10:
        return function(t, e, r, u, o, i, a, c, s, f) {
          return n.apply(this, arguments);
        };
      default:
        throw new Error(
          'First argument to _arity must be a non-negative integer no greater than ten'
        );
    }
  }
  function i(n, e, r) {
    return function() {
      for (
        var u = [], a = 0, c = n, s = 0;
        s < e.length || a < arguments.length;

      ) {
        var f;
        s < e.length && (!t(e[s]) || a >= arguments.length)
          ? (f = e[s])
          : ((f = arguments[a]), (a += 1)),
          (u[s] = f),
          t(f) || (c -= 1),
          (s += 1);
      }
      return c <= 0 ? r.apply(this, u) : o(c, i(n, u, r));
    };
  }
  const a = r((t, e) => t === 1 ? n(e) : o(t, i(t, [], e)));
  function c(e) {
    return function u(o, i, a) {
      switch (arguments.length) {
        case 0:
          return u;
        case 1:
          return t(o)
            ? u
            : r((t, n) => e(o, t, n));
        case 2:
          return t(o) && t(i)
            ? u
            : t(o)
              ? r((t, n) => e(t, i, n))
              : t(i)
                ? r((t, n) => e(o, t, n))
                : n((t) => e(o, i, t));
        default:
          return t(o) && t(i) && t(a)
            ? u
            : t(o) && t(i)
              ? r((t, n) => e(t, n, a))
              : t(o) && t(a)
                ? r((t, n) => e(t, i, n))
                : t(i) && t(a)
                  ? r((t, n) => e(o, t, n))
                  : t(o)
                    ? n((t) => e(t, i, a))
                    : t(i)
                      ? n((t) => e(o, t, a))
                      : t(a)
                        ? n((t) => e(o, i, t))
                        : e(o, i, a);
      }
    };
  }
  const s =
    Array.isArray ||
    function(t) {
      return (
        t != null &&
        t.length >= 0 &&
        Object.prototype.toString.call(t) === '[object Array]'
      );
    };
  function f(t, n, e) {
    return function() {
      if (arguments.length === 0) return e();
      let r = Array.prototype.slice.call(arguments, 0),
        u = r.pop();
      if (!s(u)) {
        for (let o = 0; o < t.length; ) {
          if (typeof u[t[o]] === 'function') return u[t[o]](...r);
          o += 1;
        }
        if (
          (function(t) {
            return typeof t['@@transducer/step'] === 'function';
          })(u)
        )
          return n(...r)(u);
      }
      return e.apply(this, arguments);
    };
  }
  let h = {
      init() {
        return this.xf['@@transducer/init']();
      },
      result(t) {
        return this.xf['@@transducer/result'](t);
      },
    },
    p = (function() {
      function t(t, n) {
        (this.xf = n), (this.f = t), (this.all = !0);
      }
      return (
        (t.prototype['@@transducer/init'] = h.init),
        (t.prototype['@@transducer/result'] = function(t) {
          return (
            this.all && (t = this.xf['@@transducer/step'](t, !0)),
            this.xf['@@transducer/result'](t)
          );
        }),
        (t.prototype['@@transducer/step'] = function(t, n) {
          let e;
          return (
            this.f(n) ||
              ((this.all = !1),
              (t =
                (e = this.xf['@@transducer/step'](t, !1)) &&
                e['@@transducer/reduced']
                  ? e
                  : { '@@transducer/value': e, '@@transducer/reduced': !0 })),
            t
          );
        }),
        t
      );
    })(),
    l = r(
      f(
        ['all'],
        r((t, n) => new p(t, n)),
        (t, n) => {
          for (let e = 0; e < n.length; ) {
            if (!t(n[e])) return !1;
            e += 1;
          }
          return !0;
        }
      )
    );
  function y(t, n) {
    for (var e = 0, r = n.length, u = Array(r); e < r; )
      (u[e] = t(n[e])), (e += 1);
    return u;
  }
  function _(t) {
    return Object.prototype.toString.call(t) === '[object String]';
  }
  let d = n((t) => (
        Boolean(s(t)) ||
        (Boolean(t) &&
          (typeof t === 'object' &&
            (!_(t) &&
              (t.nodeType === 1
                ? Boolean(t.length)
                : t.length === 0 ||
                  (t.length > 0 &&
                    (t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1)))))))
      )),
    v = (function() {
      function t(t) {
        this.f = t;
      }
      return (
        (t.prototype['@@transducer/init'] = function() {
          throw new Error('init not implemented on XWrap');
        }),
        (t.prototype['@@transducer/result'] = function(t) {
          return t;
        }),
        (t.prototype['@@transducer/step'] = function(t, n) {
          return this.f(t, n);
        }),
        t
      );
    })();
  function m(t) {
    return new v(t);
  }
  const g = r((t, n) => o(t.length, function() {
      return t.apply(n, arguments);
    }));
  function b(t, n, e) {
    for (let r = e.next(); !r.done; ) {
      if (
        (n = t['@@transducer/step'](n, r.value)) &&
        n['@@transducer/reduced']
      ) {
        n = n['@@transducer/value'];
        break;
      }
      r = e.next();
    }
    return t['@@transducer/result'](n);
  }
  function F(t, n, e, r) {
    return t['@@transducer/result'](e[r](g(t['@@transducer/step'], t), n));
  }
  const w = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
  function j(t, n, e) {
    if ((typeof t === 'function' && (t = m(t)), d(e)))
      return (function(t, n, e) {
        for (let r = 0, u = e.length; r < u; ) {
          if (
            (n = t['@@transducer/step'](n, e[r])) &&
            n['@@transducer/reduced']
          ) {
            n = n['@@transducer/value'];
            break;
          }
          r += 1;
        }
        return t['@@transducer/result'](n);
      })(t, n, e);
    if (typeof e['fantasy-land/reduce'] === 'function')
      return F(t, n, e, 'fantasy-land/reduce');
    if (e[w] != null) return b(t, n, e[w]());
    if (typeof e.next === 'function') return b(t, n, e);
    if (typeof e.reduce === 'function') return F(t, n, e, 'reduce');
    throw new TypeError('reduce: list must be array or iterable');
  }
  let k = (function() {
      function t(t, n) {
        (this.xf = n), (this.f = t);
      }
      return (
        (t.prototype['@@transducer/init'] = h.init),
        (t.prototype['@@transducer/result'] = h.result),
        (t.prototype['@@transducer/step'] = function(t, n) {
          return this.xf['@@transducer/step'](t, this.f(n));
        }),
        t
      );
    })(),
    O = r((t, n) => new k(t, n));
  function A(t, n) {
    return Object.prototype.hasOwnProperty.call(n, t);
  }
  let S = Object.prototype.toString,
    x = function() {
      return S.call(arguments) === '[object Arguments]'
        ? function(t) {
            return S.call(t) === '[object Arguments]';
          }
        : function(t) {
            return A('callee', t);
          };
    },
    R = !{ toString: null }.propertyIsEnumerable('toString'),
    q = [
      'constructor',
      'valueOf',
      'isPrototypeOf',
      'toString',
      'propertyIsEnumerable',
      'hasOwnProperty',
      'toLocaleString',
    ],
    M = (function() {
      return arguments.propertyIsEnumerable('length');
    })(),
    P = function(t, n) {
      for (let e = 0; e < t.length; ) {
        if (t[e] === n) return !0;
        e += 1;
      }
      return !1;
    },
    E = n(
      typeof Object.keys !== 'function' || M
        ? (t) => {
            if (Object(t) !== t) return [];
            let n,
              e,
              r = [],
              u = M && x(t);
            for (n in t) !A(n, t) || (u && n === 'length') || (r[r.length] = n);
            if (R)
              for (e = q.length - 1; e >= 0; )
                A((n = q[e]), t) && !P(r, n) && (r[r.length] = n), (e -= 1);
            return r;
          }
        : (t) => Object(t) !== t ? [] : Object.keys(t)
    ),
    z = r(
      f(['fantasy-land/map', 'map'], O, (t, n) => {
        switch (Object.prototype.toString.call(n)) {
          case '[object Function]':
            return a(n.length, function() {
              return t.call(this, n.apply(this, arguments));
            });
          case '[object Object]':
            return j(
              (e, r) => (e[r] = t(n[r])), e,
              {},
              E(n)
            );
          default:
            return y(t, n);
        }
      })
    ),
    N = r((t, n) => {
      for (var e = n, r = 0; r < t.length; ) {
        if (e == null) return;
        (e = e[t[r]]), (r += 1);
      }
      return e;
    }),
    C = r((t, n) => N([t], n)),
    T = c(j),
    B = r((t, n) => t && n),
    D = r((t, n) => typeof n['fantasy-land/ap'] === 'function'
        ? n['fantasy-land/ap'](t)
        : typeof t.ap === 'function'
          ? t.ap(n)
          : typeof t === 'function'
            ? function(e) {
                return t(e)(n(e));
              }
            : j(
                (t, e) => u(t, z(e, n)),
                [],
                t
              )),
    L = r((t, n) => u(n, [t])),
    W = n((t) => {
      for (var n = E(t), e = n.length, r = [], u = 0; u < e; )
        (r[u] = t[n[u]]), (u += 1);
      return r;
    });
  function I(t) {
    return Object.prototype.toString.call(t) === '[object Function]';
  }
  let U = r((t, n) => {
      const e = a(t, n);
      return a(t, function() {
        return j(
          D,
          z(e, arguments[0]),
          Array.prototype.slice.call(arguments, 1)
        );
      });
    }),
    Q = n((t) => U(t.length, t)),
    G = r((t, n) => I(t)
        ? function() {
            return t.apply(this, arguments) && n.apply(this, arguments);
          }
        : Q(B)(t, n)),
    Z = n((t) => a(t.length, t));
  let $ = function(t) {
      const n = (function(t) {
        return {
          '@@transducer/init': h.init,
          '@@transducer/result'(n) {
            return t['@@transducer/result'](n);
          },
          '@@transducer/step'(n, e) {
            const r = t['@@transducer/step'](n, e);
            return r['@@transducer/reduced']
              ? { '@@transducer/value': r, '@@transducer/reduced': !0 }
              : r;
          },
        };
      })(t);
      return {
        '@@transducer/init': h.init,
        '@@transducer/result'(t) {
          return n['@@transducer/result'](t);
        },
        '@@transducer/step'(t, e) {
          return d(e) ? j(n, t, e) : j(n, t, [e]);
        },
      };
    },
    J = r(
      f(
        ['fantasy-land/chain', 'chain'],
        r((t, n) => z(t, $(n))),
        (t, n) => {
          return typeof n === 'function'
            ? function(e) {
                return t(n(e))(e);
              }
            : ((e = !1),
              function t(n) {
                for (var r, u, o, i = [], a = 0, c = n.length; a < c; ) {
                  if (d(n[a]))
                    for (o = 0, u = (r = e ? t(n[a]) : n[a]).length; o < u; )
                      (i[i.length] = r[o]), (o += 1);
                  else i[i.length] = n[a];
                  a += 1;
                }
                return i;
              })(z(t, n));
          let e;
        }
      )
    ),
    V = n((t) => t === null
        ? 'Null'
        : void 0 === t
          ? 'Undefined'
          : Object.prototype.toString.call(t).slice(8, -1)),
    X = Q(
      n((t) => !t)
    );
  function Y(t, n) {
    return function() {
      return n.call(this, t.apply(this, arguments));
    };
  }
  function H(t, n) {
    return function() {
      const e = arguments.length;
      if (e === 0) return n();
      const r = arguments[e - 1];
      return s(r) || typeof r[t] !== 'function'
        ? n.apply(this, arguments)
        : r[t](...Array.prototype.slice.call(arguments, 0, e - 1));
    };
  }
  let K = c(
      H('slice', (t, n, e) => Array.prototype.slice.call(e, t, n))
    ),
    tt = n(H('tail', K(1, 1 / 0)));
  const nt = n((t) => _(t)
      ? t
          .split('')
          .reverse()
          .join('')
      : Array.prototype.slice.call(t, 0).reverse());
  function et() {
    if (arguments.length === 0)
      throw new Error('compose requires at least one argument');
    return function() {
      if (arguments.length === 0)
        throw new Error('pipe requires at least one argument');
      return o(arguments[0].length, T(Y, arguments[0], tt(arguments)));
    }.apply(this, nt(arguments));
  }
  function rt(t) {
    for (var n, e = []; !(n = t.next()).done; ) e.push(n.value);
    return e;
  }
  function ut(t, n, e) {
    for (let r = 0, u = e.length; r < u; ) {
      if (t(n, e[r])) return !0;
      r += 1;
    }
    return !1;
  }
  const ot = r((t, n) => t === n ? t !== 0 || 1 / t == 1 / n : t != t && n != n);
  function it(t, n, e, r) {
    const u = rt(t);
    function o(t, n) {
      return at(t, n, e.slice(), r.slice());
    }
    return !ut(
      (t, n) => !ut(o, n, t),
      rt(n),
      u
    );
  }
  function at(t, n, e, r) {
    if (ot(t, n)) return !0;
    let u,
      o,
      i = V(t);
    if (i !== V(n)) return !1;
    if (t == null || n == null) return !1;
    if (
      typeof t['fantasy-land/equals'] === 'function' ||
      typeof n['fantasy-land/equals'] === 'function'
    )
      return (
        typeof t['fantasy-land/equals'] === 'function' &&
        t['fantasy-land/equals'](n) &&
        typeof n['fantasy-land/equals'] === 'function' &&
        n['fantasy-land/equals'](t)
      );
    if (typeof t.equals === 'function' || typeof n.equals === 'function')
      return (
        typeof t.equals === 'function' &&
        t.equals(n) &&
        typeof n.equals === 'function' &&
        n.equals(t)
      );
    switch (i) {
      case 'Arguments':
      case 'Array':
      case 'Object':
        if (
          typeof t.constructor === 'function' &&
          ((u = t.constructor),
            (o = String(u).match(/^function (\w*)/)) == null ? '' : o[1]) ===
            'Promise'
        )
          return t === n;
        break;
      case 'Boolean':
      case 'Number':
      case 'String':
        if (typeof t !== typeof n || !ot(t.valueOf(), n.valueOf())) return !1;
        break;
      case 'Date':
        if (!ot(t.valueOf(), n.valueOf())) return !1;
        break;
      case 'Error':
        return t.name === n.name && t.message === n.message;
      case 'RegExp':
        if (
          t.source !== n.source ||
          t.global !== n.global ||
          t.ignoreCase !== n.ignoreCase ||
          t.multiline !== n.multiline ||
          t.sticky !== n.sticky ||
          t.unicode !== n.unicode
        )
          return !1;
    }
    for (var a = e.length - 1; a >= 0; ) {
      if (e[a] === t) return r[a] === n;
      a -= 1;
    }
    switch (i) {
      case 'Map':
        return (
          t.size === n.size &&
          it(t.entries(), n.entries(), e.concat([t]), r.concat([n]))
        );
      case 'Set':
        return (
          t.size === n.size &&
          it(t.values(), n.values(), e.concat([t]), r.concat([n]))
        );
      case 'Arguments':
      case 'Array':
      case 'Object':
      case 'Boolean':
      case 'Number':
      case 'String':
      case 'Date':
      case 'Error':
      case 'RegExp':
      case 'Int8Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
      case 'Int16Array':
      case 'Uint16Array':
      case 'Int32Array':
      case 'Uint32Array':
      case 'Float32Array':
      case 'Float64Array':
      case 'ArrayBuffer':
        break;
      default:
        return !1;
    }
    const c = E(t);
    if (c.length !== E(n).length) return !1;
    let s = e.concat([t]),
      f = r.concat([n]);
    for (a = c.length - 1; a >= 0; ) {
      const h = c[a];
      if (!A(h, n) || !at(n[h], t[h], s, f)) return !1;
      a -= 1;
    }
    return !0;
  }
  const ct = r((t, n) => at(t, n, [], []));
  const st = function(t) {
    return (t < 10 ? '0' : '') + t;
  };
  Date.prototype.toISOString;
  function ft(t) {
    return Object.prototype.toString.call(t) === '[object Object]';
  }
  let ht = n((t) => t != null && typeof t['fantasy-land/empty'] === 'function'
        ? t['fantasy-land/empty']()
        : t != null &&
          t.constructor != null &&
          typeof t.constructor['fantasy-land/empty'] === 'function'
          ? t.constructor['fantasy-land/empty']()
          : t != null && typeof t.empty === 'function'
            ? t.empty()
            : t != null &&
              t.constructor != null &&
              typeof t.constructor.empty === 'function'
              ? t.constructor.empty()
              : s(t)
                ? []
                : _(t)
                  ? ''
                  : ft(t)
                    ? {}
                    : x(t)
                      ? (function() {
                          return arguments;
                        })()
                      : void 0),
    pt = n((t) => {
      for (var n = {}, e = 0; e < t.length; ) (n[t[e][0]] = t[e][1]), (e += 1);
      return n;
    }),
    lt = r(A);
  function yt(t) {
    return t;
  }
  let _t = n(yt),
    dt = c((t, n, e) => a(Math.max(t.length, n.length, e.length), function() {
        return t.apply(this, arguments)
          ? n.apply(this, arguments)
          : e.apply(this, arguments);
      }));
  const vt = n((t) => t != null && ct(t, ht(t)));
  let mt = r((t, n) => u([t], n)),
    gt = r((t, n) => {
      for (var e = t.length, r = [], u = 0; u < e; ) (r[u] = n[t[u]]), (u += 1);
      return r;
    }),
    bt = c((t, n, e) => {
      for (let r = e.length - 1; r >= 0; ) (n = t(e[r], n)), (r -= 1);
      return n;
    }),
    Ft = r((t, n) => typeof n.sequence === 'function'
        ? n.sequence(t)
        : bt(
            (t, n) => D(z(mt, t), n),
            t([]),
            n
          )),
    wt = c((t, n, e) => typeof e['fantasy-land/traverse'] === 'function'
        ? e['fantasy-land/traverse'](n, t)
        : Ft(t, z(n, e))),
    jt = '\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff',
    kt = (String.prototype.trim,
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined' ? self : {});
  function Ot(t, n) {
    return t((n = { exports: {} }), n.exports), n.exports;
  }
  let At = Ot((t) => {
      let n;
      t.exports = ((n = '@@type'),
      function(t) {
        return t != null &&
          t.constructor != null &&
          t.constructor.prototype !== t &&
          typeof t.constructor[n] === 'string'
          ? t.constructor[n]
          : Object.prototype.toString
              .call(t)
              .slice('[object '.length, -']'.length);
      });
    }),
    St = Ot((t) => {
      t.exports = (function(t) {
        function n(t) {
          return function(n) {
            return t.concat(n);
          };
        }
        function e(t) {
          return function(n) {
            return t;
          };
        }
        function r(t, n) {
          Object.keys(t).forEach(n, t);
        }
        function u(t, n) {
          return Object.prototype.hasOwnProperty.call(n, t);
        }
        function o(t) {
          return t;
        }
        function i(t) {
          return function(n) {
            return [t, n];
          };
        }
        function a(n, e) {
          return typeof n === typeof e && t(n) === t(e);
        }
        function c(t) {
          return { value: t, done: !1 };
        }
        function s(t) {
          return { value: t, done: !0 };
        }
        function f(t, n, e, r) {
          if (!(this instanceof f)) return new f(t, n, e, r);
          (this.name = t),
            (this.url = n),
            (this.test = function(t) {
              return (
                e.every((n) => n.test(t)) && r(t)
              );
            });
        }
        f['@@type'] = 'sanctuary-type-classes/TypeClass';
        let h = 'Constructor',
          p = 'Value';
        function l(t, n, e) {
          for (var r = e, o = 0; o < n.length; o += 1) {
            const i = n[o];
            if (r == null || (!t && !u(i, r))) return null;
            r = r[i];
          }
          return typeof r === 'function' ? r : null;
        }
        function y(t, n) {
          return l(!0, t, n);
        }
        function _(t) {
          return l(!1, t, J);
        }
        const d = u('name', () => {})
          ? function(t) {
              return t.name;
            }
          : function(t) {
              const n = /function (\w*)/.exec(t);
              return n == null ? '' : n[1];
            };
        function v(n, e, r) {
          function u(n) {
            const e = `fantasy-land/${  n}`;
            return r[n] === h
              ? function(t) {
                  const n = y([e], t);
                  return n == null && typeof t === 'function' ? _([d(t), e]) : n;
                }
              : function(n) {
                  let r =
                      n != null &&
                      n.constructor != null &&
                      n.constructor.prototype === n,
                    u = null;
                  return (
                    r || (u = y([e], n)),
                    u == null && (u = _([t(n), 'prototype', e])),
                    u && u.bind(n)
                  );
                };
          }
          let o = Object.keys(r),
            i = f(
              `sanctuary-type-classes/${  n}`,
              `https://github.com/sanctuary-js/sanctuary-type-classes/tree/v8.0.0#${ 
                n}`,
              e,
              (t) => o.every((n) => {
                  const e = r[n] === h ? t.constructor : t;
                  return u(n)(e) != null;
                })
            );
          return (
            (i.methods = o.reduce((t, n) => (t[n] = u(n)), t, {})),
            i
          );
        }
        let m = v('Setoid', [], { equals: p }),
          g = v('Ord', [m], { lte: p }),
          b = v('Semigroupoid', [], { compose: p }),
          F = v('Category', [b], { id: h }),
          w = v('Semigroup', [], { concat: p }),
          j = v('Monoid', [w], { empty: h }),
          k = v('Group', [j], { invert: p }),
          O = v('Filterable', [], { filter: p }),
          A = v('Functor', [], { map: p }),
          S = v('Bifunctor', [A], { bimap: p }),
          x = v('Profunctor', [A], { promap: p }),
          R = v('Apply', [A], { ap: p }),
          q = v('Applicative', [R], { of: h }),
          M = v('Chain', [R], { chain: p }),
          P = v('ChainRec', [M], { chainRec: h }),
          E = v('Monad', [q, M], {}),
          z = v('Alt', [A], { alt: p }),
          N = v('Plus', [z], { zero: h }),
          C = v('Alternative', [q, N], {}),
          T = v('Foldable', [], { reduce: p }),
          B = v('Traversable', [A, T], { traverse: p }),
          D = v('Extend', [A], { extend: p }),
          L = v('Comonad', [D], { extract: p }),
          W = v('Contravariant', [], { contramap: p });
        function I(t) {
          return [t];
        }
        function U(t) {
          if (t.length !== this.length) return !1;
          for (let n = 0; n < this.length; n += 1)
            if (!X(this[n], t[n])) return !1;
          return !0;
        }
        function Q(t) {
          for (let n = 0; ; n += 1) {
            if (n === this.length) return !0;
            if (n === t.length) return !1;
            if (!X(this[n], t[n])) return H(this[n], t[n]);
          }
        }
        function G(t) {
          return this.concat(t);
        }
        function Z(t) {
          const n = {};
          function e(t) {
            n[t] = this[t];
          }
          return r(this, e), r(t, e), n;
        }
        var $,
          J = {
            Null: {
              prototype: {
                toString() {
                  return 'null';
                },
                'fantasy-land/equals'(t) {
                  return !0;
                },
                'fantasy-land/lte'(t) {
                  return !0;
                },
              },
            },
            Undefined: {
              prototype: {
                toString() {
                  return 'undefined';
                },
                'fantasy-land/equals'(t) {
                  return !0;
                },
                'fantasy-land/lte'(t) {
                  return !0;
                },
              },
            },
            Boolean: {
              prototype: {
                toString() {
                  return typeof this === 'object'
                    ? `new Boolean(${  V(this.valueOf())  })`
                    : this.toString();
                },
                'fantasy-land/equals'(t) {
                  return typeof this === 'object'
                    ? X(this.valueOf(), t.valueOf())
                    : this === t;
                },
                'fantasy-land/lte'(t) {
                  return typeof this === 'object'
                    ? H(this.valueOf(), t.valueOf())
                    : !1 === this || !0 === t;
                },
              },
            },
            Number: {
              prototype: {
                toString() {
                  return typeof this === 'object'
                    ? `new Number(${  V(this.valueOf())  })`
                    : 1 / this == -1 / 0 ? '-0' : this.toString(10);
                },
                'fantasy-land/equals'(t) {
                  return typeof this === 'object'
                    ? X(this.valueOf(), t.valueOf())
                    : (isNaN(this) && isNaN(t)) || this === t;
                },
                'fantasy-land/lte'(t) {
                  return typeof this === 'object'
                    ? H(this.valueOf(), t.valueOf())
                    : (isNaN(this) && isNaN(t)) || this <= t;
                },
              },
            },
            Date: {
              prototype: {
                toString() {
                  const t = isNaN(this.valueOf()) ? NaN : this.toISOString();
                  return `new Date(${  V(t)  })`;
                },
                'fantasy-land/equals'(t) {
                  return X(this.valueOf(), t.valueOf());
                },
                'fantasy-land/lte'(t) {
                  return H(this.valueOf(), t.valueOf());
                },
              },
            },
            RegExp: {
              prototype: {
                'fantasy-land/equals'(t) {
                  return (
                    t.source === this.source &&
                    t.global === this.global &&
                    t.ignoreCase === this.ignoreCase &&
                    t.multiline === this.multiline &&
                    t.sticky === this.sticky &&
                    t.unicode === this.unicode
                  );
                },
              },
            },
            String: {
              'fantasy-land/empty'() {
                return '';
              },
              prototype: {
                toString() {
                  return typeof this === 'object'
                    ? `new String(${  V(this.valueOf())  })`
                    : JSON.stringify(this);
                },
                'fantasy-land/equals'(t) {
                  return typeof this === 'object'
                    ? X(this.valueOf(), t.valueOf())
                    : this === t;
                },
                'fantasy-land/lte'(t) {
                  return typeof this === 'object'
                    ? H(this.valueOf(), t.valueOf())
                    : this <= t;
                },
                'fantasy-land/concat'(t) {
                  return this + t;
                },
              },
            },
            Array: {
              'fantasy-land/empty'() {
                return [];
              },
              'fantasy-land/of': I,
              'fantasy-land/chainRec'(t, n) {
                for (var e = [n], r = []; e.length > 0; ) {
                  for (
                    var u = t(c, s, e.shift()), o = [], i = 0;
                    i < u.length;
                    i += 1
                  )
                    (u[i].done ? r : o).push(u[i].value);
                  Array.prototype.unshift.apply(e, o);
                }
                return r;
              },
              'fantasy-land/zero'() {
                return [];
              },
              prototype: {
                toString() {
                  for (
                    var t = this.map(V), n = Object.keys(this).sort(), e = 0;
                    e < n.length;
                    e += 1
                  ) {
                    const r = n[e];
                    /^\d+$/.test(r) || t.push(`${V(r)  }: ${  V(this[r])}`);
                  }
                  return `[${  t.join(', ')  }]`;
                },
                'fantasy-land/equals': U,
                'fantasy-land/lte': Q,
                'fantasy-land/concat': G,
                'fantasy-land/filter'(t) {
                  return this.filter((n) => t(n));
                },
                'fantasy-land/map'(t) {
                  return this.map((n) => t(n));
                },
                'fantasy-land/ap'(t) {
                  for (var n = [], e = 0; e < t.length; e += 1)
                    for (let r = 0; r < this.length; r += 1)
                      n.push(t[e](this[r]));
                  return n;
                },
                'fantasy-land/chain'(t) {
                  const n = [];
                  return (
                    this.forEach((e) => {
                      Array.prototype.push.apply(n, t(e));
                    }),
                    n
                  );
                },
                'fantasy-land/alt': G,
                'fantasy-land/reduce'(t, n) {
                  return this.reduce((n, e) => t(n, e), n);
                },
                'fantasy-land/traverse'(t, e) {
                  const r = this;
                  function u(o, a) {
                    switch (a) {
                      case 0:
                        return ot(t, []);
                      case 2:
                        return ut(i, e(r[o]), e(r[o + 1]));
                      default:
                        var c = 2 * Math.floor(a / 4);
                        return ut(n, u(o, c), u(o + c, a - c));
                    }
                  }
                  return this.length % 2 == 1
                    ? ut(n, et(I, e(this[0])), u(1, this.length - 1))
                    : u(0, this.length);
                },
                'fantasy-land/extend'(t) {
                  return this.map((n, e, r) => t(r.slice(e)));
                },
              },
            },
            Arguments: {
              prototype: {
                toString() {
                  return (
                    `(function () { return arguments; }(${ 
                    Array.prototype.map.call(this, V).join(', ') 
                    }))`
                  );
                },
                'fantasy-land/equals'(t) {
                  return U.call(this, t);
                },
                'fantasy-land/lte'(t) {
                  return Q.call(this, t);
                },
              },
            },
            Error: {
              prototype: {
                toString() {
                  return `new ${  this.name  }(${  V(this.message)  })`;
                },
                'fantasy-land/equals'(t) {
                  return X(this.name, t.name) && X(this.message, t.message);
                },
              },
            },
            Object: {
              'fantasy-land/empty'() {
                return {};
              },
              'fantasy-land/zero'() {
                return {};
              },
              prototype: {
                toString() {
                  for (
                    var t = [], n = Object.keys(this).sort(), e = 0;
                    e < n.length;
                    e += 1
                  ) {
                    const r = n[e];
                    t.push(`${V(r)  }: ${  V(this[r])}`);
                  }
                  return `{${  t.join(', ')  }}`;
                },
                'fantasy-land/equals'(t) {
                  let n = this,
                    e = Object.keys(this).sort();
                  return (
                    X(e, Object.keys(t).sort()) &&
                    e.every((e) => X(n[e], t[e]))
                  );
                },
                'fantasy-land/lte'(t) {
                  for (
                    let n = Object.keys(this).sort(), e = Object.keys(t).sort();
                    ;

                  ) {
                    if (n.length === 0) return !0;
                    if (e.length === 0) return !1;
                    let r = n.shift(),
                      u = e.shift();
                    if (r < u) return !0;
                    if (r > u) return !1;
                    if (!X(this[r], t[r])) return H(this[r], t[r]);
                  }
                },
                'fantasy-land/concat': Z,
                'fantasy-land/filter'(t) {
                  const n = {};
                  return (
                    r(this, function(e) {
                      t(this[e]) && (n[e] = this[e]);
                    }),
                    n
                  );
                },
                'fantasy-land/map'(t) {
                  const n = {};
                  return (
                    r(this, function(e) {
                      n[e] = t(this[e]);
                    }),
                    n
                  );
                },
                'fantasy-land/ap'(t) {
                  const n = {};
                  return (
                    r(this, function(e) {
                      u(e, t) && (n[e] = t[e](this[e]));
                    }),
                    n
                  );
                },
                'fantasy-land/alt': Z,
                'fantasy-land/reduce'(t, n) {
                  const e = this;
                  return Object.keys(this)
                    .sort()
                    .reduce((n, r) => t(n, e[r]), n);
                },
                'fantasy-land/traverse'(t, n) {
                  const e = this;
                  return Object.keys(this).reduce((t, r) => ut(
                      (t) => function(n) {
                          const e = {};
                          return (e[r] = n), Z.call(t, e);
                        },
                      t,
                      n(e[r])
                    ), ot(t, {}));
                },
              },
            },
            Function: {
              'fantasy-land/id'() {
                return o;
              },
              'fantasy-land/of'(t) {
                return function(n) {
                  return t;
                };
              },
              'fantasy-land/chainRec'(t, n) {
                return function(e) {
                  for (var r = c(n); !r.done; ) r = t(c, s, r.value)(e);
                  return r.value;
                };
              },
              prototype: {
                'fantasy-land/equals'(t) {
                  return t === this;
                },
                'fantasy-land/compose'(t) {
                  const n = this;
                  return function(e) {
                    return t(n(e));
                  };
                },
                'fantasy-land/map'(t) {
                  const n = this;
                  return function(e) {
                    return t(n(e));
                  };
                },
                'fantasy-land/promap'(t, n) {
                  const e = this;
                  return function(r) {
                    return n(e(t(r)));
                  };
                },
                'fantasy-land/ap'(t) {
                  const n = this;
                  return function(e) {
                    return t(e)(n(e));
                  };
                },
                'fantasy-land/chain'(t) {
                  const n = this;
                  return function(e) {
                    return t(n(e))(e);
                  };
                },
                'fantasy-land/extend'(t) {
                  const n = this;
                  return function(e) {
                    return t((t) => n(K(e, t)));
                  };
                },
                'fantasy-land/contramap'(t) {
                  const n = this;
                  return function(e) {
                    return n(t(e));
                  };
                },
              },
            },
          },
          V = (function() {
            const n = [];
            function e(t, e) {
              n.push(e);
              try {
                return t.call(e);
              } finally {
                n.pop();
              }
            }
            return function(r) {
              if (n.indexOf(r) >= 0) return '<Circular>';
              const u = t(r);
              if (u === 'Object') {
                let o;
                try {
                  o = e(r.toString, r);
                } catch (t) {}
                if (o != null && o !== '[object Object]') return o;
              }
              return e(_([u, 'prototype', 'toString']) || r.toString, r);
            };
          })(),
          X = (($ = []),
          function(t, n) {
            if (!a(t, n)) return !1;
            if (
              $.some((e) => e[0] === t && e[1] === n)
            )
              return !0;
            $.push([t, n]);
            try {
              return m.test(t) && m.test(n) && m.methods.equals(t)(n);
            } finally {
              $.pop();
            }
          });
        function Y(t, n) {
          return a(t, n) && !H(n, t);
        }
        var H = (function() {
          const t = [];
          return function(n, e) {
            if (!a(n, e)) return !1;
            if (
              t.some((t) => t[0] === n && t[1] === e)
            )
              return X(n, e);
            t.push([n, e]);
            try {
              return g.test(n) && g.test(e) && g.methods.lte(n)(e);
            } finally {
              t.pop();
            }
          };
        })();
        function K(t, n) {
          return w.methods.concat(t)(n);
        }
        function tt(t) {
          return j.methods.empty(t)();
        }
        function nt(t, n) {
          return O.methods.filter(n)(t);
        }
        function et(t, n) {
          return A.methods.map(n)(t);
        }
        function rt(t, n) {
          return R.methods.ap(n)(t);
        }
        function ut(t, n, e) {
          return rt(et(t, n), e);
        }
        function ot(t, n) {
          return q.methods.of(t)(n);
        }
        function it(t, n) {
          return M.methods.chain(n)(t);
        }
        function at(t, n, e) {
          return T.methods.reduce(e)(t, n);
        }
        function ct(t, n) {
          for (
            var e = at(
                (n, e) => {
                  for (var r = t(e), u = 0, o = n.length; u < o; ) {
                    const i = Math.floor((u + o) / 2);
                    H(n[i].fx, r) ? (u = i + 1) : (o = i);
                  }
                  return n.splice(u, 0, { x: e, fx: r }), n;
                },
                [],
                n
              ),
              r = n.constructor,
              u = tt(r),
              o = 0;
            o < e.length;
            o += 1
          )
            u = K(u, ot(r, e[o].x));
          return u;
        }
        function st(t, n, e) {
          return B.methods.traverse(e)(t, n);
        }
        function ft(t, n) {
          return D.methods.extend(n)(t);
        }
        return {
          TypeClass: f,
          Setoid: m,
          Ord: g,
          Semigroupoid: b,
          Category: F,
          Semigroup: w,
          Monoid: j,
          Group: k,
          Filterable: O,
          Functor: A,
          Bifunctor: S,
          Profunctor: x,
          Apply: R,
          Applicative: q,
          Chain: M,
          ChainRec: P,
          Monad: E,
          Alt: z,
          Plus: N,
          Alternative: C,
          Foldable: T,
          Traversable: B,
          Extend: D,
          Comonad: L,
          Contravariant: W,
          toString: V,
          equals: X,
          lt: Y,
          lte: H,
          gt(t, n) {
            return Y(n, t);
          },
          gte(t, n) {
            return H(n, t);
          },
          min(t, n) {
            return H(t, n) ? t : n;
          },
          max(t, n) {
            return H(t, n) ? n : t;
          },
          compose(t, n) {
            return b.methods.compose(n)(t);
          },
          id(t) {
            return F.methods.id(t)();
          },
          concat: K,
          empty: tt,
          invert(t) {
            return k.methods.invert(t)();
          },
          filter: nt,
          reject(t, n) {
            return nt((n) => !t(n), n);
          },
          map: et,
          bimap(t, n, e) {
            return S.methods.bimap(e)(t, n);
          },
          promap(t, n, e) {
            return x.methods.promap(e)(t, n);
          },
          ap: rt,
          lift2: ut,
          lift3(t, n, e, r) {
            return rt(rt(et(t, n), e), r);
          },
          apFirst(t, n) {
            return ut(e, t, n);
          },
          apSecond(t, n) {
            return ut(e(o), t, n);
          },
          of: ot,
          append(t, n) {
            return K(n, ot(n.constructor, t));
          },
          prepend(t, n) {
            return K(ot(n.constructor, t), n);
          },
          chain: it,
          join(t) {
            return it(o, t);
          },
          chainRec(t, n, e) {
            return P.methods.chainRec(t)(n, e);
          },
          alt(t, n) {
            return z.methods.alt(t)(n);
          },
          zero(t) {
            return N.methods.zero(t)();
          },
          reduce: at,
          size(t) {
            return Array.isArray(t)
              ? t.length
              : at(
                  (t, n) => t + 1,
                  0,
                  t
                );
          },
          elem(t, n) {
            return at(
              (n, e) => n || X(t, e),
              !1,
              n
            );
          },
          reverse(t) {
            if (Array.isArray(t)) return t.slice().reverse();
            const n = t.constructor;
            return at(
              (t, e) => K(ot(n, e), t),
              tt(n),
              t
            );
          },
          sort(t) {
            return ct(o, t);
          },
          sortBy: ct,
          takeWhile(t, n) {
            let e = !0;
            return nt((n) => (e = e && t(n)), n);
          },
          dropWhile(t, n) {
            let e = !1;
            return nt((n) => (e = e || !t(n)), n);
          },
          traverse: st,
          sequence(t, n) {
            return st(t, o, n);
          },
          extend: ft,
          duplicate(t) {
            return ft(o, t);
          },
          extract(t) {
            return L.methods.extract(t)();
          },
          contramap(t, n) {
            return W.methods.contramap(n)(t);
          },
        };
      })(At);
    }),
    xt = Ot((t) => {
      t.exports = (function() {
        let e = /\t/g,
          n = /\s*[^\s]/,
          r = /\n\r?/,
          t = /^ */;
        function u(t) {
          return n.test(t);
        }
        function o(n) {
          return n.match(t)[0].length;
        }
        function i(t) {
          return new Array(t + 1).join(' ');
        }
        function a(t, n) {
          let r = (function(t) {
              let n = t.filter(u).map(o),
                e = n.reduce(Math.min, 1 / 0),
                r =
                  n
                    .map((t) => t - e)
                    .find((t) => t > 1) || 2;
              return { depth: e, tabsize: r };
            })(t.slice(1)),
            a = new RegExp(i(r.tabsize), 'g');
          return t
            .map((t) => t
                .slice(Math.min(r.depth, o(t)))
                .replace(a, '\t')
                .replace(e, n))
            .join('\n');
        }
        return function t(n, u) {
          if (
            ((function(t) {
              if (typeof t !== 'number')
                throw new TypeError(
                  'inspectf expects its first argument to be a number'
                );
            })(n),
            arguments.length < 2)
          )
            return function(e) {
              return t(n, e);
            };
          if (
            ((function(t) {
              if (typeof t !== 'function')
                throw new TypeError(
                  'inspectf expects its second argument to be a function'
                );
            })(u),
            u.toString !== Function.prototype.toString)
          )
            return u.toString();
          let o = i(n),
            c = (function(t, n) {
              return t.toString().replace(e, n);
            })(u, o),
            s = c.split(r);
          return s.length < 2 ? c : a(s, o);
        };
      })();
    }),
    Rt = Ot((t) => {
      t.exports = (function() {
        let t = '@@type',
          n = new RegExp('^([\\s\\S]+)/([\\s\\S]+?)(?:@([0-9]+))?$');
        function e(n) {
          return n != null &&
            n.constructor != null &&
            n.constructor.prototype !== n &&
            typeof n.constructor[t] === 'string'
            ? n.constructor[t]
            : Object.prototype.toString
                .call(n)
                .slice('[object '.length, -']'.length);
        }
        return (
          (e.parse = function(t) {
            const e = n.exec(t);
            return {
              namespace: e == null || e[1] == null ? null : e[1],
              name: e == null ? t : e[2],
              version: e == null || e[3] == null ? 0 : Number(e[3]),
            };
          }),
          e
        );
      })();
    }),
    qt = Ot((t) => {
      t.exports = (function(t, n) {
        let e = '@@type',
          r = ['first', 'second', 'third', 'fourth', 'fifth'];
        function u(t) {
          return typeof t === 'function';
        }
        function o(t) {
          return t.length >= 2;
        }
        function i(n, e, u, o) {
          throw new TypeError(
            `${n 
              } expects its ${ 
              r[e] 
              } argument to ${ 
              u 
              }\n  Actual: ${ 
              t.toString(o)}`
          );
        }
        function a(n, e, r) {
          throw new TypeError(
            `${n 
              } was invoked outside the context of a ${ 
              r 
              }. \n  Called on: ${ 
              t.toString(e)}`
          );
        }
        return function(r, c, s, f) {
          let h,
            p,
            l = (function(t) {
              return t[e] || t.name || 'Anonymous';
            })(r),
            y = ((h = l),
            `${(p = n.parse(h)).namespace || 'concurrify' 
              }/Concurrent${ 
              p.name 
              }@${ 
              p.version}`),
            _ = n.parse(l).name,
            d = n.parse(y).name;
          function v(t) {
            this.sequential = t;
          }
          function m(t) {
            return (
              t instanceof r ||
              (Boolean(t) && t.constructor === r) ||
              n(t) === r[e]
            );
          }
          function g(t) {
            return (
              t instanceof v ||
              (Boolean(t) && t.constructor === v) ||
              n(t) === y
            );
          }
          function b(t) {
            return m(t) || i(d, 0, `be of type "${  _  }"`, t), new v(t);
          }
          (function(n) {
            try {
              return t.Applicative.test(t.of(n));
            } catch (t) {
              return !1;
            }
          })(r) || i('concurrify', 0, 'represent an Applicative', r),
            m(c) || i('concurrify', 1, `be of type "${  _  }"`, c),
            u(s) || i('concurrify', 2, 'be a function', s),
            o(s) || i('concurrify', 2, 'be binary', s),
            u(f) || i('concurrify', 3, 'be a function', f),
            o(f) || i('concurrify', 3, 'be binary', f);
          const F = (v.prototype = b.prototype = { constructor: b });
          b[e] = y;
          const w = new v(c);
          return (
            (b['fantasy-land/zero'] = function() {
              return w;
            }),
            (b['fantasy-land/of'] = function(n) {
              return new v(t.of(r, n));
            }),
            (F['fantasy-land/map'] = function(n) {
              return (
                g(this) || a(`${d  }#map`, this, d),
                u(n) || i(`${d  }#map`, 0, 'be a function', n),
                new v(t.map(n, this.sequential))
              );
            }),
            (F['fantasy-land/ap'] = function(t) {
              return (
                g(this) || a(`${d  }#ap`, this, d),
                g(t) || i(`${d  }#ap`, 0, `be a ${  d}`, t),
                new v(f(this.sequential, t.sequential))
              );
            }),
            (F['fantasy-land/alt'] = function(t) {
              return (
                g(this) || a(`${d  }#alt`, this, d),
                g(t) || i(`${d  }#alt`, 0, `be a ${  d}`, t),
                new v(s(this.sequential, t.sequential))
              );
            }),
            (F.toString = function() {
              return (
                g(this) || a(`${d  }#toString`, this, d),
                `${d  }(${  t.toString(this.sequential)  })`
              );
            }),
            b
          );
        };
      })(St, Rt);
    });
  function Mt(t) {
    (this._list = new Array(4)),
      (this._capacityMask = 3),
      (this._head = 0),
      (this._tail = 0),
      Array.isArray(t) && this._fromArray(t);
  }
  (Mt.prototype.peekAt = function(t) {
    let n = t;
    if (n === (0 | n)) {
      const e = this.size();
      if (!(n >= e || n < -e))
        return (
          n < 0 && (n += e),
          (n = (this._head + n) & this._capacityMask),
          this._list[n]
        );
    }
  }),
    (Mt.prototype.get = function(t) {
      return this.peekAt(t);
    }),
    (Mt.prototype.peek = function() {
      if (this._head !== this._tail) return this._list[this._head];
    }),
    (Mt.prototype.peekFront = function() {
      return this.peek();
    }),
    (Mt.prototype.peekBack = function() {
      return this.peekAt(-1);
    }),
    Object.defineProperty(Mt.prototype, 'length', {
      get() {
        return this.size();
      },
    }),
    (Mt.prototype.size = function() {
      return this._head === this._tail
        ? 0
        : this._head < this._tail
          ? this._tail - this._head
          : this._capacityMask + 1 - (this._head - this._tail);
    }),
    (Mt.prototype.unshift = function(t) {
      if (void 0 === t) return this.length;
      const n = this._list.length;
      return (
        (this._head = (this._head - 1 + n) & this._capacityMask),
        (this._list[this._head] = t),
        this._tail === this._head && this._growArray(),
        this._head < this._tail
          ? this._tail - this._head
          : this._capacityMask + 1 - (this._head - this._tail)
      );
    }),
    (Mt.prototype.shift = function() {
      const t = this._head;
      if (t !== this._tail) {
        const n = this._list[t];
        return (
          (this._list[t] = void 0),
          (this._head = (t + 1) & this._capacityMask),
          t < 2 &&
            this._tail > 1e4 &&
            this._tail <= this._list.length >>> 2 &&
            this._shrinkArray(),
          n
        );
      }
    }),
    (Mt.prototype.push = function(t) {
      if (void 0 === t) return this.length;
      const n = this._tail;
      return (
        (this._list[n] = t),
        (this._tail = (n + 1) & this._capacityMask),
        this._tail === this._head && this._growArray(),
        this._head < this._tail
          ? this._tail - this._head
          : this._capacityMask + 1 - (this._head - this._tail)
      );
    }),
    (Mt.prototype.pop = function() {
      const t = this._tail;
      if (t !== this._head) {
        const n = this._list.length;
        this._tail = (t - 1 + n) & this._capacityMask;
        const e = this._list[this._tail];
        return (
          (this._list[this._tail] = void 0),
          this._head < 2 && t > 1e4 && t <= n >>> 2 && this._shrinkArray(),
          e
        );
      }
    }),
    (Mt.prototype.removeOne = function(t) {
      let n = t;
      if (n === (0 | n) && this._head !== this._tail) {
        let e = this.size(),
          r = this._list.length;
        if (!(n >= e || n < -e)) {
          n < 0 && (n += e), (n = (this._head + n) & this._capacityMask);
          let u,
            o = this._list[n];
          if (t < e / 2) {
            for (u = t; u > 0; u--)
              this._list[n] = this._list[
                (n = (n - 1 + r) & this._capacityMask)
              ];
            (this._list[n] = void 0),
              (this._head = (this._head + 1 + r) & this._capacityMask);
          } else {
            for (u = e - 1 - t; u > 0; u--)
              this._list[n] = this._list[
                (n = (n + 1 + r) & this._capacityMask)
              ];
            (this._list[n] = void 0),
              (this._tail = (this._tail - 1 + r) & this._capacityMask);
          }
          return o;
        }
      }
    }),
    (Mt.prototype.remove = function(t, n) {
      let e,
        r = t,
        u = n;
      if (r === (0 | r) && this._head !== this._tail) {
        let o = this.size(),
          i = this._list.length;
        if (!(r >= o || r < -o || n < 1)) {
          if ((r < 0 && (r += o), n === 1 || !n))
            return ((e = new Array(1))[0] = this.removeOne(r)), e;
          if (r === 0 && r + n >= o)
            return (e = this.toArray()), this.clear(), e;
          let a;
          for (r + n > o && (n = o - r), e = new Array(n), a = 0; a < n; a++)
            e[a] = this._list[(this._head + r + a) & this._capacityMask];
          if (((r = (this._head + r) & this._capacityMask), t + n === o)) {
            for (
              this._tail = (this._tail - n + i) & this._capacityMask, a = n;
              a > 0;
              a--
            )
              this._list[(r = (r + 1 + i) & this._capacityMask)] = void 0;
            return e;
          }
          if (t === 0) {
            for (
              this._head = (this._head + n + i) & this._capacityMask, a = n - 1;
              a > 0;
              a--
            )
              this._list[(r = (r + 1 + i) & this._capacityMask)] = void 0;
            return e;
          }
          if (t < o / 2) {
            for (
              this._head = (this._head + t + n + i) & this._capacityMask, a = t;
              a > 0;
              a--
            )
              this.unshift(this._list[(r = (r - 1 + i) & this._capacityMask)]);
            for (r = (this._head - 1 + i) & this._capacityMask; u > 0; )
              (this._list[(r = (r - 1 + i) & this._capacityMask)] = void 0),
                u--;
          } else {
            for (
              this._tail = r,
                r = (r + n + i) & this._capacityMask,
                a = o - (n + t);
              a > 0;
              a--
            )
              this.push(this._list[r++]);
            for (r = this._tail; u > 0; )
              (this._list[(r = (r + 1 + i) & this._capacityMask)] = void 0),
                u--;
          }
          return (
            this._head < 2 &&
              this._tail > 1e4 &&
              this._tail <= i >>> 2 &&
              this._shrinkArray(),
            e
          );
        }
      }
    }),
    (Mt.prototype.splice = function(t, n) {
      let e = t,
        r = this.size();
      if (
        e === (0 | e) &&
        this._head !== this._tail &&
        !(e > r || e < -r || (e === r && n != 0))
      ) {
        if ((e < 0 && (e += r), arguments.length > 2)) {
          let u,
            o,
            i,
            a = arguments.length,
            c = this._list.length,
            s = 2;
          if (e < r / 2) {
            for (o = new Array(e), u = 0; u < e; u++)
              o[u] = this._list[(this._head + u) & this._capacityMask];
            for (
              n === 0
                ? ((i = []),
                  e > 0 &&
                    (this._head = (this._head + e + c) & this._capacityMask))
                : ((i = this.remove(e, n)),
                  (this._head = (this._head + e + c) & this._capacityMask));
              a > s;

            )
              this.unshift(arguments[--a]);
            for (u = e; u > 0; u--) this.unshift(o[u - 1]);
          } else {
            const f = (o = new Array(r - (e + n))).length;
            for (u = 0; u < f; u++)
              o[u] = this._list[(this._head + e + n + u) & this._capacityMask];
            for (
              n === 0
                ? ((i = []),
                  e != r &&
                    (this._tail = (this._head + e + c) & this._capacityMask))
                : ((i = this.remove(e, n)),
                  (this._tail = (this._tail - f + c) & this._capacityMask));
              s < a;

            )
              this.push(arguments[s++]);
            for (u = 0; u < f; u++) this.push(o[u]);
          }
          return i;
        }
        return this.remove(e, n);
      }
    }),
    (Mt.prototype.clear = function() {
      (this._head = 0), (this._tail = 0);
    }),
    (Mt.prototype.isEmpty = function() {
      return this._head === this._tail;
    }),
    (Mt.prototype.toArray = function() {
      return this._copyArray(!1);
    }),
    (Mt.prototype._fromArray = function(t) {
      for (let n = 0; n < t.length; n++) this.push(t[n]);
    }),
    (Mt.prototype._copyArray = function(t) {
      let n,
        e = [],
        r = this._list,
        u = r.length;
      if (t || this._head > this._tail) {
        for (n = this._head; n < u; n++) e.push(r[n]);
        for (n = 0; n < this._tail; n++) e.push(r[n]);
      } else for (n = this._head; n < this._tail; n++) e.push(r[n]);
      return e;
    }),
    (Mt.prototype._growArray = function() {
      this._head && ((this._list = this._copyArray(!0)), (this._head = 0)),
        (this._tail = this._list.length),
        (this._list.length *= 2),
        (this._capacityMask = (this._capacityMask << 1) | 1);
    }),
    (Mt.prototype._shrinkArray = function() {
      (this._list.length >>>= 1), (this._capacityMask >>>= 1);
    });
  let Pt = Mt,
    Et = Ot((t, n) => {
      t.exports = (function(t, n, e, r, u) {
        (t = t && t.hasOwnProperty('default') ? t.default : t),
          (n = n && n.hasOwnProperty('default') ? n.default : n),
          (e = e && e.hasOwnProperty('default') ? e.default : e),
          (r = r && r.hasOwnProperty('default') ? r.default : r),
          (u = u && u.hasOwnProperty('default') ? u.default : u);
        const o =
            typeof self === 'object'
              ? self
              : typeof kt === 'object'
                ? kt
                : typeof window === 'object' ? window : {},
          i =
            typeof o.setImmediate === 'function'
              ? o.setImmediate
              : function(t, n) {
                  return setTimeout(t, 0, n);
                };
        function a() {}
        function c() {
          return this;
        }
        const s = t.toString;
        function f(t) {
          return (
            (e = '  '),
            n(2, t)
              .replace(/^/gm, e)
              .replace(e, '')
          );
          let e;
        }
        function h(t, n) {
          return function(e, r, u) {
            switch (arguments.length) {
              case 1:
                return t(n, e);
              case 2:
                return t(n, e, r);
              default:
                return t(n, e, r, u);
            }
          };
        }
        function p(t, n, e) {
          return function(r, u) {
            return arguments.length === 1 ? t(n, e, r) : t(n, e, r, u);
          };
        }
        function l(t, n, e, r) {
          return function(u) {
            return t(n, e, r, u);
          };
        }
        function y(t) {
          return function(n) {
            return i(t, n);
          };
        }
        let _ = {
            map: 'fantasy-land/map',
            bimap: 'fantasy-land/bimap',
            chain: 'fantasy-land/chain',
            chainRec: 'fantasy-land/chainRec',
            ap: 'fantasy-land/ap',
            of: 'fantasy-land/of',
            zero: 'fantasy-land/zero',
          },
          d = ['first', 'second', 'third', 'fourth', 'fifth'],
          v = 'fluture',
          m = 'Future',
          g = 3,
          b = `${v  }/${  m  }@${  g}`;
        function F(t) {
          throw new Error(t);
        }
        function w(t) {
          throw new TypeError(t);
        }
        function j(t, n, e, r) {
          w(
            `${t 
              } expects its ${ 
              d[n] 
              } argument to ${ 
              e 
              }\n  Actual: ${ 
              s(r)}`
          );
        }
        function k(t, n) {
          w(
            `${t 
              } was invoked outside the context of a Future. You might want to use a dispatcher instead\n  Called on: ${ 
              s(n)}`
          );
        }
        function O(t, n, r, u) {
          let o,
            i = e.parse(e(r)),
            a =
              i.name === m
                ? `\n${ 
                  i.namespace !== v
                    ? ((o = i.namespace),
                      `The Future was not created by ${ 
                        v 
                        }. Make sure you transform other Futures to ${ 
                        v 
                        } Futures. Got ${ 
                        o ? `a Future from ${  o}` : 'an unscoped Future' 
                        }.\n  See: https://github.com/fluture-js/Fluture#casting-futures`)
                    : i.version !== g
                      ? (function(t, n) {
                          return (
                            `The Future was created by ${ 
                            n < g ? 'an older' : 'a newer' 
                            } version of ${ 
                            v 
                            }. This means that one of the sources which creates Futures is outdated. Update this source, or transform its created Futures to be compatible.\n  See: https://github.com/fluture-js/Fluture#casting-futures`
                          );
                        })(0, i.version)
                      : 'Nothing seems wrong. Contact the Fluture maintainers.'}`
                : '';
          w(
            `${t 
              } expects ${ 
              d[n] ? `its ${  d[n]  } argument to be a valid Future` : n 
              }.${ 
              a 
              }\n  Actual: ${ 
              s(r) 
              } :: ${ 
              i.name 
              }${u || ''}`
          );
        }
        function A(t) {
          return typeof t === 'function';
        }
        function S(t) {
          return t instanceof Promise || (Boolean(t) && A(t.then));
        }
        function x(t) {
          return t === 1 / 0 || (typeof t === 'number' && t > 0 && t % 1 == 0);
        }
        function R(t) {
          return t !== null && typeof t === 'object';
        }
        const q = { isEmpty: !0, size: 0, head: null, tail: null };
        function M(t) {
          F(
            `Future#value was called on a rejected Future\n  Actual: Future.reject(${ 
              s(t) 
              })`
          );
        }
        function P(t) {
          return A(t) || j('Future', 0, 'be a Function', t), new N(t);
        }
        function E(t) {
          return t instanceof P || e(t) === b;
        }
        (P['@@type'] = b),
          (P.prototype[_.ap] = function(t) {
            return t._ap(this);
          }),
          (P.prototype[_.map] = function(t) {
            return this._map(t);
          }),
          (P.prototype[_.bimap] = function(t, n) {
            return this._bimap(t, n);
          }),
          (P.prototype[_.chain] = function(t) {
            return this._chain(t);
          }),
          (P.prototype.ap = function(t) {
            return (
              E(this) || k('Future#ap', this),
              E(t) || O('Future#ap', 0, t),
              this._ap(t)
            );
          }),
          (P.prototype.map = function(t) {
            return (
              E(this) || k('Future#map', this),
              A(t) || j('Future#map', 0, 'to be a Function', t),
              this._map(t)
            );
          }),
          (P.prototype.bimap = function(t, n) {
            return (
              E(this) || k('Future#bimap', this),
              A(t) || j('Future#bimap', 0, 'to be a Function', t),
              A(n) || j('Future#bimap', 1, 'to be a Function', n),
              this._bimap(t, n)
            );
          }),
          (P.prototype.chain = function(t) {
            return (
              E(this) || k('Future#chain', this),
              A(t) || j('Future#chain', 0, 'to be a Function', t),
              this._chain(t)
            );
          }),
          (P.prototype.mapRej = function(t) {
            return (
              E(this) || k('Future#mapRej', this),
              A(t) || j('Future#mapRej', 0, 'to be a Function', t),
              this._mapRej(t)
            );
          }),
          (P.prototype.chainRej = function(t) {
            return (
              E(this) || k('Future#chainRej', this),
              A(t) || j('Future#chainRej', 0, 'to be a Function', t),
              this._chainRej(t)
            );
          }),
          (P.prototype.race = function(t) {
            return (
              E(this) || k('Future#race', this),
              E(t) || O('Future#race', 0, t),
              this._race(t)
            );
          }),
          (P.prototype.both = function(t) {
            return (
              E(this) || k('Future#both', this),
              E(t) || O('Future#both', 0, t),
              this._both(t)
            );
          }),
          (P.prototype.and = function(t) {
            return (
              E(this) || k('Future#and', this),
              E(t) || O('Future#and', 0, t),
              this._and(t)
            );
          }),
          (P.prototype.or = function(t) {
            return (
              E(this) || k('Future#or', this),
              E(t) || O('Future#or', 0, t),
              this._or(t)
            );
          }),
          (P.prototype.swap = function() {
            return E(this) || k('Future#ap', this), this._swap();
          }),
          (P.prototype.fold = function(t, n) {
            return (
              E(this) || k('Future#ap', this),
              A(t) || j('Future#fold', 0, 'to be a Function', t),
              A(n) || j('Future#fold', 1, 'to be a Function', n),
              this._fold(t, n)
            );
          }),
          (P.prototype.finally = function(t) {
            return (
              E(this) || k('Future#finally', this),
              E(t) || O('Future#finally', 0, t),
              this._finally(t)
            );
          }),
          (P.prototype.lastly = function(t) {
            return (
              E(this) || k('Future#lastly', this),
              E(t) || O('Future#lastly', 0, t),
              this._finally(t)
            );
          }),
          (P.prototype.fork = function(t, n) {
            return (
              E(this) || k('Future#fork', this),
              A(t) || j('Future#fork', 0, 'to be a Function', t),
              A(n) || j('Future#fork', 0, 'to be a Function', n),
              this._fork(t, n)
            );
          }),
          (P.prototype.value = function(t) {
            return (
              E(this) || k('Future#value', this),
              A(t) || j('Future#value', 0, 'to be a Function', t),
              this._fork(M, t)
            );
          }),
          (P.prototype.done = function(t) {
            return (
              E(this) || k('Future#done', this),
              A(t) || j('Future#done', 0, 'to be a Function', t),
              this._fork(
                (n) => {
                  t(n);
                },
                (n) => {
                  t(null, n);
                }
              )
            );
          }),
          (P.prototype.promise = function() {
            const t = this;
            return new Promise(((n, e) => {
              t._fork(e, n);
            }));
          }),
          (P.prototype.isRejected = function() {
            return !1;
          }),
          (P.prototype.isResolved = function() {
            return !1;
          }),
          (P.prototype.isSettled = function() {
            return this.isRejected() || this.isResolved();
          }),
          (P.prototype.extractLeft = function() {
            return [];
          }),
          (P.prototype.extractRight = function() {
            return [];
          });
        const z = Object.create(P.prototype);
        function N(t) {
          this._computation = t;
        }
        function C(t) {
          this._value = t;
        }
        function T(t) {
          return new C(t);
        }
        function B(t) {
          this._value = t;
        }
        function D(t) {
          return new B(t);
        }
        function L() {
          this._isNever = !0;
        }
        (z._ap = function(t) {
          return new it(this)._ap(t);
        }),
          (z._map = function(t) {
            return new it(this)._map(t);
          }),
          (z._bimap = function(t, n) {
            return new it(this)._bimap(t, n);
          }),
          (z._chain = function(t) {
            return new it(this)._chain(t);
          }),
          (z._mapRej = function(t) {
            return new it(this)._mapRej(t);
          }),
          (z._chainRej = function(t) {
            return new it(this)._chainRej(t);
          }),
          (z._race = function(t) {
            return new it(this)._race(t);
          }),
          (z._both = function(t) {
            return new it(this)._both(t);
          }),
          (z._and = function(t) {
            return new it(this)._and(t);
          }),
          (z._or = function(t) {
            return new it(this)._or(t);
          }),
          (z._swap = function() {
            return new it(this)._swap();
          }),
          (z._fold = function(t, n) {
            return new it(this)._fold(t, n);
          }),
          (z._finally = function(t) {
            return new it(this)._finally(t);
          }),
          (N.prototype = Object.create(z)),
          (N.prototype._fork = function(t, n) {
            let e = !0,
              r = this._computation(
                (n) => {
                  e && ((e = !1), t(n));
                },
                (t) => {
                  e && ((e = !1), n(t));
                }
              );
            return (
              (function(t, n) {
                void 0 === t ||
                  (A(t) && t.length === 0) ||
                  w(
                    `Future expected its computation to return a nullary function or void\n  Actual: ${ 
                      s(t) 
                      }\n  From calling: ${ 
                      f(n)}`
                  );
              })(r, this._computation),
              function() {
                e && r && r(), (e = !1);
              }
            );
          }),
          (N.prototype.toString = function() {
            return `Future(${  f(this._computation)  })`;
          }),
          (C.prototype = Object.create(z)),
          (C.prototype._ap = c),
          (C.prototype._map = c),
          (C.prototype._chain = c),
          (C.prototype._race = c),
          (C.prototype._both = c),
          (C.prototype._and = c),
          (C.prototype._or = function(t) {
            return t;
          }),
          (C.prototype._finally = function(t) {
            return t._and(this);
          }),
          (C.prototype._swap = function() {
            return new B(this._value);
          }),
          (C.prototype._fork = function(t) {
            return t(this._value), a;
          }),
          (C.prototype.isRejected = function() {
            return !0;
          }),
          (C.prototype.extractLeft = function() {
            return [this._value];
          }),
          (C.prototype.toString = function() {
            return `Future.reject(${  s(this._value)  })`;
          }),
          (B.prototype = Object.create(z)),
          (B.prototype._race = c),
          (B.prototype._mapRej = c),
          (B.prototype._or = c),
          (B.prototype._and = function(t) {
            return t;
          }),
          (B.prototype._both = function(t) {
            const n = this._value;
            return t._map((t) => [n, t]);
          }),
          (B.prototype._swap = function() {
            return new C(this._value);
          }),
          (B.prototype._finally = function(t) {
            const n = this._value;
            return t._map(() => n);
          }),
          (B.prototype._fork = function(t, n) {
            return n(this._value), a;
          }),
          (B.prototype.isResolved = function() {
            return !0;
          }),
          (B.prototype.extractRight = function() {
            return [this._value];
          }),
          (B.prototype.toString = function() {
            return `Future.of(${  s(this._value)  })`;
          }),
          (L.prototype = Object.create(P.prototype)),
          (L.prototype._ap = c),
          (L.prototype._map = c),
          (L.prototype._bimap = c),
          (L.prototype._chain = c),
          (L.prototype._mapRej = c),
          (L.prototype._chainRej = c),
          (L.prototype._both = c),
          (L.prototype._or = c),
          (L.prototype._swap = c),
          (L.prototype._fold = c),
          (L.prototype._finally = c),
          (L.prototype._race = function(t) {
            return t;
          }),
          (L.prototype._fork = function() {
            return a;
          }),
          (L.prototype.toString = function() {
            return 'Future.never';
          });
        const W = new L();
        function I(t) {
          return E(t) && !0 === t._isNever;
        }
        function U(t) {
          const n = this;
          (n.rej = a),
            (n.res = a),
            (n.rejected = !1),
            (n.resolved = !1),
            (n.value = null),
            (n.cancel = t._fork(
              (t) => {
                (n.value = t), (n.rejected = !0), (n.cancel = a), n.rej(t);
              },
              (t) => {
                (n.value = t), (n.resolved = !0), (n.cancel = a), n.res(t);
              }
            ));
        }
        (U.prototype = Object.create(z)),
          (U.prototype._fork = function(t, n) {
            return (
              this.rejected
                ? t(this.value)
                : this.resolved
                  ? n(this.value)
                  : ((this.rej = t), (this.res = n)),
              this.cancel
            );
          });
        const Q = {
          rejected(t) {
            return this.cancel(), new C(t);
          },
          resolved(t) {
            return this.cancel(), new B(t);
          },
          run() {
            return this;
          },
          cancel() {},
        };
        function G(t) {
          this.other = t;
        }
        function Z(t) {
          this.mapper = t;
        }
        function $(t, n) {
          (this.lmapper = t), (this.rmapper = n);
        }
        function J(t) {
          this.mapper = t;
        }
        function V(t) {
          this.mapper = t;
        }
        function X(t) {
          this.mapper = t;
        }
        function Y() {}
        function H(t, n) {
          (this.lmapper = t), (this.rmapper = n);
        }
        function K(t) {
          this.other = t;
        }
        function tt(t) {
          this.other = t;
        }
        function nt(t) {
          this.other = t;
        }
        function et(t) {
          this.other = t;
        }
        function rt(t) {
          this.other = t;
        }
        function ut(t, n) {
          const e = this;
          (e.other = n),
            (e.cancel = n._fork(
              (n) => {
                t(new C(n), e);
              },
              (n) => {
                t(new B(n), e);
              }
            ));
        }
        function ot(t, n) {
          const e = this;
          (e.other = n),
            (e.cancel = n._fork((n) => {
              t(new C(n), e);
            }, a));
        }
        function it(t, n) {
          (this._spawn = t), (this._actions = n || q);
        }
        function at(t) {
          return { done: !1, value: t };
        }
        function ct(t) {
          return { done: !0, value: t };
        }
        (G.prototype = Object.create(Q)),
          (G.prototype.resolved = function(t) {
            return (
              (function(t) {
                A(t) ||
                  w(
                    `Future#ap expects its first argument to be a Future of a Function\n  Actual: Future.of(${ 
                      s(t) 
                      })`
                  );
              })(t),
              this.other._map((n) => t(n))
            );
          }),
          (G.prototype.toString = function() {
            return `ap(${  this.other.toString()  })`;
          }),
          (Z.prototype = Object.create(Q)),
          (Z.prototype.resolved = function(t) {
            return new B(this.mapper(t));
          }),
          (Z.prototype.toString = function() {
            return `map(${  f(this.mapper)  })`;
          }),
          ($.prototype = Object.create(Q)),
          ($.prototype.rejected = function(t) {
            return new C(this.lmapper(t));
          }),
          ($.prototype.resolved = function(t) {
            return new B(this.rmapper(t));
          }),
          ($.prototype.toString = function() {
            return `bimap(${  f(this.lmapper)  }, ${  f(this.rmapper)  })`;
          }),
          (J.prototype = Object.create(Q)),
          (J.prototype.resolved = function(t) {
            return (function(t, n, e) {
              return E(t)
                ? t
                : O(
                    'Future#chain',
                    "the function it's given to return a Future",
                    t,
                    `\n  From calling: ${  f(n)  }\n  With: ${  s(e)}`
                  );
            })(this.mapper(t), this.mapper, t);
          }),
          (J.prototype.toString = function() {
            return `chain(${  f(this.mapper)  })`;
          }),
          (V.prototype = Object.create(Q)),
          (V.prototype.rejected = function(t) {
            return new C(this.mapper(t));
          }),
          (V.prototype.toString = function() {
            return `mapRej(${  f(this.mapper)  })`;
          }),
          (X.prototype = Object.create(Q)),
          (X.prototype.rejected = function(t) {
            return (function(t, n, e) {
              return E(t)
                ? t
                : O(
                    'Future#chainRej',
                    "the function it's given to return a Future",
                    t,
                    `\n  From calling: ${  f(n)  }\n  With: ${  s(e)}`
                  );
            })(this.mapper(t), this.mapper, t);
          }),
          (X.prototype.toString = function() {
            return `chainRej(${  f(this.mapper)  })`;
          }),
          (Y.prototype = Object.create(Q)),
          (Y.prototype.rejected = function(t) {
            return new B(t);
          }),
          (Y.prototype.resolved = function(t) {
            return new C(t);
          }),
          (Y.prototype.toString = function() {
            return 'swap()';
          }),
          (H.prototype = Object.create(Q)),
          (H.prototype.rejected = function(t) {
            return new B(this.lmapper(t));
          }),
          (H.prototype.resolved = function(t) {
            return new B(this.rmapper(t));
          }),
          (H.prototype.toString = function() {
            return `fold(${  f(this.lmapper)  }, ${  f(this.rmapper)  })`;
          }),
          (K.prototype = Object.create(Q)),
          (K.prototype.rejected = function(t) {
            return this.other._and(new C(t));
          }),
          (K.prototype.resolved = function(t) {
            return this.other._map(() => t);
          }),
          (K.prototype.cancel = function() {
            this.other._fork(a, a)();
          }),
          (K.prototype.toString = function() {
            return `finally(${  this.other.toString()  })`;
          }),
          (tt.prototype = Object.create(Q)),
          (tt.prototype.resolved = function() {
            return this.other;
          }),
          (tt.prototype.toString = function() {
            return `and(${  this.other.toString()  })`;
          }),
          (nt.prototype = Object.create(Q)),
          (nt.prototype.rejected = function() {
            return this.other;
          }),
          (nt.prototype.toString = function() {
            return `or(${  this.other.toString()  })`;
          }),
          (et.prototype = Object.create(Q)),
          (et.prototype.run = function(t) {
            return new ut(t, new U(this.other));
          }),
          (et.prototype.toString = function() {
            return `race(${  this.other.toString()  })`;
          }),
          (rt.prototype = Object.create(Q)),
          (rt.prototype.resolved = function(t) {
            return this.other._map((n) => [t, n]);
          }),
          (rt.prototype.run = function(t) {
            return new ot(t, new U(this.other));
          }),
          (rt.prototype.toString = function() {
            return `both(${  this.other.toString()  })`;
          }),
          (ut.prototype = Object.create(et.prototype)),
          (ot.prototype = Object.create(rt.prototype)),
          (it.prototype = Object.create(P.prototype)),
          (it.prototype._transform = function(t) {
            return new it(
              this._spawn,
              ((n = t),
              {
                isEmpty: !1,
                size: (e = this._actions).size + 1,
                head: n,
                tail: e,
              })
            );
            let e, n;
          }),
          (it.prototype._ap = function(t) {
            return this._transform(new G(t));
          }),
          (it.prototype._map = function(t) {
            return this._transform(new Z(t));
          }),
          (it.prototype._bimap = function(t, n) {
            return this._transform(new $(t, n));
          }),
          (it.prototype._chain = function(t) {
            return this._transform(new J(t));
          }),
          (it.prototype._mapRej = function(t) {
            return this._transform(new V(t));
          }),
          (it.prototype._chainRej = function(t) {
            return this._transform(new X(t));
          }),
          (it.prototype._race = function(t) {
            return I(t) ? this : this._transform(new et(t));
          }),
          (it.prototype._both = function(t) {
            return this._transform(new rt(t));
          }),
          (it.prototype._and = function(t) {
            return this._transform(new tt(t));
          }),
          (it.prototype._or = function(t) {
            return this._transform(new nt(t));
          }),
          (it.prototype._swap = function() {
            return this._transform(new Y());
          }),
          (it.prototype._fold = function(t, n) {
            return this._transform(new H(t, n));
          }),
          (it.prototype._finally = function(t) {
            return this._transform(new K(t));
          }),
          (it.prototype._fork = function(t, n) {
            let e,
              r,
              o,
              i,
              c = new u(this._actions.size),
              s = new u(this._actions.size),
              f = a,
              h = !0;
            function p(u) {
              if (((o = !0), (e = u)._spawn)) {
                for (let i = e._actions; !i.isEmpty; )
                  c.unshift(i.head), (i = i.tail);
                e = e._spawn;
              }
              h &&
                (function() {
                  for (h = !1; ; ) {
                    if (((o = !1), (r = c.shift())))
                      (f = e._fork(l, y)), o || d();
                    else {
                      if (!(r = s.shift())) break;
                      f = e._fork(l, y);
                    }
                    if (!o) return void (h = !0);
                  }
                  f = e._fork(t, n);
                })();
            }
            function l(t) {
              p(r.rejected(t));
            }
            function y(t) {
              p(r.resolved(t));
            }
            function _(t, n) {
              if ((f(), c.clear(), h && r !== n))
                for (r.cancel(); (i = s.shift()) && i !== n; ) i.cancel();
              p(t);
            }
            function d() {
              for (; (i = c.pop()); ) {
                if (((i = i.run(_)), o)) return;
                s.unshift(i);
              }
              r = r.run(_);
            }
            return (
              p(this),
              function() {
                for (f(), r && r.cancel(); (i = s.shift()); ) i.cancel();
              }
            );
          }),
          (it.prototype.toString = function() {
            for (var t = '', n = this._actions; !n.isEmpty; )
              (t = `.${  n.head.toString()  }${t}`), (n = n.tail);
            return this._spawn.toString() + t;
          });
        let ft = 1,
          ht = 2,
          st = 0;
        function pt(t, n) {
          (this._step = t), (this._init = n);
        }
        function lt(n, e) {
          return (
            t.Apply.test(e) || j('Future.ap', 1, 'be an Apply', e), t.ap(n, e)
          );
        }
        function yt(n, e) {
          return (
            t.Apply.test(n) || j('Future.ap', 0, 'be an Apply', n),
            arguments.length === 1 ? h(lt, n) : lt(n, e)
          );
        }
        function _t(n, e) {
          return t.Alt.test(e) || j('alt', 1, 'be an Alt', e), t.alt(n, e);
        }
        function dt(n, e) {
          return (
            t.Alt.test(n) || j('alt', 0, 'be an Alt', n),
            arguments.length === 1 ? h(_t, n) : _t(n, e)
          );
        }
        function vt(n, e) {
          return (
            t.Functor.test(e) || j('Future.map', 1, 'be a Functor', e),
            t.map(n, e)
          );
        }
        function mt(t, n) {
          return (
            A(t) || j('Future.map', 0, 'be a Function', t),
            arguments.length === 1 ? h(vt, t) : vt(t, n)
          );
        }
        function gt(n, e, r) {
          return (
            t.Bifunctor.test(r) || j('Future.bimap', 2, 'be a Bifunctor', r),
            t.bimap(n, e, r)
          );
        }
        function bt(t, n, e) {
          return (
            A(n) || j('Future.bimap', 1, 'be a Function', n),
            arguments.length === 2 ? p(gt, t, n) : gt(t, n, e)
          );
        }
        function Ft(t, n, e) {
          return (
            A(t) || j('Future.bimap', 0, 'be a Function', t),
            arguments.length === 1
              ? h(bt, t)
              : arguments.length === 2 ? bt(t, n) : bt(t, n, e)
          );
        }
        function wt(n, e) {
          return (
            t.Chain.test(e) || j('Future.chain', 1, 'be a Chain', e),
            t.chain(n, e)
          );
        }
        function jt(t, n) {
          return (
            A(t) || j('Future.chain', 0, 'be a Function', t),
            arguments.length === 1 ? h(wt, t) : wt(t, n)
          );
        }
        function Ot(t, n) {
          return E(n) || O('Future.mapRej', 1, n), n.mapRej(t);
        }
        function At(t, n) {
          return E(n) || O('Future.chainRej', 1, n), n.chainRej(t);
        }
        function St(t, n) {
          return E(n) || O('Future.finally', 1, n), n.finally(t);
        }
        function xt(t, n) {
          return (
            E(t) || O('Future.finally', 0, t),
            arguments.length === 1 ? h(St, t) : St(t, n)
          );
        }
        function Rt(t, n) {
          return E(n) || O('Future.and', 1, n), t.and(n);
        }
        function qt(t, n) {
          return E(n) || O('Future.both', 1, n), t.both(n);
        }
        function Mt(t, n) {
          return E(n) || O('Future.or', 1, n), t.or(n);
        }
        function Pt(t, n) {
          return E(n) || O('Future.race', 1, n), n.race(t);
        }
        function Et(t, n) {
          return (
            E(t) || O('Future.race', 0, t),
            arguments.length === 1 ? h(Pt, t) : Pt(t, n)
          );
        }
        function zt(t, n, e) {
          return E(e) || O('Future.fold', 2, e), e.fold(t, n);
        }
        function Nt(t, n, e) {
          return (
            A(n) || j('Future.fold', 1, 'be a function', n),
            arguments.length === 2 ? p(zt, t, n) : zt(t, n, e)
          );
        }
        function Ct(t, n) {
          return E(n) || O('Future.done', 1, n), n.done(t);
        }
        function Tt(t, n, e) {
          return E(e) || O('Future.fork', 2, e), e._fork(t, n);
        }
        function Bt(t, n, e) {
          return (
            A(n) || j('Future.fork', 1, 'be a function', n),
            arguments.length === 2 ? p(Tt, t, n) : Tt(t, n, e)
          );
        }
        function Dt(t, n) {
          return E(n) || O('Future.value', 1, n), n.value(t);
        }
        function Lt(t, n) {
          (this._mval = t), (this._mfunc = n);
        }
        function Wt(t) {
          return t.isSettled()
            ? t
            : I(t)
              ? this
              : typeof t._time === 'number'
                ? t._time < this._time ? t : this
                : z._race.call(this, t);
        }
        function It(t, n) {
          (this._time = t), (this._value = n);
        }
        function Ut(t, n) {
          (this._time = t), (this._value = n);
        }
        function Qt(t, n) {
          return t === 1 / 0 ? W : new It(t, n);
        }
        function Gt(t, n) {
          return t === 1 / 0 ? W : new Ut(t, n);
        }
        function Zt(t) {
          this._fn = t;
        }
        function $t(t) {
          return A(t) || j('Future.try', 0, 'be a function', t), new Zt(t);
        }
        (pt.prototype = Object.create(z)),
          (pt.prototype._fork = function(t, n) {
            let e = this._step,
              r = this._init,
              u = st,
              o = a,
              i = at(r);
            function c(t) {
              (i = t), (u = u === st ? ft : s());
            }
            function s() {
              for (; !i.done; ) {
                u = st;
                const r = e(at, ct, i.value);
                if (((o = r._fork(t, c)), u !== ft)) return void (u = ht);
              }
              n(i.value);
            }
            return (
              s(),
              function() {
                o();
              }
            );
          }),
          (pt.prototype.toString = function() {
            return (
              `Future.chainRec(${  f(this._step)  }, ${  s(this._init)  })`
            );
          }),
          (Lt.prototype = Object.create(z)),
          (Lt.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o,
              i = !1,
              c = !1,
              f = !1;
            function h(n) {
              f || ((f = !0), t(n));
            }
            return (
              (u = this._mval._fork(h, (t) => {
                if (((u = a), !i)) return (c = !0), void (r = t);
                n(e(t));
              })),
              (o = this._mfunc._fork(h, (t) => {
                if (
                  ((o = a),
                  (function(t) {
                    A(t) ||
                      w(
                        `Future#ap expects its first argument to be a Future of a Function\n  Actual: Future.of(${ 
                          s(t) 
                          })`
                      );
                  })(t),
                  !c)
                )
                  return (i = !0), void (e = t);
                n(t(r));
              })),
              function() {
                u(), o();
              }
            );
          }),
          (Lt.prototype.toString = function() {
            return (
              `new ParallelAp(${ 
              this._mval.toString() 
              }, ${ 
              this._mfunc.toString() 
              })`
            );
          }),
          (It.prototype = Object.create(z)),
          (It.prototype._race = Wt),
          (It.prototype._swap = function() {
            return new Ut(this._time, this._value);
          }),
          (It.prototype._fork = function(t, n) {
            const e = setTimeout(n, this._time, this._value);
            return function() {
              clearTimeout(e);
            };
          }),
          (It.prototype.extractRight = function() {
            return [this._value];
          }),
          (It.prototype.toString = function() {
            return (
              `Future.after(${  s(this._time)  }, ${  s(this._value)  })`
            );
          }),
          (Ut.prototype = Object.create(z)),
          (Ut.prototype._race = Wt),
          (Ut.prototype._swap = function() {
            return new It(this._time, this._value);
          }),
          (Ut.prototype._fork = function(t) {
            const n = setTimeout(t, this._time, this._value);
            return function() {
              clearTimeout(n);
            };
          }),
          (Ut.prototype.extractLeft = function() {
            return [this._value];
          }),
          (Ut.prototype.toString = function() {
            return (
              `Future.rejectAfter(${ 
              s(this._time) 
              }, ${ 
              s(this._value) 
              })`
            );
          }),
          (Zt.prototype = Object.create(z)),
          (Zt.prototype._fork = function(t, n) {
            let e;
            try {
              e = this._fn();
            } catch (n) {
              return t(n), a;
            }
            return n(e), a;
          }),
          (Zt.prototype.toString = function() {
            return `Future.try(${  f(this._fn)  })`;
          });
        let Jt = (Ht.Cold = 0),
          Vt = (Ht.Pending = 1),
          Xt = (Ht.Rejected = 2),
          Yt = (Ht.Resolved = 3);
        function Ht(t) {
          (this._pure = t), this.reset();
        }
        function Kt(t, n) {
          (this._fn = t), (this._a = n);
        }
        function tn(t, n, e) {
          (this._fn = t), (this._a = n), (this._b = e);
        }
        function nn(t, n, e, r) {
          (this._fn = t), (this._a = n), (this._b = e), (this._c = r);
        }
        function en(t, n) {
          (this._fn = t), (this._a = n);
        }
        function rn(t, n, e) {
          (this._fn = t), (this._a = n), (this._b = e);
        }
        function un(t, n, e, r) {
          (this._fn = t), (this._a = n), (this._b = e), (this._c = r);
        }
        function on(t, n) {
          (this._fn = t), (this._a = n);
        }
        function an(t, n, e) {
          (this._fn = t), (this._a = n), (this._b = e);
        }
        function cn(t, n, e, r) {
          (this._fn = t), (this._a = n), (this._b = e), (this._c = r);
        }
        function sn(t) {
          return R((n = t)) && A(n.next)
            ? t
            : j(
                'Future.do',
                0,
                'return an iterator, maybe you forgot the "*"',
                t
              );
          let n;
        }
        function fn(t) {
          let n;
          return (
            (R((n = t)) && typeof n.done === 'boolean') ||
              w(
                `Future.do was given an invalid generator: Its iterator did not return a valid iteration from iterator.next()\n  Actual: ${ 
                  s(t)}`
              ),
            t.done || E(t.value)
              ? t
              : O(
                  'Future.do',
                  'the iterator to produce only valid Futures',
                  t.value,
                  "\n  Tip: If you're using a generator, make sure you always yield a Future"
                )
          );
        }
        function hn(t) {
          this._generator = t;
        }
        function pn(t) {
          return A(t) || j('Future.do', 0, 'be a Function', t), new hn(t);
        }
        function ln(t, n, e) {
          (this._acquire = t), (this._dispose = n), (this._consume = e);
        }
        function yn(t, n, e) {
          return A(e) || j('Future.hook', 2, 'be a Future', e), new ln(t, n, e);
        }
        function _n(t, n, e) {
          return (
            A(n) || j('Future.hook', 1, 'be a function', n),
            arguments.length === 2 ? p(yn, t, n) : yn(t, n, e)
          );
        }
        function dn(t) {
          this._fn = t;
        }
        function vn(t, n) {
          return E(t)
            ? t
            : O(
                'Future.parallel',
                `its second argument to be an array of valid Futures. The value at position ${ 
                  n 
                  } in the array is not a Future`,
                t
              );
        }
        function mn(t, n) {
          (this._futures = n),
            (this._length = n.length),
            (this._max = Math.min(this._length, t));
        }
        (Ht.prototype = Object.create(z)),
          (Ht.prototype.isRejected = function() {
            return this._state === Xt;
          }),
          (Ht.prototype.isResolved = function() {
            return this._state === Yt;
          }),
          (Ht.prototype.extractLeft = function() {
            return this.isRejected() ? [this._value] : [];
          }),
          (Ht.prototype.extractRight = function() {
            return this.isResolved() ? [this._value] : [];
          }),
          (Ht.prototype._addToQueue = function(t, n) {
            const e = this;
            if (e._state > Vt) return a;
            const r =
              e._queue.push(
                new function(t, n) {
                  (this[Xt] = t), (this[Yt] = n);
                }(t, n)
              ) - 1;
            return (
              (e._queued += 1),
              function() {
                e._state > Vt ||
                  ((e._queue[r] = void 0),
                  (e._queued -= 1),
                  e._queued === 0 && e.reset());
              }
            );
          }),
          (Ht.prototype._drainQueue = function() {
            if (!(this._state <= Vt) && this._queued !== 0) {
              for (
                let t = this._queue,
                  n = t.length,
                  e = this._state,
                  r = this._value,
                  u = 0;
                u < n;
                u++
              )
                t[u] && t[u][e](r), (t[u] = void 0);
              (this._queue = void 0), (this._queued = 0);
            }
          }),
          (Ht.prototype.reject = function(t) {
            this._state > Vt ||
              ((this._value = t), (this._state = Xt), this._drainQueue());
          }),
          (Ht.prototype.resolve = function(t) {
            this._state > Vt ||
              ((this._value = t), (this._state = Yt), this._drainQueue());
          }),
          (Ht.prototype.run = function() {
            const t = this;
            t._state > Jt ||
              ((t._state = Vt),
              (t._cancel = t._pure._fork(
                (n) => {
                  t.reject(n);
                },
                (n) => {
                  t.resolve(n);
                }
              )));
          }),
          (Ht.prototype.reset = function() {
            this._state !== Jt &&
              (this._state > Vt && this._cancel(),
              (this._cancel = a),
              (this._queue = []),
              (this._queued = 0),
              (this._value = void 0),
              (this._state = Jt));
          }),
          (Ht.prototype._fork = function(t, n) {
            let e = a;
            switch (this._state) {
              case Vt:
                e = this._addToQueue(t, n);
                break;
              case Xt:
                t(this._value);
                break;
              case Yt:
                n(this._value);
                break;
              default:
                (e = this._addToQueue(t, n)), this.run();
            }
            return e;
          }),
          (Ht.prototype.toString = function() {
            return `Future.cache(${  this._pure.toString()  })`;
          }),
          (Kt.prototype = Object.create(z)),
          (Kt.prototype._fork = function(t, n) {
            let e;
            try {
              e = this._fn(this._a);
            } catch (n) {
              return t(n), a;
            }
            return n(e), a;
          }),
          (Kt.prototype.toString = function() {
            return `Future.encase(${  f(this._fn)  }, ${  s(this._a)  })`;
          }),
          (tn.prototype = Object.create(z)),
          (tn.prototype._fork = function(t, n) {
            let e;
            try {
              e = this._fn(this._a, this._b);
            } catch (n) {
              return t(n), a;
            }
            return n(e), a;
          }),
          (tn.prototype.toString = function() {
            return (
              `Future.encase2(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              })`
            );
          }),
          (nn.prototype = Object.create(z)),
          (nn.prototype._fork = function(t, n) {
            let e;
            try {
              e = this._fn(this._a, this._b, this._c);
            } catch (n) {
              return t(n), a;
            }
            return n(e), a;
          }),
          (nn.prototype.toString = function() {
            return (
              `Future.encase3(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              }, ${ 
              s(this._c) 
              })`
            );
          }),
          (en.prototype = Object.create(z)),
          (en.prototype._fork = function(t, n) {
            let e = !0;
            return (
              this._fn(this._a, (r, u) => {
                e && ((e = !1), r ? t(r) : n(u));
              }),
              function() {
                e = !1;
              }
            );
          }),
          (en.prototype.toString = function() {
            return `Future.encaseN(${  f(this._fn)  }, ${  s(this._a)  })`;
          }),
          (rn.prototype = Object.create(z)),
          (rn.prototype._fork = function(t, n) {
            let e = !0;
            return (
              this._fn(this._a, this._b, (r, u) => {
                e && ((e = !1), r ? t(r) : n(u));
              }),
              function() {
                e = !1;
              }
            );
          }),
          (rn.prototype.toString = function() {
            return (
              `Future.encaseN2(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              })`
            );
          }),
          (un.prototype = Object.create(z)),
          (un.prototype._fork = function(t, n) {
            let e = !0;
            return (
              this._fn(this._a, this._b, this._c, (r, u) => {
                e && ((e = !1), r ? t(r) : n(u));
              }),
              function() {
                e = !1;
              }
            );
          }),
          (un.prototype.toString = function() {
            return (
              `Future.encaseN3(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              }, ${ 
              s(this._c) 
              })`
            );
          }),
          (on.prototype = Object.create(z)),
          (on.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o = this._fn,
              i = this._a,
              a = !0;
            return (
              ((e = o(i)),
              (r = o),
              (u = i),
              S(e)
                ? e
                : w(
                    `Future.encaseP expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With: ${ 
                      s(u)}`
                  )).then(
                y((t) => {
                  a && ((a = !1), n(t));
                }),
                y((n) => {
                  a && ((a = !1), t(n));
                })
              ),
              function() {
                a = !1;
              }
            );
          }),
          (on.prototype.toString = function() {
            return `Future.encaseP(${  f(this._fn)  }, ${  s(this._a)  })`;
          }),
          (an.prototype = Object.create(z)),
          (an.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o,
              i = this._fn,
              a = this._a,
              c = this._b,
              h = !0;
            return (
              ((e = i(a, c)),
              (r = i),
              (u = a),
              (o = c),
              S(e)
                ? e
                : w(
                    `Future.encaseP2 expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With 1: ${ 
                      s(u) 
                      }\n  With 2: ${ 
                      s(o)}`
                  )).then(
                y((t) => {
                  h && ((h = !1), n(t));
                }),
                y((n) => {
                  h && ((h = !1), t(n));
                })
              ),
              function() {
                h = !1;
              }
            );
          }),
          (an.prototype.toString = function() {
            return (
              `Future.encaseP2(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              })`
            );
          }),
          (cn.prototype = Object.create(z)),
          (cn.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o,
              i,
              a = this._fn,
              c = this._a,
              h = this._b,
              p = this._c,
              l = !0;
            return (
              ((e = a(c, h, p)),
              (r = a),
              (u = c),
              (o = h),
              (i = p),
              S(e)
                ? e
                : w(
                    `Future.encaseP3 expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With 1: ${ 
                      s(u) 
                      }\n  With 2: ${ 
                      s(o) 
                      }\n  With 3: ${ 
                      s(i)}`
                  )).then(
                y((t) => {
                  l && ((l = !1), n(t));
                }),
                y((n) => {
                  l && ((l = !1), t(n));
                })
              ),
              function() {
                l = !1;
              }
            );
          }),
          (cn.prototype.toString = function() {
            return (
              `Future.encaseP3(${ 
              f(this._fn) 
              }, ${ 
              s(this._a) 
              }, ${ 
              s(this._b) 
              }, ${ 
              s(this._c) 
              })`
            );
          }),
          (hn.prototype = Object.create(z)),
          (hn.prototype._fork = function(t, n) {
            let e,
              r,
              u = sn(this._generator()),
              o = st,
              i = a;
            function c(t) {
              if (((r = t), o === ht)) return s();
              (o = ft), (e = fn(u.next(r)));
            }
            function s() {
              for (e = fn(u.next(r)); !e.done; )
                if (((o = st), (i = e.value._fork(t, c)), o !== ft))
                  return void (o = ht);
              n(e.value);
            }
            return (
              s(),
              function() {
                i();
              }
            );
          }),
          (hn.prototype.toString = function() {
            return `Future.do(${  f(this._generator)  })`;
          }),
          (ln.prototype = Object.create(z)),
          (ln.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o = this._acquire,
              i = this._dispose,
              c = this._consume,
              h = a,
              p = a,
              l = a;
            function y() {
              l(u);
            }
            function _() {
              let n,
                u,
                o,
                a = i(r);
              return (
                (u = i),
                (o = r),
                E((n = a)) ||
                  O(
                    'Future.hook',
                    "the first function it's given to return a Future",
                    n,
                    `\n  From calling: ${  f(u)  }\n  With: ${  s(o)}`
                  ),
                (e = a._fork(t, y))
              );
            }
            function d() {
              p(), _()();
            }
            function v(n) {
              (l = t), (u = n), _();
            }
            function m(t) {
              (l = n), (u = t), _();
            }
            return (
              (h = o._fork(t, (t) => {
                const n = c((r = t));
                (function(t, n, e) {
                  E(t) ||
                    O(
                      'Future.hook',
                      "the second function it's given to return a Future",
                      t,
                      `\n  From calling: ${  f(n)  }\n  With: ${  s(e)}`
                    );
                })(n, c, r),
                  (e = d),
                  (p = n._fork(v, m));
              })),
              (e = e || h),
              function() {
                e();
              }
            );
          }),
          (ln.prototype.toString = function() {
            return (
              `Future.hook(${ 
              this._acquire.toString() 
              }, ${ 
              f(this._dispose) 
              }, ${ 
              f(this._consume) 
              })`
            );
          }),
          (dn.prototype = Object.create(z)),
          (dn.prototype._fork = function(t, n) {
            let e = !0;
            return (
              this._fn((r, u) => {
                e && ((e = !1), r ? t(r) : n(u));
              }),
              function() {
                e = !1;
              }
            );
          }),
          (dn.prototype.toString = function() {
            return `Future.node(${  f(this._fn)  })`;
          }),
          (mn.prototype = Object.create(z)),
          (mn.prototype._fork = function(t, n) {
            let e = this._futures,
              r = this._length,
              u = this._max,
              o = new Array(r),
              i = new Array(r),
              c = 0,
              s = 0,
              f = !1;
            function h() {
              for (let t = 0; t < r; t++) o[t] && o[t]();
            }
            function p(u) {
              s++,
                (o[u] = e[u]._fork(
                  (n) => {
                    (o[u] = a), h(), t(n);
                  },
                  (t) => {
                    (o[u] = a),
                      (i[u] = t),
                      s--,
                      c === r && s === 0 ? n(i) : f && l();
                  }
                ));
            }
            function l() {
              for (f = !1; c < r && s < u; ) p(c++);
              f = !0;
            }
            return l(), h;
          }),
          (mn.prototype.toString = function() {
            return (
              `Future.parallel(${  this._max  }, ${  s(this._futures)  })`
            );
          });
        const gn = new B([]);
        function bn(t, n) {
          let e;
          (e = n),
            Array.isArray(e) || j('Future.parallel', 1, 'be an array', n);
          const r = (function(t, n) {
            for (var e = t.length, r = new Array(e), u = 0; u < e; u++)
              r[u] = n(t[u], u, t);
            return r;
          })(n, vn);
          return r.length === 0 ? gn : new mn(t, r);
        }
        function Fn(t) {
          this._fn = t;
        }
        (Fn.prototype = Object.create(z)),
          (Fn.prototype._fork = function(t, n) {
            let e,
              r,
              u = !0;
            return (
              ((e = this._fn()),
              (r = this._fn),
              S(e)
                ? e
                : w(
                    `Future.tryP expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r)}`
                  )).then(
                y((t) => {
                  u && ((u = !1), n(t));
                }),
                y((n) => {
                  u && ((u = !1), t(n));
                })
              ),
              function() {
                u = !1;
              }
            );
          }),
          (Fn.prototype.toString = function() {
            return `Future.tryP(${  s(this._fn)  })`;
          }),
          typeof Object.create !== 'function' &&
            F('Please polyfill Object.create to use Fluture'),
          typeof Object.assign !== 'function' &&
            F('Please polyfill Object.assign to use Fluture'),
          typeof Array.isArray !== 'function' &&
            F('Please polyfill Array.isArray to use Fluture'),
          (P.of = P[_.of] = D),
          (P.chainRec = P[_.chainRec] = function(t, n) {
            return new pt(t, n);
          }),
          (P.reject = T),
          (P.ap = yt),
          (P.map = mt),
          (P.bimap = Ft),
          (P.chain = jt);
        const wn = r(P, W, Et, (t, n) => new Lt(t, n));
        function jn(t) {
          return t instanceof wn || e(t) === wn['@@type'];
        }
        (wn.of = wn[_.of]),
          (wn.zero = wn[_.zero]),
          (wn.map = mt),
          (wn.ap = yt),
          (wn.alt = dt);
        const kn = Object.freeze({
          Future: P,
          default: P,
          Par: wn,
          isParallel: jn,
          seq(t) {
            return jn(t) || j('Future.seq', 0, 'to be a Par', t), t.sequential;
          },
          isFuture: E,
          reject: T,
          of: D,
          never: W,
          isNever: I,
          after(t, n) {
            return (
              x(t) || j('Future.after', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(Qt, t) : Qt(t, n)
            );
          },
          rejectAfter(t, n) {
            return (
              x(t) || j('Future.rejectAfter', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(Gt, t) : Gt(t, n)
            );
          },
          attempt: $t,
          try: $t,
          cache(t) {
            return E(t) || O('Future.cache', 0, t), new Ht(t);
          },
          encase: function t(n, e) {
            return (
              A(n) || j('Future.encase', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new Kt(n, e)
            );
          },
          encase2: function t(n, e, r) {
            switch ((A(n) || j('Future.encase2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new tn(n, e, r);
            }
          },
          encase3: function t(n, e, r, u) {
            switch ((A(n) || j('Future.encase3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new nn(n, e, r, u);
            }
          },
          encaseN: function t(n, e) {
            return (
              A(n) || j('Future.encaseN', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new en(n, e)
            );
          },
          encaseN2: function t(n, e, r) {
            switch ((A(n) || j('Future.encaseN2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new rn(n, e, r);
            }
          },
          encaseN3: function t(n, e, r, u) {
            switch ((A(n) || j('Future.encaseN3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new un(n, e, r, u);
            }
          },
          encaseP: function t(n, e) {
            return (
              A(n) || j('Future.encaseP', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new on(n, e)
            );
          },
          encaseP2: function t(n, e, r) {
            switch ((A(n) || j('Future.encaseP2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new an(n, e, r);
            }
          },
          encaseP3: function t(n, e, r, u) {
            switch ((A(n) || j('Future.encaseP3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new cn(n, e, r, u);
            }
          },
          go: pn,
          do: pn,
          hook(t, n, e) {
            return (
              E(t) || O('Future.hook', 0, t),
              arguments.length === 1
                ? h(_n, t)
                : arguments.length === 2 ? _n(t, n) : _n(t, n, e)
            );
          },
          node(t) {
            return A(t) || j('Future.node', 0, 'be a function', t), new dn(t);
          },
          parallel(t, n) {
            return (
              x(t) || j('Future.parallel', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(bn, t) : bn(t, n)
            );
          },
          tryP(t) {
            return A(t) || j('Future.tryP', 0, 'be a function', t), new Fn(t);
          },
          ap: yt,
          alt: dt,
          map: mt,
          bimap: Ft,
          chain: jt,
          mapRej(t, n) {
            return (
              A(t) || j('Future.mapRej', 0, 'be a Function', t),
              arguments.length === 1 ? h(Ot, t) : Ot(t, n)
            );
          },
          chainRej(t, n) {
            return (
              A(t) || j('Future.chainRej', 0, 'be a Function', t),
              arguments.length === 1 ? h(At, t) : At(t, n)
            );
          },
          lastly: xt,
          finally: xt,
          and(t, n) {
            return (
              E(t) || O('Future.and', 0, t),
              arguments.length === 1 ? h(Rt, t) : Rt(t, n)
            );
          },
          both(t, n) {
            return (
              E(t) || O('Future.both', 0, t),
              arguments.length === 1 ? h(qt, t) : qt(t, n)
            );
          },
          or(t, n) {
            return (
              E(t) || O('Future.or', 0, t),
              arguments.length === 1 ? h(Mt, t) : Mt(t, n)
            );
          },
          race: Et,
          swap(t) {
            return E(t) || O('Future.swap', 0, t), t.swap();
          },
          fold(t, n, e) {
            return (
              A(t) || j('Future.fold', 0, 'be a function', t),
              arguments.length === 1
                ? h(Nt, t)
                : arguments.length === 2 ? Nt(t, n) : Nt(t, n, e)
            );
          },
          done(t, n) {
            return (
              A(t) || j('Future.done', 0, 'be a Function', t),
              arguments.length === 1 ? h(Ct, t) : Ct(t, n)
            );
          },
          fork(t, n, e) {
            return (
              A(t) || j('Future.fork', 0, 'be a function', t),
              arguments.length === 1
                ? h(Bt, t)
                : arguments.length === 2 ? Bt(t, n) : Bt(t, n, e)
            );
          },
          promise(t) {
            return E(t) || O('Future.promise', 0, t), t.promise();
          },
          value(t, n) {
            return (
              A(t) || j('Future.value', 0, 'be a Function', t),
              arguments.length === 1 ? h(Dt, t) : Dt(t, n)
            );
          },
          extractLeft(t) {
            return E(t) || O('Future.extractLeft', 0, t), t.extractLeft();
          },
          extractRight(t) {
            return E(t) || O('Future.extractRight', 0, t), t.extractRight();
          },
        });
        return Object.assign(P, kn);
      })(St, xt, Rt, qt, Pt);
    }),
    zt = Et.isFuture,
    Nt = Et.of,
    Ct = Et.reject,
    Tt = function(t) {
      return Array.isArray(t);
    },
    Bt = function(t) {
      return t && t.nodeType === 1;
    },
    Dt = function(t) {
      return Tt(t)
        ? dt(l(Bt), Nt, () => Ct({
              error:
                'The one or more values in the array you passed in is not a valid DOM Element.',
            }))(t)
        : dt(Bt, Nt, () => Ct({
              error: 'The value you passed in is not a valid DOM Element.',
            }))(t);
    },
    Lt = function(t) {
      const n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return Et((e, r) => {
        const u = Bt(n) ? n.querySelector(t) : document.querySelector(t);
        u ? r(u) : e({ error: `Element with selector ${  t  } not found.` });
      });
    },
    Wt = function(t) {
      return zt(t)
        ? t
        : Bt(t) || (Tt(t) && l(Bt, t))
          ? Nt(t)
          : typeof t === 'string'
            ? Lt(t)
            : Ct({
                error:
                  `Argument ${ 
                  t 
                  } is not a valid type. Functions only accept Futures, DOM Elements, or valid selector string`,
              });
    },
    It = Z((t, n) => et(
        J(
          (function(t) {
            return dt(Tt, wt(Nt, t), t);
          })(t)
        ),
        J(Dt),
        Wt
      )(n)),
    Ut = Z((t, n, e) => {
      let r;
      return (
        Tt(n)
          ? (r = e.classList)[t].apply(
              r,
              (function(t) {
                if (Array.isArray(t)) {
                  for (var n = 0, e = Array(t.length); n < t.length; n++)
                    e[n] = t[n];
                  return e;
                }
                return Array.from(t);
              })(n)
            )
          : e.classList[t](n),
        Nt(e)
      );
    }),
    Qt = Z((t, n, e) => It(Ut(t, n))(e)),
    Gt = Qt('add'),
    Zt = Z(function t(n, e, r) {
      const u = e || document;
      return r === u.body
        ? Nt(r)
        : zt(n(r.parentElement))
          ? et(
              J(
                dt(
                  _t,
                  () => Nt(r.parentElement),
                  () => t(n, e, r.parentElement)
                )
              ),
              n
            )(r.parentElement)
          : dt(n, Nt, t(n, e))(r.parentElement);
    }),
    $t = Z((t, n, e) => It(Zt(n, t))(e)),
    Jt = Z((t, n, e) => e.fork(t, n)),
    Vt = Z((t, n) => n.hasAttribute(t)
        ? Nt(n.getAttribute(t))
        : Ct({ error: `Sorry, attribute ${  t  } was not found.` })),
    Xt = Z((t, n) => It(Vt(t))(n)),
    Yt = Z((t, n) => {
      const e = n.classList.item(t);
      return e
        ? Nt(e)
        : Ct({
            error: `Sorry, there is not a class with an index of ${  t  }.`,
          });
    }),
    Ht = Z((t, n) => It(Yt(t))(n)),
    Kt = function(t) {
      const n = t.classList;
      return n.length > 0
        ? Nt(n)
        : Ct({ error: 'Sorry, there are no classes on this element.' });
    },
    tn = Z((t, n) => Nt(lt(t, n.dataset))),
    nn = Z((t, n) => It(tn(t))(n)),
    en = Z((t, n) => nn(t, n).chain((e) => e
          ? Nt(n.dataset[t])
          : Ct({ error: `Sorry, data-attribute ${  t  } was not found.` }))),
    rn = Z((t, n) => It(en(t))(n)),
    un = Z((t, n) => Nt(t in n)),
    on = Z((t, n) => It(un(t))(n)),
    an = Z((t, n) => on(t, n).chain((e) => e ? Nt(n[t]) : Ct({ error: `Sorry, ${  t  } was not found.` }))),
    cn = Z((t, n) => It(an(t))(n)),
    sn = Z((t, n) => Nt(n.hasAttribute(t))),
    fn = Z((t, n) => It(sn(t))(n)),
    hn = Z((t, n) => Nt(n.classList.contains(t))),
    pn = Z((t, n) => It(hn(t))(n)),
    ln = Z((t, n) => n.removeAttribute(t), Nt(n)),
    yn = Z((t, n) => It(ln(t))(n)),
    _n = Qt('remove'),
    dn = Z((t, n) => {
      if (nn(t, n) && !delete n.dataset[t])
        return Ct({ error: `Property ${  t  } is non-configurable.` });
      return Nt(n);
    }),
    vn = Z((t, n) => It(dn(t))(n)),
    mn = G((t) => t.type !== 'submit', et(X(vt), C('name'))),
    gn = et(W, C('elements')),
    bn = T((t, n) => dt(mn, et(L(e, t), gt(['name', 'value'])), () => t)(n), []),
    Fn = dt(
      (t) => t && t.nodeType === 1 && t.nodeName === 'FORM',
      et(Nt, pt, bn, gn),
      () => Ct({
          error: 'Element supplied is not a valid DOM Form Element.',
        })
    ),
    wn = Z((t, n, e) => e.setAttribute(t, n), Nt(e)),
    jn = Z((t, n, e) => It(wn(t, n))(e)),
    kn = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/,
    On = Z((t, n, e) => (function(t) {
        const n = t.match(kn);
        return n && n.length === 1;
      })(t)
        ? ((e.dataset[t] = n), Nt(e))
        : Ct({ error: `Data property ${  t  } is not a valid property name` })),
    An = Z((t, n, e) => It(On(t, n))(e)),
    Sn = Z((t, n, e) => (e[t] = n), Nt(e)),
    xn = Z((t, n, e) => It(Sn(t, n))(e)),
    Rn = Qt('toggle'),
    qn = (function() {
      const t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return $t(t);
    })(),
    Mn = Object.freeze({
      addClass: Gt,
      classList: Qt,
      dom: Lt,
      domAll(t) {
        const n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Et((e, r) => {
          const u = Bt(n) ? n.querySelectorAll(t) : document.querySelectorAll(t);
          u.length > 0
            ? r(Array.from(u))
            : e({ error: `Elements with selector ${  t  } not found.` });
        });
      },
      findParent: qn,
      fork: Jt,
      getAttr: Xt,
      getClass: Ht,
      getClasses(t) {
        return It(Kt)(t);
      },
      getData: rn,
      getProp: cn,
      hasAttr: fn,
      hasClass: pn,
      hasData: nn,
      hasProp: on,
      noop() {},
      removeAttr: yn,
      removeClass: _n,
      removeData: vn,
      serialize(t) {
        return It(Fn)(t);
      },
      setAttr: jn,
      setData: An,
      setProp: xn,
      toggleClass: Rn,
    });
  return Object.assign({}, Mn);
})();
