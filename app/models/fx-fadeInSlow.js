"use strict";
var color_converter_1 = require("../libs/color-converter");
var api_seton_1 = require("../libs/api-seton");
function runFXmain(options, callback) {
    var lightsAmount;
    var looper;
    setTimeout(function () {
        runFX(options);
        looper = setInterval(function () {
            runFX(options);
        }, options.interval);
    }, options.start);
    function runFX(options) {
        var fadeOutSlow = [
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 254, xy: color_converter_1.RGB(255, 186, 0) },
            { "on": false, "bri": 1, "transitiontime": options.speed, "sat": 254, xy: color_converter_1.RGB(0, 0, 75) }
        ];
        var _loop_1 = function(i) {
            var _this = this_1;
            setTimeout(function () {
                api_seton_1.setOn("/lights/" + options.target + "/state", fadeOutSlow[i]);
            }, i * 300);
        };
        var this_1 = this;
        for (var i = 0; i < fadeOutSlow.length; i++) {
            _loop_1(i);
        }
    }
    setTimeout(function () {
        clearInterval(looper);
    }, callback);
}
function fxfadeInSlow(_options, _callback) { runFXmain(_options, _callback); }
exports.fxfadeInSlow = fxfadeInSlow;
//# sourceMappingURL=fx-fadeInSlow.js.map