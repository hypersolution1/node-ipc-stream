var stream = require("stream");
var shared = require("shared");

var _augmentedEvents = ["drain", "pipe"];

var _write = function(data) {
    this.send(shared.message("data", data));
};

var _end = function() {
    this.send(shared.message("end", ""));
};

var _destroy = function() {
    this.send(shared.message("end", ""));
};

var _destroySoon = function() {
    this.send(shared.message("end", ""));
};

var exports = module.exports = function(channel) {
    // setup shared listeners that readable and writable streams have in common
    shared.addListeners(channel);
    // setup the event relay
    channel.on("message", _.bind(shared.eventRelay, channel, _augmentedEvents));
    // set readable flag and bind readable functions
    channel.writable    = true;
    channel.write       = _write;
    channel.end         = _end;
    channel.destroy     = _destroy;
    channel.destroySoon = _destroySoon;
};