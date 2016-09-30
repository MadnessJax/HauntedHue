var Clicker = function(resource) {
    var soundPath = NSBundle.mainBundle().pathForResourceOfType("~/"+resource, "mp3");
    var soundUrl = NSURL.fileURLWithPath(soundPath);
    var player = AVAudioPlayer.alloc().initWithContentsOfURLError(soundUrl, null);
    player.prepareToPlay();


        player.currentTime = 0.0;
        player.play();
console.log("test");
};


exports.create = function(path) {
    return new Clicker(path);
};