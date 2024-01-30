var c;
c || (c = typeof Module !== 'undefined' ? Module : {});
var aa = {},
    ba;
for (ba in c) c.hasOwnProperty(ba) && (aa[ba] = c[ba]);
var ca = "./this.program",
    da = !1,
    ea = !1,
    fa = !1,
    ha = !1;
da = "object" === typeof window;
ea = "function" === typeof importScripts;
fa = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
ha = !da && !fa && !ea;
if (c.ENVIRONMENT) throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
var h = "",
    ia, ja, ka, la;
if (fa) h = ea ? require("path").dirname(h) + "/" : __dirname + "/", ia = function (a, b) {
    ka || (ka = require("fs"));
    la || (la = require("path"));
    a = la.normalize(a);
    return ka.readFileSync(a, b ? null : "utf8")
}, ja = function (a) {
    a = ia(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a
}, 1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), "undefined" !== typeof module && (module.exports = c), process.on("uncaughtException", function (a) {
    throw a;
}), process.on("unhandledRejection", r), c.inspect = function () {
    return "[Emscripten Module object]"
};
else if (ha) "undefined" != typeof read && (ia = function (a) {
    return read(a)
}), ja = function (a) {
    if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
    a = read(a, "binary");
    assert("object" === typeof a);
    return a
}, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
else if (da || ea) ea ? h = self.location.href : document.currentScript && (h = document.currentScript.src), h = 0 !== h.indexOf("blob:") ? h.substr(0,
    h.lastIndexOf("/") + 1) : "", ia = function (a) {
    var b = new XMLHttpRequest;
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText
}, ea && (ja = function (a) {
    var b = new XMLHttpRequest;
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response)
});
else throw Error("environment detection error");
var ma = c.print || console.log.bind(console),
    t = c.printErr || console.warn.bind(console);
