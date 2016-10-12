"use strict";
var http = require("http");
var color_converter_1 = require("../libs/color-converter");
function runFXmain(options, callback) {
    var lightsAmount;
    var obj;
    var _this = this;
    obj = { "on": true };
    var tester = setInterval(function () {
        runFX(options);
    }, options.interval);
    function runFX(options) {
        //if(type == "fadeOutSlow") {
        var fadeOutSlow = [
            { "on": true, "bri": 150, "transitiontime": 0, "sat": 254, xy: color_converter_1.RGB(255, 186, 0) },
            { "on": false, "bri": 1, "transitiontime": options.speed, "sat": 254, xy: color_converter_1.RGB(0, 0, 75) }
        ];
        var _loop_1 = function(i) {
            var _this_1 = this_1;
            setTimeout(function () {
                setOn("/lights/9/state", fadeOutSlow[i]);
            }, i * 300);
        };
        var this_1 = this;
        for (var i = 0; i < fadeOutSlow.length; i++) {
            _loop_1(i);
        }
        //}
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
    setTimeout(function () {
        clearInterval(tester);
    }, callback);
}
function fXfadeOutSlow(_options, _callback) { runFXmain(_options, _callback); }
exports.fXfadeOutSlow = fXfadeOutSlow;
//# sourceMappingURL=fx-fadeOutSlow kopie.js.map