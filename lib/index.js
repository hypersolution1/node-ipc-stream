var _makeReadable = require("./readable");
var _makeWritable = require("./writable");
var _             = require("UnderscoreKit")._;

var _makeReadableAndWritable = _.compose(_makeReadable, _makeWritable);

var exports = module.exports = {

    getStreamToParent: function() {
        return _makeReadableAndWritable(process);
    },

    getWritableParent: function() {
        return _makeWritable(process);
    },

    getReadableParent: function() {
        return _makeReadable(process);
    },

    getStreamToChild: _makeReadableAndWritable,

    getWritableChild: _makeWritable,

    getReadableChild: _makeReadable

};