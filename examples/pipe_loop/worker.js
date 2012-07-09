var child_process = require("child_process");
var ipc_stream = require("../../lib");

console.log("in worker");

var parentStream = ipc_stream.getStreamToParent();

parentStream.pipe(process.stdout);
parentStream.pipe(parentStream);
