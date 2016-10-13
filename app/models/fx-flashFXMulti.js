"use strict";
var api_seton_1 = require("../libs/api-seton");
function runFXmain(options, callback) {
    var lightsAmount;
    var obj;
    var _this = this;
    obj = { "on": true };
    //var tester = setInterval(function(){
    //    runFX(options);
    //}, options.interval);
    setTimeout(function () {
        runFX(options);
    }, options.start);
    function runFX(options) {
        var flashFX = [
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 0 },
            { "on": false, "bri": 0, "transitiontime": 0, "sat": 0 },
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 0 },
            { "on": false, "bri": 0, "transitiontime": 0, "sat": 0 },
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 0 },
            { "on": false, "bri": 0, "transitiontime": 0, "sat": 0 }
        ];
        var _loop_1 = function(i) {
            setTimeout(function () {
                api_seton_1.setOn("/lights/" + options.amount + "/state", flashFX[i]);
            }, i * 100);
        };
        for (var i = 0; i < flashFX.length; i++) {
            _loop_1(i);
        }
    }
    //setTimeout(function(){
    //    clearInterval(tester);
    //}, callback);
}
function fxflashFXMulti(_options, _callback) { runFXmain(_options, _callback); }
exports.fxflashFXMulti = fxflashFXMulti;
//# sourceMappingURL=fx-flashFXMulti.js.map