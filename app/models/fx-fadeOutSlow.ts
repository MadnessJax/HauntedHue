import {Observable} from 'data/observable';
import http = require("http");
import { RGB } from "../libs/color-converter";
import { setOn } from "../libs/api-seton";

function runFXmain(options, callback) {
    var lightsAmount : number;
    
    setTimeout(function(){
        runFX(options);
    }, options.start);
        
    function runFX(options) {
          let fadeInSlow = [
            { "on" : true, "bri": 1,   "transitiontime": 0,    "sat": 254, xy: RGB(0, 0, 75) },
            { "on" : true,  "bri": 150, "transitiontime": options.speed,  "sat": 254, xy: RGB(255, 186, 0) }
          ];
          for(let i = 0; i < fadeInSlow.length; i++){
            setTimeout(function(){
              setOn("/lights/9/state", fadeInSlow[i]);
            }, i * 300);
          }
    }
    
    //setTimeout(function(){
    //    clearInterval();
    //}, callback);
}

export function fXfadeOutSlow(_options, _callback) { runFXmain(_options, _callback); }