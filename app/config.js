"use strict";
var observable_1 = require('data/observable');
var http = require("http");
var applicationSettings = require("application-settings");
var applicationKey = applicationSettings.getString("apiKey");
var observableArray = require("data/observable-array");
var myItems = new observableArray.ObservableArray();
function runConfig(page) {
    console.log(applicationSettings.getString("ipAddress"));
    console.log(applicationSettings.getString("apiKey"));
    if (applicationSettings.getString("apiKey") === undefined || applicationSettings.getString("apiKey") === "description") {
        page.css =
            "Button { visibility: collapsed }" +
                ".spinner{ visibility: visible }" +
                ".bridge { visibility: visible  }";
        findIP().then(function (res) {
            // major todo add more logic for detection this is simple N-UPnP.
            // see for more info: http://www.developers.meethue.com/documentation/hue-bridge-discovery
            var ip = res.replace("[{", "").replace("}]", "").replace(/"/g, '').split(":")[2];
            if (applicationSettings.getString("ipAddress") === undefined) {
                applicationSettings.setString("ipAddress", ip);
            }
            createConnection(ip).then(function (res2) {
                var checkConnection = setInterval(function () {
                    createNewConnection(ip).then(function (userResult) {
                        if (userResult.toString().indexOf("link button not pressed") > 0) {
                            page.css =
                                "Button { visibility: collapsed }" +
                                    ".spinner{ visibility: visible }" +
                                    ".bridge { visibility: visible  }";
                            console.log("Not Connected Yet. Hit Hue Bridge Too Connect App. And Wait");
                        }
                        else {
                            clearInterval(checkConnection);
                            page.css =
                                "Button { visibility: visible }" +
                                    ".spinner{ visibility: collapsed }" +
                                    ".bridge { visibility: collapsed  }";
                            console.log("App is already Connected to bridge.");
                            console.log(userResult.toString().split('"')[5]);
                            applicationSettings.setString("apiKey", userResult.toString().split('"')[5]);
                        }
                    });
                }, 5000);
            });
        });
    }
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
    if (applicationSettings.getString("createdID") === undefined) {
        applicationSettings.setString("createdID", createAppID());
    }
    return http.request({
        url: "http://" + ip + "/api/" + applicationSettings.getString("createdID"),
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
function createNewConnection(ip) {
    return http.request({
        url: "http://" + ip + "/api/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ "devicetype": "HauntedHue#device" })
    }).then(function (response) {
        //result = response.content.toJSON();
        //console.log(response.content.toString());
        return response.content;
    }, function (e) {
        console.log("Error occurred " + e);
    });
}
function getHueBridgeInfo() {
    return http.request({
        url: "http://" + applicationSettings.getString("ipAddress") + "/api/" + applicationSettings.getString("apiKey") + "/",
        method: "GET" }).then(function (response) {
        return response;
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
getHueBridgeInfo().then(function (result) {
    // amount of lights in bridge
    applicationSettings.setString("totalLights", Object.keys(result.content.toJSON()["lights"]).length.toString());
    //console.log(applicationKey);
    // bulb names in bridge
    var lightsArray = [];
    // todo: also place this in application settings
    var lightsArraySelected = ["map_Starts_At_One_Not_Zero", 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    var configuredLightsID = [];
    var configuredLightsName = [];
    Object.keys(result.content.toJSON()["lights"]).map(function (k) {
        lightsArray.push([k, result.content.toJSON()["lights"][k]["name"], lightsArraySelected[k]]);
    });
    for (var i = 0; i < lightsArray.length; i++) {
        if (lightsArray[i][2] == 1) {
            //console.log(lightsArray[i][0]);
            configuredLightsID.push(lightsArray[i][0]);
        }
        configuredLightsName.push(lightsArray[i][1]);
        applicationSettings.setString("targetLights", configuredLightsID.toString());
        applicationSettings.setString("nameOfAllLights", configuredLightsName.toString());
    }
    //applicationSettings.setString("lightsArray", lightsArray);
    //console.log("test");
    // group names in bridge
    /* Object.keys(result.content.toJSON()["groups"]).map(function(k) {
        console.log(result.content.toJSON()["groups"][k]["name"]);
    }); */
    if (applicationSettings.setString("bridgeState") === undefined) {
        applicationSettings.setString("bridgeState", result);
    }
});
function connect(page) { runConfig(page); }
exports.connect = connect;
//export function ip() { return findIP(); }
exports.ip = applicationSettings.getString("ipAddress");
exports.apiKey = applicationKey;
exports.bridgeState = applicationSettings.getString("bridgeState");
exports.totalLights = applicationSettings.getString("totalLights");
exports.nameOfAllLights = applicationSettings.getString("nameOfAllLights"); //TODO
exports.targetLights = applicationSettings.getString("targetLights");
var mainList = (function (_super) {
    __extends(mainList, _super);
    function mainList(_page) {
        _super.call(this);
        this.lightList = myItems;
        this.collectItems();
    }
    mainList.prototype.collectItems = function () {
        var name = "";
        for (var i = 0; i < parseInt(exports.totalLights); i++) {
            //name = (i+1).toString();
            name = exports.nameOfAllLights.split(',')[i].toString();
            //TODO NAME of lights
            myItems.push({ title: name, id: (i + 1) });
            if (exports.targetLights.indexOf(myItems.getItem(i).id) > -1) {
                //console.log(myItems.getItem(i).title + "checked ");
                myItems.getItem(i).title = myItems.getItem(i).title + " [checked]";
            }
        }
    };
    mainList.prototype.lightListTap = function (args) {
        console.log(args.index + 1);
        console.log(exports.nameOfAllLights.split(',')[args.index].toString());
    };
    return mainList;
}(observable_1.Observable));
exports.mainList = mainList;
//# sourceMappingURL=config.js.map