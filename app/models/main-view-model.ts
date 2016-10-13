import {Observable} from 'data/observable';
import http = require("http");
import { ip } from "../config";

import  { fxflashFX } from "./fx-flashFX";
import  { fXfadeOutSlow } from "./fx-fadeOutSlow";
import  { fxfadeInSlow } from "./fx-fadeInSlow";
import  { fxflashFXMulti } from "./fx-flashFXMulti";
import  { fxfadeInOutLoop } from "./fx-fadeInOutLoop";
import  { mp3IntenseHorror } from "./mp3-horror";

import { connect } from "../config";
 

export class LivingSceneModel extends Observable {
    
    constructor() {
        super();
    }

    private runGet(){
        return http.request({
            url: "http://"+ ip +"/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/", 
            method: "GET" }).then(function (response) {
             return response.content.toString();
        });
    }


    public btnConfig() {
        connect();
    }

    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/

    // TODO add target option to all functions 
    public btnIntenseHorror(){
        fxflashFX            ({  "start" : 2000}, 5000);
        //fXfadeOutSlow     ({  "start" : 0,        "speed" : 1     }, 50000);
        //fxfadeInSlow      ({  "start" : 3000,     "speed" : 50    }, 50000); //speed is 50 == 5 seconde
        //fxflashFXMulti    ({  "start" : 13000,    "amount": 2     }, 50000);
        //fxflashFXMulti    ({  "start" : 16000,    "amount": 2     }, 50000);
        //fxfadeInOutLoop   ({  "start" : 5000,     "loop"  : 30,   "speed" : 2.5   }, 6000);
        mp3IntenseHorror();
    }
}