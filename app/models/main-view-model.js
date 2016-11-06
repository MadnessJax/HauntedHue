"use strict";
var observable_1 = require('data/observable');
var config_1 = require("../config");
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
        if (config_1.apiKey === undefined || config_1.apiKey === "description") {
            config_2.connect(this.page);
        }
        else {
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