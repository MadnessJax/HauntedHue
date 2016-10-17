"use strict";
var http = require("http");
var config_1 = require("../config");
var config_2 = require("../config");
function _setOn(query, obj) {
    if (obj.on === undefined) {
        obj = { "on": true };
    }
    else {
        obj = obj;
    }
    http.request({
        url: "http://" + config_1.ip + "/api/" + config_2.apiKey + query,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(obj)
    }).then(function (response) {
        // alert(response);
    }, function (e) {
        // console.log("Error occurred " + e);
    });
}
function setOn(_query, _obj) { _setOn(_query, _obj); }
exports.setOn = setOn;
//# sourceMappingURL=api-seton.js.map