"use strict";
var http = require("http");
// this wil be created and stored in localstorage/file
var tmp = "gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5";
function runConfig() {
    //findIP();
    //runGet();
    findIP().then(function (res) {
        // major todo add more logic for detection this is simple N-UPnP.
        // see for more info: http://www.developers.meethue.com/documentation/hue-bridge-discovery
        var ip = res.replace("[{", "").replace("}]", "").replace(/"/g, '').split(":")[2];
        //createConnection(ip).then(function(res2){
        //    console.log(res2);
        //createNewConnection().then(function(res3) {
        //outputs the value that will be stored in localstorage see var tmp.
        ///console.log(res3[0].success.username);
        //});
        //});
        getHueRouterInfo(ip).then(function (res2) {
            console.log(res2);
        });
    });
}
function findIP() {
    return http.request({
        url: "https://www.meethue.com/api/nupnp",
        method: "GET" }).then(function (response) {
        return response.content.toString();
    });
}
// if no connection exsists then run this (creates new user)
function createConnection(ip) {
    return http.request({
        url: "http://" + ip + "/api/" + createAppID(),
        method: "GET" }).then(function (response) {
        return response.content.toString();
    });
}
function createAppID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function createNewConnection() {
    return http.request({
        url: "https://httpbin.org/post",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ "devicetype": "HauntedHue#iphone" }) //TODO get device instead of iphone???
    }).then(function (response) {
        // result = response.content.toJSON();
        // console.log(result);
    }, function (e) {
        // console.log("Error occurred " + e);
    });
}
/*if user already has connection use localstoren here instead of tmp*/
function getHueRouterInfo(ip) {
    return http.request({
        url: "http://" + ip + "/api/" + tmp + "/",
        method: "GET" }).then(function (response) {
        return response.content.toString();
    });
}
/*get light ammount example*/
//this.Data().then(function(res){ _this.lightsAmount = Object.keys(res).length; });
/*
public Data() {
  function lights () {
    return http.request({
      url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights",
      method: "GET" }).then(function (response) {
      return response.content.toJSON();
    });
  }
  return lights();
}
*/
function connect() { runConfig(); }
exports.connect = connect;
//# sourceMappingURL=config.js.map