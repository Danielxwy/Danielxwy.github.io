var j = {
    scope: {}
};
j.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, r, p) {
    if (p.get || p.set) {
        throw new TypeError("ES3 does not support getters and setters.")
    }
    e != Array.prototype && e != Object.prototype && (e[r] = p.value)
};
j.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
};
j.global = j.getGlobal(this);
j.SYMBOL_PREFIX = "jscomp_symbol_";
j.initSymbol = function() {
    j.initSymbol = function() {};
    j.global.Symbol || (j.global.Symbol = j.Symbol)
};
j.symbolCounter_ = 0;
j.Symbol = function(e) {
    return j.SYMBOL_PREFIX + (e || "") + j.symbolCounter_++
};
j.initSymbolIterator = function() {
    j.initSymbol();
    var e = j.global.Symbol.iterator;
    e || (e = j.global.Symbol.iterator = j.global.Symbol("iterator"));
    "function" != typeof Array.prototype[e] && j.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return j.arrayIterator(this)
        }
    });
    j.initSymbolIterator = function() {}
};
j.arrayIterator = function(e) {
    var r = 0;
    return j.iteratorPrototype(function() {
        return r < e.length ? {
            done: !1,
            value: e[r++]
        } : {
            done: !0
        }
    })
};
j.iteratorPrototype = function(e) {
    j.initSymbolIterator();
    e = {
        next: e
    };
    e[j.global.Symbol.iterator] = function() {
        return this
    };
    return e
};
j.array = j.array || {};
j.iteratorFromArray = function(e, r) {
    j.initSymbolIterator();
    e instanceof String && (e += "");
    var p = 0,
        m = {
            next: function() {
                if (p < e.length) {
                    var u = p++;
                    return {
                        value: r(u, e[u]),
                        done: !1
                    }
                }
                m.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return m.next()
            }
        };
    m[Symbol.iterator] = function() {
        return m
    };
    return m
};
j.polyfill = function(e, r, p, m) {
    if (r) {
        p = j.global;
        e = e.split(".");
        for (m = 0; m < e.length - 1; m++) {
            var u = e[m];
            u in p || (p[u] = {});
            p = p[u]
        }
        e = e[e.length - 1];
        m = p[e];
        r = r(m);
        r != m && null != r && j.defineProperty(p, e, {
            configurable: !0,
            writable: !0,
            value: r
        })
    }
};
j.polyfill("Array.prototype.keys", function(e) {
    return e ? e : function() {
        return j.iteratorFromArray(this, function(e) {
            return e
        })
    }
}, "es6-impl", "es3");
var j = this;
(function(e, r) {
    "function" === typeof define && define.amd ? define([], r) : "object" === typeof module && module.exports ? module.exports = r() : e.anime = r()
})(this, function() {
    function e(a) {
        if (!h.col(a)) {
            try {
                return document.querySelectorAll(a)
            } catch (c) {}
        }
    }

    function r(a, c) {
        for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
            if (n in a) {
                var k = a[n];
                c.call(b, k, n, a) && f.push(k)
            }
        }
        return f
    }

    function p(a) {
        return a.reduce(function(a, d) {
            return a.concat(h.arr(d) ? p(d) : d)
        }, [])
    }

    function m(a) {
        if (h.arr(a)) {
            return a
        }
        h.str(a) && (a = e(a) || a);
        return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a]
    }

    function u(a, c) {
        return a.some(function(a) {
            return a === c
        })
    }

    function C(a) {
        var c = {},
            d;
        for (d in a) {
            c[d] = a[d]
        }
        return c
    }

    function D(a, c) {
        var d = C(a),
            b;
        for (b in a) {
            d[b] = c.hasOwnProperty(b) ? c[b] : a[b]
        }
        return d
    }

    function z(a, c) {
        var d = C(a),
            b;
        for (b in c) {
            d[b] = h.und(a[b]) ? c[b] : a[b]
        }
        return d
    }

    function T(a) {
        a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, c, d, k) {
            return c + c + d + d + k + k
        });
        var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        a = parseInt(c[1], 16);
        var d = parseInt(c[2], 16),
            c = parseInt(c[3], 16);
        return "rgba(" + a + "," + d + "," + c + ",1)"
    }

    function U(a) {
        function c(a, c, b) {
            0 > b && (b += 1);
            1 < b && --b;
            return b < 1 / 6 ? a + 6 * (c - a) * b : 0.5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a
        }
        var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);
        a = parseInt(d[1]) / 360;
        var b = parseInt(d[2]) / 100,
            f = parseInt(d[3]) / 100,
            d = d[4] || 1;
        if (0 == b) {
            f = b = a = f
        } else {
            var n = 0.5 > f ? f * (1 + b) : f + b - f * b,
                k = 2 * f - n,
                f = c(k, n, a + 1 / 3),
                b = c(k, n, a);
            a = c(k, n, a - 1 / 3)
        }
        return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")"
    }

    function y(a) {
        if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a)) {
            return a[2]
        }
    }

    function V(a) {
        if (-1 < a.indexOf("translate") || "perspective" === a) {
            return "px"
        }
        if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) {
            return "deg"
        }
    }

    function I(a, c) {
        return h.fnc(a) ? a(c.target, c.id, c.total) : a
    }

    function E(a, c) {
        if (c in a.style) {
            return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
        }
    }

    function J(a, c) {
        if (h.dom(a) && u(W, c)) {
            return "transform"
        }
        if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) {
            return "attribute"
        }
        if (h.dom(a) && "transform" !== c && E(a, c)) {
            return "css"
        }
        if (null != a[c]) {
            return "object"
        }
    }

    function X(a, c) {
        var d = V(c),
            d = -1 < c.indexOf("scale") ? 1 : 0 + d;
        a = a.style.transform;
        if (!a) {
            return d
        }
        for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a);) {
            f.push(b[1]), n.push(b[2])
        }
        a = r(n, function(a, b) {
            return f[b] === c
        });
        return a.length ? a[0] : d
    }

    function K(a, c) {
        switch (J(a, c)) {
            case "transform":
                return X(a, c);
            case "css":
                return E(a, c);
            case "attribute":
                return a.getAttribute(c)
        }
        return a[c] || 0
    }

    function L(a, c) {
        var d = /^(\*=|\+=|-=)/.exec(a);
        if (!d) {
            return a
        }
        var b = y(a) || 0;
        c = parseFloat(c);
        a = parseFloat(a.replace(d[0], ""));
        switch (d[0][0]) {
            case "+":
                return c + a + b;
            case "-":
                return c - a + b;
            case "*":
                return c * a + b
        }
    }

    function F(a, c) {
        return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2))
    }

    function M(a) {
        a = a.points;
        for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
            var f = a.getItem(b);
            0 < b && (c += F(d, f));
            d = f
        }
        return c
    }

    function N(a) {
        if (a.getTotalLength) {
            return a.getTotalLength()
        }
        switch (a.tagName.toLowerCase()) {
            case "circle":
                return 2 * Math.PI * a.getAttribute("r");
            case "rect":
                return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
            case "line":
                return F({
                    x: a.getAttribute("x1"),
                    y: a.getAttribute("y1")
                }, {
                    x: a.getAttribute("x2"),
                    y: a.getAttribute("y2")
                });
            case "polyline":
                return M(a);
            case "polygon":
                var c = a.points;
                return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0))
        }
    }

    function Y(a, c) {
        function d(b) {
            b = void 0 === b ? 0 : b;
            return a.el.getPointAtLength(1 <= c + b ? c + b : 0)
        }
        var b = d(),
            f = d(-1),
            n = d(1);
        switch (a.property) {
            case "x":
                return b.x;
            case "y":
                return b.y;
            case "angle":
                return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI
        }
    }

    function O(a, c) {
        var d = /-?\d*\.?\d+/g,
            b;
        b = h.pth(a) ? a.totalLength : a;
        if (h.col(b)) {
            if (h.rgb(b)) {
                var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);
                b = f ? "rgba(" + f[1] + ",1)" : b
            } else {
                b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0
            }
        } else {
            f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !/\s/g.test(b) ? f + c : f
        }
        b += "";
        return {
            original: b,
            numbers: b.match(d) ? b.match(d).map(Number) : [0],
            strings: h.str(a) || c ? b.split(d) : []
        }
    }

    function P(a) {
        a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
        return r(a, function(a, d, b) {
            return b.indexOf(a) === d
        })
    }

    function Z(a) {
        var c = P(a);
        return c.map(function(a, b) {
            return {
                target: a,
                id: b,
                total: c.length
            }
        })
    }

    function aa(a, c) {
        var d = C(c);
        if (h.arr(a)) {
            var b = a.length;
            2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = {
                value: a
            }
        }
        return m(a).map(function(a, b) {
            b = b ? 0 : c.delay;
            a = h.obj(a) && !h.pth(a) ? a : {
                value: a
            };
            h.und(a.delay) && (a.delay = b);
            return a
        }).map(function(a) {
            return z(a, d)
        })
    }

    function ba(a, c) {
        var d = {},
            b;
        for (b in a) {
            var f = I(a[b], c);
            h.arr(f) && (f = f.map(function(a) {
                return I(a, c)
            }), 1 === f.length && (f = f[0]));
            d[b] = f
        }
        d.duration = parseFloat(d.duration);
        d.delay = parseFloat(d.delay);
        return d
    }

    function ca(a) {
        return h.arr(a) ? A.apply(this, a) : Q[a]
    }

    function da(a, c) {
        var d;
        return a.tweens.map(function(b) {
            b = ba(b, c);
            var f = b.value,
                e = K(c.target, a.name),
                k = d ? d.to.original : e,
                k = h.arr(f) ? f[0] : k,
                w = L(h.arr(f) ? f[1] : f, k),
                e = y(w) || y(k) || y(e);
            b.from = O(k, e);
            b.to = O(w, e);
            b.start = d ? d.end : a.offset;
            b.end = b.start + b.delay + b.duration;
            b.easing = ca(b.easing);
            b.elasticity = (1000 - Math.min(Math.max(b.elasticity, 1), 999)) / 1000;
            b.isPath = h.pth(f);
            b.isColor = h.col(b.from.original);
            b.isColor && (b.round = 1);
            return d = b
        })
    }

    function ea(a, c) {
        return r(p(a.map(function(a) {
            return c.map(function(b) {
                var c = J(a.target, b.name);
                if (c) {
                    var d = da(b, a);
                    b = {
                        type: c,
                        property: b.name,
                        animatable: a,
                        tweens: d,
                        duration: d[d.length - 1].end,
                        delay: d[0].delay
                    }
                } else {
                    b = void 0
                }
                return b
            })
        })), function(a) {
            return !h.und(a)
        })
    }

    function R(a, c, d, b) {
        var f = "delay" === a;
        return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function(b) {
            return b[a]
        })) : f ? b.delay : d.offset + b.delay + b.duration
    }

    function fa(a) {
        var c = D(ga, a),
            d = D(S, a),
            b = Z(a.targets),
            f = [],
            e = z(c, d),
            k;
        for (k in a) {
            e.hasOwnProperty(k) || "targets" === k || f.push({
                name: k,
                offset: e.offset,
                tweens: aa(a[k], d)
            })
        }
        a = ea(b, f);
        return z(c, {
            children: [],
            animatables: b,
            animations: a,
            duration: R("duration", a, c, d),
            delay: R("delay", a, c, d)
        })
    }

    function q(a) {
        function c() {
            return window.Promise && new Promise(function(a) {
                return p = a
            })
        }

        function d(a) {
            return g.reversed ? g.duration - a : a
        }

        function b(a) {
            for (var b = 0, c = {}, d = g.animations, f = d.length; b < f;) {
                var e = d[b],
                    k = e.animatable,
                    h = e.tweens,
                    n = h.length - 1,
                    l = h[n];
                n && (l = r(h, function(b) {
                    return a < b.end
                })[0] || l);
                for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
                    var x = void 0,
                        x = l.to.numbers[t],
                        q = l.from.numbers[t],
                        x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);
                    p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));
                    n.push(x)
                }
                if (l = h.length) {
                    for (m = h[0], w = 0; w < l; w++) {
                        p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " "))
                    }
                } else {
                    m = n[0]
                }
                ha[e.type](k.target, e.property, m, c, k.id);
                e.currentValue = m;
                b++
            }
            if (b = Object.keys(c).length) {
                for (d = 0; d < b; d++) {
                    H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" ")
                }
            }
            g.currentTime = a;
            g.progress = a / g.duration * 100
        }

        function f(a) {
            if (g[a]) {
                g[a](g)
            }
        }

        function e() {
            g.remaining && !0 !== g.remaining && g.remaining--
        }

        function k(a) {
            var k = g.duration,
                n = g.offset,
                w = n + g.delay,
                r = g.currentTime,
                x = g.reversed,
                q = d(a);
            if (g.children.length) {
                var u = g.children,
                    v = u.length;
                if (q >= g.currentTime) {
                    for (var G = 0; G < v; G++) {
                        u[G].seek(q)
                    }
                } else {
                    for (; v--;) {
                        u[v].seek(q)
                    }
                }
            }
            if (q >= w || !k) {
                g.began || (g.began = !0, f("begin")), f("run")
            }
            if (q > n && q < k) {
                b(q)
            } else {
                if (q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k) {
                    b(k), x || e()
                }
            }
            f("update");
            a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), "Promise" in window && (p(), m = c()))), l = 0)
        }
        a = void 0 === a ? {} : a;
        var h, t, l = 0,
            p = null,
            m = c(),
            g = fa(a);
        g.reset = function() {
            var a = g.direction,
                c = g.loop;
            g.currentTime = 0;
            g.progress = 0;
            g.paused = !0;
            g.began = !1;
            g.completed = !1;
            g.reversed = "reverse" === a;
            g.remaining = "alternate" === a && 1 === c ? 2 : c;
            b(0);
            for (a = g.children.length; a--;) {
                g.children[a].reset()
            }
        };
        g.tick = function(a) {
            h = a;
            t || (t = h);
            k((l + h - t) * q.speed)
        };
        g.seek = function(a) {
            k(d(a))
        };
        g.pause = function() {
            var a = v.indexOf(g); - 1 < a && v.splice(a, 1);
            g.paused = !0
        };
        g.play = function() {
            g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia())
        };
        g.reverse = function() {
            g.reversed = !g.reversed;
            t = 0;
            l = d(g.currentTime)
        };
        g.restart = function() {
            g.pause();
            g.reset();
            g.play()
        };
        g.finished = m;
        g.reset();
        g.autoplay && g.play();
        return g
    }
    var ga = {
            update: void 0,
            begin: void 0,
            run: void 0,
            complete: void 0,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            offset: 0
        },
        S = {
            duration: 1000,
            delay: 0,
            easing: "easeOutElastic",
            elasticity: 500,
            round: 0
        },
        W = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
        H, h = {
            arr: function(a) {
                return Array.isArray(a)
            },
            obj: function(a) {
                return -1 < Object.prototype.toString.call(a).indexOf("Object")
            },
            pth: function(a) {
                return h.obj(a) && a.hasOwnProperty("totalLength")
            },
            svg: function(a) {
                return a instanceof SVGElement
            },
            dom: function(a) {
                return a.nodeType || h.svg(a)
            },
            str: function(a) {
                return "string" === typeof a
            },
            fnc: function(a) {
                return "function" === typeof a
            },
            und: function(a) {
                return "undefined" === typeof a
            },
            hex: function(a) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
            },
            rgb: function(a) {
                return /^rgb/.test(a)
            },
            hsl: function(a) {
                return /^hsl/.test(a)
            },
            col: function(a) {
                return h.hex(a) || h.rgb(a) || h.hsl(a)
            }
        },
        A = function() {
            function a(a, d, b) {
                return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a
            }
            return function(c, d, b, f) {
                if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
                    var e = new Float32Array(11);
                    if (c !== d || b !== f) {
                        for (var k = 0; 11 > k; ++k) {
                            e[k] = a(0.1 * k, c, b)
                        }
                    }
                    return function(k) {
                        if (c === d && b === f) {
                            return k
                        }
                        if (0 === k) {
                            return 0
                        }
                        if (1 === k) {
                            return 1
                        }
                        for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) {
                            h += 0.1
                        }--l;
                        var l = h + (k - e[l]) / (e[l + 1] - e[l]) * 0.1,
                            n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
                        if (0.001 <= n) {
                            for (h = 0; 4 > h; ++h) {
                                n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
                                if (0 === n) {
                                    break
                                }
                                var m = a(l, c, b) - k,
                                    l = l - m / n
                            }
                            k = l
                        } else {
                            if (0 === n) {
                                k = l
                            } else {
                                var l = h,
                                    h = h + 0.1,
                                    g = 0;
                                do {
                                    m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m
                                } while (1e-7 < Math.abs(n) && 10 > ++g);
                                k = m
                            }
                        }
                        return a(k, d, f)
                    }
                }
            }
        }(),
        Q = function() {
            function a(a, b) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b)
            }
            var c = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
                d = {
                    In: [
                        [0.55, 0.085, 0.68, 0.53],
                        [0.55, 0.055, 0.675, 0.19],
                        [0.895, 0.03, 0.685, 0.22],
                        [0.755, 0.05, 0.855, 0.06],
                        [0.47, 0, 0.745, 0.715],
                        [0.95, 0.05, 0.795, 0.035],
                        [0.6, 0.04, 0.98, 0.335],
                        [0.6, -0.28, 0.735, 0.045], a
                    ],
                    Out: [
                        [0.25, 0.46, 0.45, 0.94],
                        [0.215, 0.61, 0.355, 1],
                        [0.165, 0.84, 0.44, 1],
                        [0.23, 1, 0.32, 1],
                        [0.39, 0.575, 0.565, 1],
                        [0.19, 1, 0.22, 1],
                        [0.075, 0.82, 0.165, 1],
                        [0.175, 0.885, 0.32, 1.275],
                        function(b, c) {
                            return 1 - a(1 - b, c)
                        }
                    ],
                    InOut: [
                        [0.455, 0.03, 0.515, 0.955],
                        [0.645, 0.045, 0.355, 1],
                        [0.77, 0, 0.175, 1],
                        [0.86, 0, 0.07, 1],
                        [0.445, 0.05, 0.55, 0.95],
                        [1, 0, 0, 1],
                        [0.785, 0.135, 0.15, 0.86],
                        [0.68, -0.55, 0.265, 1.55],
                        function(b, c) {
                            return 0.5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2
                        }
                    ]
                },
                b = {
                    linear: A(0.25, 0.25, 0.75, 0.75)
                },
                f = {},
                e;
            for (e in d) {
                f.type = e, d[f.type].forEach(function(a) {
                    return function(d, f) {
                        b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply(j, d)
                    }
                }(f)), f = {
                    type: f.type
                }
            }
            return b
        }(),
        ha = {
            css: function(a, c, d) {
                return a.style[c] = d
            },
            attribute: function(a, c, d) {
                return a.setAttribute(c, d)
            },
            object: function(a, c, d) {
                return a[c] = d
            },
            transform: function(a, c, d, b, f) {
                b[f] || (b[f] = []);
                b[f].push(c + "(" + d + ")")
            }
        },
        v = [],
        B = 0,
        ia = function() {
            function a() {
                B = requestAnimationFrame(c)
            }

            function c(c) {
                var b = v.length;
                if (b) {
                    for (var d = 0; d < b;) {
                        v[d] && v[d].tick(c), d++
                    }
                    a()
                } else {
                    cancelAnimationFrame(B), B = 0
                }
            }
            return a
        }();
    q.version = "2.2.0";
    q.speed = 1;
    q.running = v;
    q.remove = function(a) {
        a = P(a);
        for (var c = v.length; c--;) {
            for (var d = v[c], b = d.animations, f = b.length; f--;) {
                u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause())
            }
        }
    };
    q.getValue = K;
    q.path = function(a, c) {
        var d = h.str(a) ? e(a)[0] : a,
            b = c || 100;
        return function(a) {
            return {
                el: d,
                property: a,
                totalLength: N(d) * (b / 100)
            }
        }
    };
    q.setDashoffset = function(a) {
        var c = N(a);
        a.setAttribute("stroke-dasharray", c);
        return c
    };
    q.bezier = A;
    q.easings = Q;
    q.timeline = function(a) {
        var c = q(a);
        c.pause();
        c.duration = 0;
        c.add = function(d) {
            c.children.forEach(function(a) {
                a.began = !0;
                a.completed = !0
            });
            m(d).forEach(function(b) {
                var d = z(b, D(S, a || {}));
                d.targets = d.targets || a.targets;
                b = c.duration;
                var e = d.offset;
                d.autoplay = !1;
                d.direction = c.direction;
                d.offset = h.und(e) ? b : L(e, b);
                c.began = !0;
                c.completed = !0;
                c.seek(d.offset);
                d = q(d);
                d.began = !0;
                d.completed = !0;
                d.duration > b && (c.duration = d.duration);
                c.children.push(d)
            });
            c.seek(0);
            c.reset();
            c.autoplay && c.restart();
            return c
        };
        return c
    };
    q.random = function(a, c) {
        return Math.floor(Math.random() * (c - a + 1)) + a
    };
    return q
});