for (ba in aa) aa.hasOwnProperty(ba) && (c[ba] = aa[ba]);
aa = null;
Object.getOwnPropertyDescriptor(c, "arguments") || Object.defineProperty(c, "arguments", {
    configurable: !0,
    get: function () {
        r("Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
c.thisProgram && (ca = c.thisProgram);
Object.getOwnPropertyDescriptor(c, "thisProgram") || Object.defineProperty(c, "thisProgram", {
    configurable: !0,
    get: function () {
        r("Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
Object.getOwnPropertyDescriptor(c, "quit") || Object.defineProperty(c, "quit", {
    configurable: !0,
    get: function () {
        r("Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
assert("undefined" === typeof c.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof c.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof c.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof c.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof c.read, "Module.read option was removed (modify read_ in JS)");
assert("undefined" === typeof c.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
assert("undefined" === typeof c.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
assert("undefined" === typeof c.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
assert("undefined" === typeof c.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
Object.getOwnPropertyDescriptor(c, "read") || Object.defineProperty(c, "read", {
    configurable: !0,
    get: function () {
        r("Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
Object.getOwnPropertyDescriptor(c, "readAsync") || Object.defineProperty(c, "readAsync", {
    configurable: !0,
    get: function () {
        r("Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
Object.getOwnPropertyDescriptor(c, "readBinary") || Object.defineProperty(c, "readBinary", {
    configurable: !0,
    get: function () {
        r("Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
Object.getOwnPropertyDescriptor(c, "setWindowTitle") || Object.defineProperty(c, "setWindowTitle", {
    configurable: !0,
    get: function () {
        r("Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});

function na(a) {
    oa || (oa = {});
    oa[a] || (oa[a] = 1, t(a))
}
var oa, pa;
c.wasmBinary && (pa = c.wasmBinary);
Object.getOwnPropertyDescriptor(c, "wasmBinary") || Object.defineProperty(c, "wasmBinary", {
    configurable: !0,
    get: function () {
        r("Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
var noExitRuntime;
c.noExitRuntime && (noExitRuntime = c.noExitRuntime);
Object.getOwnPropertyDescriptor(c, "noExitRuntime") || Object.defineProperty(c, "noExitRuntime", {
    configurable: !0,
    get: function () {
        r("Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
"object" !== typeof WebAssembly && r("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
var qa, ra = new WebAssembly.Table({
        initial: 6617,
        maximum: 6617,
        element: "anyfunc"
    }),
    sa = !1;

function assert(a, b) {
    a || r("Assertion failed: " + b)
}
var ta = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

function ua(a, b, d) {
    var e = b + d;
    for (d = b; a[d] && !(d >= e);) ++d;
    if (16 < d - b && a.subarray && ta) return ta.decode(a.subarray(b, d));
    for (e = ""; b < d;) {
        var g = a[b++];
        if (g & 128) {
            var f = a[b++] & 63;
            if (192 == (g & 224)) e += String.fromCharCode((g & 31) << 6 | f);
            else {
                var k = a[b++] & 63;
                224 == (g & 240) ? g = (g & 15) << 12 | f << 6 | k : (240 != (g & 248) && na("Invalid UTF-8 leading byte 0x" + g.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"), g = (g & 7) << 18 | f << 12 | k << 6 | a[b++] & 63);
                65536 > g ? e += String.fromCharCode(g) : (g -=
                    65536, e += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023))
            }
        } else e += String.fromCharCode(g)
    }
    return e
}

function y(a, b) {
    return a ? ua(A, a, b) : ""
}

function va(a, b, d, e) {
    if (!(0 < e)) return 0;
    var g = d;
    e = d + e - 1;
    for (var f = 0; f < a.length; ++f) {
        var k = a.charCodeAt(f);
        if (55296 <= k && 57343 >= k) {
            var m = a.charCodeAt(++f);
            k = 65536 + ((k & 1023) << 10) | m & 1023
        }
        if (127 >= k) {
            if (d >= e) break;
            b[d++] = k
        } else {
            if (2047 >= k) {
                if (d + 1 >= e) break;
                b[d++] = 192 | k >> 6
            } else {
                if (65535 >= k) {
                    if (d + 2 >= e) break;
                    b[d++] = 224 | k >> 12
                } else {
                    if (d + 3 >= e) break;
                    2097152 <= k && na("Invalid Unicode code point 0x" + k.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
                    b[d++] = 240 | k >> 18;
                    b[d++] = 128 | k >> 12 & 63
                }
                b[d++] = 128 | k >> 6 & 63
            }
            b[d++] = 128 | k & 63
        }
    }
    b[d] = 0;
    return d - g
}

function wa(a, b, d) {
    assert("number" == typeof d, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    va(a, A, b, d)
}

function xa(a) {
    for (var b = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
        127 >= e ? ++b : b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4
    }
    return b
}
var ya = "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

function za(a, b) {
    assert(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
    var d = a >> 1;
    for (var e = d + b / 2; !(d >= e) && Aa[d];) ++d;
    d <<= 1;
    if (32 < d - a && ya) return ya.decode(A.subarray(a, d));
    d = 0;
    for (e = "";;) {
        var g = Ba[a + 2 * d >> 1];
        if (0 == g || d == b / 2) return e;
        ++d;
        e += String.fromCharCode(g)
    }
}

function Ca(a, b, d) {
    assert(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
    assert("number" == typeof d, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    void 0 === d && (d = 2147483647);
    if (2 > d) return 0;
    d -= 2;
    var e = b;
    d = d < 2 * a.length ? d / 2 : a.length;
    for (var g = 0; g < d; ++g) Ba[b >> 1] = a.charCodeAt(g), b += 2;
    Ba[b >> 1] = 0;
    return b - e
}

function Da(a) {
    return 2 * a.length
}

function Ea(a, b) {
    assert(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
    for (var d = 0, e = ""; !(d >= b / 4);) {
        var g = B[a + 4 * d >> 2];
        if (0 == g) break;
        ++d;
        65536 <= g ? (g -= 65536, e += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023)) : e += String.fromCharCode(g)
    }
    return e
}

function Fa(a, b, d) {
    assert(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
    assert("number" == typeof d, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    void 0 === d && (d = 2147483647);
    if (4 > d) return 0;
    var e = b;
    d = e + d - 4;
    for (var g = 0; g < a.length; ++g) {
        var f = a.charCodeAt(g);
        if (55296 <= f && 57343 >= f) {
            var k = a.charCodeAt(++g);
            f = 65536 + ((f & 1023) << 10) | k & 1023
        }
        B[b >> 2] = f;
        b += 4;
        if (b + 4 > d) break
    }
    B[b >> 2] = 0;
    return b - e
}

function Ga(a) {
    for (var b = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        55296 <= e && 57343 >= e && ++d;
        b += 4
    }
    return b
}

function Ha(a) {
    var b = xa(a) + 1,
        d = Ia(b);
    d && va(a, D, d, b);
    return d
}

function Ja(a, b) {
    assert(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
    D.set(a, b)
}
var Ka, D, A, Ba, Aa, B, E, La, Ma;

function Na(a) {
    Ka = a;
    c.HEAP8 = D = new Int8Array(a);
    c.HEAP16 = Ba = new Int16Array(a);
    c.HEAP32 = B = new Int32Array(a);
    c.HEAPU8 = A = new Uint8Array(a);
    c.HEAPU16 = Aa = new Uint16Array(a);
    c.HEAPU32 = E = new Uint32Array(a);
    c.HEAPF32 = La = new Float32Array(a);
    c.HEAPF64 = Ma = new Float64Array(a)
}
assert(!0, "stack must start aligned");
assert(!0, "heap must start aligned");
c.TOTAL_STACK && assert(5242880 === c.TOTAL_STACK, "the stack size can no longer be determined at runtime");
var Oa = c.INITIAL_MEMORY || 16777216;
Object.getOwnPropertyDescriptor(c, "INITIAL_MEMORY") || Object.defineProperty(c, "INITIAL_MEMORY", {
    configurable: !0,
    get: function () {
        r("Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
assert(5242880 <= Oa, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + Oa + "! (TOTAL_STACK=5242880)");
assert("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support");
c.wasmMemory ? qa = c.wasmMemory : qa = new WebAssembly.Memory({
    initial: Oa / 65536,
    maximum: 32768
});
qa && (Ka = qa.buffer);
Oa = Ka.byteLength;
assert(0 === Oa % 65536);
assert(!0);
Na(Ka);
B[373272] = 6736128;

function Pa() {
    assert(!0);
    E[373313] = 34821223;
    E[373314] = 2310721022;
    B[0] = 1668509029
}

function Qa() {
    var a = E[373313],
        b = E[373314];
    34821223 == a && 2310721022 == b || r("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + b.toString(16) + " " + a.toString(16));
    1668509029 !== B[0] && r("Runtime error: The application has corrupted its heap memory area (address zero)!")
}
var Ra = new Int16Array(1),
    Sa = new Int8Array(Ra.buffer);
Ra[0] = 25459;
if (115 !== Sa[0] || 99 !== Sa[1]) throw "Runtime error: expected the system to be little-endian!";

function Ta(a) {
    for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(c);
        else {
            var d = b.pa;
            "number" === typeof d ? void 0 === b.X ? c.dynCall_v(d) : c.dynCall_vi(d, b.X) : d(void 0 === b.X ? null : b.X)
        }
    }
}
var Ua = [],
    Va = [],
    Wa = [],
    Xa = [],
    Ya = [],
    Za = !1;

function $a() {
    var a = c.preRun.shift();
    Ua.unshift(a)
}

function ab(a, b) {
    return 0 <= a ? a : 32 >= b ? 2 * Math.abs(1 << b - 1) + a : Math.pow(2, b) + a
}

function bb(a, b) {
    if (0 >= a) return a;
    var d = 32 >= b ? Math.abs(1 << b - 1) : Math.pow(2, b - 1);
    a >= d && (32 >= b || a > d) && (a = -2 * d + a);
    return a
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var cb = Math.abs,
    db = Math.ceil,
    eb = Math.floor,
    fb = Math.min,
    gb = 0,
    hb = null,
    ib = null,
    jb = {};

function kb() {
    gb++;
    c.monitorRunDependencies && c.monitorRunDependencies(gb);
    assert(!jb["wasm-instantiate"]);
    jb["wasm-instantiate"] = 1;
    null === hb && "undefined" !== typeof setInterval && (hb = setInterval(function () {
        if (sa) clearInterval(hb), hb = null;
        else {
            var a = !1,
                b;
            for (b in jb) a || (a = !0, t("still waiting on run dependencies:")), t("dependency: " + b);
            a && t("(end of list)")
        }
    }, 1E4))
}
c.preloadedImages = {};
c.preloadedAudios = {};

function r(a) {
    if (c.onAbort) c.onAbort(a);
    ma(a);
    t(a);
    sa = !0;
    a = "abort(" + a + ") at ";
    var b = lb();
    c.extraStackTrace && (b += "\n" + c.extraStackTrace());
    b = mb(b);
    throw new WebAssembly.RuntimeError(a + b);
}

function nb(a) {
    var b = ob;
    return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a)
}

function pb() {
    return nb("data:application/octet-stream;base64,")
}

function G(a) {
    return function () {
        var b = c.asm;
        assert(Za, "native function `" + a + "` called before runtime initialization");
        assert(!0, "native function `" + a + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
        b[a] || assert(b[a], "exported native function `" + a + "` not found");
        return b[a].apply(null, arguments)
    }
}
var ob = "libDynamsoftBarcodeReader.wasm";
if (!pb()) {
    var qb = ob;
    ob = c.locateFile ? c.locateFile(qb, h) : h + qb
}

function rb() {
    try {
        if (pa) return new Uint8Array(pa);
        if (ja) return ja(ob);
        throw "both async and sync fetching of the wasm failed";
    } catch (a) {
        r(a)
    }
}

function sb() {
    return pa || !da && !ea || "function" !== typeof fetch || nb("file://") ? new Promise(function (a) {
        a(rb())
    }) : fetch(ob, {
        credentials: "same-origin"
    }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + ob + "'";
        return a.arrayBuffer()
    }).catch(function () {
        return rb()
    })
}
var H, I;
Va.push({
    pa: function () {
        tb()
    }
});

function ub(a) {
    na("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
    return a
}

function mb(a) {
    return a.replace(/\b_Z[\w\d_]+/g, function (b) {
        var d = ub(b);
        return b === d ? b : d + " [" + b + "]"
    })
}

function lb() {
    var a = Error();
    if (!a.stack) {
        try {
            throw Error();
        } catch (b) {
            a = b
        }
        if (!a.stack) return "(no stack trace available)"
    }
    return a.stack.toString()
}

function vb(a, b) {
    for (var d = 0, e = a.length - 1; 0 <= e; e--) {
        var g = a[e];
        "." === g ? a.splice(e, 1) : ".." === g ? (a.splice(e, 1), d++) : d && (a.splice(e, 1), d--)
    }
    if (b)
        for (; d; d--) a.unshift("..");
    return a
}

function wb(a) {
    var b = "/" === a.charAt(0),
        d = "/" === a.substr(-1);
    (a = vb(a.split("/").filter(function (e) {
        return !!e
    }), !b).join("/")) || b || (a = ".");
    a && d && (a += "/");
    return (b ? "/" : "") + a
}

function xb(a) {
    var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
    a = b[0];
    b = b[1];
    if (!a && !b) return ".";
    b && (b = b.substr(0, b.length - 1));
    return a + b
}

function yb(a) {
    if ("/" === a) return "/";
    var b = a.lastIndexOf("/");
    return -1 === b ? a : a.substr(b + 1)
}

function zb() {
    for (var a = "", b = !1, d = arguments.length - 1; - 1 <= d && !b; d--) {
        b = 0 <= d ? arguments[d] : "/";
        if ("string" !== typeof b) throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0)
    }
    a = vb(a.split("/").filter(function (e) {
        return !!e
    }), !b).join("/");
    return (b ? "/" : "") + a || "."
}
var Ab = [];

function Bb(a, b) {
    Ab[a] = {
        input: [],
        output: [],
        S: b
    };
    Cb(a, Db)
}
var Db = {
        open: function (a) {
            var b = Ab[a.node.rdev];
            if (!b) throw new J(43);
            a.tty = b;
            a.seekable = !1
        },
        close: function (a) {
            a.tty.S.flush(a.tty)
        },
        flush: function (a) {
            a.tty.S.flush(a.tty)
        },
        read: function (a, b, d, e) {
            if (!a.tty || !a.tty.S.qa) throw new J(60);
            for (var g = 0, f = 0; f < e; f++) {
                try {
                    var k = a.tty.S.qa(a.tty)
                } catch (m) {
                    throw new J(29);
                }
                if (void 0 === k && 0 === g) throw new J(6);
                if (null === k || void 0 === k) break;
                g++;
                b[d + f] = k
            }
            g && (a.node.timestamp = Date.now());
            return g
        },
        write: function (a, b, d, e) {
            if (!a.tty || !a.tty.S.ha) throw new J(60);
            try {
                for (var g =
                        0; g < e; g++) a.tty.S.ha(a.tty, b[d + g])
            } catch (f) {
                throw new J(29);
            }
            e && (a.node.timestamp = Date.now());
            return g
        }
    },
    Fb = {
        qa: function (a) {
            if (!a.input.length) {
                var b = null;
                if (fa) {
                    var d = Buffer.I ? Buffer.I(256) : new Buffer(256),
                        e = 0;
                    try {
                        e = ka.readSync(process.stdin.fd, d, 0, 256, null)
                    } catch (g) {
                        if (-1 != g.toString().indexOf("EOF")) e = 0;
                        else throw g;
                    }
                    0 < e ? b = d.slice(0, e).toString("utf-8") : b = null
                } else "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline &&
                    (b = readline(), null !== b && (b += "\n"));
                if (!b) return null;
                a.input = Eb(b, !0)
            }
            return a.input.shift()
        },
        ha: function (a, b) {
            null === b || 10 === b ? (ma(ua(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
            a.output && 0 < a.output.length && (ma(ua(a.output, 0)), a.output = [])
        }
    },
    Gb = {
        ha: function (a, b) {
            null === b || 10 === b ? (t(ua(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
            a.output && 0 < a.output.length && (t(ua(a.output, 0)), a.output = [])
        }
    },
    K = {
        B: null,
        F: function () {
            return K.createNode(null, "/", 16895, 0)
        },
        createNode: function (a, b, d, e) {
            if (24576 === (d & 61440) || 4096 === (d & 61440)) throw new J(63);
            K.B || (K.B = {
                dir: {
                    node: {
                        G: K.f.G,
                        C: K.f.C,
                        lookup: K.f.lookup,
                        $: K.f.$,
                        rename: K.f.rename,
                        unlink: K.f.unlink,
                        rmdir: K.f.rmdir,
                        readdir: K.f.readdir,
                        symlink: K.f.symlink
                    },
                    stream: {
                        L: K.g.L
                    }
                },
                file: {
                    node: {
                        G: K.f.G,
                        C: K.f.C
                    },
                    stream: {
                        L: K.g.L,
                        read: K.g.read,
                        write: K.g.write,
                        ka: K.g.ka,
                        ra: K.g.ra,
                        aa: K.g.aa
                    }
                },
                link: {
                    node: {
                        G: K.f.G,
                        C: K.f.C,
                        readlink: K.f.readlink
                    },
                    stream: {}
                },
                la: {
                    node: {
                        G: K.f.G,
                        C: K.f.C
                    },
                    stream: Hb
                }
            });
            d = Ib(a, b, d, e);
            L(d.mode) ? (d.f = K.B.dir.node,
                d.g = K.B.dir.stream, d.c = {}) : 32768 === (d.mode & 61440) ? (d.f = K.B.file.node, d.g = K.B.file.stream, d.j = 0, d.c = null) : 40960 === (d.mode & 61440) ? (d.f = K.B.link.node, d.g = K.B.link.stream) : 8192 === (d.mode & 61440) && (d.f = K.B.la.node, d.g = K.B.la.stream);
            d.timestamp = Date.now();
            a && (a.c[b] = d);
            return d
        },
        jd: function (a) {
            if (a.c && a.c.subarray) {
                for (var b = [], d = 0; d < a.j; ++d) b.push(a.c[d]);
                return b
            }
            return a.c
        },
        kd: function (a) {
            return a.c ? a.c.subarray ? a.c.subarray(0, a.j) : new Uint8Array(a.c) : new Uint8Array(0)
        },
        na: function (a, b) {
            var d = a.c ? a.c.length :
                0;
            d >= b || (b = Math.max(b, d * (1048576 > d ? 2 : 1.125) >>> 0), 0 != d && (b = Math.max(b, 256)), d = a.c, a.c = new Uint8Array(b), 0 < a.j && a.c.set(d.subarray(0, a.j), 0))
        },
        Ja: function (a, b) {
            if (a.j != b)
                if (0 == b) a.c = null, a.j = 0;
                else {
                    if (!a.c || a.c.subarray) {
                        var d = a.c;
                        a.c = new Uint8Array(b);
                        d && a.c.set(d.subarray(0, Math.min(b, a.j)))
                    } else if (a.c || (a.c = []), a.c.length > b) a.c.length = b;
                    else
                        for (; a.c.length < b;) a.c.push(0);
                    a.j = b
                }
        },
        f: {
            G: function (a) {
                var b = {};
                b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
                b.ino = a.id;
                b.mode = a.mode;
                b.nlink = 1;
                b.uid = 0;
                b.gid = 0;
                b.rdev =
                    a.rdev;
                L(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.j : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
                b.atime = new Date(a.timestamp);
                b.mtime = new Date(a.timestamp);
                b.ctime = new Date(a.timestamp);
                b.va = 4096;
                b.blocks = Math.ceil(b.size / b.va);
                return b
            },
            C: function (a, b) {
                void 0 !== b.mode && (a.mode = b.mode);
                void 0 !== b.timestamp && (a.timestamp = b.timestamp);
                void 0 !== b.size && K.Ja(a, b.size)
            },
            lookup: function () {
                throw Jb[44];
            },
            $: function (a, b, d, e) {
                return K.createNode(a, b, d, e)
            },
            rename: function (a, b, d) {
                if (L(a.mode)) {
                    try {
                        var e =
                            Kb(b, d)
                    } catch (f) {}
                    if (e)
                        for (var g in e.c) throw new J(55);
                }
                delete a.parent.c[a.name];
                a.name = d;
                b.c[d] = a;
                a.parent = b
            },
            unlink: function (a, b) {
                delete a.c[b]
            },
            rmdir: function (a, b) {
                var d = Kb(a, b),
                    e;
                for (e in d.c) throw new J(55);
                delete a.c[b]
            },
            readdir: function (a) {
                var b = [".", ".."],
                    d;
                for (d in a.c) a.c.hasOwnProperty(d) && b.push(d);
                return b
            },
            symlink: function (a, b, d) {
                a = K.createNode(a, b, 41471, 0);
                a.link = d;
                return a
            },
            readlink: function (a) {
                if (40960 !== (a.mode & 61440)) throw new J(28);
                return a.link
            }
        },
        g: {
            read: function (a, b, d, e, g) {
                var f =
                    a.node.c;
                if (g >= a.node.j) return 0;
                a = Math.min(a.node.j - g, e);
                assert(0 <= a);
                if (8 < a && f.subarray) b.set(f.subarray(g, g + a), d);
                else
                    for (e = 0; e < a; e++) b[d + e] = f[g + e];
                return a
            },
            write: function (a, b, d, e, g, f) {
                assert(!(b instanceof ArrayBuffer));
                b.buffer === D.buffer && (f && na("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)"), f = !1);
                if (!e) return 0;
                a = a.node;
                a.timestamp = Date.now();
                if (b.subarray && (!a.c || a.c.subarray)) {
                    if (f) return assert(0 === g, "canOwn must imply no weird position inside the file"),
                        a.c = b.subarray(d, d + e), a.j = e;
                    if (0 === a.j && 0 === g) return a.c = b.slice(d, d + e), a.j = e;
                    if (g + e <= a.j) return a.c.set(b.subarray(d, d + e), g), e
                }
                K.na(a, g + e);
                if (a.c.subarray && b.subarray) a.c.set(b.subarray(d, d + e), g);
                else
                    for (f = 0; f < e; f++) a.c[g + f] = b[d + f];
                a.j = Math.max(a.j, g + e);
                return e
            },
            L: function (a, b, d) {
                1 === d ? b += a.position : 2 === d && 32768 === (a.node.mode & 61440) && (b += a.node.j);
                if (0 > b) throw new J(28);
                return b
            },
            ka: function (a, b, d) {
                K.na(a.node, b + d);
                a.node.j = Math.max(a.node.j, b + d)
            },
            ra: function (a, b, d, e, g, f) {
                assert(0 === b);
                if (32768 !==
                    (a.node.mode & 61440)) throw new J(43);
                a = a.node.c;
                if (f & 2 || a.buffer !== Ka) {
                    if (0 < e || e + d < a.length) a.subarray ? a = a.subarray(e, e + d) : a = Array.prototype.slice.call(a, e, e + d);
                    e = !0;
                    d = Ia(d);
                    if (!d) throw new J(48);
                    D.set(a, d)
                } else e = !1, d = a.byteOffset;
                return {
                    i: d,
                    ua: e
                }
            },
            aa: function (a, b, d, e, g) {
                if (32768 !== (a.node.mode & 61440)) throw new J(43);
                if (g & 2) return 0;
                K.g.write(a, b, 0, e, d, !1);
                return 0
            }
        }
    },
    Lb = {
        0: "Success",
        1: "Arg list too long",
        2: "Permission denied",
        3: "Address already in use",
        4: "Address not available",
        5: "Address family not supported by protocol family",
        6: "No more processes",
        7: "Socket already connected",
        8: "Bad file number",
        9: "Trying to read unreadable message",
        10: "Mount device busy",
        11: "Operation canceled",
        12: "No children",
        13: "Connection aborted",
        14: "Connection refused",
        15: "Connection reset by peer",
        16: "File locking deadlock error",
        17: "Destination address required",
        18: "Math arg out of domain of func",
        19: "Quota exceeded",
        20: "File exists",
        21: "Bad address",
        22: "File too large",
        23: "Host is unreachable",
        24: "Identifier removed",
        25: "Illegal byte sequence",
        26: "Connection already in progress",
        27: "Interrupted system call",
        28: "Invalid argument",
        29: "I/O error",
        30: "Socket is already connected",
        31: "Is a directory",
        32: "Too many symbolic links",
        33: "Too many open files",
        34: "Too many links",
        35: "Message too long",
        36: "Multihop attempted",
        37: "File or path name too long",
        38: "Network interface is not configured",
        39: "Connection reset by network",
        40: "Network is unreachable",
        41: "Too many open files in system",
        42: "No buffer space available",
        43: "No such device",
        44: "No such file or directory",
        45: "Exec format error",
        46: "No record locks available",
        47: "The link has been severed",
        48: "Not enough core",
        49: "No message of desired type",
        50: "Protocol not available",
        51: "No space left on device",
        52: "Function not implemented",
        53: "Socket is not connected",
        54: "Not a directory",
        55: "Directory not empty",
        56: "State not recoverable",
        57: "Socket operation on non-socket",
        59: "Not a typewriter",
        60: "No such device or address",
        61: "Value too large for defined data type",
        62: "Previous owner died",
        63: "Not super-user",
        64: "Broken pipe",
        65: "Protocol error",
        66: "Unknown protocol",
        67: "Protocol wrong type for socket",
        68: "Math result not representable",
        69: "Read only file system",
        70: "Illegal seek",
        71: "No such process",
        72: "Stale file handle",
        73: "Connection timed out",
        74: "Text file busy",
        75: "Cross-device link",
        100: "Device not a stream",
        101: "Bad font file fmt",
        102: "Invalid slot",
        103: "Invalid request code",
        104: "No anode",
        105: "Block device required",
        106: "Channel number out of range",
        107: "Level 3 halted",
        108: "Level 3 reset",
        109: "Link number out of range",
        110: "Protocol driver not attached",
        111: "No CSI structure available",
        112: "Level 2 halted",
        113: "Invalid exchange",
        114: "Invalid request descriptor",
        115: "Exchange full",
        116: "No data (for no delay io)",
        117: "Timer expired",
        118: "Out of streams resources",
        119: "Machine is not on the network",
        120: "Package not installed",
        121: "The object is remote",
        122: "Advertise error",
        123: "Srmount error",
        124: "Communication error on send",
        125: "Cross mount point (not really error)",
        126: "Given log. name not unique",
        127: "f.d. invalid for this operation",
        128: "Remote address changed",
        129: "Can   access a needed shared lib",
        130: "Accessing a corrupted shared lib",
        131: ".lib section in a.out corrupted",
        132: "Attempting to link in too many libs",
        133: "Attempting to exec a shared library",
        135: "Streams pipe error",
        136: "Too many users",
        137: "Socket type not supported",
        138: "Not supported",
        139: "Protocol family not supported",
        140: "Can't send after socket shutdown",
        141: "Too many references",
        142: "Host is down",
        148: "No medium (in tape drive)",
        156: "Level 2 not synchronized"
    },
    Mb = {
        Ic: 63,
        hc: 44,
        Vc: 71,
        Db: 27,
        Fb: 29,
        Ec: 60,
        Ra: 1,
        ic: 45,
        $a: 8,
        jb: 12,
        Xa: 6,
        ed: 6,
        mc: 48,
        Sa: 2,
        wb: 21,
        vc: 105,
        hb: 10,
        vb: 20,
        gd: 75,
        fc: 43,
        xc: 54,
        Hb: 31,
        Eb: 28,
        ac: 41,
        Tb: 33,
        Cc: 59,
        bd: 74,
        xb: 22,
        rc: 51,
        Uc: 70,
        Rc: 69,
        Ub: 34,
        Kc: 64,
        sb: 18,
        Oc: 68,
        nc: 49,
        Ab: 24,
        kb: 106,
        Jb: 156,
        Kb: 107,
        Lb: 108,
        Rb: 109,
        cd: 110,
        dc: 111,
        Ib: 112,
        pb: 16,
        jc: 46,
        Za: 113,
        cb: 114,
        hd: 115,
        bc: 104,
        eb: 103,
        fb: 102,
        qb: 16,
        gb: 101,
        tc: 100,
        ec: 116,
        Zc: 117,
        sc: 118,
        oc: 119,
        pc: 120,
        Qc: 121,
        kc: 47,
        Va: 122,
        Wc: 123,
        lb: 124,
        Lc: 65,
        Wb: 36,
        tb: 125,
        bb: 9,
        Dc: 126,
        ab: 127,
        Pc: 128,
        Mb: 129,
        Nb: 130,
        Qb: 131,
        Pb: 132,
        Ob: 133,
        uc: 52,
        yc: 55,
        Xb: 37,
        Sb: 32,
        Fc: 138,
        Jc: 139,
        ob: 15,
        cc: 42,
        Wa: 5,
        Nc: 67,
        Ac: 57,
        qc: 50,
        Sc: 140,
        nb: 14,
        Ta: 3,
        mb: 13,
        $b: 40,
        Yb: 38,
        $c: 73,
        yb: 142,
        zb: 23,
        Cb: 26,
        Ya: 7,
        rb: 17,
        Vb: 35,
        Mc: 66,
        Tc: 137,
        Ua: 4,
        Zb: 39,
        Gb: 30,
        wc: 53,
        ad: 141,
        dd: 136,
        ub: 19,
        Xc: 72,
        Bc: 138,
        lc: 148,
        Bb: 25,
        Gc: 61,
        ib: 11,
        zc: 56,
        Hc: 62,
        Yc: 135
    },
    Nb = null,
    Ob = {},
    Pb = [],
    Qb = 1,
    Rb = null,
    Sb = !0,
    M = {},
    J = null,
    Jb = {};

function N(a, b) {
    a = zb("/", a);
    b = b || {};
    if (!a) return {
        path: "",
        node: null
    };
    var d = {
            oa: !0,
            ia: 0
        },
        e;
    for (e in d) void 0 === b[e] && (b[e] = d[e]);
    if (8 < b.ia) throw new J(32);
    a = vb(a.split("/").filter(function (k) {
        return !!k
    }), !1);
    var g = Nb;
    d = "/";
    for (e = 0; e < a.length; e++) {
        var f = e === a.length - 1;
        if (f && b.parent) break;
        g = Kb(g, a[e]);
        d = wb(d + "/" + a[e]);
        g.P && (!f || f && b.oa) && (g = g.P.root);
        if (!f || b.fa)
            for (f = 0; 40960 === (g.mode & 61440);)
                if (g = Tb(d), d = zb(xb(d), g), g = N(d, {
                        ia: b.ia
                    }).node, 40 < f++) throw new J(32);
    }
    return {
        path: d,
        node: g
    }
}

function Ub(a) {
    for (var b;;) {
        if (a === a.parent) return a = a.F.sa, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
        b = b ? a.name + "/" + b : a.name;
        a = a.parent
    }
}

function Vb(a, b) {
    for (var d = 0, e = 0; e < b.length; e++) d = (d << 5) - d + b.charCodeAt(e) | 0;
    return (a + d >>> 0) % Rb.length
}

function Wb(a) {
    var b = Vb(a.parent.id, a.name);
    if (Rb[b] === a) Rb[b] = a.R;
    else
        for (b = Rb[b]; b;) {
            if (b.R === a) {
                b.R = a.R;
                break
            }
            b = b.R
        }
}

function Kb(a, b) {
    var d;
    if (d = (d = Xb(a, "x")) ? d : a.f.lookup ? 0 : 2) throw new J(d, a);
    for (d = Rb[Vb(a.id, b)]; d; d = d.R) {
        var e = d.name;
        if (d.parent.id === a.id && e === b) return d
    }
    return a.f.lookup(a, b)
}

function Ib(a, b, d, e) {
    a = new Yb(a, b, d, e);
    b = Vb(a.parent.id, a.name);
    a.R = Rb[b];
    return Rb[b] = a
}

function L(a) {
    return 16384 === (a & 61440)
}
var Zb = {
    r: 0,
    rs: 1052672,
    "r+": 2,
    w: 577,
    wx: 705,
    xw: 705,
    "w+": 578,
    "wx+": 706,
    "xw+": 706,
    a: 1089,
    ax: 1217,
    xa: 1217,
    "a+": 1090,
    "ax+": 1218,
    "xa+": 1218
};

function $b(a) {
    var b = ["r", "w", "rw"][a & 3];
    a & 512 && (b += "w");
    return b
}

function Xb(a, b) {
    if (Sb) return 0;
    if (-1 === b.indexOf("r") || a.mode & 292) {
        if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73)) return 2
    } else return 2;
    return 0
}

function ac(a, b) {
    try {
        return Kb(a, b), 20
    } catch (d) {}
    return Xb(a, "wx")
}

function bc(a, b, d) {
    try {
        var e = Kb(a, b)
    } catch (g) {
        return g.m
    }
    if (a = Xb(a, "wx")) return a;
    if (d) {
        if (!L(e.mode)) return 54;
        if (e === e.parent || "/" === Ub(e)) return 10
    } else if (L(e.mode)) return 31;
    return 0
}

function cc(a) {
    var b = 4096;
    for (a = a || 0; a <= b; a++)
        if (!Pb[a]) return a;
    throw new J(33);
}

function dc(a, b) {
    ec || (ec = function () {}, ec.prototype = {});
    var d = new ec,
        e;
    for (e in a) d[e] = a[e];
    a = d;
    b = cc(b);
    a.fd = b;
    return Pb[b] = a
}
var Hb = {
    open: function (a) {
        a.g = Ob[a.node.rdev].g;
        a.g.open && a.g.open(a)
    },
    L: function () {
        throw new J(70);
    }
};

function Cb(a, b) {
    Ob[a] = {
        g: b
    }
}

function fc(a, b) {
    if ("string" === typeof a) throw a;
    var d = "/" === b,
        e = !b;
    if (d && Nb) throw new J(10);
    if (!d && !e) {
        var g = N(b, {
            oa: !1
        });
        b = g.path;
        g = g.node;
        if (g.P) throw new J(10);
        if (!L(g.mode)) throw new J(54);
    }
    b = {
        type: a,
        od: {},
        sa: b,
        Ea: []
    };
    a = a.F(b);
    a.F = b;
    b.root = a;
    d ? Nb = a : g && (g.P = b, g.F && g.F.Ea.push(b))
}

function hc(a, b, d) {
    var e = N(a, {
        parent: !0
    }).node;
    a = yb(a);
    if (!a || "." === a || ".." === a) throw new J(28);
    var g = ac(e, a);
    if (g) throw new J(g);
    if (!e.f.$) throw new J(63);
    return e.f.$(e, a, b, d)
}

function O(a, b) {
    hc(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0)
}

function ic(a, b, d) {
    "undefined" === typeof d && (d = b, b = 438);
    hc(a, b | 8192, d)
}

function jc(a, b) {
    if (!zb(a)) throw new J(44);
    var d = N(b, {
        parent: !0
    }).node;
    if (!d) throw new J(44);
    b = yb(b);
    var e = ac(d, b);
    if (e) throw new J(e);
    if (!d.f.symlink) throw new J(63);
    d.f.symlink(d, b, a)
}

function Tb(a) {
    a = N(a).node;
    if (!a) throw new J(44);
    if (!a.f.readlink) throw new J(28);
    return zb(Ub(a.parent), a.f.readlink(a))
}

function kc(a, b, d, e) {
    if ("" === a) throw new J(44);
    if ("string" === typeof b) {
        var g = Zb[b];
        if ("undefined" === typeof g) throw Error("Unknown file open mode: " + b);
        b = g
    }
    d = b & 64 ? ("undefined" === typeof d ? 438 : d) & 4095 | 32768 : 0;
    if ("object" === typeof a) var f = a;
    else {
        a = wb(a);
        try {
            f = N(a, {
                fa: !(b & 131072)
            }).node
        } catch (m) {}
    }
    g = !1;
    if (b & 64)
        if (f) {
            if (b & 128) throw new J(20);
        } else f = hc(a, d, 0), g = !0;
    if (!f) throw new J(44);
    8192 === (f.mode & 61440) && (b &= -513);
    if (b & 65536 && !L(f.mode)) throw new J(54);
    if (!g && (d = f ? 40960 === (f.mode & 61440) ? 32 : L(f.mode) &&
            ("r" !== $b(b) || b & 512) ? 31 : Xb(f, $b(b)) : 44)) throw new J(d);
    if (b & 512) {
        d = f;
        var k;
        "string" === typeof d ? k = N(d, {
            fa: !0
        }).node : k = d;
        if (!k.f.C) throw new J(63);
        if (L(k.mode)) throw new J(31);
        if (32768 !== (k.mode & 61440)) throw new J(28);
        if (d = Xb(k, "w")) throw new J(d);
        k.f.C(k, {
            size: 0,
            timestamp: Date.now()
        })
    }
    b &= -131713;
    e = dc({
        node: f,
        path: Ub(f),
        flags: b,
        seekable: !0,
        position: 0,
        g: f.g,
        Qa: [],
        error: !1
    }, e);
    e.g.open && e.g.open(e);
    !c.logReadFiles || b & 1 || (lc || (lc = {}), a in lc || (lc[a] = 1, t("FS.trackingDelegate error on read file: " + a)));
    try {
        M.onOpenFile && (f = 0, 1 !== (b & 2097155) && (f |= 1), 0 !== (b & 2097155) && (f |= 2), M.onOpenFile(a, f))
    } catch (m) {
        t("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + m.message)
    }
    return e
}

function mc(a, b, d) {
    if (null === a.fd) throw new J(8);
    if (!a.seekable || !a.g.L) throw new J(70);
    if (0 != d && 1 != d && 2 != d) throw new J(28);
    a.position = a.g.L(a, b, d);
    a.Qa = [];
    return a.position
}

function nc() {
    J || (J = function (a, b) {
        this.node = b;
        this.Ka = function (d) {
            this.m = d;
            for (var e in Mb)
                if (Mb[e] === d) {
                    this.code = e;
                    break
                }
        };
        this.Ka(a);
        this.message = Lb[a];
        this.stack && (Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: !0
        }), this.stack = mb(this.stack))
    }, J.prototype = Error(), J.prototype.constructor = J, [44].forEach(function (a) {
        Jb[a] = new J(a);
        Jb[a].stack = "<generic error, no stack>"
    }))
}
var oc;

function pc(a, b) {
    var d = 0;
    a && (d |= 365);
    b && (d |= 146);
    return d
}

function qc(a, b, d) {
    a = wb("/dev/" + a);
    var e = pc(!!b, !!d);
    rc || (rc = 64);
    var g = rc++ << 8 | 0;
    Cb(g, {
        open: function (f) {
            f.seekable = !1
        },
        close: function () {
            d && d.buffer && d.buffer.length && d(10)
        },
        read: function (f, k, m, q) {
            for (var n = 0, p = 0; p < q; p++) {
                try {
                    var z = b()
                } catch (w) {
                    throw new J(29);
                }
                if (void 0 === z && 0 === n) throw new J(6);
                if (null === z || void 0 === z) break;
                n++;
                k[m + p] = z
            }
            n && (f.node.timestamp = Date.now());
            return n
        },
        write: function (f, k, m, q) {
            for (var n = 0; n < q; n++) try {
                d(k[m + n])
            } catch (p) {
                throw new J(29);
            }
            q && (f.node.timestamp = Date.now());
            return n
        }
    });
    ic(a, e, g)
}
var rc, Q = {},
    ec, lc, sc = {},
    tc = void 0;

function uc() {
    assert(void 0 != tc);
    tc += 4;
    return B[tc - 4 >> 2]
}

function vc(a) {
    a = Pb[a];
    if (!a) throw new J(8);
    return a
}

function wc(a) {
    switch (a) {
        case 1:
            return 0;
        case 2:
            return 1;
        case 4:
            return 2;
        case 8:
            return 3;
        default:
            throw new TypeError("Unknown type size: " + a);
    }
}
var xc = void 0;

function R(a) {
    for (var b = ""; A[a];) b += xc[A[a++]];
    return b
}
var yc = {},
    zc = {},
    Ac = {};

function Bc(a) {
    if (void 0 === a) return "_unknown";
    a = a.replace(/[^a-zA-Z0-9_]/g, "$");
    var b = a.charCodeAt(0);
    return 48 <= b && 57 >= b ? "_" + a : a
}

function Cc(a, b) {
    a = Bc(a);
    return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)
}

function Dc(a) {
    var b = Error,
        d = Cc(a, function (e) {
            this.name = a;
            this.message = e;
            e = Error(e).stack;
            void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
        });
    d.prototype = Object.create(b.prototype);
    d.prototype.constructor = d;
    d.prototype.toString = function () {
        return void 0 === this.message ? this.name : this.name + ": " + this.message
    };
    return d
}
var Ec = void 0;

function S(a) {
    throw new Ec(a);
}
var Fc = void 0;

function Gc(a) {
    throw new Fc(a);
}

function T(a, b, d) {
    function e(m) {
        m = d(m);
        m.length !== a.length && Gc("Mismatched type converter count");
        for (var q = 0; q < a.length; ++q) U(a[q], m[q])
    }
    a.forEach(function (m) {
        Ac[m] = b
    });
    var g = Array(b.length),
        f = [],
        k = 0;
    b.forEach(function (m, q) {
        zc.hasOwnProperty(m) ? g[q] = zc[m] : (f.push(m), yc.hasOwnProperty(m) || (yc[m] = []), yc[m].push(function () {
            g[q] = zc[m];
            ++k;
            k === f.length && e(g)
        }))
    });
    0 === f.length && e(g)
}

function U(a, b, d) {
    d = d || {};
    if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var e = b.name;
    a || S('type "' + e + '" must have a positive integer typeid pointer');
    if (zc.hasOwnProperty(a)) {
        if (d.Ca) return;
        S("Cannot register type '" + e + "' twice")
    }
    zc[a] = b;
    delete Ac[a];
    yc.hasOwnProperty(a) && (b = yc[a], delete yc[a], b.forEach(function (g) {
        g()
    }))
}

function Hc(a) {
    return {
        count: a.count,
        O: a.O,
        U: a.U,
        i: a.i,
        l: a.l,
        u: a.u,
        v: a.v
    }
}

function Ic(a) {
    S(a.b.l.h.name + " instance already deleted")
}
var Jc = !1;

function Kc() {}

function Lc(a) {
    --a.count.value;
    0 === a.count.value && (a.u ? a.v.M(a.u) : a.l.h.M(a.i))
}

function Mc(a) {
    if ("undefined" === typeof FinalizationGroup) return Mc = function (b) {
        return b
    }, a;
    Jc = new FinalizationGroup(function (b) {
        for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.i ? Lc(d) : console.warn("object already deleted: " + d.i)
    });
    Mc = function (b) {
        Jc.register(b, b.b, b.b);
        return b
    };
    Kc = function (b) {
        Jc.unregister(b.b)
    };
    return Mc(a)
}
var Nc = void 0,
    Oc = [];

function Pc() {
    for (; Oc.length;) {
        var a = Oc.pop();
        a.b.O = !1;
        a["delete"]()
    }
}

function Qc() {}
var Rc = {};

function Sc(a, b, d) {
    if (void 0 === a[b].o) {
        var e = a[b];
        a[b] = function () {
            a[b].o.hasOwnProperty(arguments.length) || S("Function '" + d + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].o + ")!");
            return a[b].o[arguments.length].apply(this, arguments)
        };
        a[b].o = [];
        a[b].o[e.N] = e
    }
}

function Tc(a, b) {
    c.hasOwnProperty(a) ? (S("Cannot register public name '" + a + "' twice"), Sc(c, a, a), c.hasOwnProperty(void 0) && S("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), c[a].o[void 0] = b) : c[a] = b
}

function Uc(a, b, d, e, g, f, k, m) {
    this.name = a;
    this.constructor = b;
    this.H = d;
    this.M = e;
    this.A = g;
    this.Aa = f;
    this.W = k;
    this.za = m;
    this.Ga = []
}

function Vc(a, b, d) {
    for (; b !== d;) b.W || S("Expected null or instance of " + d.name + ", got an instance of " + b.name), a = b.W(a), b = b.A;
    return a
}

function Wc(a, b) {
    if (null === b) return this.ga && S("null is not a valid " + this.name), 0;
    b.b || S('Cannot pass "' + Xc(b) + '" as a ' + this.name);
    b.b.i || S("Cannot pass deleted object as a pointer of type " + this.name);
    return Vc(b.b.i, b.b.l.h, this.h)
}

function Yc(a, b) {
    if (null === b) {
        this.ga && S("null is not a valid " + this.name);
        if (this.Z) {
            var d = this.Ha();
            null !== a && a.push(this.M, d);
            return d
        }
        return 0
    }
    b.b || S('Cannot pass "' + Xc(b) + '" as a ' + this.name);
    b.b.i || S("Cannot pass deleted object as a pointer of type " + this.name);
    !this.Y && b.b.l.Y && S("Cannot convert argument of type " + (b.b.v ? b.b.v.name : b.b.l.name) + " to parameter type " + this.name);
    d = Vc(b.b.i, b.b.l.h, this.h);
    if (this.Z) switch (void 0 === b.b.u && S("Passing raw pointer to smart pointer is illegal"), this.La) {
        case 0:
            b.b.v ===
                this ? d = b.b.u : S("Cannot convert argument of type " + (b.b.v ? b.b.v.name : b.b.l.name) + " to parameter type " + this.name);
            break;
        case 1:
            d = b.b.u;
            break;
        case 2:
            if (b.b.v === this) d = b.b.u;
            else {
                var e = b.clone();
                d = this.Ia(d, Zc(function () {
                    e["delete"]()
                }));
                null !== a && a.push(this.M, d)
            }
            break;
        default:
            S("Unsupporting sharing policy")
    }
    return d
}

function $c(a, b) {
    if (null === b) return this.ga && S("null is not a valid " + this.name), 0;
    b.b || S('Cannot pass "' + Xc(b) + '" as a ' + this.name);
    b.b.i || S("Cannot pass deleted object as a pointer of type " + this.name);
    b.b.l.Y && S("Cannot convert argument of type " + b.b.l.name + " to parameter type " + this.name);
    return Vc(b.b.i, b.b.l.h, this.h)
}

function ad(a) {
    return this.fromWireType(E[a >> 2])
}

function cd(a, b, d) {
    if (b === d) return a;
    if (void 0 === d.A) return null;
    a = cd(a, b, d.A);
    return null === a ? null : d.za(a)
}
var dd = {};

function ed(a, b) {
    for (void 0 === b && S("ptr should not be undefined"); a.A;) b = a.W(b), a = a.A;
    return dd[b]
}

function fd(a, b) {
    b.l && b.i || Gc("makeClassHandle requires ptr and ptrType");
    !!b.v !== !!b.u && Gc("Both smartPtrType and smartPtr must be specified");
    b.count = {
        value: 1
    };
    return Mc(Object.create(a, {
        b: {
            value: b
        }
    }))
}

function V(a, b, d, e) {
    this.name = a;
    this.h = b;
    this.ga = d;
    this.Y = e;
    this.Z = !1;
    this.M = this.Ia = this.Ha = this.ta = this.La = this.Fa = void 0;
    void 0 !== b.A ? this.toWireType = Yc : (this.toWireType = e ? Wc : $c, this.D = null)
}

function gd(a, b) {
    c.hasOwnProperty(a) || Gc("Replacing nonexistant public symbol");
    c[a] = b;
    c[a].N = void 0
}

function W(a, b) {
    a = R(a);
    var d = c["dynCall_" + a];
    for (var e = [], g = 1; g < a.length; ++g) e.push("a" + g);
    g = "return function dynCall_" + (a + "_" + b) + "(" + e.join(", ") + ") {\n";
    g += "    return dynCall(rawFunction" + (e.length ? ", " : "") + e.join(", ") + ");\n";
    d = (new Function("dynCall", "rawFunction", g + "};\n"))(d, b);
    "function" !== typeof d && S("unknown function pointer with signature " + a + ": " + b);
    return d
}
var hd = void 0;

function id(a) {
    a = jd(a);
    var b = R(a);
    X(a);
    return b
}

function kd(a, b) {
    function d(f) {
        g[f] || zc[f] || (Ac[f] ? Ac[f].forEach(d) : (e.push(f), g[f] = !0))
    }
    var e = [],
        g = {};
    b.forEach(d);
    throw new hd(a + ": " + e.map(id).join([", "]));
}

function ld(a) {
    var b = Function;
    if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
    var d = Cc(b.name || "unknownFunctionName", function () {});
    d.prototype = b.prototype;
    d = new d;
    a = b.apply(d, a);
    return a instanceof Object ? a : d
}

function md(a) {
    for (; a.length;) {
        var b = a.pop();
        a.pop()(b)
    }
}

function nd(a, b, d, e, g) {
    var f = b.length;
    2 > f && S("argTypes array size mismatch! Must at least get return value and 'this' types!");
    var k = null !== b[1] && null !== d,
        m = !1;
    for (d = 1; d < b.length; ++d)
        if (null !== b[d] && void 0 === b[d].D) {
            m = !0;
            break
        } var q = "void" !== b[0].name,
        n = "",
        p = "";
    for (d = 0; d < f - 2; ++d) n += (0 !== d ? ", " : "") + "arg" + d, p += (0 !== d ? ", " : "") + "arg" + d + "Wired";
    a = "return function " + Bc(a) + "(" + n + ") {\nif (arguments.length !== " + (f - 2) + ") {\nthrowBindingError('function " + a + " called with ' + arguments.length + ' arguments, expected " +
        (f - 2) + " args!');\n}\n";
    m && (a += "var destructors = [];\n");
    var z = m ? "destructors" : "null";
    n = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
    e = [S, e, g, md, b[0], b[1]];
    k && (a += "var thisWired = classParam.toWireType(" + z + ", this);\n");
    for (d = 0; d < f - 2; ++d) a += "var arg" + d + "Wired = argType" + d + ".toWireType(" + z + ", arg" + d + "); // " + b[d + 2].name + "\n", n.push("argType" + d), e.push(b[d + 2]);
    k && (p = "thisWired" + (0 < p.length ? ", " : "") + p);
    a += (q ? "var rv = " : "") + "invoker(fn" + (0 < p.length ? ", " : "") + p + ");\n";
    if (m) a +=
        "runDestructors(destructors);\n";
    else
        for (d = k ? 1 : 2; d < b.length; ++d) f = 1 === d ? "thisWired" : "arg" + (d - 2) + "Wired", null !== b[d].D && (a += f + "_dtor(" + f + "); // " + b[d].name + "\n", n.push(f + "_dtor"), e.push(b[d].D));
    q && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
    n.push(a + "}\n");
    return ld(n).apply(null, e)
}

function od(a, b) {
    for (var d = [], e = 0; e < a; e++) d.push(B[(b >> 2) + e]);
    return d
}

function pd(a, b, d) {
    a instanceof Object || S(d + ' with invalid "this": ' + a);
    a instanceof b.h.constructor || S(d + ' incompatible with "this" of type ' + a.constructor.name);
    a.b.i || S("cannot call emscripten binding method " + d + " on deleted object");
    return Vc(a.b.i, a.b.l.h, b.h)
}
var qd = [],
    Y = [{}, {
        value: void 0
    }, {
        value: null
    }, {
        value: !0
    }, {
        value: !1
    }];

function rd(a) {
    4 < a && 0 === --Y[a].ja && (Y[a] = void 0, qd.push(a))
}

function Zc(a) {
    switch (a) {
        case void 0:
            return 1;
        case null:
            return 2;
        case !0:
            return 3;
        case !1:
            return 4;
        default:
            var b = qd.length ? qd.pop() : Y.length;
            Y[b] = {
                ja: 1,
                value: a
            };
            return b
    }
}

function Xc(a) {
    if (null === a) return "null";
    var b = typeof a;
    return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
}

function sd(a, b) {
    switch (b) {
        case 2:
            return function (d) {
                return this.fromWireType(La[d >> 2])
            };
        case 3:
            return function (d) {
                return this.fromWireType(Ma[d >> 3])
            };
        default:
            throw new TypeError("Unknown float type: " + a);
    }
}

function td(a, b, d) {
    switch (b) {
        case 0:
            return d ? function (e) {
                return D[e]
            } : function (e) {
                return A[e]
            };
        case 1:
            return d ? function (e) {
                return Ba[e >> 1]
            } : function (e) {
                return Aa[e >> 1]
            };
        case 2:
            return d ? function (e) {
                return B[e >> 2]
            } : function (e) {
                return E[e >> 2]
            };
        default:
            throw new TypeError("Unknown integer type: " + a);
    }
}

function ud() {
    void 0 === ud.start && (ud.start = Date.now());
    return 1E3 * (Date.now() - ud.start) | 0
}

function vd(a, b) {
    assert(b === (b | 0));
    return (a >>> 0) + 4294967296 * b
}

function wd(a, b) {
    function d(F) {
        var P = e;
        "double" === F || "i64" === F ? P & 7 && (assert(4 === (P & 7)), P += 4) : assert(0 === (P & 3));
        e = P;
        "double" === F ? (F = Ma[e >> 3], e += 8) : "i64" == F ? (F = [B[e >> 2], B[e + 4 >> 2]], e += 8) : (assert(0 === (e & 3)), F = B[e >> 2], e += 4);
        return F
    }
    assert(0 === (b & 3));
    for (var e = b, g = [], f, k;;) {
        var m = a;
        f = D[a >> 0];
        if (0 === f) break;
        k = D[a + 1 >> 0];
        if (37 == f) {
            var q = !1,
                n = b = !1,
                p = !1,
                z = !1;
            a: for (;;) {
                switch (k) {
                    case 43:
                        q = !0;
                        break;
                    case 45:
                        b = !0;
                        break;
                    case 35:
                        n = !0;
                        break;
                    case 48:
                        if (p) break a;
                        else {
                            p = !0;
                            break
                        }
                        case 32:
                            z = !0;
                            break;
                        default:
                            break a
                }
                a++;
                k = D[a + 1 >> 0]
            }
            var w = 0;
            if (42 == k) w = d("i32"), a++, k = D[a + 1 >> 0];
            else
                for (; 48 <= k && 57 >= k;) w = 10 * w + (k - 48), a++, k = D[a + 1 >> 0];
            var l = !1,
                u = -1;
            if (46 == k) {
                u = 0;
                l = !0;
                a++;
                k = D[a + 1 >> 0];
                if (42 == k) u = d("i32"), a++;
                else
                    for (;;) {
                        k = D[a + 1 >> 0];
                        if (48 > k || 57 < k) break;
                        u = 10 * u + (k - 48);
                        a++
                    }
                k = D[a + 1 >> 0]
            }
            0 > u && (u = 6, l = !1);
            switch (String.fromCharCode(k)) {
                case "h":
                    k = D[a + 2 >> 0];
                    if (104 == k) {
                        a++;
                        var x = 1
                    } else x = 2;
                    break;
                case "l":
                    k = D[a + 2 >> 0];
                    108 == k ? (a++, x = 8) : x = 4;
                    break;
                case "L":
                case "q":
                case "j":
                    x = 8;
                    break;
                case "z":
                case "t":
                case "I":
                    x = 4;
                    break;
                default:
                    x = null
            }
            x &&
                a++;
            k = D[a + 1 >> 0];
            switch (String.fromCharCode(k)) {
                case "d":
                case "i":
                case "u":
                case "o":
                case "x":
                case "X":
                case "p":
                    m = 100 == k || 105 == k;
                    x = x || 4;
                    f = d("i" + 8 * x);
                    8 == x && (f = 117 == k ? (f[0] >>> 0) + 4294967296 * (f[1] >>> 0) : vd(f[0], f[1]));
                    4 >= x && (f = (m ? bb : ab)(f & Math.pow(256, x) - 1, 8 * x));
                    var C = Math.abs(f);
                    m = "";
                    if (100 == k || 105 == k) var v = bb(f, 8 * x, 1).toString(10);
                    else if (117 == k) v = ab(f, 8 * x, 1).toString(10), f = Math.abs(f);
                    else if (111 == k) v = (n ? "0" : "") + C.toString(8);
                    else if (120 == k || 88 == k) {
                        m = n && 0 != f ? "0x" : "";
                        if (0 > f) {
                            f = -f;
                            v = (C - 1).toString(16);
                            C = [];
                            for (n = 0; n < v.length; n++) C.push((15 - parseInt(v[n], 16)).toString(16));
                            for (v = C.join(""); v.length < 2 * x;) v = "f" + v
                        } else v = C.toString(16);
                        88 == k && (m = m.toUpperCase(), v = v.toUpperCase())
                    } else 112 == k && (0 === C ? v = "(nil)" : (m = "0x", v = C.toString(16)));
                    if (l)
                        for (; v.length < u;) v = "0" + v;
                    0 <= f && (q ? m = "+" + m : z && (m = " " + m));
                    "-" == v.charAt(0) && (m = "-" + m, v = v.substr(1));
                    for (; m.length + v.length < w;) b ? v += " " : p ? v = "0" + v : m = " " + m;
                    v = m + v;
                    v.split("").forEach(function (F) {
                        g.push(F.charCodeAt(0))
                    });
                    break;
                case "f":
                case "F":
                case "e":
                case "E":
                case "g":
                case "G":
                    f =
                        d("double");
                    if (isNaN(f)) v = "nan", p = !1;
                    else if (isFinite(f)) {
                        l = !1;
                        x = Math.min(u, 20);
                        if (103 == k || 71 == k) l = !0, u = u || 1, x = parseInt(f.toExponential(x).split("e")[1], 10), u > x && -4 <= x ? (k = (103 == k ? "f" : "F").charCodeAt(0), u -= x + 1) : (k = (103 == k ? "e" : "E").charCodeAt(0), u--), x = Math.min(u, 20);
                        if (101 == k || 69 == k) v = f.toExponential(x), /[eE][-+]\d$/.test(v) && (v = v.slice(0, -1) + "0" + v.slice(-1));
                        else if (102 == k || 70 == k) v = f.toFixed(x), 0 === f && (0 > f || 0 === f && -Infinity === 1 / f) && (v = "-" + v);
                        m = v.split("e");
                        if (l && !n)
                            for (; 1 < m[0].length && -1 != m[0].indexOf(".") &&
                                ("0" == m[0].slice(-1) || "." == m[0].slice(-1));) m[0] = m[0].slice(0, -1);
                        else
                            for (n && -1 == v.indexOf(".") && (m[0] += "."); u > x++;) m[0] += "0";
                        v = m[0] + (1 < m.length ? "e" + m[1] : "");
                        69 == k && (v = v.toUpperCase());
                        0 <= f && (q ? v = "+" + v : z && (v = " " + v))
                    } else v = (0 > f ? "-" : "") + "inf", p = !1;
                    for (; v.length < w;) b ? v += " " : !p || "-" != v[0] && "+" != v[0] ? v = (p ? "0" : " ") + v : v = v[0] + "0" + v.slice(1);
                    97 > k && (v = v.toUpperCase());
                    v.split("").forEach(function (F) {
                        g.push(F.charCodeAt(0))
                    });
                    break;
                case "s":
                    p = (q = d("i8*")) ? xd(q) : 6;
                    l && (p = Math.min(p, u));
                    if (!b)
                        for (; p < w--;) g.push(32);
                    if (q)
                        for (n = 0; n < p; n++) g.push(A[q++ >> 0]);
                    else g = g.concat(Eb("(null)".substr(0, p), !0));
                    if (b)
                        for (; p < w--;) g.push(32);
                    break;
                case "c":
                    for (b && g.push(d("i8")); 0 < --w;) g.push(32);
                    b || g.push(d("i8"));
                    break;
                case "n":
                    b = d("i32*");
                    B[b >> 2] = g.length;
                    break;
                case "%":
                    g.push(f);
                    break;
                default:
                    for (n = m; n < a + 2; n++) g.push(D[n >> 0])
            }
            a += 2
        } else g.push(f), a += 1
    }
    return g
}

function yd(a) {
    if (!a || !a.callee || !a.callee.name) return [null, "", ""];
    var b = a.callee.name,
        d = "(",
        e = !0,
        g;
    for (g in a) {
        var f = a[g];
        e || (d += ", ");
        e = !1;
        d = "number" === typeof f || "string" === typeof f ? d + f : d + ("(" + typeof f + ")")
    }
    d += ")";
    a = (a = a.callee.caller) ? a.arguments : [];
    e && (d = "");
    return [a, b, d]
}

function zd(a) {
    var b = lb();
    b = b.slice(b.indexOf("\n", Math.max(b.lastIndexOf("_emscripten_log"), b.lastIndexOf("_emscripten_get_callstack"))) + 1);
    a & 8 && "undefined" === typeof emscripten_source_map && (na('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'), a = a ^ 8 | 16);
    var d = null;
    if (a & 128)
        for (d = yd(arguments); 0 <= d[1].indexOf("_emscripten_");) d = yd(d[0]);
    var e =
        b.split("\n");
    b = "";
    var g = /\s*(.*?)@(.*?):([0-9]+):([0-9]+)/,
        f = /\s*(.*?)@(.*):(.*)(:(.*))?/,
        k = /\s*at (.*?) \((.*):(.*):(.*)\)/,
        m;
    for (m in e) {
        var q = e[m],
            n;
        if ((n = k.exec(q)) && 5 == n.length) {
            q = n[1];
            var p = n[2];
            var z = n[3];
            n = n[4]
        } else if ((n = g.exec(q)) || (n = f.exec(q)), n && 4 <= n.length) q = n[1], p = n[2], z = n[3], n = n[4] | 0;
        else {
            b += q + "\n";
            continue
        }
        var w = a & 32 ? ub(q) : q;
        w || (w = q);
        var l = !1;
        if (a & 8) {
            var u = emscripten_source_map.pd({
                line: z,
                wa: n
            });
            if (l = u && u.source) a & 64 && (u.source = u.source.substring(u.source.replace(/\\/g, "/").lastIndexOf("/") +
                1)), b += "    at " + w + " (" + u.source + ":" + u.line + ":" + u.wa + ")\n"
        }
        if (a & 16 || !l) a & 64 && (p = p.substring(p.replace(/\\/g, "/").lastIndexOf("/") + 1)), b += (l ? "     = " + q : "    at " + w) + " (" + p + ":" + z + ":" + n + ")\n";
        a & 128 && d[0] && (d[1] == q && 0 < d[2].length && (b = b.replace(/\s+$/, ""), b += " with values: " + d[1] + d[2] + "\n"), d = yd(d[0]))
    }
    return b = b.replace(/\s+$/, "")
}

function Z(a) {
    a = eval(y(a));
    if (null == a) return 0;
    var b = xa(a);
    if (!Z.I || Z.I < b + 1) Z.I && X(Z.buffer), Z.I = b + 1, Z.buffer = Ia(Z.I);
    wa(a, Z.buffer, Z.I);
    return Z.buffer
}
var Ad = {};

function Bd() {
    if (!Cd) {
        var a = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: ca || "./this.program"
            },
            b;
        for (b in Ad) a[b] = Ad[b];
        var d = [];
        for (b in a) d.push(b + "=" + a[b]);
        Cd = d
    }
    return Cd
}
var Cd, Dd = (wa("GMT", 1493152, 4), 1493152);

function Ed() {
    function a(f) {
        return (f = f.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? f[1] : "GMT"
    }
    if (!Fd) {
        Fd = !0;
        B[Gd() >> 2] = 60 * (new Date).getTimezoneOffset();
        var b = (new Date).getFullYear(),
            d = new Date(b, 0, 1);
        b = new Date(b, 6, 1);
        B[Hd() >> 2] = Number(d.getTimezoneOffset() != b.getTimezoneOffset());
        var e = a(d),
            g = a(b);
        e = Ha(e);
        g = Ha(g);
        b.getTimezoneOffset() < d.getTimezoneOffset() ? (B[Id() >> 2] = e, B[Id() + 4 >> 2] = g) : (B[Id() >> 2] = g, B[Id() + 4 >> 2] = e)
    }
}
var Fd;

function Jd(a) {
    return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}

function Kd(a, b) {
    for (var d = 0, e = 0; e <= b; d += a[e++]);
    return d
}
var Ld = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Md = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Nd(a, b) {
    for (a = new Date(a.getTime()); 0 < b;) {
        var d = a.getMonth(),
            e = (Jd(a.getFullYear()) ? Ld : Md)[d];
        if (b > e - a.getDate()) b -= e - a.getDate() + 1, a.setDate(1), 11 > d ? a.setMonth(d + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
            a.setDate(a.getDate() + b);
            break
        }
    }
    return a
}

function Od(a, b, d, e) {
    function g(l, u, x) {
        for (l = "number" === typeof l ? l.toString() : l || ""; l.length < u;) l = x[0] + l;
        return l
    }

    function f(l, u) {
        return g(l, u, "0")
    }

    function k(l, u) {
        function x(v) {
            return 0 > v ? -1 : 0 < v ? 1 : 0
        }
        var C;
        0 === (C = x(l.getFullYear() - u.getFullYear())) && 0 === (C = x(l.getMonth() - u.getMonth())) && (C = x(l.getDate() - u.getDate()));
        return C
    }

    function m(l) {
        switch (l.getDay()) {
            case 0:
                return new Date(l.getFullYear() - 1, 11, 29);
            case 1:
                return l;
            case 2:
                return new Date(l.getFullYear(), 0, 3);
            case 3:
                return new Date(l.getFullYear(),
                    0, 2);
            case 4:
                return new Date(l.getFullYear(), 0, 1);
            case 5:
                return new Date(l.getFullYear() - 1, 11, 31);
            case 6:
                return new Date(l.getFullYear() - 1, 11, 30)
        }
    }

    function q(l) {
        l = Nd(new Date(l.s + 1900, 0, 1), l.ea);
        var u = new Date(l.getFullYear() + 1, 0, 4),
            x = m(new Date(l.getFullYear(), 0, 4));
        u = m(u);
        return 0 >= k(x, l) ? 0 >= k(u, l) ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1
    }
    var n = B[e + 40 >> 2];
    e = {
        Oa: B[e >> 2],
        Na: B[e + 4 >> 2],
        ba: B[e + 8 >> 2],
        V: B[e + 12 >> 2],
        T: B[e + 16 >> 2],
        s: B[e + 20 >> 2],
        da: B[e + 24 >> 2],
        ea: B[e + 28 >> 2],
        rd: B[e + 32 >> 2],
        Ma: B[e + 36 >>
            2],
        Pa: n ? y(n) : ""
    };
    d = y(d);
    n = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
    };
    for (var p in n) d = d.replace(new RegExp(p, "g"), n[p]);
    var z = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        w = "January February March April May June July August September October November December".split(" ");
    n = {
        "%a": function (l) {
            return z[l.da].substring(0, 3)
        },
        "%A": function (l) {
            return z[l.da]
        },
        "%b": function (l) {
            return w[l.T].substring(0, 3)
        },
        "%B": function (l) {
            return w[l.T]
        },
        "%C": function (l) {
            return f((l.s + 1900) / 100 | 0, 2)
        },
        "%d": function (l) {
            return f(l.V, 2)
        },
        "%e": function (l) {
            return g(l.V, 2, " ")
        },
        "%g": function (l) {
            return q(l).toString().substring(2)
        },
        "%G": function (l) {
            return q(l)
        },
        "%H": function (l) {
            return f(l.ba, 2)
        },
        "%I": function (l) {
            l = l.ba;
            0 == l ? l = 12 : 12 < l && (l -= 12);
            return f(l, 2)
        },
        "%j": function (l) {
            return f(l.V + Kd(Jd(l.s + 1900) ? Ld : Md, l.T - 1), 3)
        },
        "%m": function (l) {
            return f(l.T + 1, 2)
        },
        "%M": function (l) {
            return f(l.Na, 2)
        },
        "%n": function () {
            return "\n"
        },
        "%p": function (l) {
            return 0 <= l.ba && 12 > l.ba ? "AM" : "PM"
        },
        "%S": function (l) {
            return f(l.Oa, 2)
        },
        "%t": function () {
            return "\t"
        },
        "%u": function (l) {
            return l.da || 7
        },
        "%U": function (l) {
            var u = new Date(l.s + 1900, 0, 1),
                x = 0 === u.getDay() ? u : Nd(u, 7 - u.getDay());
            l = new Date(l.s + 1900, l.T, l.V);
            return 0 > k(x, l) ?
                f(Math.ceil((31 - x.getDate() + (Kd(Jd(l.getFullYear()) ? Ld : Md, l.getMonth() - 1) - 31) + l.getDate()) / 7), 2) : 0 === k(x, u) ? "01" : "00"
        },
        "%V": function (l) {
            var u = new Date(l.s + 1901, 0, 4),
                x = m(new Date(l.s + 1900, 0, 4));
            u = m(u);
            var C = Nd(new Date(l.s + 1900, 0, 1), l.ea);
            return 0 > k(C, x) ? "53" : 0 >= k(u, C) ? "01" : f(Math.ceil((x.getFullYear() < l.s + 1900 ? l.ea + 32 - x.getDate() : l.ea + 1 - x.getDate()) / 7), 2)
        },
        "%w": function (l) {
            return l.da
        },
        "%W": function (l) {
            var u = new Date(l.s, 0, 1),
                x = 1 === u.getDay() ? u : Nd(u, 0 === u.getDay() ? 1 : 7 - u.getDay() + 1);
            l = new Date(l.s +
                1900, l.T, l.V);
            return 0 > k(x, l) ? f(Math.ceil((31 - x.getDate() + (Kd(Jd(l.getFullYear()) ? Ld : Md, l.getMonth() - 1) - 31) + l.getDate()) / 7), 2) : 0 === k(x, u) ? "01" : "00"
        },
        "%y": function (l) {
            return (l.s + 1900).toString().substring(2)
        },
        "%Y": function (l) {
            return l.s + 1900
        },
        "%z": function (l) {
            l = l.Ma;
            var u = 0 <= l;
            l = Math.abs(l) / 60;
            return (u ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4)
        },
        "%Z": function (l) {
            return l.Pa
        },
        "%%": function () {
            return "%"
        }
    };
    for (p in n) 0 <= d.indexOf(p) && (d = d.replace(new RegExp(p, "g"), n[p](e)));
    p = Eb(d, !1);
    if (p.length >
        b) return 0;
    Ja(p, a);
    return p.length - 1
}

function Yb(a, b, d, e) {
    a || (a = this);
    this.parent = a;
    this.F = a.F;
    this.P = null;
    this.id = Qb++;
    this.name = b;
    this.mode = d;
    this.f = {};
    this.g = {};
    this.rdev = e
}
Object.defineProperties(Yb.prototype, {
    read: {
        get: function () {
            return 365 === (this.mode & 365)
        },
        set: function (a) {
            a ? this.mode |= 365 : this.mode &= -366
        }
    },
    write: {
        get: function () {
            return 146 === (this.mode & 146)
        },
        set: function (a) {
            a ? this.mode |= 146 : this.mode &= -147
        }
    }
});
nc();
Rb = Array(4096);
fc(K, "/");
O("/tmp");
O("/home");
O("/home/web_user");
(function () {
    O("/dev");
    Cb(259, {
        read: function () {
            return 0
        },
        write: function (e, g, f, k) {
            return k
        }
    });
    ic("/dev/null", 259);
    Bb(1280, Fb);
    Bb(1536, Gb);
    ic("/dev/tty", 1280);
    ic("/dev/tty1", 1536);
    if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
        var a = new Uint8Array(1);
        var b = function () {
            crypto.getRandomValues(a);
            return a[0]
        }
    } else if (fa) try {
        var d = require("crypto");
        b = function () {
            return d.randomBytes(1)[0]
        }
    } catch (e) {}
    b || (b = function () {
        r("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };")
    });
    qc("random", b);
    qc("urandom", b);
    O("/dev/shm");
    O("/dev/shm/tmp")
})();
O("/proc");
O("/proc/self");
O("/proc/self/fd");
fc({
    F: function () {
        var a = Ib("/proc/self", "fd", 16895, 73);
        a.f = {
            lookup: function (b, d) {
                var e = Pb[+d];
                if (!e) throw new J(8);
                b = {
                    parent: null,
                    F: {
                        sa: "fake"
                    },
                    f: {
                        readlink: function () {
                            return e.path
                        }
                    }
                };
                return b.parent = b
            }
        };
        return a
    }
}, "/proc/self/fd");
for (var Pd = Array(256), Qd = 0; 256 > Qd; ++Qd) Pd[Qd] = String.fromCharCode(Qd);
xc = Pd;
Ec = c.BindingError = Dc("BindingError");
Fc = c.InternalError = Dc("InternalError");
Qc.prototype.isAliasOf = function (a) {
    if (!(this instanceof Qc && a instanceof Qc)) return !1;
    var b = this.b.l.h,
        d = this.b.i,
        e = a.b.l.h;
    for (a = a.b.i; b.A;) d = b.W(d), b = b.A;
    for (; e.A;) a = e.W(a), e = e.A;
    return b === e && d === a
};
Qc.prototype.clone = function () {
    this.b.i || Ic(this);
    if (this.b.U) return this.b.count.value += 1, this;
    var a = Mc(Object.create(Object.getPrototypeOf(this), {
        b: {
            value: Hc(this.b)
        }
    }));
    a.b.count.value += 1;
    a.b.O = !1;
    return a
};
Qc.prototype["delete"] = function () {
    this.b.i || Ic(this);
    this.b.O && !this.b.U && S("Object already scheduled for deletion");
    Kc(this);
    Lc(this.b);
    this.b.U || (this.b.u = void 0, this.b.i = void 0)
};
Qc.prototype.isDeleted = function () {
    return !this.b.i
};
Qc.prototype.deleteLater = function () {
    this.b.i || Ic(this);
    this.b.O && !this.b.U && S("Object already scheduled for deletion");
    Oc.push(this);
    1 === Oc.length && Nc && Nc(Pc);
    this.b.O = !0;
    return this
};
V.prototype.Ba = function (a) {
    this.ta && (a = this.ta(a));
    return a
};
V.prototype.ma = function (a) {
    this.M && this.M(a)
};
V.prototype.argPackAdvance = 8;
V.prototype.readValueFromPointer = ad;
V.prototype.deleteObject = function (a) {
    if (null !== a) a["delete"]()
};
V.prototype.fromWireType = function (a) {
    function b() {
        return this.Z ? fd(this.h.H, {
            l: this.Fa,
            i: d,
            v: this,
            u: a
        }) : fd(this.h.H, {
            l: this,
            i: a
        })
    }
    var d = this.Ba(a);
    if (!d) return this.ma(a), null;
    var e = ed(this.h, d);
    if (void 0 !== e) {
        if (0 === e.b.count.value) return e.b.i = d, e.b.u = a, e.clone();
        e = e.clone();
        this.ma(a);
        return e
    }
    e = this.h.Aa(d);
    e = Rc[e];
    if (!e) return b.call(this);
    e = this.Y ? e.ya : e.pointerType;
    var g = cd(d, this.h, e.h);
    return null === g ? b.call(this) : this.Z ? fd(e.h.H, {
        l: e,
        i: g,
        v: this,
        u: a
    }) : fd(e.h.H, {
        l: e,
        i: g
    })
};
c.getInheritedInstanceCount = function () {
    return Object.keys(dd).length
};
c.getLiveInheritedInstances = function () {
    var a = [],
        b;
    for (b in dd) dd.hasOwnProperty(b) && a.push(dd[b]);
    return a
};
c.flushPendingDeletes = Pc;
c.setDelayFunction = function (a) {
    Nc = a;
    Oc.length && Nc && Nc(Pc)
};
hd = c.UnboundTypeError = Dc("UnboundTypeError");
c.count_emval_handles = function () {
    for (var a = 0, b = 5; b < Y.length; ++b) void 0 !== Y[b] && ++a;
    return a
};
c.get_first_emval = function () {
    for (var a = 5; a < Y.length; ++a)
        if (void 0 !== Y[a]) return Y[a];
    return null
};

function Eb(a, b) {
    var d = Array(xa(a) + 1);
    a = va(a, d, 0, d.length);
    b && (d.length = a);
    return d
}
var Sd = {
    __cxa_atexit: function (a, b) {
        na("atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)");
        Xa.unshift({
            pa: a,
            X: b
        })
    },
    __handle_stack_overflow: function () {
        r("stack overflow")
    },
    __map_file: function () {
        B[Rd() >> 2] = 63;
        return -1
    },
    __sys_fcntl64: function (a, b, d) {
        tc = d;
        try {
            var e = vc(a);
            switch (b) {
                case 0:
                    var g = uc();
                    return 0 > g ? -28 : kc(e.path, e.flags, 0, g).fd;
                case 1:
                case 2:
                    return 0;
                case 3:
                    return e.flags;
                case 4:
                    return g = uc(), e.flags |= g, 0;
                case 12:
                    return g = uc(),
                        Ba[g + 0 >> 1] = 2, 0;
                case 13:
                case 14:
                    return 0;
                case 16:
                case 8:
                    return -28;
                case 9:
                    return B[Rd() >> 2] = 28, -1;
                default:
                    return -28
            }
        } catch (f) {
            return "undefined" !== typeof Q && f instanceof J || r(f), -f.m
        }
    },
    __sys_getdents64: function (a, b, d) {
        try {
            var e = vc(a);
            if (!e.K) {
                var g = N(e.path, {
                    fa: !0
                }).node;
                if (!g.f.readdir) throw new J(54);
                var f = g.f.readdir(g);
                e.K = f
            }
            a = 0;
            for (var k = mc(e, 0, 1), m = Math.floor(k / 280); m < e.K.length && a + 280 <= d;) {
                var q = e.K[m];
                if ("." === q[0]) {
                    var n = 1;
                    var p = 4
                } else {
                    var z = Kb(e.node, q);
                    n = z.id;
                    p = 8192 === (z.mode & 61440) ? 2 : L(z.mode) ?
                        4 : 40960 === (z.mode & 61440) ? 10 : 8
                }
                I = [n >>> 0, (H = n, 1 <= +cb(H) ? 0 < H ? (fb(+eb(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+db((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
                B[b + a >> 2] = I[0];
                B[b + a + 4 >> 2] = I[1];
                I = [280 * (m + 1) >>> 0, (H = 280 * (m + 1), 1 <= +cb(H) ? 0 < H ? (fb(+eb(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+db((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
                B[b + a + 8 >> 2] = I[0];
                B[b + a + 12 >> 2] = I[1];
                Ba[b + a + 16 >> 1] = 280;
                D[b + a + 18 >> 0] = p;
                wa(q, b + a + 19, 256);
                a += 280;
                m += 1
            }
            mc(e, 280 * m, 0);
            return a
        } catch (w) {
            return "undefined" !== typeof Q && w instanceof J || r(w), -w.m
        }
    },
    __sys_ioctl: function (a,
        b, d) {
        tc = d;
        try {
            var e = vc(a);
            switch (b) {
                case 21509:
                case 21505:
                    return e.tty ? 0 : -59;
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508:
                    return e.tty ? 0 : -59;
                case 21519:
                    if (!e.tty) return -59;
                    var g = uc();
                    return B[g >> 2] = 0;
                case 21520:
                    return e.tty ? -28 : -59;
                case 21531:
                    a = g = uc();
                    if (!e.g.Da) throw new J(59);
                    return e.g.Da(e, b, a);
                case 21523:
                    return e.tty ? 0 : -59;
                case 21524:
                    return e.tty ? 0 : -59;
                default:
                    r("bad ioctl syscall " + b)
            }
        } catch (f) {
            return "undefined" !== typeof Q && f instanceof J || r(f), -f.m
        }
    },
    __sys_mkdir: function (a,
        b) {
        try {
            return a = y(a), a = wb(a), "/" === a[a.length - 1] && (a = a.substr(0, a.length - 1)), O(a, b), 0
        } catch (d) {
            return "undefined" !== typeof Q && d instanceof J || r(d), -d.m
        }
    },
    __sys_munmap: function (a, b) {
        try {
            if (-1 === (a | 0) || 0 === b) var d = -28;
            else {
                var e = sc[a];
                if (e && b === e.md) {
                    var g = Pb[e.fd];
                    if (e.qd & 2) {
                        var f = e.flags,
                            k = e.offset,
                            m = A.slice(a, a + b);
                        g && g.g.aa && g.g.aa(g, m, k, b, f)
                    }
                    sc[a] = null;
                    e.ua && X(e.nd)
                }
                d = 0
            }
            return d
        } catch (q) {
            return "undefined" !== typeof Q && q instanceof J || r(q), -q.m
        }
    },
    __sys_open: function (a, b, d) {
        tc = d;
        try {
            var e = y(a),
                g = uc();
            return kc(e, b, g).fd
        } catch (f) {
            return "undefined" !== typeof Q && f instanceof J || r(f), -f.m
        }
    },
    __sys_readlink: function (a, b, d) {
        try {
            a = y(a);
            if (0 >= d) var e = -28;
            else {
                var g = Tb(a),
                    f = Math.min(d, xa(g)),
                    k = D[b + f];
                wa(g, b, d + 1);
                D[b + f] = k;
                e = f
            }
            return e
        } catch (m) {
            return "undefined" !== typeof Q && m instanceof J || r(m), -m.m
        }
    },
    __sys_rmdir: function (a) {
        try {
            a = y(a);
            var b = N(a, {
                    parent: !0
                }).node,
                d = yb(a),
                e = Kb(b, d),
                g = bc(b, d, !0);
            if (g) throw new J(g);
            if (!b.f.rmdir) throw new J(63);
            if (e.P) throw new J(10);
            try {
                M.willDeletePath && M.willDeletePath(a)
            } catch (f) {
                t("FS.trackingDelegate['willDeletePath']('" +
                    a + "') threw an exception: " + f.message)
            }
            b.f.rmdir(b, d);
            Wb(e);
            try {
                if (M.onDeletePath) M.onDeletePath(a)
            } catch (f) {
                t("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + f.message)
            }
            return 0
        } catch (f) {
            return "undefined" !== typeof Q && f instanceof J || r(f), -f.m
        }
    },
    __sys_unlink: function (a) {
        try {
            a = y(a);
            var b = N(a, {
                    parent: !0
                }).node,
                d = yb(a),
                e = Kb(b, d),
                g = bc(b, d, !1);
            if (g) throw new J(g);
            if (!b.f.unlink) throw new J(63);
            if (e.P) throw new J(10);
            try {
                M.willDeletePath && M.willDeletePath(a)
            } catch (f) {
                t("FS.trackingDelegate['willDeletePath']('" +
                    a + "') threw an exception: " + f.message)
            }
            b.f.unlink(b, d);
            Wb(e);
            try {
                if (M.onDeletePath) M.onDeletePath(a)
            } catch (f) {
                t("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + f.message)
            }
            return 0
        } catch (f) {
            return "undefined" !== typeof Q && f instanceof J || r(f), -f.m
        }
    },
    _embind_register_bool: function (a, b, d, e, g) {
        var f = wc(d);
        b = R(b);
        U(a, {
            name: b,
            fromWireType: function (k) {
                return !!k
            },
            toWireType: function (k, m) {
                return m ? e : g
            },
            argPackAdvance: 8,
            readValueFromPointer: function (k) {
                if (1 === d) var m = D;
                else if (2 === d) m = Ba;
                else if (4 === d) m = B;
                else throw new TypeError("Unknown boolean type size: " + b);
                return this.fromWireType(m[k >> f])
            },
            D: null
        })
    },
    _embind_register_class: function (a, b, d, e, g, f, k, m, q, n, p, z, w) {
        p = R(p);
        f = W(g, f);
        m && (m = W(k, m));
        n && (n = W(q, n));
        w = W(z, w);
        var l = Bc(p);
        Tc(l, function () {
            kd("Cannot construct " + p + " due to unbound types", [e])
        });
        T([a, b, d], e ? [e] : [], function (u) {
            u = u[0];
            if (e) {
                var x = u.h;
                var C = x.H
            } else C = Qc.prototype;
            u = Cc(l, function () {
                if (Object.getPrototypeOf(this) !== v) throw new Ec("Use 'new' to construct " + p);
                if (void 0 ===
                    F.J) throw new Ec(p + " has no accessible constructor");
                var bd = F.J[arguments.length];
                if (void 0 === bd) throw new Ec("Tried to invoke ctor of " + p + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(F.J).toString() + ") parameters instead!");
                return bd.apply(this, arguments)
            });
            var v = Object.create(C, {
                constructor: {
                    value: u
                }
            });
            u.prototype = v;
            var F = new Uc(p, u, v, w, x, f, m, n);
            x = new V(p, F, !0, !1);
            C = new V(p + "*", F, !1, !1);
            var P = new V(p + " const*", F, !1, !0);
            Rc[a] = {
                pointerType: C,
                ya: P
            };
            gd(l, u);
            return [x,
                C, P
            ]
        })
    },
    _embind_register_class_class_function: function (a, b, d, e, g, f, k) {
        var m = od(d, e);
        b = R(b);
        f = W(g, f);
        T([], [a], function (q) {
            function n() {
                kd("Cannot call " + p + " due to unbound types", m)
            }
            q = q[0];
            var p = q.name + "." + b,
                z = q.h.constructor;
            void 0 === z[b] ? (n.N = d - 1, z[b] = n) : (Sc(z, b, p), z[b].o[d - 1] = n);
            T([], m, function (w) {
                w = [w[0], null].concat(w.slice(1));
                w = nd(p, w, null, f, k);
                void 0 === z[b].o ? (w.N = d - 1, z[b] = w) : z[b].o[d - 1] = w;
                return []
            });
            return []
        })
    },
    _embind_register_class_constructor: function (a, b, d, e, g, f) {
        assert(0 < b);
        var k = od(b,
            d);
        g = W(e, g);
        var m = [f],
            q = [];
        T([], [a], function (n) {
            n = n[0];
            var p = "constructor " + n.name;
            void 0 === n.h.J && (n.h.J = []);
            if (void 0 !== n.h.J[b - 1]) throw new Ec("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + n.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
            n.h.J[b - 1] = function () {
                kd("Cannot construct " + n.name + " due to unbound types", k)
            };
            T([], k, function (z) {
                n.h.J[b - 1] = function () {
                    arguments.length !== b - 1 &&
                        S(p + " called with " + arguments.length + " arguments, expected " + (b - 1));
                    q.length = 0;
                    m.length = b;
                    for (var w = 1; w < b; ++w) m[w] = z[w].toWireType(q, arguments[w - 1]);
                    w = g.apply(null, m);
                    md(q);
                    return z[0].fromWireType(w)
                };
                return []
            });
            return []
        })
    },
    _embind_register_class_function: function (a, b, d, e, g, f, k, m) {
        var q = od(d, e);
        b = R(b);
        f = W(g, f);
        T([], [a], function (n) {
            function p() {
                kd("Cannot call " + z + " due to unbound types", q)
            }
            n = n[0];
            var z = n.name + "." + b;
            m && n.h.Ga.push(b);
            var w = n.h.H,
                l = w[b];
            void 0 === l || void 0 === l.o && l.className !== n.name &&
                l.N === d - 2 ? (p.N = d - 2, p.className = n.name, w[b] = p) : (Sc(w, b, z), w[b].o[d - 2] = p);
            T([], q, function (u) {
                u = nd(z, u, n, f, k);
                void 0 === w[b].o ? (u.N = d - 2, w[b] = u) : w[b].o[d - 2] = u;
                return []
            });
            return []
        })
    },
    _embind_register_class_property: function (a, b, d, e, g, f, k, m, q, n) {
        b = R(b);
        g = W(e, g);
        T([], [a], function (p) {
            p = p[0];
            var z = p.name + "." + b,
                w = {
                    get: function () {
                        kd("Cannot access " + z + " due to unbound types", [d, k])
                    },
                    enumerable: !0,
                    configurable: !0
                };
            q ? w.set = function () {
                kd("Cannot access " + z + " due to unbound types", [d, k])
            } : w.set = function () {
                S(z + " is a read-only property")
            };
            Object.defineProperty(p.h.H, b, w);
            T([], q ? [d, k] : [d], function (l) {
                var u = l[0],
                    x = {
                        get: function () {
                            var v = pd(this, p, z + " getter");
                            return u.fromWireType(g(f, v))
                        },
                        enumerable: !0
                    };
                if (q) {
                    q = W(m, q);
                    var C = l[1];
                    x.set = function (v) {
                        var F = pd(this, p, z + " setter"),
                            P = [];
                        q(n, F, C.toWireType(P, v));
                        md(P)
                    }
                }
                Object.defineProperty(p.h.H, b, x);
                return []
            });
            return []
        })
    },
    _embind_register_emval: function (a, b) {
        b = R(b);
        U(a, {
            name: b,
            fromWireType: function (d) {
                var e = Y[d].value;
                rd(d);
                return e
            },
            toWireType: function (d, e) {
                return Zc(e)
            },
            argPackAdvance: 8,
            readValueFromPointer: ad,
            D: null
        })
    },
    _embind_register_float: function (a, b, d) {
        d = wc(d);
        b = R(b);
        U(a, {
            name: b,
            fromWireType: function (e) {
                return e
            },
            toWireType: function (e, g) {
                if ("number" !== typeof g && "boolean" !== typeof g) throw new TypeError('Cannot convert "' + Xc(g) + '" to ' + this.name);
                return g
            },
            argPackAdvance: 8,
            readValueFromPointer: sd(b, d),
            D: null
        })
    },
    _embind_register_integer: function (a, b, d, e, g) {
        function f(n) {
            return n
        }
        b = R(b); - 1 === g && (g = 4294967295);
        var k = wc(d);
        if (0 === e) {
            var m = 32 - 8 * d;
            f = function (n) {
                return n << m >>> m
            }
        }
        var q = -1 != b.indexOf("unsigned");
        U(a, {
            name: b,
            fromWireType: f,
            toWireType: function (n, p) {
                if ("number" !== typeof p && "boolean" !== typeof p) throw new TypeError('Cannot convert "' + Xc(p) + '" to ' + this.name);
                if (p < e || p > g) throw new TypeError('Passing a number "' + Xc(p) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + e + ", " + g + "]!");
                return q ? p >>> 0 : p | 0
            },
            argPackAdvance: 8,
            readValueFromPointer: td(b, k, 0 !== e),
            D: null
        })
    },
    _embind_register_memory_view: function (a, b, d) {
        function e(f) {
            f >>=
                2;
            var k = E;
            return new g(Ka, k[f + 1], k[f])
        }
        var g = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        d = R(d);
        U(a, {
            name: d,
            fromWireType: e,
            argPackAdvance: 8,
            readValueFromPointer: e
        }, {
            Ca: !0
        })
    },
    _embind_register_std_string: function (a, b) {
        b = R(b);
        var d = "std::string" === b;
        U(a, {
            name: b,
            fromWireType: function (e) {
                var g = E[e >> 2];
                if (d)
                    for (var f = e + 4, k = 0; k <= g; ++k) {
                        var m = e + 4 + k;
                        if (0 == A[m] || k == g) {
                            f = y(f, m - f);
                            if (void 0 === q) var q = f;
                            else q += String.fromCharCode(0), q += f;
                            f = m + 1
                        }
                    } else {
                        q = Array(g);
                        for (k = 0; k < g; ++k) q[k] = String.fromCharCode(A[e + 4 + k]);
                        q = q.join("")
                    }
                X(e);
                return q
            },
            toWireType: function (e, g) {
                g instanceof ArrayBuffer && (g = new Uint8Array(g));
                var f = "string" === typeof g;
                f || g instanceof Uint8Array || g instanceof Uint8ClampedArray || g instanceof Int8Array || S("Cannot pass non-string to std::string");
                var k = (d && f ? function () {
                        return xa(g)
                    } : function () {
                        return g.length
                    })(),
                    m = Ia(4 + k + 1);
                E[m >> 2] = k;
                if (d && f) wa(g, m + 4, k + 1);
                else if (f)
                    for (f = 0; f < k; ++f) {
                        var q = g.charCodeAt(f);
                        255 < q && (X(m), S("String has UTF-16 code units that do not fit in 8 bits"));
                        A[m + 4 + f] = q
                    } else
                        for (f = 0; f < k; ++f) A[m + 4 + f] = g[f];
                null !== e && e.push(X, m);
                return m
            },
            argPackAdvance: 8,
            readValueFromPointer: ad,
            D: function (e) {
                X(e)
            }
        })
    },
    _embind_register_std_wstring: function (a, b, d) {
        d = R(d);
        if (2 === b) {
            var e = za;
            var g = Ca;
            var f = Da;
            var k = function () {
                return Aa
            };
            var m = 1
        } else 4 === b && (e = Ea, g = Fa, f = Ga, k = function () {
            return E
        }, m = 2);
        U(a, {
            name: d,
            fromWireType: function (q) {
                for (var n = E[q >> 2], p = k(), z, w = q + 4, l = 0; l <= n; ++l) {
                    var u = q + 4 + l * b;
                    if (0 == p[u >> m] || l == n) w = e(w, u - w), void 0 === z ? z = w : (z += String.fromCharCode(0), z += w), w =
                        u + b
                }
                X(q);
                return z
            },
            toWireType: function (q, n) {
                "string" !== typeof n && S("Cannot pass non-string to C++ string type " + d);
                var p = f(n),
                    z = Ia(4 + p + b);
                E[z >> 2] = p >> m;
                g(n, z + 4, p + b);
                null !== q && q.push(X, z);
                return z
            },
            argPackAdvance: 8,
            readValueFromPointer: ad,
            D: function (q) {
                X(q)
            }
        })
    },
    _embind_register_void: function (a, b) {
        b = R(b);
        U(a, {
            ld: !0,
            name: b,
            argPackAdvance: 0,
            fromWireType: function () {},
            toWireType: function () {}
        })
    },
    _emval_decref: rd,
    _emval_incref: function (a) {
        4 < a && (Y[a].ja += 1)
    },
    _emval_take_value: function (a, b) {
        var d = zc[a];
        void 0 ===
            d && S("_emval_take_value has unknown type " + id(a));
        a = d.readValueFromPointer(b);
        return Zc(a)
    },
    abort: function () {
        r()
    },
    clock: ud,
    dladdr: function () {
        r("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking")
    },
    emscripten_get_sbrk_ptr: function () {
        return 1493088
    },
    emscripten_log: function (a, b, d) {
        var e = "";
        b = wd(b, d);
        for (d = 0; d < b.length; ++d) e += String.fromCharCode(b[d]);
        a & 24 && (e = e.replace(/\s+$/, ""), e += (0 < e.length ? "\n" : "") + zd(a));
        a & 1 ? a & 4 ? console.error(e) :
            a & 2 ? console.warn(e) : a & 512 ? console.info(e) : a & 256 ? console.debug(e) : console.log(e) : a & 6 ? t(e) : ma(e)
    },
    emscripten_memcpy_big: function (a, b, d) {
        A.copyWithin(a, b, b + d)
    },
    emscripten_resize_heap: function (a) {
        a >>>= 0;
        var b = A.length;
        assert(a > b);
        if (2147483648 < a) return t("Cannot enlarge memory, asked to go up to " + a + " bytes, but the limit is 2147483648 bytes!"), !1;
        for (var d = 1; 4 >= d; d *= 2) {
            var e = b * (1 + .2 / d);
            e = Math.min(e, a + 100663296);
            e = Math.max(16777216, a, e);
            0 < e % 65536 && (e += 65536 - e % 65536);
            e = Math.min(2147483648, e);
            a: {
                var g =
                    e;
                try {
                    qa.grow(g - Ka.byteLength + 65535 >>> 16);
                    Na(qa.buffer);
                    var f = 1;
                    break a
                } catch (k) {
                    console.error("emscripten_realloc_buffer: Attempted to grow heap from " + Ka.byteLength + " bytes to " + g + " bytes, but got error: " + k)
                }
                f = void 0
            }
            if (f) return !0
        }
        t("Failed to grow the heap from " + b + " bytes to " + e + " bytes, not enough memory!");
        return !1
    },
    emscripten_run_script: function (a) {
        eval(y(a))
    },
    emscripten_run_script_int: function (a) {
        return eval(y(a)) | 0
    },
    emscripten_run_script_string: Z,
    environ_get: function (a, b) {
        var d = 0;
        Bd().forEach(function (e,
            g) {
            var f = b + d;
            g = B[a + 4 * g >> 2] = f;
            for (f = 0; f < e.length; ++f) assert(e.charCodeAt(f) === e.charCodeAt(f) & 255), D[g++ >> 0] = e.charCodeAt(f);
            D[g >> 0] = 0;
            d += e.length + 1
        });
        return 0
    },
    environ_sizes_get: function (a, b) {
        var d = Bd();
        B[a >> 2] = d.length;
        var e = 0;
        d.forEach(function (g) {
            e += g.length + 1
        });
        B[b >> 2] = e;
        return 0
    },
    fd_close: function (a) {
        try {
            var b = vc(a);
            if (null === b.fd) throw new J(8);
            b.K && (b.K = null);
            try {
                b.g.close && b.g.close(b)
            } catch (d) {
                throw d;
            } finally {
                Pb[b.fd] = null
            }
            b.fd = null;
            return 0
        } catch (d) {
            return "undefined" !== typeof Q && d instanceof
            J || r(d), d.m
        }
    },
    fd_read: function (a, b, d, e) {
        try {
            a: {
                for (var g = vc(a), f = a = 0; f < d; f++) {
                    var k = B[b + (8 * f + 4) >> 2],
                        m = g,
                        q = B[b + 8 * f >> 2],
                        n = k,
                        p = void 0,
                        z = D;
                    if (0 > n || 0 > p) throw new J(28);
                    if (null === m.fd) throw new J(8);
                    if (1 === (m.flags & 2097155)) throw new J(8);
                    if (L(m.node.mode)) throw new J(31);
                    if (!m.g.read) throw new J(28);
                    var w = "undefined" !== typeof p;
                    if (!w) p = m.position;
                    else if (!m.seekable) throw new J(70);
                    var l = m.g.read(m, z, q, n, p);
                    w || (m.position += l);
                    var u = l;
                    if (0 > u) {
                        var x = -1;
                        break a
                    }
                    a += u;
                    if (u < k) break
                }
                x = a
            }
            B[e >> 2] = x;
            return 0
        }
        catch (C) {
            return "undefined" !==
                typeof Q && C instanceof J || r(C), C.m
        }
    },
    fd_seek: function (a, b, d, e, g) {
        try {
            var f = vc(a);
            a = 4294967296 * d + (b >>> 0);
            if (-9007199254740992 >= a || 9007199254740992 <= a) return -61;
            mc(f, a, e);
            I = [f.position >>> 0, (H = f.position, 1 <= +cb(H) ? 0 < H ? (fb(+eb(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+db((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
            B[g >> 2] = I[0];
            B[g + 4 >> 2] = I[1];
            f.K && 0 === a && 0 === e && (f.K = null);
            return 0
        } catch (k) {
            return "undefined" !== typeof Q && k instanceof J || r(k), k.m
        }
    },
    fd_write: function (a, b, d, e) {
        try {
            a: {
                for (var g = vc(a), f = a = 0; f < d; f++) {
                    var k =
                        g,
                        m = B[b + 8 * f >> 2],
                        q = B[b + (8 * f + 4) >> 2],
                        n = void 0,
                        p = D;
                    if (0 > q || 0 > n) throw new J(28);
                    if (null === k.fd) throw new J(8);
                    if (0 === (k.flags & 2097155)) throw new J(8);
                    if (L(k.node.mode)) throw new J(31);
                    if (!k.g.write) throw new J(28);
                    k.seekable && k.flags & 1024 && mc(k, 0, 2);
                    var z = "undefined" !== typeof n;
                    if (!z) n = k.position;
                    else if (!k.seekable) throw new J(70);
                    var w = k.g.write(k, p, m, q, n, void 0);
                    z || (k.position += w);
                    try {
                        if (k.path && M.onWriteToFile) M.onWriteToFile(k.path)
                    } catch (x) {
                        t("FS.trackingDelegate['onWriteToFile']('" + k.path + "') threw an exception: " +
                            x.message)
                    }
                    var l = w;
                    if (0 > l) {
                        var u = -1;
                        break a
                    }
                    a += l
                }
                u = a
            }
            B[e >> 2] = u;
            return 0
        }
        catch (x) {
            return "undefined" !== typeof Q && x instanceof J || r(x), x.m
        }
    },
    gmtime: function (a) {
        a = new Date(1E3 * B[a >> 2]);
        B[373276] = a.getUTCSeconds();
        B[373277] = a.getUTCMinutes();
        B[373278] = a.getUTCHours();
        B[373279] = a.getUTCDate();
        B[373280] = a.getUTCMonth();
        B[373281] = a.getUTCFullYear() - 1900;
        B[373282] = a.getUTCDay();
        B[373285] = 0;
        B[373284] = 0;
        B[373283] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
        B[373286] = Dd;
        return 1493104
    },
    localtime: function (a) {
        Ed();
        a = new Date(1E3 * B[a >> 2]);
        B[373276] = a.getSeconds();
        B[373277] = a.getMinutes();
        B[373278] = a.getHours();
        B[373279] = a.getDate();
        B[373280] = a.getMonth();
        B[373281] = a.getFullYear() - 1900;
        B[373282] = a.getDay();
        var b = new Date(a.getFullYear(), 0, 1);
        B[373283] = (a.getTime() - b.getTime()) / 864E5 | 0;
        B[373285] = -(60 * a.getTimezoneOffset());
        var d = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset();
        b = b.getTimezoneOffset();
        a = (d != b && a.getTimezoneOffset() == Math.min(b, d)) | 0;
        B[373284] = a;
        a = B[Id() + (a ? 4 : 0) >> 2];
        B[373286] = a;
        return 1493104
    },
    memory: qa,
    mktime: function (a) {
        Ed();
        var b = new Date(B[a + 20 >> 2] + 1900, B[a + 16 >> 2], B[a + 12 >> 2], B[a + 8 >> 2], B[a + 4 >> 2], B[a >> 2], 0),
            d = B[a + 32 >> 2],
            e = b.getTimezoneOffset(),
            g = new Date(b.getFullYear(), 0, 1),
            f = (new Date(b.getFullYear(), 6, 1)).getTimezoneOffset(),
            k = g.getTimezoneOffset(),
            m = Math.min(k, f);
        0 > d ? B[a + 32 >> 2] = Number(f != k && m == e) : 0 < d != (m == e) && (f = Math.max(k, f), b.setTime(b.getTime() + 6E4 * ((0 < d ? m : f) - e)));
        B[a + 24 >> 2] = b.getDay();
        B[a + 28 >> 2] = (b.getTime() - g.getTime()) / 864E5 | 0;
        return b.getTime() / 1E3 | 0
    },
    pthread_create: function () {
        return 6
    },
    pthread_join: function () {},
    pthread_mutexattr_destroy: function () {},
    pthread_mutexattr_init: function () {},
    pthread_mutexattr_settype: function () {},
    pthread_spin_destroy: function () {
        return 0
    },
    pthread_spin_init: function () {
        return 0
    },
    pthread_spin_lock: function () {
        return 0
    },
    pthread_spin_unlock: function () {
        return 0
    },
    setTempRet0: function () {},
    strftime: Od,
    strftime_l: function (a, b, d, e) {
        return Od(a, b, d, e)
    },
    table: ra,
    time: function (a) {
        var b = Date.now() / 1E3 | 0;
        a && (B[a >> 2] = b);
        return b
    }
};
(function () {
    function a(f) {
        c.asm = f.exports;
        gb--;
        c.monitorRunDependencies && c.monitorRunDependencies(gb);
        assert(jb["wasm-instantiate"]);
        delete jb["wasm-instantiate"];
        0 == gb && (null !== hb && (clearInterval(hb), hb = null), ib && (f = ib, ib = null, f()))
    }

    function b(f) {
        assert(c === g, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
        g = null;
        a(f.instance)
    }

    function d(f) {
        return sb().then(function (k) {
            return WebAssembly.instantiate(k, e)
        }).then(f, function (k) {
            t("failed to asynchronously prepare wasm: " +
                k);
            r(k)
        })
    }
    var e = {
        env: Sd,
        wasi_snapshot_preview1: Sd
    };
    kb();
    var g = c;
    if (c.instantiateWasm) try {
        return c.instantiateWasm(e, a)
    } catch (f) {
        return t("Module.instantiateWasm callback failed with error: " + f), !1
    }(function () {
        if (pa || "function" !== typeof WebAssembly.instantiateStreaming || pb() || nb("file://") || "function" !== typeof fetch) return d(b);
        fetch(ob, {
            credentials: "same-origin"
        }).then(function (f) {
            return WebAssembly.instantiateStreaming(f, e).then(b, function (k) {
                t("wasm streaming compile failed: " + k);
                t("falling back to ArrayBuffer instantiation");
                return d(b)
            })
        })
    })();
    return {}
})();
var tb = c.___wasm_call_ctors = G("__wasm_call_ctors"),
    xd = c._strlen = G("strlen"),
    Ia = c._malloc = G("malloc"),
    Rd = c.___errno_location = G("__errno_location"),
    X = c._free = G("free");
c._fflush = G("fflush");
c._testSetjmp = G("testSetjmp");
c._saveSetjmp = G("saveSetjmp");
c._realloc = G("realloc");
var jd = c.___getTypeName = G("__getTypeName");
c.___embind_register_native_and_builtin_types = G("__embind_register_native_and_builtin_types");
var Id = c.__get_tzname = G("_get_tzname"),
    Hd = c.__get_daylight = G("_get_daylight"),
    Gd = c.__get_timezone = G("_get_timezone");
c._setThrew = G("setThrew");
c.stackSave = G("stackSave");
c.stackRestore = G("stackRestore");
c.stackAlloc = G("stackAlloc");
c._emscripten_main_thread_process_queued_calls = G("emscripten_main_thread_process_queued_calls");
c.___set_stack_limit = G("__set_stack_limit");
c.__growWasmMemory = G("__growWasmMemory");
c.dynCall_vi = G("dynCall_vi");
c.dynCall_ii = G("dynCall_ii");
c.dynCall_vii = G("dynCall_vii");
c.dynCall_iiii = G("dynCall_iiii");
c.dynCall_viii = G("dynCall_viii");
c.dynCall_iii = G("dynCall_iii");
c.dynCall_viiiiiii = G("dynCall_viiiiiii");
c.dynCall_viiiiii = G("dynCall_viiiiii");
c.dynCall_viiiii = G("dynCall_viiiii");
c.dynCall_viiiiiiii = G("dynCall_viiiiiiii");
c.dynCall_iiiiiiii = G("dynCall_iiiiiiii");
c.dynCall_iiiiiii = G("dynCall_iiiiiii");
c.dynCall_iiiiii = G("dynCall_iiiiii");
c.dynCall_iiiiiiiii = G("dynCall_iiiiiiiii");
c.dynCall_viijii = G("dynCall_viijii");
c.dynCall_viiii = G("dynCall_viiii");
c.dynCall_v = G("dynCall_v");
c.dynCall_iiiii = G("dynCall_iiiii");
c.dynCall_diiid = G("dynCall_diiid");
c.dynCall_viiiiiiiii = G("dynCall_viiiiiiiii");
c.dynCall_iiiiiiiiiiiii = G("dynCall_iiiiiiiiiiiii");
c.dynCall_iiiiiiiiii = G("dynCall_iiiiiiiiii");
c.dynCall_iiiiiiiiiiii = G("dynCall_iiiiiiiiiiii");
c.dynCall_viiiiiiiiii = G("dynCall_viiiiiiiiii");
c.dynCall_viiiiiiji = G("dynCall_viiiiiiji");
c.dynCall_viiijj = G("dynCall_viiijj");
c.dynCall_idd = G("dynCall_idd");
c.dynCall_fi = G("dynCall_fi");
c.dynCall_vif = G("dynCall_vif");
c.dynCall_viiiiiijjii = G("dynCall_viiiiiijjii");
c.dynCall_viiiiiiiiiiii = G("dynCall_viiiiiiiiiiii");
c.dynCall_viiifiiii = G("dynCall_viiifiiii");
c.dynCall_viiifii = G("dynCall_viiifii");
c.dynCall_iiiiiiiiiii = G("dynCall_iiiiiiiiiii");
c.dynCall_viffff = G("dynCall_viffff");
c.dynCall_jiji = G("dynCall_jiji");
c.dynCall_iidiiii = G("dynCall_iidiiii");
c.dynCall_iiiiij = G("dynCall_iiiiij");
c.dynCall_iiiiid = G("dynCall_iiiiid");
c.dynCall_iiiiijj = G("dynCall_iiiiijj");
c.dynCall_iiiiiijj = G("dynCall_iiiiiijj");
Object.getOwnPropertyDescriptor(c, "intArrayFromString") || (c.intArrayFromString = function () {
    r("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "intArrayToString") || (c.intArrayToString = function () {
    r("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ccall") || (c.ccall = function () {
    r("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "cwrap") || (c.cwrap = function () {
    r("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "setValue") || (c.setValue = function () {
    r("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getValue") || (c.getValue = function () {
    r("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "allocate") || (c.allocate = function () {
    r("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getMemory") || (c.getMemory = function () {
    r("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "UTF8ArrayToString") || (c.UTF8ArrayToString = function () {
    r("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "UTF8ToString") || (c.UTF8ToString = function () {
    r("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToUTF8Array") || (c.stringToUTF8Array = function () {
    r("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToUTF8") || (c.stringToUTF8 = function () {
    r("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "lengthBytesUTF8") || (c.lengthBytesUTF8 = function () {
    r("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stackTrace") || (c.stackTrace = function () {
    r("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addOnPreRun") || (c.addOnPreRun = function () {
    r("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addOnInit") || (c.addOnInit = function () {
    r("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addOnPreMain") || (c.addOnPreMain = function () {
    r("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addOnExit") || (c.addOnExit = function () {
    r("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addOnPostRun") || (c.addOnPostRun = function () {
    r("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeStringToMemory") || (c.writeStringToMemory = function () {
    r("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeArrayToMemory") || (c.writeArrayToMemory = function () {
    r("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeAsciiToMemory") || (c.writeAsciiToMemory = function () {
    r("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addRunDependency") || (c.addRunDependency = function () {
    r("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "removeRunDependency") || (c.removeRunDependency = function () {
    r("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createFolder") || (c.FS_createFolder = function () {
    r("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createPath") || (c.FS_createPath = function () {
    r("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createDataFile") || (c.FS_createDataFile = function () {
    r("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createPreloadedFile") || (c.FS_createPreloadedFile = function () {
    r("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createLazyFile") || (c.FS_createLazyFile = function () {
    r("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createLink") || (c.FS_createLink = function () {
    r("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_createDevice") || (c.FS_createDevice = function () {
    r("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "FS_unlink") || (c.FS_unlink = function () {
    r("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
Object.getOwnPropertyDescriptor(c, "dynamicAlloc") || (c.dynamicAlloc = function () {
    r("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "loadDynamicLibrary") || (c.loadDynamicLibrary = function () {
    r("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "loadWebAssemblyModule") || (c.loadWebAssemblyModule = function () {
    r("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getLEB") || (c.getLEB = function () {
    r("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getFunctionTables") || (c.getFunctionTables = function () {
    r("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "alignFunctionTables") || (c.alignFunctionTables = function () {
    r("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registerFunctions") || (c.registerFunctions = function () {
    r("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "addFunction") || (c.addFunction = function () {
    r("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "removeFunction") || (c.removeFunction = function () {
    r("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getFuncWrapper") || (c.getFuncWrapper = function () {
    r("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "prettyPrint") || (c.prettyPrint = function () {
    r("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "makeBigInt") || (c.makeBigInt = function () {
    r("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "dynCall") || (c.dynCall = function () {
    r("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getCompilerSetting") || (c.getCompilerSetting = function () {
    r("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "print") || (c.print = function () {
    r("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "printErr") || (c.printErr = function () {
    r("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getTempRet0") || (c.getTempRet0 = function () {
    r("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "setTempRet0") || (c.setTempRet0 = function () {
    r("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "callMain") || (c.callMain = function () {
    r("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "abort") || (c.abort = function () {
    r("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToNewUTF8") || (c.stringToNewUTF8 = function () {
    r("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emscripten_realloc_buffer") || (c.emscripten_realloc_buffer = function () {
    r("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ENV") || (c.ENV = function () {
    r("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ERRNO_CODES") || (c.ERRNO_CODES = function () {
    r("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ERRNO_MESSAGES") || (c.ERRNO_MESSAGES = function () {
    r("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "setErrNo") || (c.setErrNo = function () {
    r("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "DNS") || (c.DNS = function () {
    r("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GAI_ERRNO_MESSAGES") || (c.GAI_ERRNO_MESSAGES = function () {
    r("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "Protocols") || (c.Protocols = function () {
    r("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "Sockets") || (c.Sockets = function () {
    r("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "UNWIND_CACHE") || (c.UNWIND_CACHE = function () {
    r("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "readAsmConstArgs") || (c.readAsmConstArgs = function () {
    r("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "jstoi_q") || (c.jstoi_q = function () {
    r("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "jstoi_s") || (c.jstoi_s = function () {
    r("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "abortStackOverflow") || (c.abortStackOverflow = function () {
    r("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "reallyNegative") || (c.reallyNegative = function () {
    r("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "formatString") || (c.formatString = function () {
    r("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "PATH") || (c.PATH = function () {
    r("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "PATH_FS") || (c.PATH_FS = function () {
    r("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SYSCALLS") || (c.SYSCALLS = function () {
    r("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "syscallMmap2") || (c.syscallMmap2 = function () {
    r("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "syscallMunmap") || (c.syscallMunmap = function () {
    r("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "JSEvents") || (c.JSEvents = function () {
    r("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "specialHTMLTargets") || (c.specialHTMLTargets = function () {
    r("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "demangle") || (c.demangle = function () {
    r("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "demangleAll") || (c.demangleAll = function () {
    r("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "jsStackTrace") || (c.jsStackTrace = function () {
    r("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stackTrace") || (c.stackTrace = function () {
    r("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getEnvStrings") || (c.getEnvStrings = function () {
    r("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "checkWasiClock") || (c.checkWasiClock = function () {
    r("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeI53ToI64") || (c.writeI53ToI64 = function () {
    r("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeI53ToI64Clamped") || (c.writeI53ToI64Clamped = function () {
    r("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeI53ToI64Signaling") || (c.writeI53ToI64Signaling = function () {
    r("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeI53ToU64Clamped") || (c.writeI53ToU64Clamped = function () {
    r("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "writeI53ToU64Signaling") || (c.writeI53ToU64Signaling = function () {
    r("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "readI53FromI64") || (c.readI53FromI64 = function () {
    r("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "readI53FromU64") || (c.readI53FromU64 = function () {
    r("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "convertI32PairToI53") || (c.convertI32PairToI53 = function () {
    r("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "convertU32PairToI53") || (c.convertU32PairToI53 = function () {
    r("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "Browser") || (c.Browser = function () {
    r("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "FS") || (c.FS = function () {
    r("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "MEMFS") || (c.MEMFS = function () {
    r("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "TTY") || (c.TTY = function () {
    r("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "PIPEFS") || (c.PIPEFS = function () {
    r("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SOCKFS") || (c.SOCKFS = function () {
    r("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GL") || (c.GL = function () {
    r("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emscriptenWebGLGet") || (c.emscriptenWebGLGet = function () {
    r("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emscriptenWebGLGetTexPixelData") || (c.emscriptenWebGLGetTexPixelData = function () {
    r("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emscriptenWebGLGetUniform") || (c.emscriptenWebGLGetUniform = function () {
    r("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emscriptenWebGLGetVertexAttrib") || (c.emscriptenWebGLGetVertexAttrib = function () {
    r("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "AL") || (c.AL = function () {
    r("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SDL_unicode") || (c.SDL_unicode = function () {
    r("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SDL_ttfContext") || (c.SDL_ttfContext = function () {
    r("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SDL_audio") || (c.SDL_audio = function () {
    r("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SDL") || (c.SDL = function () {
    r("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "SDL_gfx") || (c.SDL_gfx = function () {
    r("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GLUT") || (c.GLUT = function () {
    r("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "EGL") || (c.EGL = function () {
    r("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GLFW_Window") || (c.GLFW_Window = function () {
    r("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GLFW") || (c.GLFW = function () {
    r("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "GLEW") || (c.GLEW = function () {
    r("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "IDBStore") || (c.IDBStore = function () {
    r("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "runAndAbortIfError") || (c.runAndAbortIfError = function () {
    r("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_handle_array") || (c.emval_handle_array = function () {
    r("'emval_handle_array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_free_list") || (c.emval_free_list = function () {
    r("'emval_free_list' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_symbols") || (c.emval_symbols = function () {
    r("'emval_symbols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "init_emval") || (c.init_emval = function () {
    r("'init_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "count_emval_handles") || (c.count_emval_handles = function () {
    r("'count_emval_handles' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "get_first_emval") || (c.get_first_emval = function () {
    r("'get_first_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getStringOrSymbol") || (c.getStringOrSymbol = function () {
    r("'getStringOrSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "requireHandle") || (c.requireHandle = function () {
    r("'requireHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_newers") || (c.emval_newers = function () {
    r("'emval_newers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "craftEmvalAllocator") || (c.craftEmvalAllocator = function () {
    r("'craftEmvalAllocator' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_get_global") || (c.emval_get_global = function () {
    r("'emval_get_global' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "emval_methodCallers") || (c.emval_methodCallers = function () {
    r("'emval_methodCallers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "InternalError") || (c.InternalError = function () {
    r("'InternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "BindingError") || (c.BindingError = function () {
    r("'BindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "UnboundTypeError") || (c.UnboundTypeError = function () {
    r("'UnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "PureVirtualError") || (c.PureVirtualError = function () {
    r("'PureVirtualError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "init_embind") || (c.init_embind = function () {
    r("'init_embind' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "throwInternalError") || (c.throwInternalError = function () {
    r("'throwInternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "throwBindingError") || (c.throwBindingError = function () {
    r("'throwBindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "throwUnboundTypeError") || (c.throwUnboundTypeError = function () {
    r("'throwUnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ensureOverloadTable") || (c.ensureOverloadTable = function () {
    r("'ensureOverloadTable' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "exposePublicSymbol") || (c.exposePublicSymbol = function () {
    r("'exposePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "replacePublicSymbol") || (c.replacePublicSymbol = function () {
    r("'replacePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "extendError") || (c.extendError = function () {
    r("'extendError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "createNamedFunction") || (c.createNamedFunction = function () {
    r("'createNamedFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registeredInstances") || (c.registeredInstances = function () {
    r("'registeredInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getBasestPointer") || (c.getBasestPointer = function () {
    r("'getBasestPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registerInheritedInstance") || (c.registerInheritedInstance = function () {
    r("'registerInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "unregisterInheritedInstance") || (c.unregisterInheritedInstance = function () {
    r("'unregisterInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getInheritedInstance") || (c.getInheritedInstance = function () {
    r("'getInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getInheritedInstanceCount") || (c.getInheritedInstanceCount = function () {
    r("'getInheritedInstanceCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getLiveInheritedInstances") || (c.getLiveInheritedInstances = function () {
    r("'getLiveInheritedInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registeredTypes") || (c.registeredTypes = function () {
    r("'registeredTypes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "awaitingDependencies") || (c.awaitingDependencies = function () {
    r("'awaitingDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "typeDependencies") || (c.typeDependencies = function () {
    r("'typeDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registeredPointers") || (c.registeredPointers = function () {
    r("'registeredPointers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "registerType") || (c.registerType = function () {
    r("'registerType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "whenDependentTypesAreResolved") || (c.whenDependentTypesAreResolved = function () {
    r("'whenDependentTypesAreResolved' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "embind_charCodes") || (c.embind_charCodes = function () {
    r("'embind_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "embind_init_charCodes") || (c.embind_init_charCodes = function () {
    r("'embind_init_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "readLatin1String") || (c.readLatin1String = function () {
    r("'readLatin1String' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getTypeName") || (c.getTypeName = function () {
    r("'getTypeName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "heap32VectorToArray") || (c.heap32VectorToArray = function () {
    r("'heap32VectorToArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "requireRegisteredType") || (c.requireRegisteredType = function () {
    r("'requireRegisteredType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "getShiftFromSize") || (c.getShiftFromSize = function () {
    r("'getShiftFromSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "integerReadValueFromPointer") || (c.integerReadValueFromPointer = function () {
    r("'integerReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "enumReadValueFromPointer") || (c.enumReadValueFromPointer = function () {
    r("'enumReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "floatReadValueFromPointer") || (c.floatReadValueFromPointer = function () {
    r("'floatReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "simpleReadValueFromPointer") || (c.simpleReadValueFromPointer = function () {
    r("'simpleReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "runDestructors") || (c.runDestructors = function () {
    r("'runDestructors' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "new_") || (c.new_ = function () {
    r("'new_' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "craftInvokerFunction") || (c.craftInvokerFunction = function () {
    r("'craftInvokerFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "embind__requireFunction") || (c.embind__requireFunction = function () {
    r("'embind__requireFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "tupleRegistrations") || (c.tupleRegistrations = function () {
    r("'tupleRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "structRegistrations") || (c.structRegistrations = function () {
    r("'structRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "genericPointerToWireType") || (c.genericPointerToWireType = function () {
    r("'genericPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "constNoSmartPtrRawPointerToWireType") || (c.constNoSmartPtrRawPointerToWireType = function () {
    r("'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "nonConstNoSmartPtrRawPointerToWireType") || (c.nonConstNoSmartPtrRawPointerToWireType = function () {
    r("'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "init_RegisteredPointer") || (c.init_RegisteredPointer = function () {
    r("'init_RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredPointer") || (c.RegisteredPointer = function () {
    r("'RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredPointer_getPointee") || (c.RegisteredPointer_getPointee = function () {
    r("'RegisteredPointer_getPointee' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredPointer_destructor") || (c.RegisteredPointer_destructor = function () {
    r("'RegisteredPointer_destructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredPointer_deleteObject") || (c.RegisteredPointer_deleteObject = function () {
    r("'RegisteredPointer_deleteObject' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredPointer_fromWireType") || (c.RegisteredPointer_fromWireType = function () {
    r("'RegisteredPointer_fromWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "runDestructor") || (c.runDestructor = function () {
    r("'runDestructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "releaseClassHandle") || (c.releaseClassHandle = function () {
    r("'releaseClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "finalizationGroup") || (c.finalizationGroup = function () {
    r("'finalizationGroup' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "detachFinalizer_deps") || (c.detachFinalizer_deps = function () {
    r("'detachFinalizer_deps' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "detachFinalizer") || (c.detachFinalizer = function () {
    r("'detachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "attachFinalizer") || (c.attachFinalizer = function () {
    r("'attachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "makeClassHandle") || (c.makeClassHandle = function () {
    r("'makeClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "init_ClassHandle") || (c.init_ClassHandle = function () {
    r("'init_ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle") || (c.ClassHandle = function () {
    r("'ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle_isAliasOf") || (c.ClassHandle_isAliasOf = function () {
    r("'ClassHandle_isAliasOf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "throwInstanceAlreadyDeleted") || (c.throwInstanceAlreadyDeleted = function () {
    r("'throwInstanceAlreadyDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle_clone") || (c.ClassHandle_clone = function () {
    r("'ClassHandle_clone' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle_delete") || (c.ClassHandle_delete = function () {
    r("'ClassHandle_delete' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "deletionQueue") || (c.deletionQueue = function () {
    r("'deletionQueue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle_isDeleted") || (c.ClassHandle_isDeleted = function () {
    r("'ClassHandle_isDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "ClassHandle_deleteLater") || (c.ClassHandle_deleteLater = function () {
    r("'ClassHandle_deleteLater' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "flushPendingDeletes") || (c.flushPendingDeletes = function () {
    r("'flushPendingDeletes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "delayFunction") || (c.delayFunction = function () {
    r("'delayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "setDelayFunction") || (c.setDelayFunction = function () {
    r("'setDelayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "RegisteredClass") || (c.RegisteredClass = function () {
    r("'RegisteredClass' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "shallowCopyInternalPointer") || (c.shallowCopyInternalPointer = function () {
    r("'shallowCopyInternalPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "downcastPointer") || (c.downcastPointer = function () {
    r("'downcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "upcastPointer") || (c.upcastPointer = function () {
    r("'upcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "validateThis") || (c.validateThis = function () {
    r("'validateThis' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "char_0") || (c.char_0 = function () {
    r("'char_0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "char_9") || (c.char_9 = function () {
    r("'char_9' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "makeLegalFunctionName") || (c.makeLegalFunctionName = function () {
    r("'makeLegalFunctionName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "warnOnce") || (c.warnOnce = function () {
    r("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stackSave") || (c.stackSave = function () {
    r("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stackRestore") || (c.stackRestore = function () {
    r("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stackAlloc") || (c.stackAlloc = function () {
    r("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "AsciiToString") || (c.AsciiToString = function () {
    r("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToAscii") || (c.stringToAscii = function () {
    r("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "UTF16ToString") || (c.UTF16ToString = function () {
    r("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToUTF16") || (c.stringToUTF16 = function () {
    r("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "lengthBytesUTF16") || (c.lengthBytesUTF16 = function () {
    r("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "UTF32ToString") || (c.UTF32ToString = function () {
    r("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "stringToUTF32") || (c.stringToUTF32 = function () {
    r("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "lengthBytesUTF32") || (c.lengthBytesUTF32 = function () {
    r("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "allocateUTF8") || (c.allocateUTF8 = function () {
    r("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
Object.getOwnPropertyDescriptor(c, "allocateUTF8OnStack") || (c.allocateUTF8OnStack = function () {
    r("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
c.writeStackCookie = Pa;
c.checkStackCookie = Qa;
Object.getOwnPropertyDescriptor(c, "ALLOC_NORMAL") || Object.defineProperty(c, "ALLOC_NORMAL", {
    configurable: !0,
    get: function () {
        r("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
});
Object.getOwnPropertyDescriptor(c, "ALLOC_STACK") || Object.defineProperty(c, "ALLOC_STACK", {
    configurable: !0,
    get: function () {
        r("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
});
Object.getOwnPropertyDescriptor(c, "ALLOC_DYNAMIC") || Object.defineProperty(c, "ALLOC_DYNAMIC", {
    configurable: !0,
    get: function () {
        r("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
});
Object.getOwnPropertyDescriptor(c, "ALLOC_NONE") || Object.defineProperty(c, "ALLOC_NONE", {
    configurable: !0,
    get: function () {
        r("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
});
var Td;
ib = function Ud() {
    Td || Vd();
    Td || (ib = Ud)
};

function Vd() {
    function a() {
        if (!Td && (Td = !0, c.calledRun = !0, !sa)) {
            Qa();
            assert(!Za);
            Za = !0;
            if (!c.noFSInit && !oc) {
                assert(!oc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
                oc = !0;
                nc();
                c.stdin = c.stdin;
                c.stdout = c.stdout;
                c.stderr = c.stderr;
                c.stdin ? qc("stdin", c.stdin) : jc("/dev/tty", "/dev/stdin");
                c.stdout ? qc("stdout", null, c.stdout) : jc("/dev/tty", "/dev/stdout");
                c.stderr ? qc("stderr", null,
                    c.stderr) : jc("/dev/tty1", "/dev/stderr");
                var b = kc("/dev/stdin", "r"),
                    d = kc("/dev/stdout", "w"),
                    e = kc("/dev/stderr", "w");
                assert(0 === b.fd, "invalid handle for stdin (" + b.fd + ")");
                assert(1 === d.fd, "invalid handle for stdout (" + d.fd + ")");
                assert(2 === e.fd, "invalid handle for stderr (" + e.fd + ")")
            }
            Ta(Va);
            Qa();
            Sb = !1;
            Ta(Wa);
            if (c.onRuntimeInitialized) c.onRuntimeInitialized();
            assert(!c._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
            Qa();
            if (c.postRun)
                for ("function" ==
                    typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length;) b = c.postRun.shift(), Ya.unshift(b);
            Ta(Ya)
        }
    }
    if (!(0 < gb)) {
        Pa();
        if (c.preRun)
            for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length;) $a();
        Ta(Ua);
        0 < gb || (c.setStatus ? (c.setStatus("Running..."), setTimeout(function () {
            setTimeout(function () {
                c.setStatus("")
            }, 1);
            a()
        }, 1)) : a(), Qa())
    }
}
c.run = Vd;
if (c.preInit)
    for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length;) c.preInit.pop()();
noExitRuntime = !0;
Vd();
