"use strict";
var http = require("http");
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
                setOn("/lights/9/state", flashFX[i]);
            }, i * 100);
        };
        var this_1 = this;
        for (var i = 0; i < flashFX.length; i++) {
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
function fxflashFX(_options, _callback) { runFXmain(_options, _callback); }
exports.fxflashFX = fxflashFX;
//# sourceMappingURL=fx-flashFX.js.map