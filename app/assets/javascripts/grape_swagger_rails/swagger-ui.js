$(function() {
    $.fn.vAlign = function() {
        return this.each(function(c) {
            var a = $(this).height();
            var d = $(this).parent().height();
            var b = (d - a) / 2;
            $(this).css("margin-top", b)
        })
    };
    $.fn.stretchFormtasticInputWidthToParent = function() {
        return this.each(function(b) {
            var d = $(this).closest("form").innerWidth();
            var c = parseInt($(this).closest("form").css("padding-left"), 10) + parseInt($(this).closest("form").css("padding-right"), 10);
            var a = parseInt($(this).css("padding-left"), 10) + parseInt($(this).css("padding-right"), 10);
            $(this).css("width", d - c - a)
        })
    };
    $("form.formtastic li.string input, form.formtastic textarea").stretchFormtasticInputWidthToParent();
    $("ul.downplayed li div.content p").vAlign();
    $("form.sandbox").submit(function() {
        var a = true;
        $(this).find("input.required").each(function() {
            $(this).removeClass("error");
            if ($(this).val() == "") {
                $(this).addClass("error");
                $(this).wiggle();
                a = false
            }
        });
        return a
    })
});

function clippyCopiedCallback(b) {
    $("#api_key_copied").fadeIn().delay(1000).fadeOut()
}
log = function() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments)[0])
    }
};
if (Function.prototype.bind && console && typeof console.log == "object") {
    ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(a) {
        console[a] = this.bind(console[a], console)
    }, Function.prototype.call)
}
var Docs = {
    shebang: function() {
        var b = $.param.fragment().split("/");
        b.shift();
        switch (b.length) {
            case 1:
                log("shebang resource:" + b[0]);
                var d = "resource_" + b[0];
                Docs.expandEndpointListForResource(b[0]);
                $("#" + d).slideto({
                    highlight: false
                });
                break;
            case 2:
                log("shebang endpoint: " + b.join("_"));
                Docs.expandEndpointListForResource(b[0]);
                $("#" + d).slideto({
                    highlight: false
                });
                var c = b.join("_");
                var a = c + "_content";
                log("li_dom_id " + c);
                log("li_content_dom_id " + a);
                Docs.expandOperation($("#" + a));
                $("#" + c).slideto({
                    highlight: false
                });
                break
        }
    },
    toggleEndpointListForResource: function(b) {
        var a = $("li#resource_" + Docs.escapeResourceName(b) + " ul.endpoints");
        if (a.is(":visible")) {
            Docs.collapseEndpointListForResource(b)
        } else {
            Docs.expandEndpointListForResource(b)
        }
    },
    expandEndpointListForResource: function(b) {
        var b = Docs.escapeResourceName(b);
        if (b == "") {
            $(".resource ul.endpoints").slideDown();
            return
        }
        $("li#resource_" + b).addClass("active");
        var a = $("li#resource_" + b + " ul.endpoints");
        a.slideDown()
    },
    collapseEndpointListForResource: function(b) {
        var b = Docs.escapeResourceName(b);
        $("li#resource_" + b).removeClass("active");
        var a = $("li#resource_" + b + " ul.endpoints");
        a.slideUp()
    },
    expandOperationsForResource: function(a) {
        Docs.expandEndpointListForResource(a);
        if (a == "") {
            $(".resource ul.endpoints li.operation div.content").slideDown();
            return
        }
        $("li#resource_" + Docs.escapeResourceName(a) + " li.operation div.content").each(function() {
            Docs.expandOperation($(this))
        })
    },
    collapseOperationsForResource: function(a) {
        Docs.expandEndpointListForResource(a);
        $("li#resource_" + Docs.escapeResourceName(a) + " li.operation div.content").each(function() {
            Docs.collapseOperation($(this))
        })
    },
    escapeResourceName: function(a) {
        return a.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, "\\$&")
    },
    expandOperation: function(a) {
        a.slideDown()
    },
    collapseOperation: function(a) {
        a.slideUp()
    }
};
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.content_type = b(function(g, l, f, k, j) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        j = j || {};
        var i = "",
            c, h = "function",
            m = this;

        function e(r, q) {
            var o = "",
                p;
            o += "\n  ";
            p = f.each.call(r, r.produces, {
                hash: {},
                inverse: m.noop,
                fn: m.program(2, d, q),
                data: q
            });
            if (p || p === 0) {
                o += p
            }
            o += "\n";
            return o
        }
        function d(r, q) {
            var o = "",
                p;
            o += '\n	<option value="';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += '">';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += "</option>\n	";
            return o
        }
        function n(p, o) {
            return '\n  <option value="application/json">application/json</option>\n'
        }
        i += '<label for="contentType"></label>\n<select name="contentType">\n';
        c = f["if"].call(l, l.produces, {
            hash: {},
            inverse: m.program(4, n, j),
            fn: m.program(1, e, j),
            data: j
        });
        if (c || c === 0) {
            i += c
        }
        i += "\n</select>\n";
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.main = b(function(g, m, f, l, k) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        k = k || {};
        var i = "",
            c, h = "function",
            j = this.escapeExpression,
            p = this;

        function e(v, u) {
            var r = "",
                t, s;
            r += '\n    <div class="info_title">' + j(((t = ((t = v.info), t == null || t === false ? t : t.title)), typeof t === h ? t.apply(v) : t)) + '</div>\n    <div class="info_description">';
            s = ((t = ((t = v.info), t == null || t === false ? t : t.description)), typeof t === h ? t.apply(v) : t);
            if (s || s === 0) {
                r += s
            }
            r += "</div>\n    ";
            s = f["if"].call(v, ((t = v.info), t == null || t === false ? t : t.termsOfServiceUrl), {
                hash: {},
                inverse: p.noop,
                fn: p.program(2, d, u),
                data: u
            });
            if (s || s === 0) {
                r += s
            }
            r += "\n    ";
            s = f["if"].call(v, ((t = v.info), t == null || t === false ? t : t.contact), {
                hash: {},
                inverse: p.noop,
                fn: p.program(4, q, u),
                data: u
            });
            if (s || s === 0) {
                r += s
            }
            r += "\n    ";
            s = f["if"].call(v, ((t = v.info), t == null || t === false ? t : t.license), {
                hash: {},
                inverse: p.noop,
                fn: p.program(6, o, u),
                data: u
            });
            if (s || s === 0) {
                r += s
            }
            r += "\n  ";
            return r
        }
        function d(u, t) {
            var r = "",
                s;
            r += '<div class="info_tos"><a href="' + j(((s = ((s = u.info), s == null || s === false ? s : s.termsOfServiceUrl)), typeof s === h ? s.apply(u) : s)) + '">Terms of service</a></div>';
            return r
        }
        function q(u, t) {
            var r = "",
                s;
            r += "<div class='info_contact'><a href=\"mailto:" + j(((s = ((s = u.info), s == null || s === false ? s : s.contact)), typeof s === h ? s.apply(u) : s)) + '">Contact the developer</a></div>';
            return r
        }
        function o(u, t) {
            var r = "",
                s;
            r += "<div class='info_license'><a href='" + j(((s = ((s = u.info), s == null || s === false ? s : s.licenseUrl)), typeof s === h ? s.apply(u) : s)) + "'>" + j(((s = ((s = u.info), s == null || s === false ? s : s.license)), typeof s === h ? s.apply(u) : s)) + "</a></div>";
            return r
        }
        function n(u, t) {
            var r = "",
                s;
            r += '\n        , <span style="font-variant: small-caps">api version</span>: ';
            if (s = f.apiVersion) {
                s = s.call(u, {
                    hash: {},
                    data: t
                })
            } else {
                s = u.apiVersion;
                s = typeof s === h ? s.apply(u) : s
            }
            r += j(s) + "\n        ";
            return r
        }
        i += "<div class='info' id='api_info'>\n  ";
        c = f["if"].call(m, m.info, {
            hash: {},
            inverse: p.noop,
            fn: p.program(1, e, k),
            data: k
        });
        if (c || c === 0) {
            i += c
        }
        i += "\n</div>\n<div class='container' id='resources_container'>\n    <ul id='resources'>\n    </ul>\n\n    <div class=\"footer\">\n        <br>\n        <br>\n        <h4 style=\"color: #999\">[ <span style=\"font-variant: small-caps\">base url</span>: ";
        if (c = f.basePath) {
            c = c.call(m, {
                hash: {},
                data: k
            })
        } else {
            c = m.basePath;
            c = typeof c === h ? c.apply(m) : c
        }
        i += j(c) + "\n        ";
        c = f["if"].call(m, m.apiVersion, {
            hash: {},
            inverse: p.noop,
            fn: p.program(8, n, k),
            data: k
        });
        if (c || c === 0) {
            i += c
        }
        i += "]</h4>\n    </div>\n</div>\n";
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.operation = b(function(g, s, q, m, y) {
        this.compilerInfo = [4, ">= 1.0.0"];
        q = this.merge(q, g.helpers);
        y = y || {};
        var r = "",
            i, f, e = "function",
            d = this.escapeExpression,
            p = this,
            c = q.blockHelperMissing;

        function o(C, B) {
            var z = "",
                A;
            z += "\n        <h4>Implementation Notes</h4>\n        <p>";
            if (A = q.notes) {
                A = A.call(C, {
                    hash: {},
                    data: B
                })
            } else {
                A = C.notes;
                A = typeof A === e ? A.apply(C) : A
            }
            if (A || A === 0) {
                z += A
            }
            z += "</p>\n        ";
            return z
        }
        function n(A, z) {
            return '\n        <div class="auth">\n        <span class="api-ic ic-error"></span>'
        }
        function l(C, B) {
            var z = "",
                A;
            z += '\n          <div id="api_information_panel" style="top: 526px; left: 776px; display: none;">\n          ';
            A = q.each.call(C, C, {
                hash: {},
                inverse: p.noop,
                fn: p.program(6, k, B),
                data: B
            });
            if (A || A === 0) {
                z += A
            }
            z += "\n          </div>\n        ";
            return z
        }
        function k(D, C) {
            var z = "",
                B, A;
            z += "\n            <div title='";
            A = ((B = D.description), typeof B === e ? B.apply(D) : B);
            if (A || A === 0) {
                z += A
            }
            z += "'>" + d(((B = D.scope), typeof B === e ? B.apply(D) : B)) + "</div>\n          ";
            return z
        }
        function h(A, z) {
            return "</div>"
        }
        function x(A, z) {
            return '\n        <div class=\'access\'>\n          <span class="api-ic ic-off" title="click to authenticate"></span>\n        </div>\n        '
        }
        function w(A, z) {
            return '\n          <h4>Response Class</h4>\n          <p><span class="model-signature" /></p>\n          <br/>\n          <div class="response-content-type" />\n        '
        }
        function v(A, z) {
            return '\n          <h4>Parameters</h4>\n          <table class=\'fullwidth\'>\n          <thead>\n            <tr>\n            <th style="width: 100px; max-width: 100px">Parameter</th>\n            <th style="width: 310px; max-width: 310px">Value</th>\n            <th style="width: 200px; max-width: 200px">Description</th>\n            <th style="width: 100px; max-width: 100px">Parameter Type</th>\n            <th style="width: 220px; max-width: 230px">Data Type</th>\n            </tr>\n          </thead>\n          <tbody class="operation-params">\n\n          </tbody>\n          </table>\n          '
        }
        function u(A, z) {
            return "\n          <div style='margin:0;padding:0;display:inline'></div>\n          <h4>Response Messages</h4>\n          <table class='fullwidth'>\n            <thead>\n            <tr>\n              <th>HTTP Status Code</th>\n              <th>Reason</th>\n              <th>Response Model</th>\n            </tr>\n            </thead>\n            <tbody class=\"operation-status\">\n            \n            </tbody>\n          </table>\n          "
        }
        function t(A, z) {
            return "\n          "
        }
        function j(A, z) {
            return "\n          <div class='sandbox_header'>\n            <input class='submit' name='commit' type='button' value='Try it out!' />\n            <a href='#' class='response_hider' style='display:none'>Hide Response</a>\n            <span class='response_throbber' style='display:none'></span>\n          </div>\n          "
        }
        r += "\n  <ul class='operations' >\n    <li class='";
        if (i = q.method) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.method;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + " operation' id='";
        if (i = q.parentId) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.parentId;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "_";
        if (i = q.nickname) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.nickname;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "'>\n      <div class='heading'>\n        <h3>\n          <span class='http_method'>\n          <a href='#!/";
        if (i = q.parentId) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.parentId;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "/";
        if (i = q.nickname) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.nickname;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + '\' class="toggleOperation">';
        if (i = q.method) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.method;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "</a>\n          </span>\n          <span class='path'>\n          <a href='#!/";
        if (i = q.parentId) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.parentId;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "/";
        if (i = q.nickname) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.nickname;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + '\' class="toggleOperation">';
        if (i = q.path) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.path;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "</a>\n          </span>\n        </h3>\n        <ul class='options'>\n          <li>\n          <a href='#!/";
        if (i = q.parentId) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.parentId;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "/";
        if (i = q.nickname) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.nickname;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + '\' class="toggleOperation">';
        if (i = q.summary) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.summary;
            i = typeof i === e ? i.apply(s) : i
        }
        if (i || i === 0) {
            r += i
        }
        r += "</a>\n          </li>\n        </ul>\n      </div>\n      <div class='content' id='";
        if (i = q.parentId) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.parentId;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "_";
        if (i = q.nickname) {
            i = i.call(s, {
                hash: {},
                data: y
            })
        } else {
            i = s.nickname;
            i = typeof i === e ? i.apply(s) : i
        }
        r += d(i) + "_content' style='display:none'>\n        ";
        i = q["if"].call(s, s.notes, {
            hash: {},
            inverse: p.noop,
            fn: p.program(1, o, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n        ";
        f = {
            hash: {},
            inverse: p.noop,
            fn: p.program(3, n, y),
            data: y
        };
        if (i = q.oauth) {
            i = i.call(s, f)
        } else {
            i = s.oauth;
            i = typeof i === e ? i.apply(s) : i
        }
        if (!q.oauth) {
            i = c.call(s, i, f)
        }
        if (i || i === 0) {
            r += i
        }
        r += "\n        ";
        i = q.each.call(s, s.oauth, {
            hash: {},
            inverse: p.noop,
            fn: p.program(5, l, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n        ";
        f = {
            hash: {},
            inverse: p.noop,
            fn: p.program(8, h, y),
            data: y
        };
        if (i = q.oauth) {
            i = i.call(s, f)
        } else {
            i = s.oauth;
            i = typeof i === e ? i.apply(s) : i
        }
        if (!q.oauth) {
            i = c.call(s, i, f)
        }
        if (i || i === 0) {
            r += i
        }
        r += "\n        ";
        f = {
            hash: {},
            inverse: p.noop,
            fn: p.program(10, x, y),
            data: y
        };
        if (i = q.oauth) {
            i = i.call(s, f)
        } else {
            i = s.oauth;
            i = typeof i === e ? i.apply(s) : i
        }
        if (!q.oauth) {
            i = c.call(s, i, f)
        }
        if (i || i === 0) {
            r += i
        }
        r += "\n        ";
        i = q["if"].call(s, s.type, {
            hash: {},
            inverse: p.noop,
            fn: p.program(12, w, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n        <form accept-charset='UTF-8' class='sandbox'>\n          <div style='margin:0;padding:0;display:inline'></div>\n          ";
        i = q["if"].call(s, s.parameters, {
            hash: {},
            inverse: p.noop,
            fn: p.program(14, v, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n          ";
        i = q["if"].call(s, s.responseMessages, {
            hash: {},
            inverse: p.noop,
            fn: p.program(16, u, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n          ";
        i = q["if"].call(s, s.isReadOnly, {
            hash: {},
            inverse: p.program(20, j, y),
            fn: p.program(18, t, y),
            data: y
        });
        if (i || i === 0) {
            r += i
        }
        r += "\n        </form>\n        <div class='response' style='display:none'>\n          <h4>Request URL</h4>\n          <div class='block request_url'></div>\n          <h4>Response Body</h4>\n          <div class='block response_body'></div>\n          <h4>Response Code</h4>\n          <div class='block response_code'></div>\n          <h4>Response Headers</h4>\n          <div class='block response_headers'></div>\n        </div>\n      </div>\n    </li>\n  </ul>\n";
        return r
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.param = b(function(f, q, o, j, t) {
        this.compilerInfo = [4, ">= 1.0.0"];
        o = this.merge(o, f.helpers);
        t = t || {};
        var p = "",
            g, d = "function",
            c = this.escapeExpression,
            n = this;

        function m(y, x) {
            var v = "",
                w;
            v += "\n		";
            w = o["if"].call(y, y.isFile, {
                hash: {},
                inverse: n.program(4, k, x),
                fn: n.program(2, l, x),
                data: x
            });
            if (w || w === 0) {
                v += w
            }
            v += "\n	";
            return v
        }
        function l(y, x) {
            var v = "",
                w;
            v += '\n			<input type="file" name=\'';
            if (w = o.name) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.name;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + '\'/>\n			<div class="parameter-content-type" />\n		';
            return v
        }
        function k(y, x) {
            var v = "",
                w;
            v += "\n			";
            w = o["if"].call(y, y.defaultValue, {
                hash: {},
                inverse: n.program(7, h, x),
                fn: n.program(5, i, x),
                data: x
            });
            if (w || w === 0) {
                v += w
            }
            v += "\n		";
            return v
        }
        function i(y, x) {
            var v = "",
                w;
            v += "\n				<textarea class='body-textarea' name='";
            if (w = o.name) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.name;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + "'>";
            if (w = o.defaultValue) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.defaultValue;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + "</textarea>\n			";
            return v
        }
        function h(y, x) {
            var v = "",
                w;
            v += "\n				<textarea class='body-textarea' name='";
            if (w = o.name) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.name;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + '\'></textarea>\n				<br />\n				<div class="parameter-content-type" />\n			';
            return v
        }
        function e(y, x) {
            var v = "",
                w;
            v += "\n		";
            w = o["if"].call(y, y.isFile, {
                hash: {},
                inverse: n.program(10, u, x),
                fn: n.program(2, l, x),
                data: x
            });
            if (w || w === 0) {
                v += w
            }
            v += "\n	";
            return v
        }
        function u(y, x) {
            var v = "",
                w;
            v += "\n			";
            w = o["if"].call(y, y.defaultValue, {
                hash: {},
                inverse: n.program(13, r, x),
                fn: n.program(11, s, x),
                data: x
            });
            if (w || w === 0) {
                v += w
            }
            v += "\n		";
            return v
        }
        function s(y, x) {
            var v = "",
                w;
            v += "\n				<input class='parameter' minlength='0' name='";
            if (w = o.name) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.name;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + "' placeholder='' type='text' value='";
            if (w = o.defaultValue) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.defaultValue;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + "'/>\n			";
            return v
        }
        function r(y, x) {
            var v = "",
                w;
            v += "\n				<input class='parameter' minlength='0' name='";
            if (w = o.name) {
                w = w.call(y, {
                    hash: {},
                    data: x
                })
            } else {
                w = y.name;
                w = typeof w === d ? w.apply(y) : w
            }
            v += c(w) + "' placeholder='' type='text' value=''/>\n			";
            return v
        }
        p += "<td class='code'>";
        if (g = o.name) {
            g = g.call(q, {
                hash: {},
                data: t
            })
        } else {
            g = q.name;
            g = typeof g === d ? g.apply(q) : g
        }
        p += c(g) + "</td>\n<td>\n\n	";
        g = o["if"].call(q, q.isBody, {
            hash: {},
            inverse: n.program(9, e, t),
            fn: n.program(1, m, t),
            data: t
        });
        if (g || g === 0) {
            p += g
        }
        p += "\n\n</td>\n<td>";
        if (g = o.description) {
            g = g.call(q, {
                hash: {},
                data: t
            })
        } else {
            g = q.description;
            g = typeof g === d ? g.apply(q) : g
        }
        if (g || g === 0) {
            p += g
        }
        p += "</td>\n<td>";
        if (g = o.paramType) {
            g = g.call(q, {
                hash: {},
                data: t
            })
        } else {
            g = q.paramType;
            g = typeof g === d ? g.apply(q) : g
        }
        if (g || g === 0) {
            p += g
        }
        p += '</td>\n<td>\n	<span class="model-signature"></span>\n</td>\n';
        return p
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.param_list = b(function(h, t, r, m, y) {
        this.compilerInfo = [4, ">= 1.0.0"];
        r = this.merge(r, h.helpers);
        y = y || {};
        var s = "",
            j, g, e, p = this,
            q = r.helperMissing,
            d = "function",
            c = this.escapeExpression;

        function o(A, z) {
            return " multiple='multiple'"
        }
        function n(A, z) {
            return "\n    "
        }
        function l(C, B) {
            var z = "",
                A;
            z += "\n      ";
            A = r["if"].call(C, C.defaultValue, {
                hash: {},
                inverse: p.program(8, i, B),
                fn: p.program(6, k, B),
                data: B
            });
            if (A || A === 0) {
                z += A
            }
            z += "\n    ";
            return z
        }
        function k(A, z) {
            return "\n      "
        }
        function i(E, D) {
            var z = "",
                C, B, A;
            z += "\n        ";
            A = {
                hash: {},
                inverse: p.program(11, x, D),
                fn: p.program(9, f, D),
                data: D
            };
            B = ((C = r.isArray || E.isArray), C ? C.call(E, E, A) : q.call(E, "isArray", E, A));
            if (B || B === 0) {
                z += B
            }
            z += "\n      ";
            return z
        }
        function f(A, z) {
            return "\n        "
        }
        function x(A, z) {
            return "\n          <option selected=\"\" value=''></option>\n        "
        }
        function w(C, B) {
            var z = "",
                A;
            z += "\n      ";
            A = r["if"].call(C, C.isDefault, {
                hash: {},
                inverse: p.program(16, u, B),
                fn: p.program(14, v, B),
                data: B
            });
            if (A || A === 0) {
                z += A
            }
            z += "\n    ";
            return z
        }
        function v(C, B) {
            var z = "",
                A;
            z += '\n        <option selected="" value=\'';
            if (A = r.value) {
                A = A.call(C, {
                    hash: {},
                    data: B
                })
            } else {
                A = C.value;
                A = typeof A === d ? A.apply(C) : A
            }
            z += c(A) + "'>";
            if (A = r.value) {
                A = A.call(C, {
                    hash: {},
                    data: B
                })
            } else {
                A = C.value;
                A = typeof A === d ? A.apply(C) : A
            }
            z += c(A) + " (default)</option>\n      ";
            return z
        }
        function u(C, B) {
            var z = "",
                A;
            z += "\n        <option value='";
            if (A = r.value) {
                A = A.call(C, {
                    hash: {},
                    data: B
                })
            } else {
                A = C.value;
                A = typeof A === d ? A.apply(C) : A
            }
            z += c(A) + "'>";
            if (A = r.value) {
                A = A.call(C, {
                    hash: {},
                    data: B
                })
            } else {
                A = C.value;
                A = typeof A === d ? A.apply(C) : A
            }
            z += c(A) + "</option>\n      ";
            return z
        }
        s += "<td class='code'>";
        if (j = r.name) {
            j = j.call(t, {
                hash: {},
                data: y
            })
        } else {
            j = t.name;
            j = typeof j === d ? j.apply(t) : j
        }
        s += c(j) + "</td>\n<td>\n  <select ";
        e = {
            hash: {},
            inverse: p.noop,
            fn: p.program(1, o, y),
            data: y
        };
        g = ((j = r.isArray || t.isArray), j ? j.call(t, t, e) : q.call(t, "isArray", t, e));
        if (g || g === 0) {
            s += g
        }
        s += " class='parameter' name='";
        if (g = r.name) {
            g = g.call(t, {
                hash: {},
                data: y
            })
        } else {
            g = t.name;
            g = typeof g === d ? g.apply(t) : g
        }
        s += c(g) + "'>\n    ";
        g = r["if"].call(t, t.required, {
            hash: {},
            inverse: p.program(5, l, y),
            fn: p.program(3, n, y),
            data: y
        });
        if (g || g === 0) {
            s += g
        }
        s += "\n    ";
        g = r.each.call(t, ((j = t.allowableValues), j == null || j === false ? j : j.descriptiveValues), {
            hash: {},
            inverse: p.noop,
            fn: p.program(13, w, y),
            data: y
        });
        if (g || g === 0) {
            s += g
        }
        s += "\n  </select>\n</td>\n<td>";
        if (g = r.description) {
            g = g.call(t, {
                hash: {},
                data: y
            })
        } else {
            g = t.description;
            g = typeof g === d ? g.apply(t) : g
        }
        if (g || g === 0) {
            s += g
        }
        s += "</td>\n<td>";
        if (g = r.paramType) {
            g = g.call(t, {
                hash: {},
                data: y
            })
        } else {
            g = t.paramType;
            g = typeof g === d ? g.apply(t) : g
        }
        if (g || g === 0) {
            s += g
        }
        s += '</td>\n<td><span class="model-signature"></span></td>';
        return s
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.param_readonly = b(function(g, m, f, l, k) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        k = k || {};
        var i = "",
            d, h = "function",
            j = this.escapeExpression,
            o = this;

        function e(t, s) {
            var q = "",
                r;
            q += "\n        <textarea class='body-textarea' readonly='readonly' name='";
            if (r = f.name) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.name;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "'>";
            if (r = f.defaultValue) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.defaultValue;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "</textarea>\n    ";
            return q
        }
        function c(t, s) {
            var q = "",
                r;
            q += "\n        ";
            r = f["if"].call(t, t.defaultValue, {
                hash: {},
                inverse: o.program(6, n, s),
                fn: o.program(4, p, s),
                data: s
            });
            if (r || r === 0) {
                q += r
            }
            q += "\n    ";
            return q
        }
        function p(t, s) {
            var q = "",
                r;
            q += "\n            ";
            if (r = f.defaultValue) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.defaultValue;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "\n        ";
            return q
        }
        function n(r, q) {
            return "\n            (empty)\n        "
        }
        i += "<td class='code'>";
        if (d = f.name) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.name;
            d = typeof d === h ? d.apply(m) : d
        }
        i += j(d) + "</td>\n<td>\n    ";
        d = f["if"].call(m, m.isBody, {
            hash: {},
            inverse: o.program(3, c, k),
            fn: o.program(1, e, k),
            data: k
        });
        if (d || d === 0) {
            i += d
        }
        i += "\n</td>\n<td>";
        if (d = f.description) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.description;
            d = typeof d === h ? d.apply(m) : d
        }
        if (d || d === 0) {
            i += d
        }
        i += "</td>\n<td>";
        if (d = f.paramType) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.paramType;
            d = typeof d === h ? d.apply(m) : d
        }
        if (d || d === 0) {
            i += d
        }
        i += '</td>\n<td><span class="model-signature"></span></td>\n';
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.param_readonly_required = b(function(g, m, f, l, k) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        k = k || {};
        var i = "",
            d, h = "function",
            j = this.escapeExpression,
            o = this;

        function e(t, s) {
            var q = "",
                r;
            q += "\n        <textarea class='body-textarea'  readonly='readonly' placeholder='(required)' name='";
            if (r = f.name) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.name;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "'>";
            if (r = f.defaultValue) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.defaultValue;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "</textarea>\n    ";
            return q
        }
        function c(t, s) {
            var q = "",
                r;
            q += "\n        ";
            r = f["if"].call(t, t.defaultValue, {
                hash: {},
                inverse: o.program(6, n, s),
                fn: o.program(4, p, s),
                data: s
            });
            if (r || r === 0) {
                q += r
            }
            q += "\n    ";
            return q
        }
        function p(t, s) {
            var q = "",
                r;
            q += "\n            ";
            if (r = f.defaultValue) {
                r = r.call(t, {
                    hash: {},
                    data: s
                })
            } else {
                r = t.defaultValue;
                r = typeof r === h ? r.apply(t) : r
            }
            q += j(r) + "\n        ";
            return q
        }
        function n(r, q) {
            return "\n            (empty)\n        "
        }
        i += "<td class='code required'>";
        if (d = f.name) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.name;
            d = typeof d === h ? d.apply(m) : d
        }
        i += j(d) + "</td>\n<td>\n    ";
        d = f["if"].call(m, m.isBody, {
            hash: {},
            inverse: o.program(3, c, k),
            fn: o.program(1, e, k),
            data: k
        });
        if (d || d === 0) {
            i += d
        }
        i += "\n</td>\n<td>";
        if (d = f.description) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.description;
            d = typeof d === h ? d.apply(m) : d
        }
        if (d || d === 0) {
            i += d
        }
        i += "</td>\n<td>";
        if (d = f.paramType) {
            d = d.call(m, {
                hash: {},
                data: k
            })
        } else {
            d = m.paramType;
            d = typeof d === h ? d.apply(m) : d
        }
        if (d || d === 0) {
            i += d
        }
        i += '</td>\n<td><span class="model-signature"></span></td>\n';
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.param_required = b(function(f, q, o, j, u) {
        this.compilerInfo = [4, ">= 1.0.0"];
        o = this.merge(o, f.helpers);
        u = u || {};
        var p = "",
            g, d = "function",
            c = this.escapeExpression,
            n = this;

        function m(z, y) {
            var w = "",
                x;
            w += "\n		";
            x = o["if"].call(z, z.isFile, {
                hash: {},
                inverse: n.program(4, k, y),
                fn: n.program(2, l, y),
                data: y
            });
            if (x || x === 0) {
                w += x
            }
            w += "\n	";
            return w
        }
        function l(z, y) {
            var w = "",
                x;
            w += '\n			<input type="file" name=\'';
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "'/>\n		";
            return w
        }
        function k(z, y) {
            var w = "",
                x;
            w += "\n			";
            x = o["if"].call(z, z.defaultValue, {
                hash: {},
                inverse: n.program(7, h, y),
                fn: n.program(5, i, y),
                data: y
            });
            if (x || x === 0) {
                w += x
            }
            w += "\n		";
            return w
        }
        function i(z, y) {
            var w = "",
                x;
            w += "\n				<textarea class='body-textarea' placeholder='(required)' name='";
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "'>";
            if (x = o.defaultValue) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.defaultValue;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "</textarea>\n			";
            return w
        }
        function h(z, y) {
            var w = "",
                x;
            w += "\n				<textarea class='body-textarea' placeholder='(required)' name='";
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + '\'></textarea>\n				<br />\n				<div class="parameter-content-type" />\n			';
            return w
        }
        function e(z, y) {
            var w = "",
                x;
            w += "\n		";
            x = o["if"].call(z, z.isFile, {
                hash: {},
                inverse: n.program(12, t, y),
                fn: n.program(10, v, y),
                data: y
            });
            if (x || x === 0) {
                w += x
            }
            w += "\n	";
            return w
        }
        function v(z, y) {
            var w = "",
                x;
            w += "\n			<input class='parameter' class='required' type='file' name='";
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "'/>\n		";
            return w
        }
        function t(z, y) {
            var w = "",
                x;
            w += "\n			";
            x = o["if"].call(z, z.defaultValue, {
                hash: {},
                inverse: n.program(15, r, y),
                fn: n.program(13, s, y),
                data: y
            });
            if (x || x === 0) {
                w += x
            }
            w += "\n		";
            return w
        }
        function s(z, y) {
            var w = "",
                x;
            w += "\n				<input class='parameter required' minlength='1' name='";
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "' placeholder='(required)' type='text' value='";
            if (x = o.defaultValue) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.defaultValue;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "'/>\n			";
            return w
        }
        function r(z, y) {
            var w = "",
                x;
            w += "\n				<input class='parameter required' minlength='1' name='";
            if (x = o.name) {
                x = x.call(z, {
                    hash: {},
                    data: y
                })
            } else {
                x = z.name;
                x = typeof x === d ? x.apply(z) : x
            }
            w += c(x) + "' placeholder='(required)' type='text' value=''/>\n			";
            return w
        }
        p += "<td class='code required'>";
        if (g = o.name) {
            g = g.call(q, {
                hash: {},
                data: u
            })
        } else {
            g = q.name;
            g = typeof g === d ? g.apply(q) : g
        }
        p += c(g) + "</td>\n<td>\n	";
        g = o["if"].call(q, q.isBody, {
            hash: {},
            inverse: n.program(9, e, u),
            fn: n.program(1, m, u),
            data: u
        });
        if (g || g === 0) {
            p += g
        }
        p += "\n</td>\n<td>\n	<strong>";
        if (g = o.description) {
            g = g.call(q, {
                hash: {},
                data: u
            })
        } else {
            g = q.description;
            g = typeof g === d ? g.apply(q) : g
        }
        if (g || g === 0) {
            p += g
        }
        p += "</strong>\n</td>\n<td>";
        if (g = o.paramType) {
            g = g.call(q, {
                hash: {},
                data: u
            })
        } else {
            g = q.paramType;
            g = typeof g === d ? g.apply(q) : g
        }
        if (g || g === 0) {
            p += g
        }
        p += '</td>\n<td><span class="model-signature"></span></td>\n';
        return p
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.parameter_content_type = b(function(g, l, f, k, j) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        j = j || {};
        var i = "",
            c, h = "function",
            m = this;

        function e(r, q) {
            var o = "",
                p;
            o += "\n  ";
            p = f.each.call(r, r.consumes, {
                hash: {},
                inverse: m.noop,
                fn: m.program(2, d, q),
                data: q
            });
            if (p || p === 0) {
                o += p
            }
            o += "\n";
            return o
        }
        function d(r, q) {
            var o = "",
                p;
            o += '\n  <option value="';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += '">';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += "</option>\n  ";
            return o
        }
        function n(p, o) {
            return '\n  <option value="application/json">application/json</option>\n'
        }
        i += '<label for="parameterContentType"></label>\n<select name="parameterContentType">\n';
        c = f["if"].call(l, l.consumes, {
            hash: {},
            inverse: m.program(4, n, j),
            fn: m.program(1, e, j),
            data: j
        });
        if (c || c === 0) {
            i += c
        }
        i += "\n</select>\n";
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.resource = b(function(f, l, e, k, j) {
        this.compilerInfo = [4, ">= 1.0.0"];
        e = this.merge(e, f.helpers);
        j = j || {};
        var h = "",
            c, o, g = "function",
            i = this.escapeExpression,
            n = this,
            m = e.blockHelperMissing;

        function d(q, p) {
            return " : "
        }
        h += "<div class='heading'>\n  <h2>\n    <a href='#!/";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "' onclick=\"Docs.toggleEndpointListForResource('";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "');\">";
        if (c = e.name) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.name;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "</a> ";
        o = {
            hash: {},
            inverse: n.noop,
            fn: n.program(1, d, j),
            data: j
        };
        if (c = e.description) {
            c = c.call(l, o)
        } else {
            c = l.description;
            c = typeof c === g ? c.apply(l) : c
        }
        if (!e.description) {
            c = m.call(l, c, o)
        }
        if (c || c === 0) {
            h += c
        }
        if (c = e.description) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.description;
            c = typeof c === g ? c.apply(l) : c
        }
        if (c || c === 0) {
            h += c
        }
        h += "\n  </h2>\n  <ul class='options'>\n    <li>\n      <a href='#!/";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "' id='endpointListTogger_";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "'\n         onclick=\"Docs.toggleEndpointListForResource('";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "');\">Show/Hide</a>\n    </li>\n    <li>\n      <a href='#' onclick=\"Docs.collapseOperationsForResource('";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "'); return false;\">\n        List Operations\n      </a>\n    </li>\n    <li>\n      <a href='#' onclick=\"Docs.expandOperationsForResource('";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "'); return false;\">\n        Expand Operations\n      </a>\n    </li>\n    <li>\n      <a href='";
        if (c = e.url) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.url;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "'>Raw</a>\n    </li>\n  </ul>\n</div>\n<ul class='endpoints' id='";
        if (c = e.id) {
            c = c.call(l, {
                hash: {},
                data: j
            })
        } else {
            c = l.id;
            c = typeof c === g ? c.apply(l) : c
        }
        h += i(c) + "_endpoint_list' style='display:none'>\n\n</ul>\n";
        return h
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.response_content_type = b(function(g, l, f, k, j) {
        this.compilerInfo = [4, ">= 1.0.0"];
        f = this.merge(f, g.helpers);
        j = j || {};
        var i = "",
            c, h = "function",
            m = this;

        function e(r, q) {
            var o = "",
                p;
            o += "\n  ";
            p = f.each.call(r, r.produces, {
                hash: {},
                inverse: m.noop,
                fn: m.program(2, d, q),
                data: q
            });
            if (p || p === 0) {
                o += p
            }
            o += "\n";
            return o
        }
        function d(r, q) {
            var o = "",
                p;
            o += '\n  <option value="';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += '">';
            p = (typeof r === h ? r.apply(r) : r);
            if (p || p === 0) {
                o += p
            }
            o += "</option>\n  ";
            return o
        }
        function n(p, o) {
            return '\n  <option value="application/json">application/json</option>\n'
        }
        i += '<label for="responseContentType"></label>\n<select name="responseContentType">\n';
        c = f["if"].call(l, l.produces, {
            hash: {},
            inverse: m.program(4, n, j),
            fn: m.program(1, e, j),
            data: j
        });
        if (c || c === 0) {
            i += c
        }
        i += "\n</select>\n";
        return i
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.signature = b(function(e, k, d, j, i) {
        this.compilerInfo = [4, ">= 1.0.0"];
        d = this.merge(d, e.helpers);
        i = i || {};
        var g = "",
            c, f = "function",
            h = this.escapeExpression;
        g += '<div>\n<ul class="signature-nav">\n    <li><a class="description-link" href="#">Model</a></li>\n    <li><a class="snippet-link" href="#">Model Schema</a></li>\n</ul>\n<div>\n\n<div class="signature-container">\n    <div class="description">\n        ';
        if (c = d.signature) {
            c = c.call(k, {
                hash: {},
                data: i
            })
        } else {
            c = k.signature;
            c = typeof c === f ? c.apply(k) : c
        }
        if (c || c === 0) {
            g += c
        }
        g += '\n    </div>\n\n    <div class="snippet">\n        <pre><code>';
        if (c = d.sampleJSON) {
            c = c.call(k, {
                hash: {},
                data: i
            })
        } else {
            c = k.sampleJSON;
            c = typeof c === f ? c.apply(k) : c
        }
        g += h(c) + '</code></pre>\n        <small class="notice"></small>\n    </div>\n</div>\n\n';
        return g
    })
})();
(function() {
    var b = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.status_code = b(function(e, k, d, j, i) {
        this.compilerInfo = [4, ">= 1.0.0"];
        d = this.merge(d, e.helpers);
        i = i || {};
        var g = "",
            c, f = "function",
            h = this.escapeExpression;
        g += "<td width='15%' class='code'>";
        if (c = d.code) {
            c = c.call(k, {
                hash: {},
                data: i
            })
        } else {
            c = k.code;
            c = typeof c === f ? c.apply(k) : c
        }
        g += h(c) + "</td>\n<td>";
        if (c = d.message) {
            c = c.call(k, {
                hash: {},
                data: i
            })
        } else {
            c = k.message;
            c = typeof c === f ? c.apply(k) : c
        }
        if (c || c === 0) {
            g += c
        }
        g += "</td>\n<td width='50%'><span class=\"model-signature\" /></td>";
        return g
    })
})();
(function() {
    var j, r, u, o, l, k, n, m, i, p, s, q, h, c, g, f, e, d, b, a, x, w, t = {}.hasOwnProperty,
        v = function(B, z) {
            for (var y in z) {
                if (t.call(z, y)) {
                    B[y] = z[y]
                }
            }
            function A() {
                this.constructor = B
            }
            A.prototype = z.prototype;
            B.prototype = new A();
            B.__super__ = z.prototype;
            return B
        };
    s = (function(z) {
        v(y, z);

        function y() {
            q = y.__super__.constructor.apply(this, arguments);
            return q
        }
        y.prototype.dom_id = "swagger_ui";
        y.prototype.options = null;
        y.prototype.api = null;
        y.prototype.headerView = null;
        y.prototype.mainView = null;
        y.prototype.initialize = function(A) {
            var B = this;
            if (A == null) {
                A = {}
            }
            if (A.dom_id != null) {
                this.dom_id = A.dom_id;
                delete A.dom_id
            }
            if ($("#" + this.dom_id) == null) {
                $("body").append('<div id="' + this.dom_id + '"></div>')
            }
            this.options = A;
            this.options.success = function() {
                return B.render()
            };
            this.options.progress = function(C) {
                return B.showMessage(C)
            };
            this.options.failure = function(C) {
                return B.onLoadFailure(C)
            };
            this.headerView = new r({
                el: $("#header")
            });
            return this.headerView.on("update-swagger-ui", function(C) {
                return B.updateSwaggerUi(C)
            })
        };
        y.prototype.updateSwaggerUi = function(A) {
            this.options.url = A.url;
            return this.load()
        };
        y.prototype.load = function() {
            var B, A;
            if ((A = this.mainView) != null) {
                A.clear()
            }
            B = this.options.url;
            if (B.indexOf("http") !== 0) {
                B = this.buildUrl(window.location.href.toString(), B)
            }
            this.options.url = B;
            this.headerView.update(B);
            this.api = new SwaggerApi(this.options);
            this.api.build();
            return this.api
        };
        y.prototype.render = function() {
            var A = this;
            this.showMessage("Finished Loading Resource Information. Rendering Swagger UI...");
            this.mainView = new u({
                model: this.api,
                el: $("#" + this.dom_id),
                swaggerOptions: this.options
            }).render();
            this.showMessage();
            switch (this.options.docExpansion) {
                case "full":
                    Docs.expandOperationsForResource("");
                    break;
                case "list":
                    Docs.collapseOperationsForResource("")
            }
            if (this.options.onComplete) {
                this.options.onComplete(this.api, this)
            }
            return setTimeout(function() {
                return Docs.shebang()
            }, 400)
        };
        y.prototype.buildUrl = function(C, A) {
            var B, D;
            log("base is " + C);
            if (A.indexOf("/") === 0) {
                D = C.split("/");
                C = D[0] + "//" + D[2];
                return C + A
            } else {
                B = C.length;
                if (C.indexOf("?") > -1) {
                    B = Math.min(B, C.indexOf("?"))
                }
                if (C.indexOf("#") > -1) {
                    B = Math.min(B, C.indexOf("#"))
                }
                C = C.substring(0, B);
                if (C.indexOf("/", C.length - 1) !== -1) {
                    return C + A
                }
                return C + "/" + A
            }
        };
        y.prototype.showMessage = function(A) {
            if (A == null) {
                A = ""
            }
            $("#message-bar").removeClass("message-fail");
            $("#message-bar").addClass("message-success");
            return $("#message-bar").html(A)
        };
        y.prototype.onLoadFailure = function(A) {
            var B;
            if (A == null) {
                A = ""
            }
            $("#message-bar").removeClass("message-success");
            $("#message-bar").addClass("message-fail");
            B = $("#message-bar").html(A);
            if (this.options.onFailure != null) {
                this.options.onFailure(A)
            }
            return B
        };
        return y
    })(Backbone.Router);
    window.SwaggerUi = s;
    r = (function(z) {
        v(y, z);

        function y() {
            h = y.__super__.constructor.apply(this, arguments);
            return h
        }
        y.prototype.events = {
            "click #show-pet-store-icon": "showPetStore",
            "click #show-wordnik-dev-icon": "showWordnikDev",
            "click #explore": "showCustom",
            "keyup #input_baseUrl": "showCustomOnKeyup",
            "keyup #input_apiKey": "showCustomOnKeyup"
        };
        y.prototype.initialize = function() {};
        y.prototype.showPetStore = function(A) {
            return this.trigger("update-swagger-ui", {
                url: "http://petstore.swagger.wordnik.com/api/api-docs"
            })
        };
        y.prototype.showWordnikDev = function(A) {
            return this.trigger("update-swagger-ui", {
                url: "http://api.wordnik.com/v4/resources.json"
            })
        };
        y.prototype.showCustomOnKeyup = function(A) {
            if (A.keyCode === 13) {
                return this.showCustom()
            }
        };
        y.prototype.showCustom = function(A) {
            if (A != null) {
                A.preventDefault()
            }
            return this.trigger("update-swagger-ui", {
                url: $("#input_baseUrl").val(),
                apiKey: $("#input_apiKey").val()
            })
        };
        y.prototype.update = function(B, C, A) {
            if (A == null) {
                A = false
            }
            $("#input_baseUrl").val(B);
            if (A) {
                return this.trigger("update-swagger-ui", {
                    url: B
                })
            }
        };
        return y
    })(Backbone.View);
    u = (function(y) {
        var z;
        v(A, y);

        function A() {
            g = A.__super__.constructor.apply(this, arguments);
            return g
        }
        z = {
            alpha: function(C, B) {
                return C.path.localeCompare(B.path)
            },
            method: function(C, B) {
                return C.method.localeCompare(B.method)
            }
        };
        A.prototype.initialize = function(D) {
            var C, H, F, E, B, G;
            if (D == null) {
                D = {}
            }
            if (D.swaggerOptions.sorter) {
                F = D.swaggerOptions.sorter;
                H = z[F];
                G = this.model.apisArray;
                for (E = 0, B = G.length; E < B; E++) {
                    C = G[E];
                    C.operationsArray.sort(H)
                }
                if (F === "alpha") {
                    return this.model.apisArray.sort(H)
                }
            }
        };
        A.prototype.render = function() {
            var C, H, E, F, D, B, G;
            $(this.el).html(Handlebars.templates.main(this.model));
            F = {};
            C = 0;
            G = this.model.apisArray;
            for (D = 0, B = G.length; D < B; D++) {
                E = G[D];
                H = E.name;
                while (typeof F[H] !== "undefined") {
                    H = H + "_" + C;
                    C += 1
                }
                E.id = H;
                F[H] = E;
                this.addResource(E)
            }
            return this
        };
        A.prototype.addResource = function(C) {
            var B;
            B = new n({
                model: C,
                tagName: "li",
                id: "resource_" + C.id,
                className: "resource",
                swaggerOptions: this.options.swaggerOptions
            });
            return $("#resources").append(B.render().el)
        };
        A.prototype.clear = function() {
            return $(this.el).html("")
        };
        return A
    })(Backbone.View);
    n = (function(z) {
        v(y, z);

        function y() {
            f = y.__super__.constructor.apply(this, arguments);
            return f
        }
        y.prototype.initialize = function() {};
        y.prototype.render = function() {
            var B, G, D, C, E, A, F;
            $(this.el).html(Handlebars.templates.resource(this.model));
            D = {};
            F = this.model.operationsArray;
            for (E = 0, A = F.length; E < A; E++) {
                C = F[E];
                B = 0;
                G = C.nickname;
                while (typeof D[G] !== "undefined") {
                    G = G + "_" + B;
                    B += 1
                }
                D[G] = C;
                C.nickname = G;
                C.parentId = this.model.id;
                this.addOperation(C)
            }
            return this
        };
        y.prototype.addOperation = function(A) {
            var B;
            A.number = this.number;
            B = new o({
                model: A,
                tagName: "li",
                className: "endpoint",
                swaggerOptions: this.options.swaggerOptions
            });
            $(".endpoints", $(this.el)).append(B.render().el);
            return this.number++
        };
        return y
    })(Backbone.View);
    o = (function(z) {
        v(y, z);

        function y() {
            e = y.__super__.constructor.apply(this, arguments);
            return e
        }
        y.prototype.invocationUrl = null;
        y.prototype.events = {
            "submit .sandbox": "submitOperation",
            "click .submit": "submitOperation",
            "click .response_hider": "hideResponse",
            "click .toggleOperation": "toggleOperationContent",
            "mouseenter .api-ic": "mouseEnter",
            "mouseout .api-ic": "mouseExit"
        };
        y.prototype.initialize = function() {};
        y.prototype.mouseEnter = function(F) {
            var D, E, I, B, A, J, G, C, K, H;
            D = $(F.currentTarget.parentNode).find("#api_information_panel");
            K = F.pageX;
            H = F.pageY;
            J = $(window).scrollLeft();
            G = $(window).scrollTop();
            B = J + $(window).width();
            A = G + $(window).height();
            C = D.width();
            E = D.height();
            if (K + C > B) {
                K = B - C
            }
            if (K < J) {
                K = J
            }
            if (H + E > A) {
                H = A - E
            }
            if (H < G) {
                H = G
            }
            I = {};
            I.top = H;
            I.left = K;
            D.css(I);
            return $(F.currentTarget.parentNode).find("#api_information_panel").show()
        };
        y.prototype.mouseExit = function(A) {
            return $(A.currentTarget.parentNode).find("#api_information_panel").hide()
        };
        y.prototype.render = function() {
            var Q, R, P, O, I, N, J, M, K, H, L, G, F, E, C, T, V, U, S, D, B, A, W;
            R = true;
            if (!R) {
                this.model.isReadOnly = true
            }
            this.model.oauth = null;
            if (this.model.authorizations) {
                D = this.model.authorizations;
                for (P in D) {
                    L = D[P];
                    if (P === "oauth2") {
                        if (this.model.oauth === null) {
                            this.model.oauth = {}
                        }
                        if (this.model.oauth.scopes === void 0) {
                            this.model.oauth.scopes = []
                        }
                        for (G = 0, T = L.length; G < T; G++) {
                            O = L[G];
                            this.model.oauth.scopes.push(O)
                        }
                    }
                }
            }
            $(this.el).html(Handlebars.templates.operation(this.model));
            if (this.model.responseClassSignature && this.model.responseClassSignature !== "string") {
                M = {
                    sampleJSON: this.model.responseSampleJSON,
                    isParam: false,
                    signature: this.model.responseClassSignature
                };
                J = new i({
                    model: M,
                    tagName: "div"
                });
                $(".model-signature", $(this.el)).append(J.render().el)
            } else {
                $(".model-signature", $(this.el)).html(this.model.type)
            }
            Q = {
                isParam: false
            };
            Q.consumes = this.model.consumes;
            Q.produces = this.model.produces;
            B = this.model.parameters;
            for (F = 0, V = B.length; F < V; F++) {
                I = B[F];
                H = I.type || I.dataType;
                if (H.toLowerCase() === "file") {
                    if (!Q.consumes) {
                        log("set content type ");
                        Q.consumes = "multipart/form-data"
                    }
                }
            }
            N = new m({
                model: Q
            });
            $(".response-content-type", $(this.el)).append(N.render().el);
            A = this.model.parameters;
            for (E = 0, U = A.length; E < U; E++) {
                I = A[E];
                this.addParameter(I, Q.consumes)
            }
            W = this.model.responseMessages;
            for (C = 0, S = W.length; C < S; C++) {
                K = W[C];
                this.addStatusCode(K)
            }
            return this
        };
        y.prototype.addParameter = function(C, A) {
            var B;
            C.consumes = A;
            B = new k({
                model: C,
                tagName: "tr",
                readOnly: this.model.isReadOnly
            });
            return $(".operation-params", $(this.el)).append(B.render().el)
        };
        y.prototype.addStatusCode = function(B) {
            var A;
            A = new p({
                model: B,
                tagName: "tr"
            });
            return $(".operation-status", $(this.el)).append(A.render().el)
        };
        y.prototype.submitOperation = function(O) {
            var Q, G, N, D, I, A, J, M, L, K, P, F, C, H, E, B;
            if (O != null) {
                O.preventDefault()
            }
            G = $(".sandbox", $(this.el));
            Q = true;
            G.find("input.required").each(function() {
                var R = this;
                $(this).removeClass("error");
                if (jQuery.trim($(this).val()) === "") {
                    $(this).addClass("error");
                    $(this).wiggle({
                        callback: function() {
                            return $(R).focus()
                        }
                    });
                    return Q = false
                }
            });
            if (Q) {
                D = {};
                A = {
                    parent: this
                };
                N = false;
                H = G.find("input");
                for (M = 0, P = H.length; M < P; M++) {
                    I = H[M];
                    if ((I.value != null) && jQuery.trim(I.value).length > 0) {
                        D[I.name] = I.value
                    }
                    if (I.type === "file") {
                        N = true
                    }
                }
                E = G.find("textarea");
                for (L = 0, F = E.length; L < F; L++) {
                    I = E[L];
                    if ((I.value != null) && jQuery.trim(I.value).length > 0) {
                        D.body = I.value
                    }
                }
                B = G.find("select");
                for (K = 0, C = B.length; K < C; K++) {
                    I = B[K];
                    J = this.getSelectedValue(I);
                    if ((J != null) && jQuery.trim(J).length > 0) {
                        D[I.name] = J
                    }
                }
                A.responseContentType = $("div select[name=responseContentType]", $(this.el)).val();
                A.requestContentType = $("div select[name=parameterContentType]", $(this.el)).val();
                $(".response_throbber", $(this.el)).show();
                if (N) {
                    return this.handleFileUpload(D, G)
                } else {
                    return this.model["do"](D, A, this.showCompleteStatus, this.showErrorStatus, this)
                }
            }
        };
        y.prototype.success = function(A, B) {
            return B.showCompleteStatus(A)
        };
        y.prototype.handleFileUpload = function(R, I) {
            var M, H, C, N, L, K, P, J, G, F, D, Q, U, T, S, E, B, A, V, O = this;
            E = I.serializeArray();
            for (J = 0, Q = E.length; J < Q; J++) {
                N = E[J];
                if ((N.value != null) && jQuery.trim(N.value).length > 0) {
                    R[N.name] = N.value
                }
            }
            M = new FormData();
            P = 0;
            B = this.model.parameters;
            for (G = 0, U = B.length; G < U; G++) {
                K = B[G];
                if (K.paramType === "form") {
                    if (K.type.toLowerCase() !== "file" && R[K.name] !== void 0) {
                        M.append(K.name, R[K.name])
                    }
                }
            }
            C = {};
            A = this.model.parameters;
            for (F = 0, T = A.length; F < T; F++) {
                K = A[F];
                if (K.paramType === "header") {
                    C[K.name] = R[K.name]
                }
            }
            log(C);
            V = I.find('input[type~="file"]');
            for (D = 0, S = V.length; D < S; D++) {
                H = V[D];
                if (typeof H.files[0] !== "undefined") {
                    M.append($(H).attr("name"), H.files[0]);
                    P += 1
                }
            }
            this.invocationUrl = this.model.supportHeaderParams() ? (C = this.model.getHeaderParams(R), this.model.urlify(R, false)) : this.model.urlify(R, true);
            $(".request_url", $(this.el)).html("<pre></pre>");
            $(".request_url pre", $(this.el)).text(this.invocationUrl);
            L = {
                type: this.model.method,
                url: this.invocationUrl,
                headers: C,
                data: M,
                dataType: "json",
                contentType: false,
                processData: false,
                error: function(X, Y, W) {
                    return O.showErrorStatus(O.wrap(X), O)
                },
                success: function(W) {
                    return O.showResponse(W, O)
                },
                complete: function(W) {
                    return O.showCompleteStatus(O.wrap(W), O)
                }
            };
            if (window.authorizations) {
                window.authorizations.apply(L)
            }
            if (P === 0) {
                L.data.append("fake", "true")
            }
            jQuery.ajax(L);
            return false
        };
        y.prototype.wrap = function(E) {
            var C, F, H, B, G, D, A;
            H = {};
            F = E.getAllResponseHeaders().split("\r");
            for (D = 0, A = F.length; D < A; D++) {
                B = F[D];
                C = B.split(":");
                if (C[0] !== void 0 && C[1] !== void 0) {
                    H[C[0].trim()] = C[1].trim()
                }
            }
            G = {};
            G.content = {};
            G.content.data = E.responseText;
            G.headers = H;
            G.request = {};
            G.request.url = this.invocationUrl;
            G.status = E.status;
            return G
        };
        y.prototype.getSelectedValue = function(A) {
            var D, C, F, B, E;
            if (!A.multiple) {
                return A.value
            } else {
                C = [];
                E = A.options;
                for (F = 0, B = E.length; F < B; F++) {
                    D = E[F];
                    if (D.selected) {
                        C.push(D.value)
                    }
                }
                if (C.length > 0) {
                    return C.join(",")
                } else {
                    return null
                }
            }
        };
        y.prototype.hideResponse = function(A) {
            if (A != null) {
                A.preventDefault()
            }
            $(".response", $(this.el)).slideUp();
            return $(".response_hider", $(this.el)).fadeOut()
        };
        y.prototype.showResponse = function(A) {
            var B;
            B = JSON.stringify(A, null, "\t").replace(/\n/g, "<br>");
            return $(".response_body", $(this.el)).html(escape(B))
        };
        y.prototype.showErrorStatus = function(B, A) {
            return A.showStatus(B)
        };
        y.prototype.showCompleteStatus = function(B, A) {
            return A.showStatus(B)
        };
        y.prototype.formatXml = function(H) {
            var D, G, B, I, N, J, C, A, L, M, F, E, K;
            A = /(>)(<)(\/*)/g;
            M = /[ ]*(.*)[ ]+\n/g;
            D = /(<.+>)(.+\n)/g;
            H = H.replace(A, "$1\n$2$3").replace(M, "$1\n").replace(D, "$1\n$2");
            C = 0;
            G = "";
            N = H.split("\n");
            B = 0;
            I = "other";
            L = {
                "single->single": 0,
                "single->closing": -1,
                "single->opening": 0,
                "single->other": 0,
                "closing->single": 0,
                "closing->closing": -1,
                "closing->opening": 0,
                "closing->other": 0,
                "opening->single": 1,
                "opening->closing": 0,
                "opening->opening": 1,
                "opening->other": 1,
                "other->single": 0,
                "other->closing": -1,
                "other->opening": 0,
                "other->other": 0
            };
            F = function(T) {
                var P, O, R, V, S, Q, U;
                Q = {
                    single: Boolean(T.match(/<.+\/>/)),
                    closing: Boolean(T.match(/<\/.+>/)),
                    opening: Boolean(T.match(/<[^!?].*>/))
                };
                S = ((function() {
                    var W;
                    W = [];
                    for (R in Q) {
                        U = Q[R];
                        if (U) {
                            W.push(R)
                        }
                    }
                    return W
                })())[0];
                S = S === void 0 ? "other" : S;
                P = I + "->" + S;
                I = S;
                V = "";
                B += L[P];
                V = ((function() {
                    var X, Y, W;
                    W = [];
                    for (O = X = 0, Y = B; 0 <= Y ? X < Y : X > Y; O = 0 <= Y ? ++X : --X) {
                        W.push("  ")
                    }
                    return W
                })()).join("");
                if (P === "opening->closing") {
                    return G = G.substr(0, G.length - 1) + T + "\n"
                } else {
                    return G += V + T + "\n"
                }
            };
            for (E = 0, K = N.length; E < K; E++) {
                J = N[E];
                F(J)
            }
            return G
        };
        y.prototype.showStatus = function(F) {
            var C, H, J, D, A, E, I, G, B;
            if (F.content === void 0) {
                H = F.data;
                B = F.url
            } else {
                H = F.content.data;
                B = F.request.url
            }
            D = F.headers;
            J = D && D["Content-Type"] ? D["Content-Type"].split(";")[0].trim() : null;
            if (!H) {
                C = $("<code />").text("no content");
                E = $('<pre class="json" />').append(C)
            } else {
                if (J === "application/json" || /\+json$/.test(J)) {
                    C = $("<code />").text(JSON.stringify(JSON.parse(H), null, "  "));
                    E = $('<pre class="json" />').append(C)
                } else {
                    if (J === "application/xml" || /\+xml$/.test(J)) {
                        C = $("<code />").text(this.formatXml(H));
                        E = $('<pre class="xml" />').append(C)
                    } else {
                        if (J === "text/html") {
                            C = $("<code />").html(H);
                            E = $('<pre class="xml" />').append(C)
                        } else {
                            if (/^image\//.test(J)) {
                                E = $("<img>").attr("src", B)
                            } else {
                                C = $("<code />").text(H);
                                E = $('<pre class="json" />').append(C)
                            }
                        }
                    }
                }
            }
            I = E;
            $(".request_url", $(this.el)).html("<pre></pre>");
            $(".request_url pre", $(this.el)).text(B);
            $(".response_code", $(this.el)).html("<pre>" + F.status + "</pre>");
            $(".response_body", $(this.el)).html(I);
            $(".response_headers", $(this.el)).html("<pre>" + _.escape(JSON.stringify(F.headers, null, "  ")).replace(/\n/g, "<br>") + "</pre>");
            $(".response", $(this.el)).slideDown();
            $(".response_hider", $(this.el)).show();
            $(".response_throbber", $(this.el)).hide();
            G = $(".response_body", $(this.el))[0];
            A = this.options.swaggerOptions;
            if (A.highlightSizeThreshold && F.data.length > A.highlightSizeThreshold) {
                return G
            } else {
                return hljs.highlightBlock(G)
            }
        };
        y.prototype.toggleOperationContent = function() {
            var A;
            A = $("#" + Docs.escapeResourceName(this.model.parentId) + "_" + this.model.nickname + "_content");
            if (A.is(":visible")) {
                return Docs.collapseOperation(A)
            } else {
                return Docs.expandOperation(A)
            }
        };
        return y
    })(Backbone.View);
    p = (function(z) {
        v(y, z);

        function y() {
            d = y.__super__.constructor.apply(this, arguments);
            return d
        }
        y.prototype.initialize = function() {};
        y.prototype.render = function() {
            var B, A, C;
            C = this.template();
            $(this.el).html(C(this.model));
            if (swaggerUi.api.models.hasOwnProperty(this.model.responseModel)) {
                B = {
                    sampleJSON: JSON.stringify(swaggerUi.api.models[this.model.responseModel].createJSONSample(), null, 2),
                    isParam: false,
                    signature: swaggerUi.api.models[this.model.responseModel].getMockSignature()
                };
                A = new i({
                    model: B,
                    tagName: "div"
                });
                $(".model-signature", this.$el).append(A.render().el)
            } else {
                $(".model-signature", this.$el).html("")
            }
            return this
        };
        y.prototype.template = function() {
            return Handlebars.templates.status_code
        };
        return y
    })(Backbone.View);
    k = (function(z) {
        v(y, z);

        function y() {
            b = y.__super__.constructor.apply(this, arguments);
            return b
        }
        y.prototype.initialize = function() {
            return Handlebars.registerHelper("isArray", function(B, A) {
                if (B.type.toLowerCase() === "array" || B.allowMultiple) {
                    return A.fn(this)
                } else {
                    return A.inverse(this)
                }
            })
        };
        y.prototype.render = function() {
            var G, A, C, F, B, H, E, D;
            D = this.model.type || this.model.dataType;
            if (this.model.paramType === "body") {
                this.model.isBody = true
            }
            if (D.toLowerCase() === "file") {
                this.model.isFile = true
            }
            E = this.template();
            $(this.el).html(E(this.model));
            B = {
                sampleJSON: this.model.sampleJSON,
                isParam: true,
                signature: this.model.signature
            };
            if (this.model.sampleJSON) {
                H = new i({
                    model: B,
                    tagName: "div"
                });
                $(".model-signature", $(this.el)).append(H.render().el)
            } else {
                $(".model-signature", $(this.el)).html(this.model.signature)
            }
            A = false;
            if (this.model.isBody) {
                A = true
            }
            G = {
                isParam: A
            };
            G.consumes = this.model.consumes;
            if (A) {
                C = new l({
                    model: G
                });
                $(".parameter-content-type", $(this.el)).append(C.render().el)
            } else {
                F = new m({
                    model: G
                });
                $(".response-content-type", $(this.el)).append(F.render().el)
            }
            return this
        };
        y.prototype.template = function() {
            if (this.model.isList) {
                return Handlebars.templates.param_list
            } else {
                if (this.options.readOnly) {
                    if (this.model.required) {
                        return Handlebars.templates.param_readonly_required
                    } else {
                        return Handlebars.templates.param_readonly
                    }
                } else {
                    if (this.model.required) {
                        return Handlebars.templates.param_required
                    } else {
                        return Handlebars.templates.param
                    }
                }
            }
        };
        return y
    })(Backbone.View);
    i = (function(z) {
        v(y, z);

        function y() {
            a = y.__super__.constructor.apply(this, arguments);
            return a
        }
        y.prototype.events = {
            "click a.description-link": "switchToDescription",
            "click a.snippet-link": "switchToSnippet",
            "mousedown .snippet": "snippetToTextArea"
        };
        y.prototype.initialize = function() {};
        y.prototype.render = function() {
            var A;
            A = this.template();
            $(this.el).html(A(this.model));
            this.switchToSnippet();
            this.isParam = this.model.isParam;
            if (this.isParam) {
                $(".notice", $(this.el)).text("Click to set as parameter value")
            }
            return this
        };
        y.prototype.template = function() {
            return Handlebars.templates.signature
        };
        y.prototype.switchToDescription = function(A) {
            if (A != null) {
                A.preventDefault()
            }
            $(".snippet", $(this.el)).hide();
            $(".description", $(this.el)).show();
            $(".description-link", $(this.el)).addClass("selected");
            return $(".snippet-link", $(this.el)).removeClass("selected")
        };
        y.prototype.switchToSnippet = function(A) {
            if (A != null) {
                A.preventDefault()
            }
            $(".description", $(this.el)).hide();
            $(".snippet", $(this.el)).show();
            $(".snippet-link", $(this.el)).addClass("selected");
            return $(".description-link", $(this.el)).removeClass("selected")
        };
        y.prototype.snippetToTextArea = function(A) {
            var B;
            if (this.isParam) {
                if (A != null) {
                    A.preventDefault()
                }
                B = $("textarea", $(this.el.parentNode.parentNode.parentNode));
                if ($.trim(B.val()) === "") {
                    return B.val(this.model.sampleJSON)
                }
            }
        };
        return y
    })(Backbone.View);
    j = (function(y) {
        v(z, y);

        function z() {
            x = z.__super__.constructor.apply(this, arguments);
            return x
        }
        z.prototype.initialize = function() {};
        z.prototype.render = function() {
            var A;
            A = this.template();
            $(this.el).html(A(this.model));
            $("label[for=contentType]", $(this.el)).text("Response Content Type");
            return this
        };
        z.prototype.template = function() {
            return Handlebars.templates.content_type
        };
        return z
    })(Backbone.View);
    m = (function(y) {
        v(z, y);

        function z() {
            w = z.__super__.constructor.apply(this, arguments);
            return w
        }
        z.prototype.initialize = function() {};
        z.prototype.render = function() {
            var A;
            A = this.template();
            $(this.el).html(A(this.model));
            $("label[for=responseContentType]", $(this.el)).text("Response Content Type");
            return this
        };
        z.prototype.template = function() {
            return Handlebars.templates.response_content_type
        };
        return z
    })(Backbone.View);
    l = (function(z) {
        v(y, z);

        function y() {
            c = y.__super__.constructor.apply(this, arguments);
            return c
        }
        y.prototype.initialize = function() {};
        y.prototype.render = function() {
            var A;
            A = this.template();
            $(this.el).html(A(this.model));
            $("label[for=parameterContentType]", $(this.el)).text("Parameter content type:");
            return this
        };
        y.prototype.template = function() {
            return Handlebars.templates.parameter_content_type
        };
        return y
    })(Backbone.View)
}).call(this);