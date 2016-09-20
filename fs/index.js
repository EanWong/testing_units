"use strict";
var express = require('express');

var jsDAV = require("jsDAV/lib/jsdav");
const node_fs = require('node-fs');


var chokidar = require('chokidar');
// Initialize watcher.
var watcher = chokidar.watch('data/', {
  ignored: [/[\/\\]\./, 'data/renamed/'],
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', (event, path) => {upload_received(event, path)})
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));


var app = express();

app.use(function (req, res, next) {
    if (req.url.search(/^\/webdav/) >= 0) {
      console.log(__dirname);
      jsDAV.mount({
          node: __dirname + "/data",
          mount: "/webdav",
          server: req.app,
          standalone: false
        }
      ).exec(req, res);
    }
    else {
      next();
    }
  }
) 

  function upload_received(path, event) {
    log('File Uploaded: '+path);
    var old_path = './' + path;
    var new_path = './data/renamed/'+ path;
    
    node_fs.rename(old_path, new_path, function(err) {
      if (err) throw err;
      console.log(old_path + " -> Renamed -> " + new_path);
    });
    
    //Rename

  }


app.get('/', function (req, res) {
    res.send('OK');
  }
);

var server = app.listen(3000, "0.0.0.0", function() {
  console.log('Listening on port %d', server.address().port);
});

