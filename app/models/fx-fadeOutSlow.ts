import {Observable} from 'data/observable';
import http = require("http");
import { RGB } from "../libs/color-converter";

function runFXmain(options, callback) {
    var lightsAmount : number;
    var obj;

    var _this = this;

    obj = { "on": true };
    
    var tester = setInterval(function(){
        runFX(options);
    }, options.interval);
        
    function runFX(options) {
        //if(type == "fadeOutSlow") {
        let fadeOutSlow = [
            { "on" : true,  "bri": 150, "transitiontime": 0,  "sat": 254, xy: RGB(255, 186, 0) },
            { "on" : false,  "bri": 1,   "transitiontime": options.speed,    "sat": 254, xy: RGB(0, 0, 75) }
        ];
            for(let i = 0; i < fadeOutSlow.length; i++){
                let _this = this;
                setTimeout(function(){
                    setOn("/lights/9/state", fadeOutSlow[i]);
                }, i * 300);
            }
        //}
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
    
    setTimeout(function(){
        clearInterval(tester);
    }, callback);
}

export function fXfadeOutSlow(_options, _callback) { runFXmain(_options, _callback); }