function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left, pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection(e) {
    var t = anime.random(0, 360) * Math.PI / 180,
        a = anime.random(50, 180),
        n = [-1, 1][anime.random(0, 1)] * a * config.particuleSpreadSize;
    return {
        x: e.x + n * Math.cos(t),
        y: e.y + n * Math.sin(t)
    }
}

function createParticule(e, t) {
    var a = {};
    return a.x = e, a.y = t, a.color = colors[anime.random(0, colors.length - 1)], a.radius = anime.random(16 * config.particuleSize, 32 * config.particuleSize), a.endPos = setParticuleDirection(a), a.draw = function() {
        ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.fillStyle = a.color, ctx.fill()
    }, a
}

function createCircle(e, t) {
    var a = {};
    return a.x = e, a.y = t, a.color = config.circleColor, a.radius = 0.1, a.alpha = 0.5, a.lineWidth = 6, a.draw = function() {
        ctx.globalAlpha = a.alpha, ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.lineWidth = a.lineWidth, ctx.strokeStyle = a.color, ctx.stroke(), ctx.globalAlpha = 1
    }, a
}

function renderParticule(e) {
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw()
    }
}

function animateParticules(e, t) {
    for (var circle = createCircle(e, t), particules = [], i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(e, t))
    }
    anime.timeline().add({
        targets: particules,
        x: function(e) {
            return e.endPos.x
        },
        y: function(e) {
            return e.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200 / config.animeSpeed, 1800 / config.animeSpeed),
        easing: "easeOutExpo",
        update: renderParticule
    }).add({
        targets: circle,
        radius: anime.random(80 * config.circleSize, 160 * config.circleSize),
        lineWidth: 0,
        alpha: {
            value: 0,
            easing: "linear",
            duration: anime.random(600 / config.animeSpeed, 800 / config.animeSpeed)
        },
        duration: anime.random(1200 / config.animeSpeed, 1800 / config.animeSpeed),
        easing: "easeOutExpo",
        update: renderParticule,
        offset: 0
    })
}

