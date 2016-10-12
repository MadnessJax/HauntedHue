"use strict";
var observable_1 = require('data/observable');
var http = require("http");
var fx_flashFX_1 = require("./fx-flashFX");
var mp3_horror_1 = require("./mp3-horror");
var config_1 = require("../config");
var LivingSceneModel = (function (_super) {
    __extends(LivingSceneModel, _super);
    function LivingSceneModel() {
        _super.call(this);
    }
    LivingSceneModel.prototype.runGet = function () {
        return http.request({
            url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/",
            method: "GET" }).then(function (response) {
            return response.content.toString();
        });
    };
    LivingSceneModel.prototype.btnConfig = function () {
        config_1.connect();
    };
    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/
    // TODO add target option to all functions 
    LivingSceneModel.prototype.btnIntenseHorror = function () {
        fx_flashFX_1.fxflashFX({ "start": 2000 }, 5000);
        // fXfadeOutSlow     ({  "start" : 0,        "speed" : 1     }, 50000);
        // fxfadeInSlow      ({  "start" : 3000,     "speed" : 50    }, 50000); //speed is 50 == 5 seconde
        // fxflashFXMulti    ({  "start" : 13000,    "amount": 2     }, 50000);
        // fxflashFXMulti    ({  "start" : 16000,    "amount": 2     }, 50000);
        // fxfadeInOutLoop   ({  "start" : 5000,     "loop"  : 30,   "speed" : 2.5   }, 6000);
        mp3_horror_1.mp3IntenseHorror();
    };
    return LivingSceneModel;
}(observable_1.Observable));
exports.LivingSceneModel = LivingSceneModel;
//# sourceMappingURL=main-view-model.js.map