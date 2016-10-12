import {Observable} from 'data/observable';
import http = require("http");
import { RGB } from "../libs/color-converter";

function runFXmain(options, callback) {
    var lightsAmount : number;
    var obj;

    var _this = this;

    obj = { "on": true };
    
    //var tester = setInterval(function(){
    //    runFX(options);
    //}, options.interval);
       
    setTimeout(function(){
        runFX(options);
    }, options.start);
    
    function runFX(options) {
        var flashFX = [
          { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
          { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 } ,
          { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
          { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 },
          { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
          { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 }
        ];

          for(let i = 0; i < flashFX.length; i++){
            setTimeout(function(){
              setOn("/lights/"+ options.amount +"/state", flashFX[i]);
            }, i * 100);
          }
    }

    function setOn(query, obj) {
        if(obj.on === undefined){
            obj = { "on": true }
        }
        else{
            obj = obj
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

export function fxflashFXMulti(_options, _callback) { runFXmain(_options, _callback); }