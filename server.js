var express = require("express"),
    app = express(),
    path = require("path"),
    fs = require("fs"),
    options = {};

// check for options
if (process.argv.length > 2) {

    for (var i = 0, args = process.argv.splice(2), l = args.length, kwarg; i < l; i++) {
        // make sure there is a key and a value
        if (/=/.test(args[i])) {
            kwarg = args[i].split("=");
            // command line args are always string so cast booleans into real ones
            kwarg[1] = kwalrg[1] === "true" ? true : (kwarg[1] === "false" ? false : kwarg[1]);
            options[kwarg[0]] = kwarg[1];
        }
    }

}


if (!global.settings) {
    global.settings = options;
}

// set environment to local if none is passed in
if (!global.settings.env) {
    global.settings.env = "local";
}

// Terminate cache with extreme prejudice so that assets are reloaded on deploy
function serveIndex(req, res) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    var index = path.join(__dirname, "./index.html");
    res.sendFile(index);
}

app.get("/", serveIndex);
app.get("/index.html", serveIndex);

app.use(express.static(__dirname + "/"));

app.listen(8080, function () {
    console.log("listening on port 8080");
    if (process.send) {
        console.log("sending online");
        process.send("online");
    }
});

process.on("message", function (message) {
    if (message == "shutdown") {
        console.log("shutting down");
        process.exit(0);
    }
});