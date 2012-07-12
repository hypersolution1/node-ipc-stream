var child_process = require("child_process");
var dnode = require("dnode");
var ipc_stream = require("../../lib");

var client = child_process.fork("./client.js");
var clientStream = new ipc_stream(client);

var server = dnode({
    greeting: function(target, next) {
        next(false, "Hello " + target);
    }
});

clientStream.pipe(server).pipe(clientStream);
