import {Observable} from 'data/observable';

import http = require("http");
var sound = require("nativescript-sound");

import  { test } from "./fx-fadeOutSlow";

export class LivingSceneModel extends Observable {

  private _counter: number;
  private _message: string;
  private _someProperty: string;

  private obj;

  private lightsAmount : number;

  private tada : any;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();

    this.runGet().then(function(res){
      console.log("\n ======= BEGIN : SHOW API DATA: ========");
      console.log(res);
      console.log("\n ======= END   : SHOW API DATA: ========");
    });

    var _this = this;
    this.obj = { "on": true };
    this.Data().then(function(res){ _this.lightsAmount = Object.keys(res).length; });

    this.tada = sound.create("~/mp3/horror.mp3"); // preload the audio file 
  }

  private runGet(){
    return http.request({
        url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/", 
        method: "GET" }).then(function (response) {
         return response.content.toString();
    });
  }

  get message(): string {
    return this._message;
  }
  
  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value)
    }
  }


  set someProperty(_res: string) {
    this._someProperty = _res;
  }

  get someProperty(): string {
    return this._someProperty;
  }

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

public FX(){
  var options : any[];
  var _this = this;
  // TODO add target option to all functions


// play the sound (i.e. tap event handler) 

          //setTimeout(function(){
          //    _this.tada.play();
          //}, 200);

  //this.runFX("flashFX", {});
  //this.runFX("flashFXMulti", {"amount" : Math.floor(Math.random() * this.lightsAmount) + 1});
  //this.runFX("fadeInOutLoop", {"loop" : 6, "speed": 2.5}); //6 times == 6 seconds in total
  //this.runFX("fadeInSlow", {}); 
  
  //tmp test settimeout

            // var tester = setInterval(function(){
            //   _this.runFX("fadeOutSlow", {"speed" : 1});
            // }, 2500);
            
            // setTimeout(function(){
            //   clearInterval(tester);
            //   _this.runFX("fadeOutSlow", {"speed" : 1});
            //   _this.tada.stop();
            // }, 50000); // see mp3 length

test();

}



/**
 * Effects Library 
 */
public runFX(type, options) {

  // ---------------------- EFFECT ----------------------
  /* if(type == "flashFX") {
    var flashFX = [
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 } ,
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 },
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 }
    ];
      for(let i = 0; i < flashFX.length; i++){
        let _this = this;
        setTimeout(function(){
          _this.setOn("/lights/9/state", flashFX[i]);
        }, i * 100);
      }
  } */

  // ---------------------- EFFECT ----------------------
  if(type == "flashFXMulti", options) {
    var flashFX = [
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 } ,
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 },
      { "on" : true,  "bri": 150,   "transitiontime": 0,   "sat" : 0 },
      { "on" : false, "bri": 0,     "transitiontime": 0,   "sat" : 0 }
    ];
    
      for(let i = 0; i < flashFX.length; i++){
        let _this = this;
        setTimeout(function(){
          _this.setOn("/lights/"+ options.amount +"/state", flashFX[i]);
        }, i * 100);
      }
  }
  
  // ---------------------- EFFECT ----------------------
  if(type == "fadeInSlow") {
      let fadeInSlow = [
        { "on" : true, "bri": 1,   "transitiontime": 0,    "sat": 254, xy: this.RGB(0, 0, 75) },
        { "on" : true,  "bri": 150, "transitiontime": options.speed,  "sat": 254, xy: this.RGB(255, 186, 0) }
      ];
      for(let i = 0; i < fadeInSlow.length; i++){
        let _this = this;
        setTimeout(function(){
          _this.setOn("/lights/9/state", fadeInSlow[i]);
        }, i * 300);
      }
  }

  // ---------------------- EFFECT ----------------------
  if(type == "fadeOutSlow") {
      let fadeOutSlow = [
        { "on" : true,  "bri": 150, "transitiontime": 0,  "sat": 254, xy: this.RGB(255, 186, 0) },
        { "on" : false,  "bri": 1,   "transitiontime": options.speed,    "sat": 254, xy: this.RGB(0, 0, 75) }
      ];
      for(let i = 0; i < fadeOutSlow.length; i++){
        let _this = this;
        setTimeout(function(){
          _this.setOn("/lights/9/state", fadeOutSlow[i]);
        }, i * 300);
      }
  }

  // ---------------------- EFFECT ----------------------
  if(type == "fadeInOutLoop") {
    let fadeInOutLoop = [];

    // total of 500 ms
    let animation = [ 
      { "on" : true, "bri": 150,  "transitiontime": Math.round(options.speed),  "sat": 254, xy: this.RGB(255, 186, 0) },
      { "on" : true,  "bri": 1,   "transitiontime": Math.round(options.speed),  "sat": 254, xy: this.RGB(255, 186, 0) },
      { "on" : true,  "bri": 150, "transitiontime": Math.round(options.speed),  "sat": 254, xy: this.RGB(255, 186, 0) },
      { "on" : true,  "bri": 1,   "transitiontime": Math.round(options.speed),  "sat": 254, xy: this.RGB(255, 186, 0) }
    ]; // 1000 ms per transition see 10*100
    for(let i = 0; i < options.loop; i++){
      fadeInOutLoop.push(animation);
    }
    for(let i = 0; i < fadeInOutLoop.length; i++){
      let _this = this;
      setTimeout(function() {
        for(let i = 0; i < animation.length; i++){
          setTimeout(function(){
            console.log(i + animation[i].bri.toString());
            _this.setOn("/lights/9/state", animation[i]);
          }, i * (options.speed*100));
        }
      }, i * 400);
    }
  }

}



public setOn(query, obj) {

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

  public setOff() {
    http.request({
      url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights/9/state",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({ "on": false})
    }).then(function (response) {
        // alert(response);
    }, function (e) {
        // console.log("Error occurred " + e);
    });
  }

  public onTap() {
    this._counter--;
    this.updateMessage();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }

  public RGB(red,green,blue){
    //Gamma correctie
    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);
    
    //Apply wide gamut conversion D65
    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
    
    var fx = X / (X + Y + Z);
    var fy = Y / (X + Y + Z);
    if (isNaN(fx)) {
        fx = parseFloat("0.0f");
    }
    if (isNaN(fy)) {
        fy = parseFloat("0.0f");
    }
    
    return [parseFloat(fx.toPrecision(4)),parseFloat(fy.toPrecision(4))];
  }
}