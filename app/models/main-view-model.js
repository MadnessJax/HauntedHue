"use strict";
var observable_1 = require('data/observable');
var config_1 = require("../config");
var fx_fadeInSlow_1 = require("./fx-fadeInSlow");
var fx_flashFXMulti_1 = require("./fx-flashFXMulti");
var mp3_horror_1 = require("./mp3-horror");
var config_2 = require("../config");
var imageModule = require("ui/image");
var activityIndicatorModule = require("ui/activity-indicator");
var applicationSettings = require("application-settings");
var mainViewModel = (function (_super) {
    __extends(mainViewModel, _super);
    function mainViewModel(_page) {
        _super.call(this);
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
    mainViewModel.prototype.btnConfig = function () {
        //connect(_page);
        //Manual config
        applicationSettings.clear();
    };
    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/
    // TODO add target option to all functions 
    mainViewModel.prototype.btnIntenseHorror = function () {
        if (config_1.apiKey === undefined || config_1.apiKey === "description") {
            config_2.connect(this.page);
        }
        else {
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
        }
    };
    mainViewModel.prototype.keyCheck = function (_page) {
        console.log("apiKey: " + config_1.apiKey);
        if (config_1.apiKey === undefined || config_1.apiKey === "description") {
            config_2.connect(_page);
        }
    };
    return mainViewModel;
}(observable_1.Observable));
exports.mainViewModel = mainViewModel;
//# sourceMappingURL=main-view-model.js.map