import {Observable} from 'data/observable';

import http = require("http");

var applicationSettings = require("application-settings");
var applicationKey = applicationSettings.getString("apiKey");

function runConfig() {
    console.log(applicationSettings.getString("ipAddress"));
    
    console.log(applicationSettings.getString("apiKey"));
    if(applicationSettings.getString("apiKey") === undefined){
        findIP().then(function(res){
            // major todo add more logic for detection this is simple N-UPnP.
            // see for more info: http://www.developers.meethue.com/documentation/hue-bridge-discovery
            var ip = res.replace("[{", "").replace("}]", "").replace(/"/g, '').split(":")[2];

            if(applicationSettings.getString("ipAddress") === undefined) {
                applicationSettings.setString("ipAddress", ip);
            }

            createConnection(ip).then(function(res2){
                //console.log(res2);
                var checkConnection = setInterval (function() {
                    createNewConnection().then(function(userResult) {
                        if(userResult.toString().indexOf("link button not pressed") > 0){
                            console.log("Not Connected Yet. Hit Hue Bridge Too Connect App. And Wait");
                        }else{
                            clearInterval(checkConnection);
                            console.log("App is already Connected to bridge");
                            console.log(userResult.toString().split('"')[5]);
                            applicationSettings.setString("apiKey", userResult.toString().split('"')[5]);
                        }
                    });
                }, 15000);

            });

            // getHueBridgeInfo(ip).then(function(result){
            //    if(applicationSettings.setString("bridgeState") === undefined){
            //        applicationSettings.setString("bridgeState", result);
            //    }
            //});
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
    
        if(applicationSettings.getString("createdID") === undefined) {
            applicationSettings.setString("createdID", createAppID());
        }
    
    return http.request({
        url: "http://" + ip + "/api/" + applicationSettings.getString("createdID"), 
        method: "GET" }).then(function (response) {
        return response.content.toString();
    });
}
    function createAppID(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


function createNewConnection() {
    return http.request({
        url: "http://" + ip + "/api/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({"devicetype":"HauntedHue#device"}) 
    }).then(function (response) {
         //result = response.content.toJSON();
            //console.log(response.content.toString());
        return response.content;
    }, function (e) {
         console.log("Error occurred " + e);
    });
}





/*if user already has connection use localstoren here instead of tmp*/
function getHueBridgeInfo(ip){
    return http.request({
        url: "http://"+ip+"/api/"+ applicationSettings.getString("apiKey") + "/", 
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


export function connect() { runConfig(); }
//export function ip() { return findIP(); }
export const ip = applicationSettings.getString("ipAddress");
export const apiKey = applicationKey;



