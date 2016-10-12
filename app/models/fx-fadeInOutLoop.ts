import {Observable} from 'data/observable';
import http = require("http");
import { RGB } from "../libs/color-converter";

function runFXmain(options, callback) {
    var lightsAmount : number;
    var obj;
    obj = { "on": true };
    
    //var tester = setInterval(function(){
    //    runFX(options);
    //}, options.interval);
       
    setTimeout(function(){
        runFX(options);
    }, options.start);
    
    function runFX(options) {
        let fadeInOutLoop = [];

        // total of 500 ms
        let animation = [ 
          { "on" : true, "bri": 150,  "transitiontime": Math.round(options.speed),  "sat": 254, xy: RGB(255, 186, 0) },
          { "on" : true,  "bri": 1,   "transitiontime": Math.round(options.speed),  "sat": 254, xy: RGB(255, 186, 0) },
          { "on" : true,  "bri": 150, "transitiontime": Math.round(options.speed),  "sat": 254, xy: RGB(255, 186, 0) },
          { "on" : true,  "bri": 1,   "transitiontime": Math.round(options.speed),  "sat": 254, xy: RGB(255, 186, 0) }
        ]; // 1000 ms per transition see 10*100
        for(let i = 0; i < options.loop; i++){
          fadeInOutLoop.push(animation);
        }
        for(let i = 0; i < fadeInOutLoop.length; i++){
          setTimeout(function() {
            for(let i = 0; i < animation.length; i++){
              setTimeout(function(){
                console.log(i + animation[i].bri.toString());
                setOn("/lights/4/state", animation[i]);
              }, i * (options.speed*100));
            }
          }, i * 400);
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

export function fxfadeInOutLoop(_options, _callback) { runFXmain(_options, _callback); }