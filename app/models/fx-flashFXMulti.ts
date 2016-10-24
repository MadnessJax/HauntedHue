import {Observable} from 'data/observable';
import http = require("http");
import { RGB } from "../libs/color-converter";
import { setOn } from "../libs/api-seton";

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
              setOn("/lights/"+ options.target +"/state", flashFX[i]);
            }, i * 100);
          }
    }
    
    //setTimeout(function(){
    //    clearInterval(tester);
    //}, callback);
}

export function fxflashFXMulti(_options, _callback) { runFXmain(_options, _callback); }