function debounce(fn, delay) {
    var timer;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

const config = {
    circleColor: "#68BEF1",// 外环颜色
    particuleColors: ["#93D0F4", "#93D1F4", "#B3DFF7", "#F0F8FC"],// 粒子颜色
    numberOfParticules: 20,// 粒子数量
    animeSpeed: 1.2,// 动画速度
    circleSize: 0.8,// 外环大小
    particuleSize: 0.8,// 粒子大小
    particuleSpreadSize: 0.8,// 粒子扩散范围
};

var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
    var ctx = canvasEl.getContext("2d"),
        numberOfParticules = config.numberOfParticules,
        pointerX = 0,
        pointerY = 0,
        tap = "mousedown",
        colors = config.particuleColors,
        setCanvasSize = debounce(function() {
            canvasEl.width = 2 * window.innerWidth, canvasEl.height = 2 * window.innerHeight, canvasEl.style.width = window.innerWidth + "px", canvasEl.style.height = window.innerHeight + "px", canvasEl.getContext("2d").scale(2, 2)
        }, 500),
        render = anime({
            duration: 1 / 0,
            update: function() {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
            }
        });
    document.addEventListener(tap, function(e) {
        render.play(), updateCoords(e), animateParticules(pointerX, pointerY)
        // "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(), updateCoords(e), animateParticules(pointerX, pointerY))
    }, !1), setCanvasSize(), window.addEventListener("resize", setCanvasSize, !1)
};