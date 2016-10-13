"use strict";
var api_seton_1 = require("../libs/api-seton");
function runFXmain(options, callback) {
    var lightsAmount;
    var obj;
    obj = { "on": true };
    setTimeout(function () {
        runFX(options);
    }, options.start);
    function runFX(options) {
        var flashFX = [
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 0 },
            { "on": false, "bri": 0, "transitiontime": 0, "sat": 0 }
        ];
        var _loop_1 = function(i) {
            var _this = this_1;
            setTimeout(function () {
                api_seton_1.setOn("/lights/9/state", flashFX[i]);
            }, i * 100);
        };
        var this_1 = this;
        for (var i = 0; i < flashFX.length; i++) {
            _loop_1(i);
        }
    }
    //setTimeout(function(){
    //    clearInterval();
    //}, callback);
}
function fxflashFX(_options, _callback) { runFXmain(_options, _callback); }
exports.fxflashFX = fxflashFX;
//# sourceMappingURL=fx-flashFX.js.map