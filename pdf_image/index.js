"use strict";
var express = require('express');

var jsDAV = require("jsDAV/lib/jsdav");
const node_fs = require('node-fs');


var chokidar = require('chokidar');
// Initialize watcher.
var watcher = chokidar.watch('data/', {
  ignored: [/[\/\\]\./, 'data/renamed/', 'data/to_process/'],
  ignoreInitial: true,
  awaitWriteFinish: true,
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', (event, path) => {upload_received(event, path)})
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));

var PDFImage = require("pdf-image").PDFImage;

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
    log('File Uploaded: '+ path);

    // Keep only filename
    var filename = path.split('/');
    filename = filename[filename.length -1];

    var curr_path = __dirname + '/data/';
    var new_path = __dirname + '/data/to_process/';

    console.log('Filename: ' + filename);
    console.log('Complete path:' + curr_path)
    console.log('Complete new path:' + new_path)
    
    /*
    */
    pdf_to_bmp(filename, curr_path, new_path);

  }

  //Out path is not implemented yet
  //path DOES NOT include filename
  function pdf_to_bmp(filename, full_in_path, full_out_path) {
    
    var pdfImage = new PDFImage(full_in_path + filename);

    pdfImage.getInfo().then(function (info) {
      for (var i = 0; i < info["Pages"]; i++) {

        pdfImage.convertPage(i).then(function (image_path) {

          console.log('Current image path: ' + image_path);

          var image_name = image_path.split('/');
          image_name = image_name[image_name.length -1 ];
          console.log('image name is :' + image_name);

          var new_image_path = full_out_path + image_name;

          console.log('New image path is :' + new_image_path);
          
          node_fs.rename(image_path, new_image_path, function(err) {
            
            if (err) throw err;
            console.log(image_path + " -> Renamed -> " + new_image_path);
          
          });
          


        }); 
      }
    })
  }


app.get('/', function (req, res) {  res.send("OK, here's a change");

});

var server = app.listen(3000, "0.0.0.0", function() {
  console.log('Listening on port %d', server.address().port);
});

