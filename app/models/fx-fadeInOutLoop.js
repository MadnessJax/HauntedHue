"use strict";
var http = require("http");
var color_converter_1 = require("../libs/color-converter");
function runFXmain(options, callback) {
    var lightsAmount;
    var obj;
    obj = { "on": true };
    //var tester = setInterval(function(){
    //    runFX(options);
    //}, options.interval);
    setTimeout(function () {
        runFX(options);
    }, options.start);
    function runFX(options) {
        var fadeInOutLoop = [];
        // total of 500 ms
        var animation = [
            { "on": true, "bri": 150, "transitiontime": Math.round(options.speed), "sat": 254, xy: color_converter_1.RGB(255, 186, 0) },
            { "on": true, "bri": 1, "transitiontime": Math.round(options.speed), "sat": 254, xy: color_converter_1.RGB(255, 186, 0) },
            { "on": true, "bri": 150, "transitiontime": Math.round(options.speed), "sat": 254, xy: color_converter_1.RGB(255, 186, 0) },
            { "on": true, "bri": 1, "transitiontime": Math.round(options.speed), "sat": 254, xy: color_converter_1.RGB(255, 186, 0) }
        ]; // 1000 ms per transition see 10*100
        for (var i = 0; i < options.loop; i++) {
            fadeInOutLoop.push(animation);
        }
        for (var i = 0; i < fadeInOutLoop.length; i++) {
            setTimeout(function () {
                var _loop_1 = function(i_1) {
                    setTimeout(function () {
                        console.log(i_1 + animation[i_1].bri.toString());
                        setOn("/lights/4/state", animation[i_1]);
                    }, i_1 * (options.speed * 100));
                };
                for (var i_1 = 0; i_1 < animation.length; i_1++) {
                    _loop_1(i_1);
                }
            }, i * 400);
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
    //    clearInterval(tester);
    //}, callback);
}
function fxfadeInOutLoop(_options, _callback) { runFXmain(_options, _callback); }
exports.fxfadeInOutLoop = fxfadeInOutLoop;
//# sourceMappingURL=fx-fadeInOutLoop.js.map