"use strict";
var http = require("http");
var color_converter_1 = require("../libs/color-converter");
function runFXmain(options, callback) {
    var lightsAmount;
    var obj;
    obj = { "on": true };
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
                setOn("/lights/9/state", fadeInSlow[i]);
            }, i * 300);
        };
        for (var i = 0; i < fadeInSlow.length; i++) {
            _loop_1(i);
        }
    }
    function setOn(query, obj) {
        if (obj.on === undefined) {
            obj = { "on": true };
        }
        else {
            obj = obj;
        }
        http.request({
            url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5" + query,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(obj)
        }).then(function (response) {
            // alert(response);
        }, function (e) {
            // console.log("Error occurred " + e);
        });
    }
    //setTimeout(function(){
    //    clearInterval();
    //}, callback);
}
function fxfadeInSlow(_options, _callback) { runFXmain(_options, _callback); }
exports.fxfadeInSlow = fxfadeInSlow;
//# sourceMappingURL=fx-fadeInSlow kopie.js.map