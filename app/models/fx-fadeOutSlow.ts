import {Observable} from 'data/observable';
import http = require("http");

import { RGB } from "../libs/color-converter";

var sound = require("nativescript-sound");


function FirstEffectModel() {

  console.log("poep !!!!!");

  var lightsAmount : number;
  var obj;
  var tada : any;



    var _this = this;
    
    obj = { "on": true };
    Data().then(function(res){ _this.lightsAmount = Object.keys(res).length; });

    tada = sound.create("~/mp3/horror.mp3"); // preload the audio file 

          setTimeout(function(){
              tada.play();
          }, 200);

            var tester = setInterval(function(){
               runFX("fadeOutSlow", {"speed" : 1});
            }, 2500);

            setTimeout(function(){
            clearInterval(tester);
             runFX("fadeOutSlow", {"speed" : 1});
             tada.stop();
            }, 50000); // see mp3 length


  function runFX(type, options) {
      if(type == "fadeOutSlow") {
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
    }
  }
  

  function Data() {
  function lights () {
    return http.request({
      url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights", 
      method: "GET" }).then(function (response) {
      return response.content.toJSON();
    });
  }
  return lights();
}

function setOn(query, obj) {

if(obj.on === undefined){
  obj = { "on": true }
}else{
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

}

export function test() { FirstEffectModel(); }