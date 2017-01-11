angular.module("TimeAgoModule", [])
    .filter("timeago", function () {
        return function (a, b) {
            var c, d = function (a, b, c) {
                var d = $.isFunction(a) ? a(b, i) : a
                    , e = c.numbers && c.numbers[b] || b;
                return d.replace(/%d/i, e)
            }, e = (new Date).getTime(), f = new Date(a).getTime(), g = b || !1, h = {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "%d seconds",
                minute: "%d minute",
                minutes: "%d minutes",
                hour: "%d hour",
                hours: "%d hours",
                day: "%d day",
                days: "%d days",
                month: "%d month",
                months: "%d months",
                year: "%d year",
                years: "%d years"
            }, i = e - f, j = Math.abs(i) / 1e3, k = j / 60, l = k / 60, m = l / 24, n = m / 365, o = void 0 === h.wordSeparator ? " " : h.wordSeparator, p = h.prefixAgo, q = h.suffixAgo;
            return g && 0 > i && (p = h.prefixFromNow,
                q = h.suffixFromNow),
                c = 45 > j && d(h.seconds, Math.round(j), h) || 90 > j && d(h.minute, 1, h) || 45 > k && d(h.minutes, Math.round(k), h) || 90 > k && d(h.hour, 1, h) || 24 > l && d(h.hours, Math.round(l), h) || 42 > l && d(h.day, 1, h) || 30 > m && d(h.days, Math.round(m), h) || 45 > m && d(h.month, 1, h) || 365 > m && d(h.months, Math.round(m / 30), h) || 1.5 > n && d(h.year, 1, h) || d(h.years, Math.round(n), h),
                $.trim([p, c, q].join(o))
        }
    });