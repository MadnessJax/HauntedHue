"use strict";
var sound = require("nativescript-sound");
//bug, make sure this var is never in playAudio function.
var audio;
function playAudio() {
    // preload the audio file 
    audio = sound.create("~/mp3/intense-horror.mp3");
    setTimeout(function () {
        audio.play();
    }, 200);
}
function mp3IntenseHorror() { playAudio(); }
exports.mp3IntenseHorror = mp3IntenseHorror;
//# sourceMappingURL=mp3-horror.js.map