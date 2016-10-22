import {Observable} from 'data/observable';
import http = require("http");
import { ip } from "../config";
import { apiKey } from "../config";

import  { fxflashFX } from "./fx-flashFX";
import  { fXfadeOutSlow } from "./fx-fadeOutSlow";
import  { fxfadeInSlow } from "./fx-fadeInSlow";
import  { fxflashFXMulti } from "./fx-flashFXMulti";
import  { fxfadeInOutLoop } from "./fx-fadeInOutLoop";
import  { mp3IntenseHorror } from "./mp3-horror";

import { connect } from "../config";
         
import imageModule = require("ui/image");
import LabelModule = require("ui/label");
import activityIndicatorModule = require("ui/activity-indicator");

var applicationSettings = require("application-settings");


export class mainViewModel extends Observable {
    
    public page;
    
    
    constructor(_page) {
        super();
                                   
        this.page = _page;
        //console.log(apiKey);   
                var indicator = new activityIndicatorModule.ActivityIndicator(); 
        var image = new imageModule.Image();
                image.src = "http://download.thinkbroadband.com/1GB.zip?test";
        var indicator = new activityIndicatorModule.ActivityIndicator();


        // Bind the busy property of the indicator to the isLoading property of the image
        indicator.bind({
            sourceProperty: "isLoading",
            targetProperty: "busy"
        }, image);
        
        //this.page.css = ".spinner { visibility: collapsed }";
    }

    /* private runGet(){
        return http.request({
            url: "http://"+ ip +"/" + apiKey, 
            method: "GET" }).then(function (response) {
             return response.content.toString();
        });
    } */


    public btnConfig() {
        //connect(_page);
        //Manual config
        applicationSettings.clear();
    }

    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/

    // TODO add target option to all functions 
    
    
    
    
    public btnIntenseHorror() {
        if(apiKey === undefined || apiKey === "description") {
            connect(this.page);
        } else {
            //fxflashFX         ({  "start" : 2000}, 5000);  
            //fXfadeOutSlow     ({  "start" : 0,        "speed" : 50     }, 50000); //speed is 50 == 5 seconde
            fxfadeInSlow      ({  "start" : 2800,     "interval" : 3150,    "speed" : 2  }, 15000);
            fxflashFXMulti    ({  "start" : 14767,    "amount": 2     }, 50000);
            fxflashFXMulti    ({  "start" : 15767,    "amount": 2     }, 50000);
            fxflashFXMulti    ({  "start" : 16767,    "amount": 2     }, 50000);

            fxflashFXMulti    ({  "start" : 18767,    "amount": 2     }, 50000);
            fxflashFXMulti    ({  "start" : 19767,    "amount": 2     }, 50000);
            fxflashFXMulti    ({  "start" : 20767,    "amount": 2     }, 50000);


            //fxflashFXMulti    ({  "start" : 16000,    "amount": 2     }, 50000);
            //fxfadeInOutLoop   ({  "start" : 5000,     "loop"  : 30,   "speed" : 2.5   }, 6000);
            mp3IntenseHorror();
        }
    }
    
    
    
    
    public keyCheck(_page) {
        console.log("apiKey: " + apiKey);
        if(apiKey === undefined || apiKey === "description") {
            connect(_page);
        }
    }
    
}