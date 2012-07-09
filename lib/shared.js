var _                = require("UnderscoreKit")._;
var _augmentedEvents = ["error", "close"];

var _eventRelay = function(events, message) {
    if (!_.isObject(message) ||
        _.isUndefined(message.ipc_t) ||
        _.isUndefined(message.ipc_d)) {
        return;
    }

    var events = _.intersection([message.ipc_t], events);
    if (!events.length) {
        return;
    }

    this.emit(message.ipc_t, message.ipc_d);
};

var _sharedRelay = _.curry(_eventRelay, _augmentedEvents);

var exports = module.exports = {

    addListeners: function(channel) {
        channel.removeListener("message", _sharedRelay);
        channel.on("message", _sharedRelay);
    },

    eventRelay: _eventRelay,

    message: function(type, data) {
        return {ipc_t: type, ipc_d: data};
    }
};
