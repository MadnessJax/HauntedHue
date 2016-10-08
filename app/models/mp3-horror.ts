var sound = require("nativescript-sound");

//bug, make sure this var is never in playAudio function.
var audio : any;

function playAudio() {
    
    // preload the audio file 
    audio = sound.create("~/mp3/intense-horror.mp3");

      setTimeout(function(){
          audio.play();
      }, 200);
}

export function mp3IntenseHorror() { playAudio(); }