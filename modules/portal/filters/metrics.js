angular.module("REVCast").filter("metricsFilter", ["$filter", function (a) {
    return function (b) {
        return "undefined" == typeof b ? void 0 : "string" == typeof b ? b : (b += "",
                    1e3 > b ? a("number")(b, 1) : (b / 1e3).toFixed(1) + "k")
    }
}
]);
