var app = angular.module("app", ["ngResource", "ngAnimate", "app.services", "app.controllers"]);
angular.module("app.services", []), angular.module("app.controllers", []), app.constant("appConfig", {
    host: location.protocol + "//" + location.hostname + ":" + location.port,
    ph: window.appConfig.ph
}), app.config(["$httpProvider", "appConfig", "$httpParamSerializerProvider", "$interpolateProvider", function (e, t, o, n) {
    e.defaults.headers.post["X-CSRFToken"] = $("input[name=csrfmiddlewaretoken]").val(), e.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8", n.startSymbol("[[").endSymbol("]]")
}]), app.run(["$templateCache", function (e) {
    e.put("template/videos/vimeo.html", '<iframe src="[[video.url]]" width="100%" height="100%" frameborder="0"scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), e.put("template/videos/amazon.html", '<video id="[[video.id]]" preload="auto" controls poster="">\n    <source src="[[video.url]]" type="video/mp4"/>\n</video>\n'), e.put("template/video/pagination.tpl.html", '<div id="video_paginaton" ng-controller="VideoNavigation">\n<a id="video_pagination_left" href="javascript:void(0)" ng-show="backItem" ng-click="getVideo(index-1)">\n<i class="icon-left-arrow"></i> <div>[[backItem.fields.name]]</div>\n</a>\n<a id="video_pagination_right" href="javascript:void(0)" ng-show="nextItem" ng-click="getVideo(index+1)">\n<div>[[nextItem.fields.name]]</div><i class="icon-right-arrow"></i>\n</a>\n<div>\n'), e.put("template/login_with_email.html", '<section class="container-fluid text-center ligthbox-career"><div class="row"><h3>Entre com seu email</h3><p>Entre com seu email para ter acesso a todos os conteÃºdos gratuitos.</p><div class="container-fluid"><form action="/auth/login/?next=/up?[[content_type]]=[[slug]]" method="post"><input type="hidden" name="csrfmiddlewaretoken" value="[[csrftoken]]"><div class="form-group col-xs-12"><input type="email" class="form-control" name="username" placeholder="Digite seu email" required="required"></div><div class="form-group col-xs-12"><button type="submit" class="btn btn-success">Entrar</button></div></form></div></div></section>')
}]), angular.module("app.controllers").controller("CourseDetail", ["$scope", "$video", "Video", "Log", "appConfig", "$window", "$videoPagination", "$templateCache", "$interpolate", function (e, t, o, n, i, a, s, r, c) {
    function l(e, t) {
        var o = {player_type: e, selectorVideo: d, scope: {video: {url: t}}};
        switch (e) {
            case"Vimeo":
                break;
            case"Amazon S3":
                break;
            case"Sambatech":
                o.player_options = {
                    height: "94%",
                    width: "100%",
                    ph: i.ph,
                    playerParams: {startOutput: "720p", autoStart: !0}
                }
        }
        return o
    }

    var d = "#video";
    e.contents = [], e.course = null;
    var p = new s({
        selectorVideo: d, controller: "VideoNavigation", scope: {
            contents: function () {
                return e.contents
            }, course: function () {
                return e.course
            }
        }, watchScope: {nextItem: "nextItem", backItem: "backItem"}
    });
    i.pagination = p, e.openLogin = function () {
        var t = '<div class="white-popup">' + r.get("template/login_with_email.html") + "</div>", o = c(t)({
            slug: e.course.fields.slug,
            csrftoken: $("input[name=csrfmiddlewaretoken]").val(),
            content_type: "course"
        });
        $.magnificPopup.open({items: {src: o, type: "inline"}})
    }, e.getVideo = function (i) {
        var s = e.contents[i];
        s.status = "Assisted", o.get({id: s.pk}, function (o) {
            o.error && (a.location.href = "/subscribe");
            var r = l(s.fields.player_type, o.video_url), c = new t(r);
            c.on("finish", function () {
                n.assistedVideo({}, {content_id: s.pk, type: "Course"}, function (e) {
                    s.statusOriginal = "Completed", s.status = "Completed"
                })
            }), c.on("ready", function () {
                e.$apply(function () {
                    p.data.selectorPlayer = c.data.selectorPlayer, p.move(i)
                })
            }), c.show()
        }, function (e) {
            console.log("Problema na comunicaÃ§Ã£o!!!")
        }), e.videoShow = !0
    }
}]).controller("ContentDetail", ["$scope", "$video", "VideoContent", "Log", "appConfig", "$window", function (e, t, o, n, i, a) {
    function s(e, t) {
        var o = {player_type: e, selectorVideo: r, scope: {video: {url: t}}};
        switch (e) {
            case"Vimeo":
                break;
            case"Amazon S3":
                break;
            case"Sambatech":
                o.player_options = {
                    height: "94%",
                    width: "100%",
                    ph: i.ph,
                    playerParams: {startOutput: "720p", autoStart: !0}
                }
        }
        return o
    }

    var r = "#video";
    e.getVideo = function (i, r) {
        o.get({id: i}, function (e) {
            e.error && (a.location.href = "/subscribe");
            var o = s(r, e.video_url), c = new t(o);
            c.on("finish", function () {
                n.assistedVideo({}, {content_id: i, type: "Content"}, function (e) {
                })
            }), c.show()
        }, function (e) {
            console.log("Problema na comunicaÃ§Ã£o!!!")
        }), e.videoShow = !0
    }
}]).controller("VideoNavigation", ["$scope", "contents", "course", "Video", "Log", "appConfig", "$window", "$video", "$videoPagination", function (e, t, o, n, i, a, s, r, c) {
    function l(e, t) {
        var o = {player_type: e, selectorVideo: d, scope: {video: {url: t}}};
        switch (e) {
            case"Vimeo":
                break;
            case"Amazon S3":
                break;
            case"Sambatech":
                o.player_options = {
                    height: "94%",
                    width: "100%",
                    ph: a.ph,
                    playerParams: {startOutput: "720p", autoStart: !0}
                }
        }
        return o
    }

    var d = "#video";
    e.contents = t, e.backItem = null, e.nextItem = e.contents[e.index + 1] || null, e.$watch("index", function (t) {
        e.backItem = e.contents[t - 1] || null, e.nextItem = e.contents[t + 1] || null
    }), e.getVideo = function (t) {
        var o = e.contents[t];
        o.status = "Assisted", $("#title-content-name h2").text(o.fields.name), n.get({id: o.pk}, function (n) {
            n.error && (s.location.href = "/subscribe");
            var c = l(o.fields.player_type, n.video_url), d = new r(c);
            d.on("finish", function () {
                i.assistedVideo({}, {content_id: o.pk, type: "Course"}, function (e) {
                    o.statusOriginal = "Completed", o.status = "Completed"
                })
            }), d.on("ready", function () {
                e.$apply(function () {
                    a.pagination.data.selectorPlayer = d.data.selectorPlayer, a.pagination.move(t)
                })
            }), d.show()
        }, function (e) {
            console.log("Problema na comunicaÃ§Ã£o!!!")
        }), e.videoShow = !0
    }
}]).controller("ChannelMain", ["$scope", "$templateCache", "$interpolate", "$window", function (e, t, o, n) {
    e.channel = null, e.openLogin = function (e) {
        var n = '<div class="white-popup">' + t.get("template/login_with_email.html") + "</div>", i = o(n)({
            slug: e,
            csrftoken: $("input[name=csrfmiddlewaretoken]").val(),
            content_type: "content"
        });
        $.magnificPopup.open({items: {src: i, type: "inline"}})
    }, e.goTo = function (e) {
        return n.location.href = e
    }
}]).controller("Agenda", ["$scope", "$templateCache", "$interpolate", "$window", function (e, t, o, n) {
    e.channel = null, e.openLogin = function (e) {
        var n = '<div class="white-popup">' + t.get("template/login_with_email.html") + "</div>", i = o(n)({
            slug: e,
            csrftoken: $("input[name=csrfmiddlewaretoken]").val(),
            content_type: "content"
        });
        $.magnificPopup.open({items: {src: i, type: "inline"}})
    }, e.goTo = function (e) {
        return n.location.href = e
    }
}]), $(document).ready(function () {
    function e(e, t) {
        e.mouseenter && e.mouseenter(function () {
            $(this).css({border: "12px solid " + t, "box-shadow": "2px 2px 10px " + t})
        }).mouseleave(function () {
            $(this).css({border: "none", "box-shadow": "none"})
        })
    }

    function t(e) {
        var t = $("a #content-home").outerWidth() + 10;
        if ("left" == e)var o = parseInt($("a #content-home").css("left")) + t; else var o = parseInt($("a #content-home").css("left")) - t;
        $("a #content-home:not(:animated)").animate({left: o}, "slow", function () {
            "left" == e ? $("a #content-home:first").before($("a #content-home:last")) : $("a #content-home:last").after($("a #content-home:first"))
        })
    }

    var o = location.protocol + "//" + location.hostname + ":" + location.port, n = $("#video-background-home"), i = '<video class="video-background" src="http://email.schoolofnet.s3.amazonaws.com/back-video/videos/School4.mp4" poster="' + appConfig.urlPoster + '" autoplay="true"  loop="true" muted ><source src="http://email.schoolofnet.s3.amazonaws.com/back-video/videos/School4.mp4" type="video/mp4"></video>';
    $(window).innerWidth() >= 1194 ? n.html(i) : n.remove();
    var a = $("#menu-agenda");
    if ($(document).on("click", "#btn-menu-agenda", function () {
            $(this).scrollTop(function () {
                a.hasClass("open-menu") ? a.removeClass("open-menu") : a.addClass("open-menu")
            })
        }), $("#home-lightbox").click()) {
        var s = $(".lightbox-home").data("url");
        $(".lightbox-home").magnificPopup({items: [{src: s, type: "iframe"}], gallery: {enabled: !0}, type: "image"})
    }
    var r = $(".home-index i.icon-play");
    r.mouseenter && r.mouseenter(function () {
        $(this).addClass("pulse")
    }).mouseleave(function () {
        $(this).removeClass("pulse")
    });
    var c = function (e) {
        return 11 === e.replace(/\D/g, "").length ? "(00) 00000-0000" : "(00) 0000-00009"
    }, l = {
        onKeyPress: function (e, t, o, n) {
            o.mask(SPMaskBehavior.apply({}, arguments), n)
        }
    };
    $(".phone-mask").mask(c, l), $(document).on("click", "#video-content", function (e) {
        var t = $(".content-name", this).text();
        $("#title-content-name").html("<h2>" + t + "</h2>")
    }), $(".page-scroll").click(function (e) {
        e.preventDefault(), $("html,body").animate({scrollTop: $(this.hash).offset().top}, 1500)
    }), $(".subscribe-scroll").click(function (e) {
        e.preventDefault(), $("html,body").animate({scrollTop: $(this.hash).offset().top}, 1500), $(".subscribe-form-sign .click-focus").focus(), $(".page-subscribe-home .video-subscribe .btn-success.btn-focus").focus()
    });
    var d = $("#menu"), p = $("#open-close-menu"), u = $("#x-closed-menu");
    if ($(document).on("click", "#icon-son-courses", function (e) {
            e.preventDefault(), d.removeClass("close"), d.addClass("open"), $(window).innerWidth() < 1200 && p.addClass("open-close-menu");
            var t = $(window).height();
            $(".menu-son.menu-container").css("height", t), $(".menu-son.menu-container.open").css("height", t)
        }), $(document).on("click", "#x-closed-menu", function (e) {
            e.stopPropagation(), e.preventDefault(), console.log("Clicou"), d.hasClass("open") && (d.removeClass("open"), d.removeClass("open"), u.removeClass("open-close-menu"), d.addClass("close"))
        }), $(window).innerWidth() >= 1200 && $("#menu").mouseleave(function (e) {
            e.preventDefault(), d.hasClass("open") && (d.addClass("close"), d.removeClass("open"))
        }), $(window).innerHeight() <= 537) {
        var h = $(window).innerHeight();
        $("#menu-list").css({
            height: h - 10,
            overflow: "hidden",
            "overflow-y": "scroll",
            "-webkit-overflow-scrolling": "touch"
        })
    }
    var m = $("article#courses");
    m.mouseenter && m.mouseenter(function () {
        var e = $(this).css("background-color");
        $(this).css({border: "12px solid " + e, "box-shadow": "2px 2px 10px " + e})
    }).mouseleave(function () {
        $(this).css({border: "none", "box-shadow": "none"})
    });
    var f = $("article#channel");
    f.mouseenter && f.mouseenter(function () {
        var e = $(".collapse.navbar-collapse.page-channel").css("background-color");
        $(this).css({border: "12px solid " + e, "box-shadow": "2px 2px 10px " + e})
    }).mouseleave(function () {
        $(this).css({border: "none", "box-shadow": "none"})
    });
    var v = $("a.plano-de-estudo-article article#courses"), g = "#eab94f";
    e(v, g);
    var b = $("article#content-home");
    b.mouseenter && b.mouseenter(function () {
        var e = $(this).css("background-color");
        $(this).css({border: "12px solid " + e, "box-shadow": "2px 2px 10px " + e})
    }).mouseleave(function () {
        $(this).css({border: "none", "box-shadow": "none"})
    });
    var y = $("article#courses-home");
    y.mouseenter && y.mouseenter(function () {
        var e = $(this).css("background-color");
        $(this).css({border: "12px solid " + e, "box-shadow": "2px 2px 10px " + e})
    }).mouseleave(function () {
        $(this).css({border: "none", "box-shadow": "none"})
    });
    var w = $("article#live-class-home"), _ = "#61a8da";
    e(w, _);
    var x = $("article#direto-ao-ponto-home"), k = "#da625c";
    e(x, k);
    var C = $("article#quero-saber-home"), V = "#63cbda";
    e(C, V);
    var P = $("article#plano-de-estudo-home"), S = "#eab94f";
    e(P, S);
    var P = $("article#carreira-developer-home"), S = "#445dda";
    e(P, S), $(".play_video_course").click(function () {
        $("#video").html("<option>loading...</option>");
        var e = $(this).data("id"), t = o + "/api/show_video/" + e;
        $.ajax({
            url: t,
            type: "GET",
            dataType: "html",
            cache: !1,
            data: {data: $(this).val()},
            complete: function (e, t) {
            },
            success: function (e, t, o) {
                var n = document.getElementById("video");
                n.innerHTML = e;
                videojs("player-video-html5", this, {}, function () {
                    console.log("Good to go!"), this.play(), this.on("ended", function () {
                        console.log("awww...over so soon?")
                    })
                })
            },
            error: function (e, t, o) {
                alert("Ocorreu um erro. Entre em contato com o suporte.")
            }
        })
    }), $(".lightbox").each(function () {
        $("#video").html("<option>loading...</option>");
        var e = $(this).data("id"), t = o + "/api/show_video/" + e;
        $.ajax({
            url: t,
            type: "GET",
            dataType: "html",
            cache: !1,
            data: {data: $(this).val()},
            complete: function (e, t) {
            },
            success: function (e, o, n) {
                $(".lightbox").magnificPopup({items: [{src: t, type: "iframe"}], gallery: {enabled: !0}, type: "image"})
            },
            error: function (e, t, o) {
            }
        })
    }), $(".lightbox-study-plan").each(function () {
        $(".page_courses").addClass("study_plan"), $('[data-toggle="tooltip"]').tooltip("show")
    });
    var I = 377, z = $(window).innerHeight() - I;
    $(".container-fluid.page_plan_sign_login ").css("min-height", z);
    var T = 347, L = $(window).innerHeight() - T;
    $(".container-fluid.page-channel-content").css("min-height", L), $(".container-fluid.page_courses_content").css("min-height", L), $(".container-fluid.page-plano-de-estudo-content").css("min-height", L), $(".container-fluid.agenda-info").css("min-height", L), $(".container-fluid.login-success").css("min-height", L), $(".container-fluid.page-my-subscription").css("min-height", L), $(".container-fluid.forum-index").css("min-height", L), $(".container-fluid.forum-show").css("min-height", L), $(".container-fluid.forum-answer").css("min-height", L), $(".container-fluid.page-welcome").css("min-height", L);
    var A = 430, D = $(window).innerHeight() - A;
    $(".container-fluid.page-quero-saber").css("min-height", D), $('[data-toggle="tooltip"]').tooltip("hide");
    var E = 0, j = 0, R = 0, H = 5e3;
    if ($("a #content-home:first").before($("a #content-home:last")), 1 == E) {
        var O = setInterval('slide("right")', H);
        $("#hidden_auto_slide_seconds").val(H)
    }
    1 == j && $("a #content-home").hover(function () {
        clearInterval(O)
    }, function () {
        O = setInterval('slide("right")', H)
    }), 1 == R && $(document).bind("keypress", function (e) {
        37 == e.keyCode ? slide("left") : 39 == e.keyCode && slide("right")
    }), $(".prev-slide-logged").click(function () {
        t("right")
    }), $(".next-slide-logged").click(function () {
        t("left")
    })
}), $(function () {
    "undefined" != typeof Zenbox && Zenbox.init({
        dropboxID: "20165224",
        url: "https://schoolofnet.zendesk.com",
        tabTooltip: "FaÃ§a uma pergunta",
        tabColor: "#9fcb00",
        tabPosition: "Right"
    }), $("#contato-zendesk").click(function (e) {
        return $("#zenbox_tab").click(), !1
    }), $("#zenbox_tab").hide()
}), angular.module("app.services").factory("Video", ["$resource", "appConfig", function (e, t) {
    return e(t.host + "/api/show_video/:id", {id: "@id"})
}]).factory("VideoContent", ["$resource", "appConfig", function (e, t) {
    return e(t.host + "/api/show_video/:id?content_type=content", {id: "@id"})
}]).factory("Log", ["$resource", "appConfig", "$httpParamSerializer", function (e, t, o) {
    return e(t.host + "/api/log_content", {}, {
        assistedVideo: {
            method: "post", transformRequest: function (e) {
                return e.status = "Completed", o(e)
            }
        }
    })
}]).service("$video", ["$vimeo", "$amazon", "$sambatech", function (e, t, o) {
    function n(e) {
        this.data = {
            selectorVideo: "",
            selectorPlayer: "#video_code",
            player_type: "",
            events: [],
            scope: null,
            player_options: {}
        }, angular.extend(this.data, e)
    }

    var i = {
        Vimeo: {events: {finish: "finish", ready: "ready"}},
        "Amazon S3": {events: {finish: "ended", ready: "ready"}},
        Sambatech: {events: {finish: "onFinish", ready: "onLoad"}}
    };
    return n.prototype.on = function (e, t) {
        var o = this;
        o.data.events.push({name: i[this.data.player_type].events[e], callback: t})
    }, n.prototype.show = function () {
        var n = this.data.selectorPlayer.replace(/^#/, "");
        switch ($(this.data.selectorPlayer).remove(), $(this.data.selectorVideo).append('<div id="' + n + '"/>'), $(this.data.selectorPlayer).css("width", "100%"), $(this.data.selectorPlayer).css("height", "100%"), this.data.selectParentVideo = this.data.selectorVideo, this.data.selectorVideo = "#video_code", this.data.player_type) {
            case"Vimeo":
                this.video = new e(this.data);
                break;
            case"Amazon S3":
                this.video = new t(this.data);
                break;
            case"Sambatech":
                this.video = new o(this.data)
        }
    }, n
}]).service("$amazon", ["$templateCache", "$interpolate", function (e, t) {
    function o(o) {
        function n() {
            return $(s.data.selectorVideo).find("video")[0]
        }

        function i() {
            var e = $(s.data.selectorVideo).width(), t = $(s.data.selectorVideo).height();
            $(n()).addClass("video-js vjs-default-skin"), $(n()).attr("width", e + "px"), $(n()).attr("height", t + "px"), $(n()).attr("data-setup", '{"playbackRates": [1, 1.5, 2, 3, 4, 8, 10], "aspectRatio":"' + e + ":" + t + '" }')
        }

        var a, s = this;
        this.data = {
            selectorVideo: "",
            events: [],
            scope: {id: "video_amazon"}
        }, angular.extend(this.data, o), a = e.get("template/videos/amazon.html"), $(this.data.selectorVideo).html(t(a)(this.data.scope)), i(), this.player = videojs(n(), {}, function () {
            this.play();
            for (var e = 0; e < s.data.events.length; e++)this.on(s.data.events[e].name, s.data.events[e].callback)
        })
    }

    return o
}]).service("$sambatech", ["$interpolate", function (e) {
    function t(e) {
        this.data = {
            selectorVideo: "",
            events: [],
            scope: {},
            player_options: {}
        }, angular.extend(this.data, e), this.data.player_options.m = this.data.scope.video.url, this.player = new SambaPlayer($(this.data.selectorVideo)[0], this.data.player_options);
        for (var t = 0; t < this.data.events.length; t++)this.player.on(this.data.events[t].name, this.data.events[t].callback)
    }

    return t
}]).service("$vimeo", ["$templateCache", "$interpolate", function (e, t) {
    function o(o) {
        function n() {
            return $(a.data.selectorVideo).find("iframe")[0]
        }

        var i, a = this;
        this.data = {
            selectorVideo: "",
            events: [],
            scope: {id: "video_vimeo"}
        }, angular.extend(this.data, o), i = e.get("template/videos/vimeo.html"), $(this.data.selectorVideo).html(t(i)(this.data.scope)), setTimeout(function () {
            a.data.player = $f(n()), setTimeout(function () {
                a.data.player.addEvent("ready", function () {
                    try {
                        a.data.player.api("play");
                        for (var e = 0; e < a.data.events.length; e++)a.data.player.addEvent(a.data.events[e].name, a.data.events[e].callback)
                    } catch (t) {
                    }
                })
            }, 600)
        }, 1e3)
    }

    return o
}]).service("$videoPagination", ["$templateCache", "$compile", "$controller", "$rootScope", "$injector", "$timeout", function (e, t, o, n, i, a) {
    function s(e) {
        this.data = {
            selectorVideo: "",
            selectorPlayer: "",
            scope: {},
            controller: null,
            watchScope: {nextItem: "nextItem", backItem: "backItem"}
        }, this.$scope = null, angular.extend(this.data, e)
    }

    return s.prototype.move = function (s) {
        var r = this;
        if (null == this.$scope) {
            var c = e.get("template/video/pagination.tpl.html"), l = $(c), d = l.attr("ng-controller");
            l.removeAttr("ng-controller");
            var p = n.$new();
            p.index = s, this.$scope = p;
            var u = {$scope: p};
            angular.forEach(this.data.scope, function (e, t) {
                u[t] = angular.isString(e) ? i.get(e) : i.invoke(e, null, null, t)
            }), $(r.data.selectorPlayer).parent().hover(function () {
                $("#video_pagination_left").css("visibility", ""), $("#video_pagination_right").css("visibility", "")
            }, function () {
                $("#video_pagination_left").css("visibility", "hidden"), $("#video_pagination_right").css("visibility", "hidden")
            }), p.$watch(this.data.watchScope.backItem, function (e) {
                e && a(function () {
                    $(r.data.selectorPlayer);
                    $(this).unbind("mouseenter mouseleave"), $("#video_pagination_left").css("background-color", u.course.fields.background_color), $("#video_pagination_left").find("div").css("color", u.course.fields.font_color), $("#video_pagination_left").find("i").attr("style", "color: " + u.course.fields.font_color + " !important")
                })
            }), p.$watch(this.data.watchScope.nextItem, function (e) {
                e && a(function () {
                    var e = $(r.data.selectorPlayer);
                    e[0].offsetLeft + e[0].getBoundingClientRect().width, $("#video_pagination_right")[0].getBoundingClientRect().width;
                    $("#video_pagination_right").css("background-color", u.course.fields.background_color), $("#video_pagination_right").find("div").css("color", u.course.fields.font_color), $("#video_pagination_right").find("i").attr("style", "color: " + u.course.fields.font_color + " !important")
                })
            });
            o(this.data.controller, u);
            $(this.data.selectorVideo).append(t(l)(p)), l.attr("ng-controller", d);
            var l = $(r.data.selectorPlayer);
            l[0].offsetLeft + l[0].getBoundingClientRect().width
        } else this.$scope.index = s
    }, s
}]);
//# sourceMappingURL=all.js.map