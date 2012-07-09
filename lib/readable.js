var stream = require("stream");
var shared = require("./shared");
var _      = require("UnderscoreKit")._;

var _augmentedEvents = ["data", "end"];

var _pause = function() {
    // nothing to do now
};

var _resume = function() {
    // nothing to do now
};

var _destroy = function() {
    this.readable = false;
};

var _pipe = stream.prototype.pipe;

var exports = module.exports = function(channel) {
    // setup shared listeners that readable and writable streams have in common
    shared.addListeners(channel);
    // setup the event relay
    channel.on("message", _.bind(shared.eventRelay, channel, _augmentedEvents));
    // set readable flag and bind readable functions
    channel.readable = true;
    channel.pause    = _pause;
    channel.resume   = _resume;
    channel.destroy   = _destroy;
    channel.pipe     = _pipe;
    return channel;
};
