import {Observable} from 'data/observable';


import http = require("http");

var applicationSettings = require("application-settings");
var applicationKey = applicationSettings.getString("apiKey");

import dialogs = require("ui/dialogs");

var observableArray = require("data/observable-array");
var myItems = new observableArray.ObservableArray();
import {ListView, ItemEventData} from "ui/list-view";

var listView = new observableArray.ObservableArray();

import { EventData } from 'data/observable';

import observable = require("data/observable");
import pageModule = require("ui/page");

var view = require("ui/core/view");

var labelModule = require("ui/label");



function runConfig(page) {
    //console.log(applicationSettings.getString("ipAddress"));
    //console.log(applicationSettings.getString("apiKey"));
    
    if(applicationSettings.getString("apiKey") === undefined || applicationSettings.getString("apiKey") === "description"){
        
        page.css = 
            "Button { visibility: collapsed }" + 
            ".spinner{ visibility: visible }" + 
            ".bridge { visibility: visible  }";
        
        findIP().then(function(res){
            // major todo add more logic for detection this is simple N-UPnP.
            // see for more info: http://www.developers.meethue.com/documentation/hue-bridge-discovery
            var ip = res.replace("[{", "").replace("}]", "").replace(/"/g, '').split(":")[2];

            if(applicationSettings.getString("ipAddress") === undefined) {
                applicationSettings.setString("ipAddress", ip);
            }
            
            createConnection(ip).then(function(res2){
                
                var checkConnection = setInterval (() => {
                    createNewConnection(ip).then((userResult) => {
                        if(userResult.toString().indexOf("link button not pressed") > 0){
                            
                            page.css = 
                                ".btn { visibility: collapsed }" + 
                                ".spinner{ visibility: visible }" + 
                                ".bridge { visibility: visible  }";
                            
                            console.log("Not Connected Yet. Hit Hue Bridge Too Connect App. And Wait");
                            

                            /* page.css = "button { visibility: collapsed }";
                                dialogs.action({
                                message: "HauntedHouse found no existing connection. Please Hit the Button On Your Hue Bridge.",
                                cancelButtonText: "Cancel",
                                actions: ["Continue (recommended)", "Manual IP (reset all values)"]
                            }).then(result => {

                                setTimeout(() => {
                                    page.css = "button { visibility: visible }";
                                    page.css = ".spinner { visibility: collapsed }";

                                    if (result == "Manual IP (reset all values)"){
                                        applicationSettings.clear();
                                    }

                                }, 5000); 
                                console.log("Dialog result: " + result);
                            });*/
                            
                        }else{
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


function createNewConnection(ip) {
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


function getHueBridgeInfo(){ 
    return http.request({
        url: "http://" + applicationSettings.getString("ipAddress") + "/api/"+ applicationSettings.getString("apiKey") + "/", 
        method: "GET" }).then(function (response) {
    return response;
    });
}


var firstLoad = true;
var page;
var pageArgs;
var lightsAmount = 0;
var lightsObjectAll = [];

global.lightsIdUsed = new observableArray.ObservableArray();
var lightsNameUsed= [0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //todo

//var check = String.fromCharCode(0xf00c);
var check = "";


export function listRender(args) {
    
    console.log("listrender");

   // alert("test");
    page = args.object;
    pageArgs = args;
    //global = "global ajustted";

    //viewModel.set("test", "Test for parent binding!");

    var result;
    
        getHueBridgeInfo().then(function(_result){
        console.log("run bridge info");
            result = _result;
            global.lightsIdUsed = [];    
            
            
        if (firstLoad) { 
            lightsAmount = Object.keys(result.content.toJSON()["lights"]).length;
            console.log("1.memory: " + applicationSettings.getString("targetLights"));
            Object.keys(result.content.toJSON()["lights"]).map(function(k) {
                lightsObjectAll.push({id: k, title: result.content.toJSON()["lights"][k]["name"], active: 0, lightIcon: ""});
                
                console.log("2.memory: " + applicationSettings.getString("targetLights"));
                var i = parseInt(k);
                applicationSettings.setString("targetLights", ""); //set default
                if(applicationSettings.getString("targetLights") !== undefined || applicationSettings.getString("targetLights") !== "") {
                    //try{
                        if(applicationSettings.getString("targetLights").indexOf(lightsObjectAll[i-1].id) > -1){
                            lightsObjectAll[i-1].lightIcon = "~/images/check-icon.png"; 
                            //lightsObjectAll[i-1].title = check + lightsObjectAll[i-1].title;
                        }
                    //}catch(err){
                    //    console.log("err: " + err);
                    //}
                    //console.log(global.lightsIdUsed.toString());
                }
            });
            
            //console.log("appdata" + applicationSettings.getString("targetLights")); 
            //console.log("lightsObjectAll: "); 
            //console.log(lightsObjectAll);
            
            page.bindingContext = listView;
            listView.set("lights", lightsObjectAll);
            
            setInterval(() => { //todo fix this?
                page.bindingContext = listView;
                //listView.set("lights", lightsObjectAll);
            }, 2500);

            firstLoad = false;
        }
            //setInterval(() => { //todo fix this?
            var _listView = view.getViewById(page, "listView");
                _listView.refresh();
                console.log("----");
                console.log("refreshing listview");
            //}, 5000);

        Object.keys(result.content.toJSON()["lights"]).map(function(k) {
            var i = parseInt(k);
            if(lightsObjectAll[i-1].lightIcon.indexOf("png") > -1){
                lightsObjectAll[i-1].active = 1;
            }
            else{
                lightsObjectAll[i-1].active = 0;
            }
            
            if(lightsObjectAll[i-1].active == 1) {
                global.lightsIdUsed.push(lightsObjectAll[i-1].id);
            }
            
            //console.log(global.lightsIdUsed.toString());
            
            applicationSettings.setString("targetLights", global.lightsIdUsed.toString()); //todo
        });
            
        console.log("title: ");
        console.log(lightsObjectAll[1].title);
        
        if(applicationSettings.setString("bridgeState") === undefined){ //TODO remove this and always set at load
            applicationSettings.setString("bridgeState", result);
        }

    });
}



// View
export function listEvents(args) {
    //console.log(args.index);
    
    if(lightsObjectAll[args.index].lightIcon.indexOf("png") == -1){
        lightsObjectAll[args.index].lightIcon = "~/images/check-icon.png";
        //lightsObjectAll[args.index].title = check + lightsObjectAll[args.index].title;
        lightsObjectAll[1].active = 1;
    }else{
        lightsObjectAll[args.index].lightIcon = "";
        //lightsObjectAll[args.index].title = lightsObjectAll[args.index].title.split(check)[1];
        lightsObjectAll[1].active = 0;
    }
    
    listRender(pageArgs);
    
    var _listView = view.getViewById(page, "listView");
        _listView.refresh();
    
  /* console.log(listview.ios.indexPathForSelectedRow()); */
}



export function connect(page) { runConfig(page); }
//export function ip() { return findIP(); }
export const ip = applicationSettings.getString("ipAddress");
export const apiKey = applicationKey;
export const bridgeState = applicationSettings.getString("bridgeState");
