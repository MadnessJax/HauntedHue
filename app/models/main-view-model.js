"use strict";
var observable_1 = require('data/observable');
var config_1 = require("../config");
//import { targetLights } from "../config";
var fx_flashFX_1 = require("./fx-flashFX");
var fx_fadeOutSlow_1 = require("./fx-fadeOutSlow");
var fx_fadeInSlow_1 = require("./fx-fadeInSlow");
var fx_flashFXMulti_1 = require("./fx-flashFXMulti");
var config_2 = require("../config");
var imageModule = require("ui/image");
var activityIndicatorModule = require("ui/activity-indicator");
var applicationSettings = require("application-settings");
var targetLights;
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
        targetLights = global.lightsIdUsed;
        // Bind the busy property of the indicator to the isLoading property of the image
        indicator.bind({
            sourceProperty: "isLoading",
            targetProperty: "busy"
        }, image);
        //this.page.css = ".spinner { visibility: collapsed }";
    }
    mainViewModel.prototype.listViewItemTap = function (args) {
        // Expand your collection bound to the ListView with more items here!
        console.log(args.object);
        for (var a in args) {
            console.log(a);
        }
    };
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
        //applicationSettings.clear(); 
    };
    /*---------------------------------------------------------------------

    [ How Effect Functions Work ]

        1.) call function
        2.) first: parameter options object
        3.) second parameter is stop function callback (milliseconds)

    ---------------------------------------------------------------------*/
    // TODO add target option to all functions 
    // done for: 
    // * fxfadeInSlow
    // * fxflashFXMulti
    // * 
    mainViewModel.prototype.btnIntenseHorror = function () {
        targetLights = global.lightsIdUsed;
        if (config_1.apiKey === undefined || config_1.apiKey === "description") {
            config_2.connect(this.page);
        }
        else {
            if (targetLights.length == 0) {
                alert("no lights selected");
            }
            else {
                // console.log("targets: " + targetLights); //observable array
                // base: randomiser: var rand = myArray[Math.floor(Math.random() * myArray.length)];
                var randfxfadeInSlow = targetLights[Math.floor(Math.random() * targetLights.length)];
                var randfxflashFXMulti = targetLights[Math.floor(Math.random() * targetLights.length)];
                fx_flashFX_1.fxflashFX({ "start": 2000 }, 5000);
                fx_fadeOutSlow_1.fXfadeOutSlow({ "start": 0, "speed": 50 }, 50000); //speed is 50 == 5 seconde
                fx_fadeInSlow_1.fxfadeInSlow({ "start": 2800, "interval": 3150, "speed": 2, "target": randfxfadeInSlow }, 15000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 14767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 15767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 16767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 18767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 19767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 20767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 22767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 23767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 24767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 26767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 27767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 28767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 30767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 31767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 32767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 34767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 35767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 36767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 38767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 39767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 40767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 42767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 43767, "amount": 2, "target": randfxflashFXMulti }, 50000);
                fx_flashFXMulti_1.fxflashFXMulti({ "start": 44767, "amount": 2, "target": randfxflashFXMulti }, 50000);
            }
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