var child_process = require("child_process");
var dnode = require("dnode");
var ipc_stream = require("../../lib");

var parentStream = ipc_stream.getStreamToParent();

var server = dnode();
server.on("remote", function(remote) {
    remote.greeting("World", function(error, value) {
        console.log(value);
        server.end();
    });
});

parentStream.pipe(server).pipe(parentStream);
