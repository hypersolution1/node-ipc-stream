"use strict";

var stream       = require("stream");
var EventEmitter = require("events").EventEmitter;
var inherits     = require("util").inherits;

var isUndefined = function(obj) {
    return obj === void 0;
}
var isObject = function (obj) {
    return obj === Object(obj);
};

var _eventProxy = function(message) {
    // not an ipc stream conainer? then ignore this message
    if (!isObject(message) ||
        isUndefined(message.ipc_t) ||
        isUndefined(message.ipc_d)) {
        return;
    }

    // name in container doesn't match? then ignore this message
    if (message.ipc_n != this._name) {
        return;
    }

    this.emit(message.ipc_t, message.ipc_d);
}

var Channel = function(channel, name) {
    EventEmitter.call(this)

    if (isUndefined(name)) {
        name = "__default";
    }

    this.writable = true;
    this.readable = true;
    this._name    = name;
    this._channel = channel;

    this._channel.on("message", _eventProxy.bind(this));
};

inherits(Channel, EventEmitter);

Channel.prototype.message = function(type, data) {
    return {ipc_n: this._name, ipc_t: type, ipc_d: data};
}

Channel.prototype.pause = function() {
    // nothing to do now
};

Channel.prototype.resume = function() {
    // nothing to do now
};

Channel.prototype.destroy = function() {
    this.readable = false;
};

Channel.prototype.write = function(data) {
    this._channel.send(this.message("data", data));
};

Channel.prototype.end = function() {
    this._channel.send(this.message("end", ""));
};

Channel.prototype.destroy = function() {
    this._channel.send(this.message("end", ""));
};

Channel.prototype.destroySoon = function() {
    this._channel.send(this.message("end", ""));
};

Channel.prototype.pipe = stream.prototype.pipe;

var exports = module.exports = Channel;
