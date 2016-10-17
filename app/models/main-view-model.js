"use strict";
var observable_1 = require('data/observable');
var http = require("http");
var config_1 = require("../config");
var config_2 = require("../config");
var fx_fadeInSlow_1 = require("./fx-fadeInSlow");
var fx_flashFXMulti_1 = require("./fx-flashFXMulti");
var mp3_horror_1 = require("./mp3-horror");
var config_3 = require("../config");
var LivingSceneModel = (function (_super) {
    __extends(LivingSceneModel, _super);
    function LivingSceneModel() {
        _super.call(this);
        //console.log(apiKey);        
    }
    LivingSceneModel.prototype.runGet = function () {
        return http.request({
            url: "http://" + config_1.ip + "/" + config_2.apiKey,
            method: "GET" }).then(function (response) {
            return response.content.toString();
        });
    };
    LivingSceneModel.prototype.btnConfig = function () {
        config_3.connect();
    };
    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/
    // TODO add target option to all functions 
    LivingSceneModel.prototype.btnIntenseHorror = function () {
        this.keyCheck();
        //fxflashFX         ({  "start" : 2000}, 5000);  
        //fXfadeOutSlow     ({  "start" : 0,        "speed" : 50     }, 50000); //speed is 50 == 5 seconde
        fx_fadeInSlow_1.fxfadeInSlow({ "start": 2800, "interval": 3150, "speed": 2 }, 15000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 14767, "amount": 2 }, 50000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 15767, "amount": 2 }, 50000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 16767, "amount": 2 }, 50000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 18767, "amount": 2 }, 50000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 19767, "amount": 2 }, 50000);
        fx_flashFXMulti_1.fxflashFXMulti({ "start": 20767, "amount": 2 }, 50000);
        //fxflashFXMulti    ({  "start" : 16000,    "amount": 2     }, 50000);
        //fxfadeInOutLoop   ({  "start" : 5000,     "loop"  : 30,   "speed" : 2.5   }, 6000);
        mp3_horror_1.mp3IntenseHorror();
    };
    LivingSceneModel.prototype.keyCheck = function () {
        if (config_2.apiKey === undefined) {
            alert("Run Configuration first!");
        }
    };
    return LivingSceneModel;
}(observable_1.Observable));
exports.LivingSceneModel = LivingSceneModel;
//# sourceMappingURL=main-view-model.js.map