"use strict";
var main_view_model_1 = require('./models/main-view-model');
var config_1 = require("./config");
var config_2 = require("./config");
// Event handler for Page "pageLoaded" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.mainViewModel(page);
    config_1.listRender(args);
}
exports.pageLoaded = pageLoaded;
exports.onTap = config_2.listEvents;
//# sourceMappingURL=main-page.js.map