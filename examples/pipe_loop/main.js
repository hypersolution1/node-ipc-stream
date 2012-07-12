var child_process = require("child_process");
var ipc_stream = require("../../lib");

var worker = child_process.fork("./worker.js");
var childStream = new ipc_stream(worker);

childStream.write("lolwat");
childStream.pipe(childStream);
