"use strict";
var http = require("http");
function _setOn(query, obj) {
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
function setOn(_query, _obj) { _setOn(_query, _obj); }
exports.setOn = setOn;
//# sourceMappingURL=api-seton.js.map