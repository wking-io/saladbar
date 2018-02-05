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
  function e(e) {
    return function r(i, u) {
      switch (arguments.length) {
        case 0:
          return r;
        case 1:
          return t(i)
            ? r
            : n((t) => e(i, t));
        default:
          return t(i) && t(u)
            ? r
            : t(i)
              ? n((t) => e(t, u))
              : t(u)
                ? n((t) => e(i, t))
                : e(i, u);
      }
    };
  }
  function r(t, n) {
    let e;
    (t = t || []), (n = n || []);
    let r = t.length,
      i = n.length,
      u = [];
    for (e = 0; e < r; ) (u[u.length] = t[e]), (e += 1);
    for (e = 0; e < i; ) (u[u.length] = n[e]), (e += 1);
    return u;
  }
  function i(t, n) {
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
        return function(t, e, r, i) {
          return n.apply(this, arguments);
        };
      case 5:
        return function(t, e, r, i, u) {
          return n.apply(this, arguments);
        };
      case 6:
        return function(t, e, r, i, u, o) {
          return n.apply(this, arguments);
        };
      case 7:
        return function(t, e, r, i, u, o, a) {
          return n.apply(this, arguments);
        };
      case 8:
        return function(t, e, r, i, u, o, a, c) {
          return n.apply(this, arguments);
        };
      case 9:
        return function(t, e, r, i, u, o, a, c, s) {
          return n.apply(this, arguments);
        };
      case 10:
        return function(t, e, r, i, u, o, a, c, s, f) {
          return n.apply(this, arguments);
        };
      default:
        throw new Error(
          'First argument to _arity must be a non-negative integer no greater than ten'
        );
    }
  }
  function u(n, e, r) {
    return function() {
      for (
        var o = [], a = 0, c = n, s = 0;
        s < e.length || a < arguments.length;

      ) {
        var f;
        s < e.length && (!t(e[s]) || a >= arguments.length)
          ? (f = e[s])
          : ((f = arguments[a]), (a += 1)),
          (o[s] = f),
          t(f) || (c -= 1),
          (s += 1);
      }
      return c <= 0 ? r.apply(this, o) : i(c, u(n, o, r));
    };
  }
  const o = e((t, e) => t === 1 ? n(e) : i(t, u(t, [], e)));
  function a(r) {
    return function i(u, o, a) {
      switch (arguments.length) {
        case 0:
          return i;
        case 1:
          return t(u)
            ? i
            : e((t, n) => r(u, t, n));
        case 2:
          return t(u) && t(o)
            ? i
            : t(u)
              ? e((t, n) => r(t, o, n))
              : t(o)
                ? e((t, n) => r(u, t, n))
                : n((t) => r(u, o, t));
        default:
          return t(u) && t(o) && t(a)
            ? i
            : t(u) && t(o)
              ? e((t, n) => r(t, n, a))
              : t(u) && t(a)
                ? e((t, n) => r(t, o, n))
                : t(o) && t(a)
                  ? e((t, n) => r(u, t, n))
                  : t(u)
                    ? n((t) => r(t, o, a))
                    : t(o)
                      ? n((t) => r(u, t, a))
                      : t(a)
                        ? n((t) => r(u, o, t))
                        : r(u, o, a);
      }
    };
  }
  const c =
    Array.isArray ||
    function(t) {
      return (
        t != null &&
        t.length >= 0 &&
        Object.prototype.toString.call(t) === '[object Array]'
      );
    };
  function s(t, n, e) {
    return function() {
      if (arguments.length === 0) return e();
      let r = Array.prototype.slice.call(arguments, 0),
        i = r.pop();
      if (!c(i)) {
        for (let u = 0; u < t.length; ) {
          if (typeof i[t[u]] === 'function') return i[t[u]](...r);
          u += 1;
        }
        if (
          (function(t) {
            return typeof t['@@transducer/step'] === 'function';
          })(i)
        )
          return n(...r)(i);
      }
      return e.apply(this, arguments);
    };
  }
  const f = {
    init() {
      return this.xf['@@transducer/init']();
    },
    result(t) {
      return this.xf['@@transducer/result'](t);
    },
  };
  function h(t, n) {
    for (var e = 0, r = n.length, i = Array(r); e < r; )
      (i[e] = t(n[e])), (e += 1);
    return i;
  }
  function p(t) {
    return Object.prototype.toString.call(t) === '[object String]';
  }
  let l = n((t) => (
        Boolean(c(t)) ||
        (Boolean(t) &&
          (typeof t === 'object' &&
            (!p(t) &&
              (t.nodeType === 1
                ? Boolean(t.length)
                : t.length === 0 ||
                  (t.length > 0 &&
                    (t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1)))))))
      )),
    y = (function() {
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
  function _(t) {
    return new y(t);
  }
  const d = e((t, n) => i(t.length, function() {
      return t.apply(n, arguments);
    }));
  function v(t, n, e) {
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
  function g(t, n, e, r) {
    return t['@@transducer/result'](e[r](d(t['@@transducer/step'], t), n));
  }
  const m = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
  function b(t, n, e) {
    if ((typeof t === 'function' && (t = _(t)), l(e)))
      return (function(t, n, e) {
        for (let r = 0, i = e.length; r < i; ) {
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
      return g(t, n, e, 'fantasy-land/reduce');
    if (e[m] != null) return v(t, n, e[m]());
    if (typeof e.next === 'function') return v(t, n, e);
    if (typeof e.reduce === 'function') return g(t, n, e, 'reduce');
    throw new TypeError('reduce: list must be array or iterable');
  }
  let F = (function() {
      function t(t, n) {
        (this.xf = n), (this.f = t);
      }
      return (
        (t.prototype['@@transducer/init'] = f.init),
        (t.prototype['@@transducer/result'] = f.result),
        (t.prototype['@@transducer/step'] = function(t, n) {
          return this.xf['@@transducer/step'](t, this.f(n));
        }),
        t
      );
    })(),
    w = e((t, n) => new F(t, n));
  function j(t, n) {
    return Object.prototype.hasOwnProperty.call(n, t);
  }
  let k = Object.prototype.toString,
    O = !{ toString: null }.propertyIsEnumerable('toString'),
    S = [
      'constructor',
      'valueOf',
      'isPrototypeOf',
      'toString',
      'propertyIsEnumerable',
      'hasOwnProperty',
      'toLocaleString',
    ],
    A = (function() {
      return arguments.propertyIsEnumerable('length');
    })(),
    x = function(t, n) {
      for (let e = 0; e < t.length; ) {
        if (t[e] === n) return !0;
        e += 1;
      }
      return !1;
    },
    R = n(
      typeof Object.keys !== 'function' || A
        ? (t) => {
            if (Object(t) !== t) return [];
            let n,
              e,
              r = [],
              i =
                A &&
                (function() {
                  return k.call(arguments) === '[object Arguments]'
                    ? function(t) {
                        return k.call(t) === '[object Arguments]';
                      }
                    : function(t) {
                        return j('callee', t);
                      };
                })(t);
            for (n in t) !j(n, t) || (i && n === 'length') || (r[r.length] = n);
            if (O)
              for (e = S.length - 1; e >= 0; )
                j((n = S[e]), t) && !x(r, n) && (r[r.length] = n), (e -= 1);
            return r;
          }
        : (t) => Object(t) !== t ? [] : Object.keys(t)
    ),
    P = e(
      s(['fantasy-land/map', 'map'], w, (t, n) => {
        switch (Object.prototype.toString.call(n)) {
          case '[object Function]':
            return o(n.length, function() {
              return t.call(this, n.apply(this, arguments));
            });
          case '[object Object]':
            return b(
              (e, r) => (e[r] = t(n[r])), e,
              {},
              R(n)
            );
          default:
            return h(t, n);
        }
      })
    ),
    q = a(b),
    M = e((t, n) => typeof n['fantasy-land/ap'] === 'function'
        ? n['fantasy-land/ap'](t)
        : typeof t.ap === 'function'
          ? t.ap(n)
          : typeof t === 'function'
            ? function(e) {
                return t(e)(n(e));
              }
            : b(
                (t, e) => r(t, P(e, n)),
                [],
                t
              ));
  const N = n((t) => o(t.length, t));
  let z = function(t) {
      const n = (function(t) {
        return {
          '@@transducer/init': f.init,
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
        '@@transducer/init': f.init,
        '@@transducer/result'(t) {
          return n['@@transducer/result'](t);
        },
        '@@transducer/step'(t, e) {
          return l(e) ? b(n, t, e) : b(n, t, [e]);
        },
      };
    },
    E = e(
      s(
        ['fantasy-land/chain', 'chain'],
        e((t, n) => P(t, z(n))),
        (t, n) => {
          return typeof n === 'function'
            ? function(e) {
                return t(n(e))(e);
              }
            : ((e = !1),
              function t(n) {
                for (var r, i, u, o = [], a = 0, c = n.length; a < c; ) {
                  if (l(n[a]))
                    for (u = 0, i = (r = e ? t(n[a]) : n[a]).length; u < i; )
                      (o[o.length] = r[u]), (u += 1);
                  else o[o.length] = n[a];
                  a += 1;
                }
                return o;
              })(P(t, n));
          let e;
        }
      )
    );
  function T(t, n) {
    return function() {
      return n.call(this, t.apply(this, arguments));
    };
  }
  function C(t, n) {
    return function() {
      const e = arguments.length;
      if (e === 0) return n();
      const r = arguments[e - 1];
      return c(r) || typeof r[t] !== 'function'
        ? n.apply(this, arguments)
        : r[t](...Array.prototype.slice.call(arguments, 0, e - 1));
    };
  }
  let W = a(
      C('slice', (t, n, e) => Array.prototype.slice.call(e, t, n))
    ),
    L = n(C('tail', W(1, 1 / 0)));
  const B = n((t) => p(t)
      ? t
          .split('')
          .reverse()
          .join('')
      : Array.prototype.slice.call(t, 0).reverse());
  function I() {
    if (arguments.length === 0)
      throw new Error('compose requires at least one argument');
    return function() {
      if (arguments.length === 0)
        throw new Error('pipe requires at least one argument');
      return i(arguments[0].length, q(T, arguments[0], L(arguments)));
    }.apply(this, B(arguments));
  }
  const D = function(t) {
    return (t < 10 ? '0' : '') + t;
  };
  Date.prototype.toISOString;
  const Q = a((t, n, e) => o(Math.max(t.length, n.length, e.length), function() {
      return t.apply(this, arguments)
        ? n.apply(this, arguments)
        : e.apply(this, arguments);
    }));
  let G = e((t, n) => r([t], n)),
    Z = a((t, n, e) => {
      for (let r = e.length - 1; r >= 0; ) (n = t(e[r], n)), (r -= 1);
      return n;
    }),
    $ = e((t, n) => typeof n.sequence === 'function'
        ? n.sequence(t)
        : Z(
            (t, n) => M(P(G, t), n),
            t([]),
            n
          )),
    U = a((t, n, e) => typeof e['fantasy-land/traverse'] === 'function'
        ? e['fantasy-land/traverse'](n, t)
        : $(t, P(n, e))),
    J = '\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff',
    V = (String.prototype.trim,
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined' ? self : {});
  function X(t, n) {
    return t((n = { exports: {} }), n.exports), n.exports;
  }
  let Y = X((t) => {
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
    H = X((t) => {
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
        function i(t, n) {
          return Object.prototype.hasOwnProperty.call(n, t);
        }
        function u(t) {
          return t;
        }
        function o(t) {
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
          for (var r = e, u = 0; u < n.length; u += 1) {
            const o = n[u];
            if (r == null || (!t && !i(o, r))) return null;
            r = r[o];
          }
          return typeof r === 'function' ? r : null;
        }
        function y(t, n) {
          return l(!0, t, n);
        }
        function _(t) {
          return l(!1, t, J);
        }
        const d = i('name', () => {})
          ? function(t) {
              return t.name;
            }
          : function(t) {
              const n = /function (\w*)/.exec(t);
              return n == null ? '' : n[1];
            };
        function v(n, e, r) {
          function i(n) {
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
                    i = null;
                  return (
                    r || (i = y([e], n)),
                    i == null && (i = _([t(n), 'prototype', e])),
                    i && i.bind(n)
                  );
                };
          }
          let u = Object.keys(r),
            o = f(
              `sanctuary-type-classes/${  n}`,
              `https://github.com/sanctuary-js/sanctuary-type-classes/tree/v8.0.0#${ 
                n}`,
              e,
              (t) => u.every((n) => {
                  const e = r[n] === h ? t.constructor : t;
                  return i(n)(e) != null;
                })
            );
          return (
            (o.methods = u.reduce((t, n) => (t[n] = i(n)), t, {})),
            o
          );
        }
        let g = v('Setoid', [], { equals: p }),
          m = v('Ord', [g], { lte: p }),
          b = v('Semigroupoid', [], { compose: p }),
          F = v('Category', [b], { id: h }),
          w = v('Semigroup', [], { concat: p }),
          j = v('Monoid', [w], { empty: h }),
          k = v('Group', [j], { invert: p }),
          O = v('Filterable', [], { filter: p }),
          S = v('Functor', [], { map: p }),
          A = v('Bifunctor', [S], { bimap: p }),
          x = v('Profunctor', [S], { promap: p }),
          R = v('Apply', [S], { ap: p }),
          P = v('Applicative', [R], { of: h }),
          q = v('Chain', [R], { chain: p }),
          M = v('ChainRec', [q], { chainRec: h }),
          N = v('Monad', [P, q], {}),
          z = v('Alt', [S], { alt: p }),
          E = v('Plus', [z], { zero: h }),
          T = v('Alternative', [P, E], {}),
          C = v('Foldable', [], { reduce: p }),
          W = v('Traversable', [S, C], { traverse: p }),
          L = v('Extend', [S], { extend: p }),
          B = v('Comonad', [L], { extract: p }),
          I = v('Contravariant', [], { contramap: p });
        function D(t) {
          return [t];
        }
        function Q(t) {
          if (t.length !== this.length) return !1;
          for (let n = 0; n < this.length; n += 1)
            if (!X(this[n], t[n])) return !1;
          return !0;
        }
        function G(t) {
          for (let n = 0; ; n += 1) {
            if (n === this.length) return !0;
            if (n === t.length) return !1;
            if (!X(this[n], t[n])) return H(this[n], t[n]);
          }
        }
        function Z(t) {
          return this.concat(t);
        }
        function $(t) {
          const n = {};
          function e(t) {
            n[t] = this[t];
          }
          return r(this, e), r(t, e), n;
        }
        var U,
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
              'fantasy-land/of': D,
              'fantasy-land/chainRec'(t, n) {
                for (var e = [n], r = []; e.length > 0; ) {
                  for (
                    var i = t(c, s, e.shift()), u = [], o = 0;
                    o < i.length;
                    o += 1
                  )
                    (i[o].done ? r : u).push(i[o].value);
                  Array.prototype.unshift.apply(e, u);
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
                'fantasy-land/equals': Q,
                'fantasy-land/lte': G,
                'fantasy-land/concat': Z,
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
                'fantasy-land/alt': Z,
                'fantasy-land/reduce'(t, n) {
                  return this.reduce((n, e) => t(n, e), n);
                },
                'fantasy-land/traverse'(t, e) {
                  const r = this;
                  function i(u, a) {
                    switch (a) {
                      case 0:
                        return ut(t, []);
                      case 2:
                        return it(o, e(r[u]), e(r[u + 1]));
                      default:
                        var c = 2 * Math.floor(a / 4);
                        return it(n, i(u, c), i(u + c, a - c));
                    }
                  }
                  return this.length % 2 == 1
                    ? it(n, et(D, e(this[0])), i(1, this.length - 1))
                    : i(0, this.length);
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
                  return Q.call(this, t);
                },
                'fantasy-land/lte'(t) {
                  return G.call(this, t);
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
                      i = e.shift();
                    if (r < i) return !0;
                    if (r > i) return !1;
                    if (!X(this[r], t[r])) return H(this[r], t[r]);
                  }
                },
                'fantasy-land/concat': $,
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
                      i(e, t) && (n[e] = t[e](this[e]));
                    }),
                    n
                  );
                },
                'fantasy-land/alt': $,
                'fantasy-land/reduce'(t, n) {
                  const e = this;
                  return Object.keys(this)
                    .sort()
                    .reduce((n, r) => t(n, e[r]), n);
                },
                'fantasy-land/traverse'(t, n) {
                  const e = this;
                  return Object.keys(this).reduce((t, r) => it(
                      (t) => function(n) {
                          const e = {};
                          return (e[r] = n), $.call(t, e);
                        },
                      t,
                      n(e[r])
                    ), ut(t, {}));
                },
              },
            },
            Function: {
              'fantasy-land/id'() {
                return u;
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
              const i = t(r);
              if (i === 'Object') {
                let u;
                try {
                  u = e(r.toString, r);
                } catch (t) {}
                if (u != null && u !== '[object Object]') return u;
              }
              return e(_([i, 'prototype', 'toString']) || r.toString, r);
            };
          })(),
          X = ((U = []),
          function(t, n) {
            if (!a(t, n)) return !1;
            if (
              U.some((e) => e[0] === t && e[1] === n)
            )
              return !0;
            U.push([t, n]);
            try {
              return g.test(t) && g.test(n) && g.methods.equals(t)(n);
            } finally {
              U.pop();
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
              return m.test(n) && m.test(e) && m.methods.lte(n)(e);
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
          return S.methods.map(n)(t);
        }
        function rt(t, n) {
          return R.methods.ap(n)(t);
        }
        function it(t, n, e) {
          return rt(et(t, n), e);
        }
        function ut(t, n) {
          return P.methods.of(t)(n);
        }
        function ot(t, n) {
          return q.methods.chain(n)(t);
        }
        function at(t, n, e) {
          return C.methods.reduce(e)(t, n);
        }
        function ct(t, n) {
          for (
            var e = at(
                (n, e) => {
                  for (var r = t(e), i = 0, u = n.length; i < u; ) {
                    const o = Math.floor((i + u) / 2);
                    H(n[o].fx, r) ? (i = o + 1) : (u = o);
                  }
                  return n.splice(i, 0, { x: e, fx: r }), n;
                },
                [],
                n
              ),
              r = n.constructor,
              i = tt(r),
              u = 0;
            u < e.length;
            u += 1
          )
            i = K(i, ut(r, e[u].x));
          return i;
        }
        function st(t, n, e) {
          return W.methods.traverse(e)(t, n);
        }
        function ft(t, n) {
          return L.methods.extend(n)(t);
        }
        return {
          TypeClass: f,
          Setoid: g,
          Ord: m,
          Semigroupoid: b,
          Category: F,
          Semigroup: w,
          Monoid: j,
          Group: k,
          Filterable: O,
          Functor: S,
          Bifunctor: A,
          Profunctor: x,
          Apply: R,
          Applicative: P,
          Chain: q,
          ChainRec: M,
          Monad: N,
          Alt: z,
          Plus: E,
          Alternative: T,
          Foldable: C,
          Traversable: W,
          Extend: L,
          Comonad: B,
          Contravariant: I,
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
            return A.methods.bimap(e)(t, n);
          },
          promap(t, n, e) {
            return x.methods.promap(e)(t, n);
          },
          ap: rt,
          lift2: it,
          lift3(t, n, e, r) {
            return rt(rt(et(t, n), e), r);
          },
          apFirst(t, n) {
            return it(e, t, n);
          },
          apSecond(t, n) {
            return it(e(u), t, n);
          },
          of: ut,
          append(t, n) {
            return K(n, ut(n.constructor, t));
          },
          prepend(t, n) {
            return K(ut(n.constructor, t), n);
          },
          chain: ot,
          join(t) {
            return ot(u, t);
          },
          chainRec(t, n, e) {
            return M.methods.chainRec(t)(n, e);
          },
          alt(t, n) {
            return z.methods.alt(t)(n);
          },
          zero(t) {
            return E.methods.zero(t)();
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
              (t, e) => K(ut(n, e), t),
              tt(n),
              t
            );
          },
          sort(t) {
            return ct(u, t);
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
            return st(t, u, n);
          },
          extend: ft,
          duplicate(t) {
            return ft(u, t);
          },
          extract(t) {
            return B.methods.extract(t)();
          },
          contramap(t, n) {
            return I.methods.contramap(n)(t);
          },
        };
      })(Y);
    }),
    K = X((t) => {
      t.exports = (function() {
        let e = /\t/g,
          n = /\s*[^\s]/,
          r = /\n\r?/,
          t = /^ */;
        function i(t) {
          return n.test(t);
        }
        function u(n) {
          return n.match(t)[0].length;
        }
        function o(t) {
          return new Array(t + 1).join(' ');
        }
        function a(t, n) {
          let r = (function(t) {
              let n = t.filter(i).map(u),
                e = n.reduce(Math.min, 1 / 0),
                r =
                  n
                    .map((t) => t - e)
                    .find((t) => t > 1) || 2;
              return { depth: e, tabsize: r };
            })(t.slice(1)),
            a = new RegExp(o(r.tabsize), 'g');
          return t
            .map((t) => t
                .slice(Math.min(r.depth, u(t)))
                .replace(a, '\t')
                .replace(e, n))
            .join('\n');
        }
        return function t(n, i) {
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
            })(i),
            i.toString !== Function.prototype.toString)
          )
            return i.toString();
          let u = o(n),
            c = (function(t, n) {
              return t.toString().replace(e, n);
            })(i, u),
            s = c.split(r);
          return s.length < 2 ? c : a(s, u);
        };
      })();
    }),
    tt = X((t) => {
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
    nt = X((t) => {
      t.exports = (function(t, n) {
        let e = '@@type',
          r = ['first', 'second', 'third', 'fourth', 'fifth'];
        function i(t) {
          return typeof t === 'function';
        }
        function u(t) {
          return t.length >= 2;
        }
        function o(n, e, i, u) {
          throw new TypeError(
            `${n 
              } expects its ${ 
              r[e] 
              } argument to ${ 
              i 
              }\n  Actual: ${ 
              t.toString(u)}`
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
          function g(t) {
            return (
              t instanceof r ||
              (Boolean(t) && t.constructor === r) ||
              n(t) === r[e]
            );
          }
          function m(t) {
            return (
              t instanceof v ||
              (Boolean(t) && t.constructor === v) ||
              n(t) === y
            );
          }
          function b(t) {
            return g(t) || o(d, 0, `be of type "${  _  }"`, t), new v(t);
          }
          (function(n) {
            try {
              return t.Applicative.test(t.of(n));
            } catch (t) {
              return !1;
            }
          })(r) || o('concurrify', 0, 'represent an Applicative', r),
            g(c) || o('concurrify', 1, `be of type "${  _  }"`, c),
            i(s) || o('concurrify', 2, 'be a function', s),
            u(s) || o('concurrify', 2, 'be binary', s),
            i(f) || o('concurrify', 3, 'be a function', f),
            u(f) || o('concurrify', 3, 'be binary', f);
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
                m(this) || a(`${d  }#map`, this, d),
                i(n) || o(`${d  }#map`, 0, 'be a function', n),
                new v(t.map(n, this.sequential))
              );
            }),
            (F['fantasy-land/ap'] = function(t) {
              return (
                m(this) || a(`${d  }#ap`, this, d),
                m(t) || o(`${d  }#ap`, 0, `be a ${  d}`, t),
                new v(f(this.sequential, t.sequential))
              );
            }),
            (F['fantasy-land/alt'] = function(t) {
              return (
                m(this) || a(`${d  }#alt`, this, d),
                m(t) || o(`${d  }#alt`, 0, `be a ${  d}`, t),
                new v(s(this.sequential, t.sequential))
              );
            }),
            (F.toString = function() {
              return (
                m(this) || a(`${d  }#toString`, this, d),
                `${d  }(${  t.toString(this.sequential)  })`
              );
            }),
            b
          );
        };
      })(H, tt);
    });
  function et(t) {
    (this._list = new Array(4)),
      (this._capacityMask = 3),
      (this._head = 0),
      (this._tail = 0),
      Array.isArray(t) && this._fromArray(t);
  }
  (et.prototype.peekAt = function(t) {
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
    (et.prototype.get = function(t) {
      return this.peekAt(t);
    }),
    (et.prototype.peek = function() {
      if (this._head !== this._tail) return this._list[this._head];
    }),
    (et.prototype.peekFront = function() {
      return this.peek();
    }),
    (et.prototype.peekBack = function() {
      return this.peekAt(-1);
    }),
    Object.defineProperty(et.prototype, 'length', {
      get() {
        return this.size();
      },
    }),
    (et.prototype.size = function() {
      return this._head === this._tail
        ? 0
        : this._head < this._tail
          ? this._tail - this._head
          : this._capacityMask + 1 - (this._head - this._tail);
    }),
    (et.prototype.unshift = function(t) {
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
    (et.prototype.shift = function() {
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
    (et.prototype.push = function(t) {
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
    (et.prototype.pop = function() {
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
    (et.prototype.removeOne = function(t) {
      let n = t;
      if (n === (0 | n) && this._head !== this._tail) {
        let e = this.size(),
          r = this._list.length;
        if (!(n >= e || n < -e)) {
          n < 0 && (n += e), (n = (this._head + n) & this._capacityMask);
          let i,
            u = this._list[n];
          if (t < e / 2) {
            for (i = t; i > 0; i--)
              this._list[n] = this._list[
                (n = (n - 1 + r) & this._capacityMask)
              ];
            (this._list[n] = void 0),
              (this._head = (this._head + 1 + r) & this._capacityMask);
          } else {
            for (i = e - 1 - t; i > 0; i--)
              this._list[n] = this._list[
                (n = (n + 1 + r) & this._capacityMask)
              ];
            (this._list[n] = void 0),
              (this._tail = (this._tail - 1 + r) & this._capacityMask);
          }
          return u;
        }
      }
    }),
    (et.prototype.remove = function(t, n) {
      let e,
        r = t,
        i = n;
      if (r === (0 | r) && this._head !== this._tail) {
        let u = this.size(),
          o = this._list.length;
        if (!(r >= u || r < -u || n < 1)) {
          if ((r < 0 && (r += u), n === 1 || !n))
            return ((e = new Array(1))[0] = this.removeOne(r)), e;
          if (r === 0 && r + n >= u)
            return (e = this.toArray()), this.clear(), e;
          let a;
          for (r + n > u && (n = u - r), e = new Array(n), a = 0; a < n; a++)
            e[a] = this._list[(this._head + r + a) & this._capacityMask];
          if (((r = (this._head + r) & this._capacityMask), t + n === u)) {
            for (
              this._tail = (this._tail - n + o) & this._capacityMask, a = n;
              a > 0;
              a--
            )
              this._list[(r = (r + 1 + o) & this._capacityMask)] = void 0;
            return e;
          }
          if (t === 0) {
            for (
              this._head = (this._head + n + o) & this._capacityMask, a = n - 1;
              a > 0;
              a--
            )
              this._list[(r = (r + 1 + o) & this._capacityMask)] = void 0;
            return e;
          }
          if (t < u / 2) {
            for (
              this._head = (this._head + t + n + o) & this._capacityMask, a = t;
              a > 0;
              a--
            )
              this.unshift(this._list[(r = (r - 1 + o) & this._capacityMask)]);
            for (r = (this._head - 1 + o) & this._capacityMask; i > 0; )
              (this._list[(r = (r - 1 + o) & this._capacityMask)] = void 0),
                i--;
          } else {
            for (
              this._tail = r,
                r = (r + n + o) & this._capacityMask,
                a = u - (n + t);
              a > 0;
              a--
            )
              this.push(this._list[r++]);
            for (r = this._tail; i > 0; )
              (this._list[(r = (r + 1 + o) & this._capacityMask)] = void 0),
                i--;
          }
          return (
            this._head < 2 &&
              this._tail > 1e4 &&
              this._tail <= o >>> 2 &&
              this._shrinkArray(),
            e
          );
        }
      }
    }),
    (et.prototype.splice = function(t, n) {
      let e = t,
        r = this.size();
      if (
        e === (0 | e) &&
        this._head !== this._tail &&
        !(e > r || e < -r || (e === r && n != 0))
      ) {
        if ((e < 0 && (e += r), arguments.length > 2)) {
          let i,
            u,
            o,
            a = arguments.length,
            c = this._list.length,
            s = 2;
          if (e < r / 2) {
            for (u = new Array(e), i = 0; i < e; i++)
              u[i] = this._list[(this._head + i) & this._capacityMask];
            for (
              n === 0
                ? ((o = []),
                  e > 0 &&
                    (this._head = (this._head + e + c) & this._capacityMask))
                : ((o = this.remove(e, n)),
                  (this._head = (this._head + e + c) & this._capacityMask));
              a > s;

            )
              this.unshift(arguments[--a]);
            for (i = e; i > 0; i--) this.unshift(u[i - 1]);
          } else {
            const f = (u = new Array(r - (e + n))).length;
            for (i = 0; i < f; i++)
              u[i] = this._list[(this._head + e + n + i) & this._capacityMask];
            for (
              n === 0
                ? ((o = []),
                  e != r &&
                    (this._tail = (this._head + e + c) & this._capacityMask))
                : ((o = this.remove(e, n)),
                  (this._tail = (this._tail - f + c) & this._capacityMask));
              s < a;

            )
              this.push(arguments[s++]);
            for (i = 0; i < f; i++) this.push(u[i]);
          }
          return o;
        }
        return this.remove(e, n);
      }
    }),
    (et.prototype.clear = function() {
      (this._head = 0), (this._tail = 0);
    }),
    (et.prototype.isEmpty = function() {
      return this._head === this._tail;
    }),
    (et.prototype.toArray = function() {
      return this._copyArray(!1);
    }),
    (et.prototype._fromArray = function(t) {
      for (let n = 0; n < t.length; n++) this.push(t[n]);
    }),
    (et.prototype._copyArray = function(t) {
      let n,
        e = [],
        r = this._list,
        i = r.length;
      if (t || this._head > this._tail) {
        for (n = this._head; n < i; n++) e.push(r[n]);
        for (n = 0; n < this._tail; n++) e.push(r[n]);
      } else for (n = this._head; n < this._tail; n++) e.push(r[n]);
      return e;
    }),
    (et.prototype._growArray = function() {
      this._head && ((this._list = this._copyArray(!0)), (this._head = 0)),
        (this._tail = this._list.length),
        (this._list.length *= 2),
        (this._capacityMask = (this._capacityMask << 1) | 1);
    }),
    (et.prototype._shrinkArray = function() {
      (this._list.length >>>= 1), (this._capacityMask >>>= 1);
    });
  let rt = et,
    it = X((t, n) => {
      t.exports = (function(t, n, e, r, i) {
        (t = t && t.hasOwnProperty('default') ? t.default : t),
          (n = n && n.hasOwnProperty('default') ? n.default : n),
          (e = e && e.hasOwnProperty('default') ? e.default : e),
          (r = r && r.hasOwnProperty('default') ? r.default : r),
          (i = i && i.hasOwnProperty('default') ? i.default : i);
        const u =
            typeof self === 'object'
              ? self
              : typeof V === 'object'
                ? V
                : typeof window === 'object' ? window : {},
          o =
            typeof u.setImmediate === 'function'
              ? u.setImmediate
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
          return function(e, r, i) {
            switch (arguments.length) {
              case 1:
                return t(n, e);
              case 2:
                return t(n, e, r);
              default:
                return t(n, e, r, i);
            }
          };
        }
        function p(t, n, e) {
          return function(r, i) {
            return arguments.length === 1 ? t(n, e, r) : t(n, e, r, i);
          };
        }
        function l(t, n, e, r) {
          return function(i) {
            return t(n, e, r, i);
          };
        }
        function y(t) {
          return function(n) {
            return o(t, n);
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
          g = 'Future',
          m = 3,
          b = `${v  }/${  g  }@${  m}`;
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
        function O(t, n, r, i) {
          let u,
            o = e.parse(e(r)),
            a =
              o.name === g
                ? `\n${ 
                  o.namespace !== v
                    ? ((u = o.namespace),
                      `The Future was not created by ${ 
                        v 
                        }. Make sure you transform other Futures to ${ 
                        v 
                        } Futures. Got ${ 
                        u ? `a Future from ${  u}` : 'an unscoped Future' 
                        }.\n  See: https://github.com/fluture-js/Fluture#casting-futures`)
                    : o.version !== m
                      ? (function(t, n) {
                          return (
                            `The Future was created by ${ 
                            n < m ? 'an older' : 'a newer' 
                            } version of ${ 
                            v 
                            }. This means that one of the sources which creates Futures is outdated. Update this source, or transform its created Futures to be compatible.\n  See: https://github.com/fluture-js/Fluture#casting-futures`
                          );
                        })(0, o.version)
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
              o.name 
              }${i || ''}`
          );
        }
        function S(t) {
          return typeof t === 'function';
        }
        function A(t) {
          return t instanceof Promise || (Boolean(t) && S(t.then));
        }
        function x(t) {
          return t === 1 / 0 || (typeof t === 'number' && t > 0 && t % 1 == 0);
        }
        function R(t) {
          return t !== null && typeof t === 'object';
        }
        const P = { isEmpty: !0, size: 0, head: null, tail: null };
        function q(t) {
          F(
            `Future#value was called on a rejected Future\n  Actual: Future.reject(${ 
              s(t) 
              })`
          );
        }
        function M(t) {
          return S(t) || j('Future', 0, 'be a Function', t), new E(t);
        }
        function N(t) {
          return t instanceof M || e(t) === b;
        }
        (M['@@type'] = b),
          (M.prototype[_.ap] = function(t) {
            return t._ap(this);
          }),
          (M.prototype[_.map] = function(t) {
            return this._map(t);
          }),
          (M.prototype[_.bimap] = function(t, n) {
            return this._bimap(t, n);
          }),
          (M.prototype[_.chain] = function(t) {
            return this._chain(t);
          }),
          (M.prototype.ap = function(t) {
            return (
              N(this) || k('Future#ap', this),
              N(t) || O('Future#ap', 0, t),
              this._ap(t)
            );
          }),
          (M.prototype.map = function(t) {
            return (
              N(this) || k('Future#map', this),
              S(t) || j('Future#map', 0, 'to be a Function', t),
              this._map(t)
            );
          }),
          (M.prototype.bimap = function(t, n) {
            return (
              N(this) || k('Future#bimap', this),
              S(t) || j('Future#bimap', 0, 'to be a Function', t),
              S(n) || j('Future#bimap', 1, 'to be a Function', n),
              this._bimap(t, n)
            );
          }),
          (M.prototype.chain = function(t) {
            return (
              N(this) || k('Future#chain', this),
              S(t) || j('Future#chain', 0, 'to be a Function', t),
              this._chain(t)
            );
          }),
          (M.prototype.mapRej = function(t) {
            return (
              N(this) || k('Future#mapRej', this),
              S(t) || j('Future#mapRej', 0, 'to be a Function', t),
              this._mapRej(t)
            );
          }),
          (M.prototype.chainRej = function(t) {
            return (
              N(this) || k('Future#chainRej', this),
              S(t) || j('Future#chainRej', 0, 'to be a Function', t),
              this._chainRej(t)
            );
          }),
          (M.prototype.race = function(t) {
            return (
              N(this) || k('Future#race', this),
              N(t) || O('Future#race', 0, t),
              this._race(t)
            );
          }),
          (M.prototype.both = function(t) {
            return (
              N(this) || k('Future#both', this),
              N(t) || O('Future#both', 0, t),
              this._both(t)
            );
          }),
          (M.prototype.and = function(t) {
            return (
              N(this) || k('Future#and', this),
              N(t) || O('Future#and', 0, t),
              this._and(t)
            );
          }),
          (M.prototype.or = function(t) {
            return (
              N(this) || k('Future#or', this),
              N(t) || O('Future#or', 0, t),
              this._or(t)
            );
          }),
          (M.prototype.swap = function() {
            return N(this) || k('Future#ap', this), this._swap();
          }),
          (M.prototype.fold = function(t, n) {
            return (
              N(this) || k('Future#ap', this),
              S(t) || j('Future#fold', 0, 'to be a Function', t),
              S(n) || j('Future#fold', 1, 'to be a Function', n),
              this._fold(t, n)
            );
          }),
          (M.prototype.finally = function(t) {
            return (
              N(this) || k('Future#finally', this),
              N(t) || O('Future#finally', 0, t),
              this._finally(t)
            );
          }),
          (M.prototype.lastly = function(t) {
            return (
              N(this) || k('Future#lastly', this),
              N(t) || O('Future#lastly', 0, t),
              this._finally(t)
            );
          }),
          (M.prototype.fork = function(t, n) {
            return (
              N(this) || k('Future#fork', this),
              S(t) || j('Future#fork', 0, 'to be a Function', t),
              S(n) || j('Future#fork', 0, 'to be a Function', n),
              this._fork(t, n)
            );
          }),
          (M.prototype.value = function(t) {
            return (
              N(this) || k('Future#value', this),
              S(t) || j('Future#value', 0, 'to be a Function', t),
              this._fork(q, t)
            );
          }),
          (M.prototype.done = function(t) {
            return (
              N(this) || k('Future#done', this),
              S(t) || j('Future#done', 0, 'to be a Function', t),
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
          (M.prototype.promise = function() {
            const t = this;
            return new Promise(((n, e) => {
              t._fork(e, n);
            }));
          }),
          (M.prototype.isRejected = function() {
            return !1;
          }),
          (M.prototype.isResolved = function() {
            return !1;
          }),
          (M.prototype.isSettled = function() {
            return this.isRejected() || this.isResolved();
          }),
          (M.prototype.extractLeft = function() {
            return [];
          }),
          (M.prototype.extractRight = function() {
            return [];
          });
        const z = Object.create(M.prototype);
        function E(t) {
          this._computation = t;
        }
        function T(t) {
          this._value = t;
        }
        function C(t) {
          return new T(t);
        }
        function W(t) {
          this._value = t;
        }
        function L(t) {
          return new W(t);
        }
        function B() {
          this._isNever = !0;
        }
        (z._ap = function(t) {
          return new at(this)._ap(t);
        }),
          (z._map = function(t) {
            return new at(this)._map(t);
          }),
          (z._bimap = function(t, n) {
            return new at(this)._bimap(t, n);
          }),
          (z._chain = function(t) {
            return new at(this)._chain(t);
          }),
          (z._mapRej = function(t) {
            return new at(this)._mapRej(t);
          }),
          (z._chainRej = function(t) {
            return new at(this)._chainRej(t);
          }),
          (z._race = function(t) {
            return new at(this)._race(t);
          }),
          (z._both = function(t) {
            return new at(this)._both(t);
          }),
          (z._and = function(t) {
            return new at(this)._and(t);
          }),
          (z._or = function(t) {
            return new at(this)._or(t);
          }),
          (z._swap = function() {
            return new at(this)._swap();
          }),
          (z._fold = function(t, n) {
            return new at(this)._fold(t, n);
          }),
          (z._finally = function(t) {
            return new at(this)._finally(t);
          }),
          (E.prototype = Object.create(z)),
          (E.prototype._fork = function(t, n) {
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
                  (S(t) && t.length === 0) ||
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
          (E.prototype.toString = function() {
            return `Future(${  f(this._computation)  })`;
          }),
          (T.prototype = Object.create(z)),
          (T.prototype._ap = c),
          (T.prototype._map = c),
          (T.prototype._chain = c),
          (T.prototype._race = c),
          (T.prototype._both = c),
          (T.prototype._and = c),
          (T.prototype._or = function(t) {
            return t;
          }),
          (T.prototype._finally = function(t) {
            return t._and(this);
          }),
          (T.prototype._swap = function() {
            return new W(this._value);
          }),
          (T.prototype._fork = function(t) {
            return t(this._value), a;
          }),
          (T.prototype.isRejected = function() {
            return !0;
          }),
          (T.prototype.extractLeft = function() {
            return [this._value];
          }),
          (T.prototype.toString = function() {
            return `Future.reject(${  s(this._value)  })`;
          }),
          (W.prototype = Object.create(z)),
          (W.prototype._race = c),
          (W.prototype._mapRej = c),
          (W.prototype._or = c),
          (W.prototype._and = function(t) {
            return t;
          }),
          (W.prototype._both = function(t) {
            const n = this._value;
            return t._map((t) => [n, t]);
          }),
          (W.prototype._swap = function() {
            return new T(this._value);
          }),
          (W.prototype._finally = function(t) {
            const n = this._value;
            return t._map(() => n);
          }),
          (W.prototype._fork = function(t, n) {
            return n(this._value), a;
          }),
          (W.prototype.isResolved = function() {
            return !0;
          }),
          (W.prototype.extractRight = function() {
            return [this._value];
          }),
          (W.prototype.toString = function() {
            return `Future.of(${  s(this._value)  })`;
          }),
          (B.prototype = Object.create(M.prototype)),
          (B.prototype._ap = c),
          (B.prototype._map = c),
          (B.prototype._bimap = c),
          (B.prototype._chain = c),
          (B.prototype._mapRej = c),
          (B.prototype._chainRej = c),
          (B.prototype._both = c),
          (B.prototype._or = c),
          (B.prototype._swap = c),
          (B.prototype._fold = c),
          (B.prototype._finally = c),
          (B.prototype._race = function(t) {
            return t;
          }),
          (B.prototype._fork = function() {
            return a;
          }),
          (B.prototype.toString = function() {
            return 'Future.never';
          });
        const I = new B();
        function D(t) {
          return N(t) && !0 === t._isNever;
        }
        function Q(t) {
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
        (Q.prototype = Object.create(z)),
          (Q.prototype._fork = function(t, n) {
            return (
              this.rejected
                ? t(this.value)
                : this.resolved
                  ? n(this.value)
                  : ((this.rej = t), (this.res = n)),
              this.cancel
            );
          });
        const G = {
          rejected(t) {
            return this.cancel(), new T(t);
          },
          resolved(t) {
            return this.cancel(), new W(t);
          },
          run() {
            return this;
          },
          cancel() {},
        };
        function Z(t) {
          this.other = t;
        }
        function $(t) {
          this.mapper = t;
        }
        function U(t, n) {
          (this.lmapper = t), (this.rmapper = n);
        }
        function J(t) {
          this.mapper = t;
        }
        function X(t) {
          this.mapper = t;
        }
        function Y(t) {
          this.mapper = t;
        }
        function H() {}
        function K(t, n) {
          (this.lmapper = t), (this.rmapper = n);
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
        function it(t) {
          this.other = t;
        }
        function ut(t, n) {
          const e = this;
          (e.other = n),
            (e.cancel = n._fork(
              (n) => {
                t(new T(n), e);
              },
              (n) => {
                t(new W(n), e);
              }
            ));
        }
        function ot(t, n) {
          const e = this;
          (e.other = n),
            (e.cancel = n._fork((n) => {
              t(new T(n), e);
            }, a));
        }
        function at(t, n) {
          (this._spawn = t), (this._actions = n || P);
        }
        function ct(t) {
          return { done: !1, value: t };
        }
        function st(t) {
          return { done: !0, value: t };
        }
        (Z.prototype = Object.create(G)),
          (Z.prototype.resolved = function(t) {
            return (
              (function(t) {
                S(t) ||
                  w(
                    `Future#ap expects its first argument to be a Future of a Function\n  Actual: Future.of(${ 
                      s(t) 
                      })`
                  );
              })(t),
              this.other._map((n) => t(n))
            );
          }),
          (Z.prototype.toString = function() {
            return `ap(${  this.other.toString()  })`;
          }),
          ($.prototype = Object.create(G)),
          ($.prototype.resolved = function(t) {
            return new W(this.mapper(t));
          }),
          ($.prototype.toString = function() {
            return `map(${  f(this.mapper)  })`;
          }),
          (U.prototype = Object.create(G)),
          (U.prototype.rejected = function(t) {
            return new T(this.lmapper(t));
          }),
          (U.prototype.resolved = function(t) {
            return new W(this.rmapper(t));
          }),
          (U.prototype.toString = function() {
            return `bimap(${  f(this.lmapper)  }, ${  f(this.rmapper)  })`;
          }),
          (J.prototype = Object.create(G)),
          (J.prototype.resolved = function(t) {
            return (function(t, n, e) {
              return N(t)
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
          (X.prototype = Object.create(G)),
          (X.prototype.rejected = function(t) {
            return new T(this.mapper(t));
          }),
          (X.prototype.toString = function() {
            return `mapRej(${  f(this.mapper)  })`;
          }),
          (Y.prototype = Object.create(G)),
          (Y.prototype.rejected = function(t) {
            return (function(t, n, e) {
              return N(t)
                ? t
                : O(
                    'Future#chainRej',
                    "the function it's given to return a Future",
                    t,
                    `\n  From calling: ${  f(n)  }\n  With: ${  s(e)}`
                  );
            })(this.mapper(t), this.mapper, t);
          }),
          (Y.prototype.toString = function() {
            return `chainRej(${  f(this.mapper)  })`;
          }),
          (H.prototype = Object.create(G)),
          (H.prototype.rejected = function(t) {
            return new W(t);
          }),
          (H.prototype.resolved = function(t) {
            return new T(t);
          }),
          (H.prototype.toString = function() {
            return 'swap()';
          }),
          (K.prototype = Object.create(G)),
          (K.prototype.rejected = function(t) {
            return new W(this.lmapper(t));
          }),
          (K.prototype.resolved = function(t) {
            return new W(this.rmapper(t));
          }),
          (K.prototype.toString = function() {
            return `fold(${  f(this.lmapper)  }, ${  f(this.rmapper)  })`;
          }),
          (tt.prototype = Object.create(G)),
          (tt.prototype.rejected = function(t) {
            return this.other._and(new T(t));
          }),
          (tt.prototype.resolved = function(t) {
            return this.other._map(() => t);
          }),
          (tt.prototype.cancel = function() {
            this.other._fork(a, a)();
          }),
          (tt.prototype.toString = function() {
            return `finally(${  this.other.toString()  })`;
          }),
          (nt.prototype = Object.create(G)),
          (nt.prototype.resolved = function() {
            return this.other;
          }),
          (nt.prototype.toString = function() {
            return `and(${  this.other.toString()  })`;
          }),
          (et.prototype = Object.create(G)),
          (et.prototype.rejected = function() {
            return this.other;
          }),
          (et.prototype.toString = function() {
            return `or(${  this.other.toString()  })`;
          }),
          (rt.prototype = Object.create(G)),
          (rt.prototype.run = function(t) {
            return new ut(t, new Q(this.other));
          }),
          (rt.prototype.toString = function() {
            return `race(${  this.other.toString()  })`;
          }),
          (it.prototype = Object.create(G)),
          (it.prototype.resolved = function(t) {
            return this.other._map((n) => [t, n]);
          }),
          (it.prototype.run = function(t) {
            return new ot(t, new Q(this.other));
          }),
          (it.prototype.toString = function() {
            return `both(${  this.other.toString()  })`;
          }),
          (ut.prototype = Object.create(rt.prototype)),
          (ot.prototype = Object.create(it.prototype)),
          (at.prototype = Object.create(M.prototype)),
          (at.prototype._transform = function(t) {
            return new at(
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
          (at.prototype._ap = function(t) {
            return this._transform(new Z(t));
          }),
          (at.prototype._map = function(t) {
            return this._transform(new $(t));
          }),
          (at.prototype._bimap = function(t, n) {
            return this._transform(new U(t, n));
          }),
          (at.prototype._chain = function(t) {
            return this._transform(new J(t));
          }),
          (at.prototype._mapRej = function(t) {
            return this._transform(new X(t));
          }),
          (at.prototype._chainRej = function(t) {
            return this._transform(new Y(t));
          }),
          (at.prototype._race = function(t) {
            return D(t) ? this : this._transform(new rt(t));
          }),
          (at.prototype._both = function(t) {
            return this._transform(new it(t));
          }),
          (at.prototype._and = function(t) {
            return this._transform(new nt(t));
          }),
          (at.prototype._or = function(t) {
            return this._transform(new et(t));
          }),
          (at.prototype._swap = function() {
            return this._transform(new H());
          }),
          (at.prototype._fold = function(t, n) {
            return this._transform(new K(t, n));
          }),
          (at.prototype._finally = function(t) {
            return this._transform(new tt(t));
          }),
          (at.prototype._fork = function(t, n) {
            let e,
              r,
              u,
              o,
              c = new i(this._actions.size),
              s = new i(this._actions.size),
              f = a,
              h = !0;
            function p(i) {
              if (((u = !0), (e = i)._spawn)) {
                for (let o = e._actions; !o.isEmpty; )
                  c.unshift(o.head), (o = o.tail);
                e = e._spawn;
              }
              h &&
                (function() {
                  for (h = !1; ; ) {
                    if (((u = !1), (r = c.shift())))
                      (f = e._fork(l, y)), u || d();
                    else {
                      if (!(r = s.shift())) break;
                      f = e._fork(l, y);
                    }
                    if (!u) return void (h = !0);
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
                for (r.cancel(); (o = s.shift()) && o !== n; ) o.cancel();
              p(t);
            }
            function d() {
              for (; (o = c.pop()); ) {
                if (((o = o.run(_)), u)) return;
                s.unshift(o);
              }
              r = r.run(_);
            }
            return (
              p(this),
              function() {
                for (f(), r && r.cancel(); (o = s.shift()); ) o.cancel();
              }
            );
          }),
          (at.prototype.toString = function() {
            for (var t = '', n = this._actions; !n.isEmpty; )
              (t = `.${  n.head.toString()  }${t}`), (n = n.tail);
            return this._spawn.toString() + t;
          });
        let ft = 0,
          ht = 1,
          pt = 2;
        function lt(t, n) {
          (this._step = t), (this._init = n);
        }
        function yt(n, e) {
          return (
            t.Apply.test(e) || j('Future.ap', 1, 'be an Apply', e), t.ap(n, e)
          );
        }
        function _t(n, e) {
          return (
            t.Apply.test(n) || j('Future.ap', 0, 'be an Apply', n),
            arguments.length === 1 ? h(yt, n) : yt(n, e)
          );
        }
        function dt(n, e) {
          return t.Alt.test(e) || j('alt', 1, 'be an Alt', e), t.alt(n, e);
        }
        function vt(n, e) {
          return (
            t.Alt.test(n) || j('alt', 0, 'be an Alt', n),
            arguments.length === 1 ? h(dt, n) : dt(n, e)
          );
        }
        function gt(n, e) {
          return (
            t.Functor.test(e) || j('Future.map', 1, 'be a Functor', e),
            t.map(n, e)
          );
        }
        function mt(t, n) {
          return (
            S(t) || j('Future.map', 0, 'be a Function', t),
            arguments.length === 1 ? h(gt, t) : gt(t, n)
          );
        }
        function bt(n, e, r) {
          return (
            t.Bifunctor.test(r) || j('Future.bimap', 2, 'be a Bifunctor', r),
            t.bimap(n, e, r)
          );
        }
        function Ft(t, n, e) {
          return (
            S(n) || j('Future.bimap', 1, 'be a Function', n),
            arguments.length === 2 ? p(bt, t, n) : bt(t, n, e)
          );
        }
        function wt(t, n, e) {
          return (
            S(t) || j('Future.bimap', 0, 'be a Function', t),
            arguments.length === 1
              ? h(Ft, t)
              : arguments.length === 2 ? Ft(t, n) : Ft(t, n, e)
          );
        }
        function jt(n, e) {
          return (
            t.Chain.test(e) || j('Future.chain', 1, 'be a Chain', e),
            t.chain(n, e)
          );
        }
        function kt(t, n) {
          return (
            S(t) || j('Future.chain', 0, 'be a Function', t),
            arguments.length === 1 ? h(jt, t) : jt(t, n)
          );
        }
        function Ot(t, n) {
          return N(n) || O('Future.mapRej', 1, n), n.mapRej(t);
        }
        function St(t, n) {
          return N(n) || O('Future.chainRej', 1, n), n.chainRej(t);
        }
        function At(t, n) {
          return N(n) || O('Future.finally', 1, n), n.finally(t);
        }
        function xt(t, n) {
          return (
            N(t) || O('Future.finally', 0, t),
            arguments.length === 1 ? h(At, t) : At(t, n)
          );
        }
        function Rt(t, n) {
          return N(n) || O('Future.and', 1, n), t.and(n);
        }
        function Pt(t, n) {
          return N(n) || O('Future.both', 1, n), t.both(n);
        }
        function qt(t, n) {
          return N(n) || O('Future.or', 1, n), t.or(n);
        }
        function Mt(t, n) {
          return N(n) || O('Future.race', 1, n), n.race(t);
        }
        function Nt(t, n) {
          return (
            N(t) || O('Future.race', 0, t),
            arguments.length === 1 ? h(Mt, t) : Mt(t, n)
          );
        }
        function zt(t, n, e) {
          return N(e) || O('Future.fold', 2, e), e.fold(t, n);
        }
        function Et(t, n, e) {
          return (
            S(n) || j('Future.fold', 1, 'be a function', n),
            arguments.length === 2 ? p(zt, t, n) : zt(t, n, e)
          );
        }
        function Tt(t, n) {
          return N(n) || O('Future.done', 1, n), n.done(t);
        }
        function Ct(t, n, e) {
          return N(e) || O('Future.fork', 2, e), e._fork(t, n);
        }
        function Wt(t, n, e) {
          return (
            S(n) || j('Future.fork', 1, 'be a function', n),
            arguments.length === 2 ? p(Ct, t, n) : Ct(t, n, e)
          );
        }
        function Lt(t, n) {
          return N(n) || O('Future.value', 1, n), n.value(t);
        }
        function Bt(t, n) {
          (this._mval = t), (this._mfunc = n);
        }
        function It(t) {
          return t.isSettled()
            ? t
            : D(t)
              ? this
              : typeof t._time === 'number'
                ? t._time < this._time ? t : this
                : z._race.call(this, t);
        }
        function Dt(t, n) {
          (this._time = t), (this._value = n);
        }
        function Qt(t, n) {
          (this._time = t), (this._value = n);
        }
        function Gt(t, n) {
          return t === 1 / 0 ? I : new Dt(t, n);
        }
        function Zt(t, n) {
          return t === 1 / 0 ? I : new Qt(t, n);
        }
        function $t(t) {
          this._fn = t;
        }
        function Ut(t) {
          return S(t) || j('Future.try', 0, 'be a function', t), new $t(t);
        }
        (lt.prototype = Object.create(z)),
          (lt.prototype._fork = function(t, n) {
            let e = this._step,
              r = this._init,
              i = ft,
              u = a,
              o = ct(r);
            function c(t) {
              (o = t), (i = i === ft ? ht : s());
            }
            function s() {
              for (; !o.done; ) {
                i = ft;
                const r = e(ct, st, o.value);
                if (((u = r._fork(t, c)), i !== ht)) return void (i = pt);
              }
              n(o.value);
            }
            return (
              s(),
              function() {
                u();
              }
            );
          }),
          (lt.prototype.toString = function() {
            return (
              `Future.chainRec(${  f(this._step)  }, ${  s(this._init)  })`
            );
          }),
          (Bt.prototype = Object.create(z)),
          (Bt.prototype._fork = function(t, n) {
            let e,
              r,
              i,
              u,
              o = !1,
              c = !1,
              f = !1;
            function h(n) {
              f || ((f = !0), t(n));
            }
            return (
              (i = this._mval._fork(h, (t) => {
                if (((i = a), !o)) return (c = !0), void (r = t);
                n(e(t));
              })),
              (u = this._mfunc._fork(h, (t) => {
                if (
                  ((u = a),
                  (function(t) {
                    S(t) ||
                      w(
                        `Future#ap expects its first argument to be a Future of a Function\n  Actual: Future.of(${ 
                          s(t) 
                          })`
                      );
                  })(t),
                  !c)
                )
                  return (o = !0), void (e = t);
                n(t(r));
              })),
              function() {
                i(), u();
              }
            );
          }),
          (Bt.prototype.toString = function() {
            return (
              `new ParallelAp(${ 
              this._mval.toString() 
              }, ${ 
              this._mfunc.toString() 
              })`
            );
          }),
          (Dt.prototype = Object.create(z)),
          (Dt.prototype._race = It),
          (Dt.prototype._swap = function() {
            return new Qt(this._time, this._value);
          }),
          (Dt.prototype._fork = function(t, n) {
            const e = setTimeout(n, this._time, this._value);
            return function() {
              clearTimeout(e);
            };
          }),
          (Dt.prototype.extractRight = function() {
            return [this._value];
          }),
          (Dt.prototype.toString = function() {
            return (
              `Future.after(${  s(this._time)  }, ${  s(this._value)  })`
            );
          }),
          (Qt.prototype = Object.create(z)),
          (Qt.prototype._race = It),
          (Qt.prototype._swap = function() {
            return new Dt(this._time, this._value);
          }),
          (Qt.prototype._fork = function(t) {
            const n = setTimeout(t, this._time, this._value);
            return function() {
              clearTimeout(n);
            };
          }),
          (Qt.prototype.extractLeft = function() {
            return [this._value];
          }),
          (Qt.prototype.toString = function() {
            return (
              `Future.rejectAfter(${ 
              s(this._time) 
              }, ${ 
              s(this._value) 
              })`
            );
          }),
          ($t.prototype = Object.create(z)),
          ($t.prototype._fork = function(t, n) {
            let e;
            try {
              e = this._fn();
            } catch (n) {
              return t(n), a;
            }
            return n(e), a;
          }),
          ($t.prototype.toString = function() {
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
          return R((n = t)) && S(n.next)
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
            t.done || N(t.value)
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
          return S(t) || j('Future.do', 0, 'be a Function', t), new hn(t);
        }
        function ln(t, n, e) {
          (this._acquire = t), (this._dispose = n), (this._consume = e);
        }
        function yn(t, n, e) {
          return S(e) || j('Future.hook', 2, 'be a Future', e), new ln(t, n, e);
        }
        function _n(t, n, e) {
          return (
            S(n) || j('Future.hook', 1, 'be a function', n),
            arguments.length === 2 ? p(yn, t, n) : yn(t, n, e)
          );
        }
        function dn(t) {
          this._fn = t;
        }
        function vn(t, n) {
          return N(t)
            ? t
            : O(
                'Future.parallel',
                `its second argument to be an array of valid Futures. The value at position ${ 
                  n 
                  } in the array is not a Future`,
                t
              );
        }
        function gn(t, n) {
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
                  i = 0;
                i < n;
                i++
              )
                t[i] && t[i][e](r), (t[i] = void 0);
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
              this._fn(this._a, (r, i) => {
                e && ((e = !1), r ? t(r) : n(i));
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
              this._fn(this._a, this._b, (r, i) => {
                e && ((e = !1), r ? t(r) : n(i));
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
              this._fn(this._a, this._b, this._c, (r, i) => {
                e && ((e = !1), r ? t(r) : n(i));
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
              i,
              u = this._fn,
              o = this._a,
              a = !0;
            return (
              ((e = u(o)),
              (r = u),
              (i = o),
              A(e)
                ? e
                : w(
                    `Future.encaseP expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With: ${ 
                      s(i)}`
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
              i,
              u,
              o = this._fn,
              a = this._a,
              c = this._b,
              h = !0;
            return (
              ((e = o(a, c)),
              (r = o),
              (i = a),
              (u = c),
              A(e)
                ? e
                : w(
                    `Future.encaseP2 expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With 1: ${ 
                      s(i) 
                      }\n  With 2: ${ 
                      s(u)}`
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
              i,
              u,
              o,
              a = this._fn,
              c = this._a,
              h = this._b,
              p = this._c,
              l = !0;
            return (
              ((e = a(c, h, p)),
              (r = a),
              (i = c),
              (u = h),
              (o = p),
              A(e)
                ? e
                : w(
                    `Future.encaseP3 expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r) 
                      }\n  With 1: ${ 
                      s(i) 
                      }\n  With 2: ${ 
                      s(u) 
                      }\n  With 3: ${ 
                      s(o)}`
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
              i = sn(this._generator()),
              u = ft,
              o = a;
            function c(t) {
              if (((r = t), u === pt)) return s();
              (u = ht), (e = fn(i.next(r)));
            }
            function s() {
              for (e = fn(i.next(r)); !e.done; )
                if (((u = ft), (o = e.value._fork(t, c)), u !== ht))
                  return void (u = pt);
              n(e.value);
            }
            return (
              s(),
              function() {
                o();
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
              i,
              u = this._acquire,
              o = this._dispose,
              c = this._consume,
              h = a,
              p = a,
              l = a;
            function y() {
              l(i);
            }
            function _() {
              let n,
                i,
                u,
                a = o(r);
              return (
                (i = o),
                (u = r),
                N((n = a)) ||
                  O(
                    'Future.hook',
                    "the first function it's given to return a Future",
                    n,
                    `\n  From calling: ${  f(i)  }\n  With: ${  s(u)}`
                  ),
                (e = a._fork(t, y))
              );
            }
            function d() {
              p(), _()();
            }
            function v(n) {
              (l = t), (i = n), _();
            }
            function g(t) {
              (l = n), (i = t), _();
            }
            return (
              (h = u._fork(t, (t) => {
                const n = c((r = t));
                (function(t, n, e) {
                  N(t) ||
                    O(
                      'Future.hook',
                      "the second function it's given to return a Future",
                      t,
                      `\n  From calling: ${  f(n)  }\n  With: ${  s(e)}`
                    );
                })(n, c, r),
                  (e = d),
                  (p = n._fork(v, g));
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
              this._fn((r, i) => {
                e && ((e = !1), r ? t(r) : n(i));
              }),
              function() {
                e = !1;
              }
            );
          }),
          (dn.prototype.toString = function() {
            return `Future.node(${  f(this._fn)  })`;
          }),
          (gn.prototype = Object.create(z)),
          (gn.prototype._fork = function(t, n) {
            let e = this._futures,
              r = this._length,
              i = this._max,
              u = new Array(r),
              o = new Array(r),
              c = 0,
              s = 0,
              f = !1;
            function h() {
              for (let t = 0; t < r; t++) u[t] && u[t]();
            }
            function p(i) {
              s++,
                (u[i] = e[i]._fork(
                  (n) => {
                    (u[i] = a), h(), t(n);
                  },
                  (t) => {
                    (u[i] = a),
                      (o[i] = t),
                      s--,
                      c === r && s === 0 ? n(o) : f && l();
                  }
                ));
            }
            function l() {
              for (f = !1; c < r && s < i; ) p(c++);
              f = !0;
            }
            return l(), h;
          }),
          (gn.prototype.toString = function() {
            return (
              `Future.parallel(${  this._max  }, ${  s(this._futures)  })`
            );
          });
        const mn = new W([]);
        function bn(t, n) {
          let e;
          (e = n),
            Array.isArray(e) || j('Future.parallel', 1, 'be an array', n);
          const r = (function(t, n) {
            for (var e = t.length, r = new Array(e), i = 0; i < e; i++)
              r[i] = n(t[i], i, t);
            return r;
          })(n, vn);
          return r.length === 0 ? mn : new gn(t, r);
        }
        function Fn(t) {
          this._fn = t;
        }
        (Fn.prototype = Object.create(z)),
          (Fn.prototype._fork = function(t, n) {
            let e,
              r,
              i = !0;
            return (
              ((e = this._fn()),
              (r = this._fn),
              A(e)
                ? e
                : w(
                    `Future.tryP expects the function it's given to return a Promise/Thenable\n  Actual: ${ 
                      s(e) 
                      }\n  From calling: ${ 
                      f(r)}`
                  )).then(
                y((t) => {
                  i && ((i = !1), n(t));
                }),
                y((n) => {
                  i && ((i = !1), t(n));
                })
              ),
              function() {
                i = !1;
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
          (M.of = M[_.of] = L),
          (M.chainRec = M[_.chainRec] = function(t, n) {
            return new lt(t, n);
          }),
          (M.reject = C),
          (M.ap = _t),
          (M.map = mt),
          (M.bimap = wt),
          (M.chain = kt);
        const wn = r(M, I, Nt, (t, n) => new Bt(t, n));
        function jn(t) {
          return t instanceof wn || e(t) === wn['@@type'];
        }
        (wn.of = wn[_.of]),
          (wn.zero = wn[_.zero]),
          (wn.map = mt),
          (wn.ap = _t),
          (wn.alt = vt);
        const kn = Object.freeze({
          Future: M,
          default: M,
          Par: wn,
          isParallel: jn,
          seq(t) {
            return jn(t) || j('Future.seq', 0, 'to be a Par', t), t.sequential;
          },
          isFuture: N,
          reject: C,
          of: L,
          never: I,
          isNever: D,
          after(t, n) {
            return (
              x(t) || j('Future.after', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(Gt, t) : Gt(t, n)
            );
          },
          rejectAfter(t, n) {
            return (
              x(t) || j('Future.rejectAfter', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(Zt, t) : Zt(t, n)
            );
          },
          attempt: Ut,
          try: Ut,
          cache(t) {
            return N(t) || O('Future.cache', 0, t), new Ht(t);
          },
          encase: function t(n, e) {
            return (
              S(n) || j('Future.encase', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new Kt(n, e)
            );
          },
          encase2: function t(n, e, r) {
            switch ((S(n) || j('Future.encase2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new tn(n, e, r);
            }
          },
          encase3: function t(n, e, r, i) {
            switch ((S(n) || j('Future.encase3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new nn(n, e, r, i);
            }
          },
          encaseN: function t(n, e) {
            return (
              S(n) || j('Future.encaseN', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new en(n, e)
            );
          },
          encaseN2: function t(n, e, r) {
            switch ((S(n) || j('Future.encaseN2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new rn(n, e, r);
            }
          },
          encaseN3: function t(n, e, r, i) {
            switch ((S(n) || j('Future.encaseN3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new un(n, e, r, i);
            }
          },
          encaseP: function t(n, e) {
            return (
              S(n) || j('Future.encaseP', 0, 'be a function', n),
              arguments.length === 1 ? h(t, n) : new on(n, e)
            );
          },
          encaseP2: function t(n, e, r) {
            switch ((S(n) || j('Future.encaseP2', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              default:
                return new an(n, e, r);
            }
          },
          encaseP3: function t(n, e, r, i) {
            switch ((S(n) || j('Future.encaseP3', 0, 'be a function', n),
            arguments.length)) {
              case 1:
                return h(t, n);
              case 2:
                return p(t, n, e);
              case 3:
                return l(t, n, e, r);
              default:
                return new cn(n, e, r, i);
            }
          },
          go: pn,
          do: pn,
          hook(t, n, e) {
            return (
              N(t) || O('Future.hook', 0, t),
              arguments.length === 1
                ? h(_n, t)
                : arguments.length === 2 ? _n(t, n) : _n(t, n, e)
            );
          },
          node(t) {
            return S(t) || j('Future.node', 0, 'be a function', t), new dn(t);
          },
          parallel(t, n) {
            return (
              x(t) || j('Future.parallel', 0, 'be a positive integer', t),
              arguments.length === 1 ? h(bn, t) : bn(t, n)
            );
          },
          tryP(t) {
            return S(t) || j('Future.tryP', 0, 'be a function', t), new Fn(t);
          },
          ap: _t,
          alt: vt,
          map: mt,
          bimap: wt,
          chain: kt,
          mapRej(t, n) {
            return (
              S(t) || j('Future.mapRej', 0, 'be a Function', t),
              arguments.length === 1 ? h(Ot, t) : Ot(t, n)
            );
          },
          chainRej(t, n) {
            return (
              S(t) || j('Future.chainRej', 0, 'be a Function', t),
              arguments.length === 1 ? h(St, t) : St(t, n)
            );
          },
          lastly: xt,
          finally: xt,
          and(t, n) {
            return (
              N(t) || O('Future.and', 0, t),
              arguments.length === 1 ? h(Rt, t) : Rt(t, n)
            );
          },
          both(t, n) {
            return (
              N(t) || O('Future.both', 0, t),
              arguments.length === 1 ? h(Pt, t) : Pt(t, n)
            );
          },
          or(t, n) {
            return (
              N(t) || O('Future.or', 0, t),
              arguments.length === 1 ? h(qt, t) : qt(t, n)
            );
          },
          race: Nt,
          swap(t) {
            return N(t) || O('Future.swap', 0, t), t.swap();
          },
          fold(t, n, e) {
            return (
              S(t) || j('Future.fold', 0, 'be a function', t),
              arguments.length === 1
                ? h(Et, t)
                : arguments.length === 2 ? Et(t, n) : Et(t, n, e)
            );
          },
          done(t, n) {
            return (
              S(t) || j('Future.done', 0, 'be a Function', t),
              arguments.length === 1 ? h(Tt, t) : Tt(t, n)
            );
          },
          fork(t, n, e) {
            return (
              S(t) || j('Future.fork', 0, 'be a function', t),
              arguments.length === 1
                ? h(Wt, t)
                : arguments.length === 2 ? Wt(t, n) : Wt(t, n, e)
            );
          },
          promise(t) {
            return N(t) || O('Future.promise', 0, t), t.promise();
          },
          value(t, n) {
            return (
              S(t) || j('Future.value', 0, 'be a Function', t),
              arguments.length === 1 ? h(Lt, t) : Lt(t, n)
            );
          },
          extractLeft(t) {
            return N(t) || O('Future.extractLeft', 0, t), t.extractLeft();
          },
          extractRight(t) {
            return N(t) || O('Future.extractRight', 0, t), t.extractRight();
          },
        });
        return Object.assign(M, kn);
      })(H, K, tt, nt, rt);
    }),
    ut = it.isFuture,
    ot = it.of,
    at = it.reject,
    ct = function(t) {
      return Array.isArray(t);
    },
    st = function(t) {
      return Q(ct, U(ot, t), t);
    },
    ft = N((t, n) => {
      if (ut(n)) return E(st(t))(n);
      let e = n;
      return (
        st(t)(n).fork(
          (t) => (e = t),
          (t) => (e = t)
        ),
        e
      );
    }),
    ht = N((t, n, e) => {
      let r;
      return (
        ct(n)
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
        ot(e)
      );
    }),
    pt = N((t, n, e) => ft(ht(t, n))(e)),
    lt = pt('add'),
    yt = function(t) {
      return t && t.nodeType === 1;
    },
    _t = N((t, n) => n.hasAttribute(t)
        ? ot(n.getAttribute(t))
        : at({ error: `Sorry, ${  t  } was not found.` })),
    dt = N((t, n) => ft(_t(t))(n)),
    vt = N((t, n) => ot(t in n)),
    gt = N((t, n) => ft(vt(t))(n)),
    mt = N((t, n) => gt(t, n)
        ? ot(n[t])
        : at({ error: `Sorry, ${  t  } was not found.` })),
    bt = N((t, n) => ft(mt(t))(n)),
    Ft = N((t, n) => I(bt(t), bt('dataset'))(n)),
    wt = N((t, n) => ot(n.hasAttribute(t))),
    jt = N((t, n) => ft(wt(t))(n)),
    kt = N((t, n) => ot(n.classList.contains(t))),
    Ot = N((t, n) => ft(kt(t))(n)),
    St = N((t, n) => I(gt(t), bt('dataset'))(n)),
    At = N((t, n) => n.removeAttribute(t), ot(n)),
    xt = N((t, n) => ft(At(t))(n)),
    Rt = pt('remove'),
    Pt = N((t, n) => {
      if (St(t, n) && !delete n.dataset[t])
        return at({ error: `Property ${  t  } is non-configurable.` });
      return ot(n);
    }),
    qt = N((t, n) => ft(Pt(t))(n)),
    Mt = N((t, n) => {
      if (gt(t, n) && !delete n[t])
        return at({ error: `Property ${  t  } is non-configurable.` });
      return ot(n);
    }),
    Nt = N((t, n) => ft(Mt(t))(n)),
    zt = N((t, n, e) => e.setAttribute(t, n), ot(e)),
    Et = N((t, n, e) => ft(zt(t, n))(e)),
    Tt = /^[a-zA-Z0-9]?[a-zA-Z0-9_:.]*[a-zA-Z0-9]$/,
    Ct = N((t, n, e) => (function(t) {
        const n = t.match(Tt);
        return n && n.length === 1;
      })(t)
        ? ((e.dataset[t] = n), ot(e))
        : at({ error: `Data property ${  t  } is not a valid property name` })),
    Wt = N((t, n, e) => ft(Ct(t, n))(e)),
    Lt = N((t, n, e) => (e[t] = n), ot(e)),
    Bt = N((t, n, e) => ft(Lt(t, n))(e)),
    It = pt('toggle'),
    Dt = Object.freeze({
      addClass: lt,
      classList: pt,
      dom(t) {
        const n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return it((e, r) => {
          const i = yt(n) ? n.querySelector(t) : document.querySelector(t);
          i ? r(i) : e({ error: `Element with selector ${  t  } not found.` });
        });
      },
      domAll(t) {
        const n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return it((e, r) => {
          const i = yt(n) ? n.querySelectorAll(t) : document.querySelectorAll(t);
          i.length > 0
            ? r(Array.from(i))
            : e({ error: `Elements with selector ${  t  } not found.` });
        });
      },
      getAttr: dt,
      getData: Ft,
      getProp: bt,
      hasAttr: jt,
      hasClass: Ot,
      hasData: St,
      hasProp: gt,
      removeAttr: xt,
      removeClass: Rt,
      removeData: qt,
      removeProp: Nt,
      setAttr: Et,
      setData: Wt,
      setProp: Bt,
      toggleClass: It,
    });
  return Object.assign({}, Dt);
})();
