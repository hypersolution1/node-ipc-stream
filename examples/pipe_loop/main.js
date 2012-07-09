var child_process = require("child_process");
var ipc_stream = require("../../lib");

var worker = child_process.fork("./worker.js");
var childStream = ipc_stream.getStreamToChild(worker);

childStream.write("lolwat");
childStream.pipe(childStream);
