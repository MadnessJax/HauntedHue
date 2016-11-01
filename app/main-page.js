"use strict";
var main_view_model_1 = require('./models/main-view-model');
var config_1 = require('./config');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.mainViewModel(page);
    page.bindingContext = new config_1.mainList(page);
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map