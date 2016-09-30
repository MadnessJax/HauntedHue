"use strict";
var observable_1 = require('data/observable');
var http = require("http");
var LivingSceneModel = (function (_super) {
    __extends(LivingSceneModel, _super);
    function LivingSceneModel() {
        _super.call(this);
        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }
    Object.defineProperty(LivingSceneModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange('message', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LivingSceneModel.prototype, "someProperty", {
        get: function () {
            return "testing";
        },
        enumerable: true,
        configurable: true
    });
    LivingSceneModel.prototype.setOn = function () {
        /*
          http.request({
              url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights/9",
              method: "GET" }).then(function (response) {
              //// Argument (response) is HttpResponse!
              //// Content property of the response is HttpContent!
      
              //str = response.content.toString();
              //obj = response.content.toJSON();
              //img = response.content.toImage();
      
          }, function (e) {
              //// Argument (e) is Error!
          });
          */
        http.request({
            url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights/9/state",
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ "on": true })
        }).then(function (response) {
            //var result = response.content.toJSON();
            //alert(result);
        }, function (e) {
            // console.log("Error occurred " + e);
        });
    };
    LivingSceneModel.prototype.setOff = function () {
        http.request({
            url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/lights/9/state",
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ "on": false })
        }).then(function (response) {
            //var result = response.content.toJSON();
            //alert(result);
        }, function (e) {
            // console.log("Error occurred " + e);
        });
    };
    LivingSceneModel.prototype.onTap = function () {
        this._counter--;
        this.updateMessage();
    };
    LivingSceneModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    return LivingSceneModel;
}(observable_1.Observable));
exports.LivingSceneModel = LivingSceneModel;
//# sourceMappingURL=main-view-model.js.map