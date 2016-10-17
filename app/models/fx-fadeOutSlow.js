"use strict";
var color_converter_1 = require("../libs/color-converter");
var api_seton_1 = require("../libs/api-seton");
function runFXmain(options, callback) {
    var lightsAmount;
    setTimeout(function () {
        runFX(options);
    }, options.start);
    function runFX(options) {
        var fadeInSlow = [
            { "on": true, "bri": 1, "transitiontime": 0, "sat": 254, xy: color_converter_1.RGB(0, 0, 75) },
            { "on": true, "bri": 150, "transitiontime": options.speed, "sat": 254, xy: color_converter_1.RGB(255, 186, 0) }
        ];
        var _loop_1 = function(i) {
            setTimeout(function () {
                api_seton_1.setOn("/lights/9/state", fadeInSlow[i]);
            }, i * 300);
        };
        for (var i = 0; i < fadeInSlow.length; i++) {
            _loop_1(i);
        }
    }
    //setTimeout(function(){
    //    clearInterval();
    //}, callback);
}
function fXfadeOutSlow(_options, _callback) { runFXmain(_options, _callback); }
exports.fXfadeOutSlow = fXfadeOutSlow;
//# sourceMappingURL=fx-fadeOutSlow.js.map